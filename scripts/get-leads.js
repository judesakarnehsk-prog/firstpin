#!/usr/bin/env node
/*
 * Pull local business leads from the Google Places API (New) Text Search endpoint
 * and write them to scripts/leads-output.csv.
 *
 * Standalone: not part of the site, never deployed. Run from the project root:
 *   node scripts/get-leads.js
 *
 * Needs GOOGLE_PLACES_API_KEY in a .env file in the project root.
 */

const fs = require("node:fs");
const path = require("node:path");

// ---------------------------------------------------------------------------
// Config: edit these
// ---------------------------------------------------------------------------

const SEARCH_TERMS = [
  "roofing contractor",
  "HVAC contractor",
  "plumber",
  "electrician",
  "general contractor",
];

const CITIES = ["Dallas, TX", "Tampa, FL", "Charlotte, NC"];

const MIN_REVIEWS = 8;
const MAX_REVIEWS = 150;

// Anything ranked below this position in its search gets the priority flag.
const PRIORITY_BELOW_RANK = 3;

// Text Search returns up to 20 results per page and up to 3 pages (60 results).
// Every page is a separately billed request, so keep this low.
const MAX_PAGES = 1;

const DELAY_MS = 200;

const OUTPUT_FILE = path.join(__dirname, "leads-output.csv");

// ---------------------------------------------------------------------------

const ENDPOINT = "https://places.googleapis.com/v1/places:searchText";

// Only the fields we need. Keep this list short: the fields you request decide
// which pricing tier (SKU) Google bills each call at.
const FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.nationalPhoneNumber",
  "places.rating",
  "places.userRatingCount",
  "nextPageToken",
].join(",");

const CSV_COLUMNS = [
  "name",
  "address",
  "city",
  "state",
  "phone",
  "rating",
  "review_count",
  "search_rank",
  "priority_flag",
  "category_searched",
  "place_id",
];

function loadApiKey() {
  const envPath = path.join(__dirname, "..", ".env");
  if (fs.existsSync(envPath)) process.loadEnvFile(envPath);

  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) {
    console.error(
      "Missing GOOGLE_PLACES_API_KEY. Add it to .env in the project root:\n" +
        "  GOOGLE_PLACES_API_KEY=your_key_here",
    );
    process.exit(1);
  }
  return key;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function textSearch(apiKey, query, pageToken) {
  const body = { textQuery: query, pageSize: 20, languageCode: "en", regionCode: "US" };
  if (pageToken) body.pageToken = pageToken;

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`HTTP ${res.status}: ${detail.slice(0, 300)}`);
  }
  return res.json();
}

// "123 Main St, Plano, TX 75023, USA" -> { city: "Plano", state: "TX" }.
// Falls back to the searched city if the address doesn't look like that.
function cityStateFromAddress(address, searchedCity) {
  const [fallbackCity, fallbackState] = searchedCity.split(",").map((s) => s.trim());
  const parts = (address || "").split(",").map((s) => s.trim());
  if (parts.length >= 3) {
    const stateZip = parts[parts.length - 2].split(/\s+/);
    if (/^[A-Z]{2}$/.test(stateZip[0])) {
      return { city: parts[parts.length - 3], state: stateZip[0] };
    }
  }
  return { city: fallbackCity, state: fallbackState };
}

function csvCell(value) {
  const s = value === undefined || value === null ? "" : String(value);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

async function main() {
  const apiKey = loadApiKey();
  const leads = new Map(); // place_id -> row
  const totalSearches = SEARCH_TERMS.length * CITIES.length;
  let searchNo = 0;
  let apiCalls = 0;
  let failures = 0;
  let filteredOut = 0;

  console.log(`Running ${totalSearches} searches (${SEARCH_TERMS.length} terms x ${CITIES.length} cities)\n`);

  for (const term of SEARCH_TERMS) {
    for (const city of CITIES) {
      searchNo++;
      const query = `${term} in ${city}`;
      process.stdout.write(`[${searchNo}/${totalSearches}] Searching: ${query}... `);

      const places = [];
      let pageToken;
      try {
        for (let page = 0; page < MAX_PAGES; page++) {
          if (apiCalls > 0) await sleep(DELAY_MS);
          const data = await textSearch(apiKey, query, pageToken);
          apiCalls++;
          places.push(...(data.places || []));
          pageToken = data.nextPageToken;
          if (!pageToken) break;
        }
      } catch (err) {
        failures++;
        console.log(`FAILED (${err.message})`);
        continue;
      }

      let kept = 0;
      places.forEach((place, i) => {
        const rank = i + 1;
        const reviews = place.userRatingCount ?? 0;
        if (reviews < MIN_REVIEWS || reviews > MAX_REVIEWS) {
          filteredOut++;
          return;
        }

        const existing = leads.get(place.id);
        // Seen in an earlier search: keep whichever search ranked it highest.
        if (existing && existing.search_rank <= rank) return;

        const { city: placeCity, state } = cityStateFromAddress(place.formattedAddress, city);
        leads.set(place.id, {
          name: place.displayName?.text ?? "",
          address: place.formattedAddress ?? "",
          city: placeCity,
          state,
          phone: place.nationalPhoneNumber ?? "",
          rating: place.rating ?? "",
          review_count: reviews,
          search_rank: rank,
          priority_flag: rank > PRIORITY_BELOW_RANK ? "priority" : "",
          category_searched: term,
          place_id: place.id,
        });
        if (!existing) kept++;
      });

      console.log(`found ${places.length} results, ${kept} new leads in the ${MIN_REVIEWS}-${MAX_REVIEWS} review range`);
    }
  }

  const rows = [...leads.values()].sort(
    (a, b) => a.category_searched.localeCompare(b.category_searched) || a.search_rank - b.search_rank,
  );
  const csv = [CSV_COLUMNS.join(","), ...rows.map((r) => CSV_COLUMNS.map((c) => csvCell(r[c])).join(","))].join("\n");
  fs.writeFileSync(OUTPUT_FILE, csv + "\n", "utf8");

  const priority = rows.filter((r) => r.priority_flag).length;
  console.log("\nDone.");
  console.log(`  API calls:            ${apiCalls}`);
  console.log(`  Failed searches:      ${failures}`);
  console.log(`  Outside review range: ${filteredOut}`);
  console.log(`  Unique leads:         ${rows.length} (${priority} flagged priority)`);
  console.log(`  Saved to:             ${path.relative(process.cwd(), OUTPUT_FILE)}`);
}

main().catch((err) => {
  console.error("\nUnexpected error:", err);
  process.exit(1);
});
