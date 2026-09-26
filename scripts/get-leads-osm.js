#!/usr/bin/env node
/*
 * Pull local business leads from OpenStreetMap via the public Overpass API and
 * write them to scripts/leads-output-osm.csv.
 *
 * Free: no API key, no .env, no billing. Uses public OpenStreetMap data
 * (© OpenStreetMap contributors, ODbL).
 *
 * Standalone: not part of the site, never deployed. Run from the project root:
 *   node scripts/get-leads-osm.js
 */

const fs = require("node:fs");
const path = require("node:path");

// ---------------------------------------------------------------------------
// Config: edit these
// ---------------------------------------------------------------------------

// Category -> OSM tags that mark that kind of business. A business matches if
// it has ANY of the listed tags. Find more tags at https://wiki.openstreetmap.org/wiki/Key:craft
const CATEGORIES = {
  "roofing contractor": [["craft", "roofer"]],
  HVAC: [
    ["craft", "hvac"],
    ["craft", "heating_engineer"],
  ],
  plumber: [["craft", "plumber"]],
  electrician: [["craft", "electrician"]],
  "general contractor": [
    ["craft", "builder"],
    ["office", "construction_company"],
  ],
};

// Approximate bounding boxes: [south, west, north, east] in decimal degrees.
// Get one for any city at https://boundingbox.klokantech.com (choose "CSV").
const CITIES = [
  { city: "Dallas", state: "TX", bbox: [32.62, -97.0, 33.02, -96.55] },
  { city: "Tampa", state: "FL", bbox: [27.85, -82.65, 28.17, -82.25] },
  { city: "Charlotte", state: "NC", bbox: [35.0, -81.01, 35.4, -80.65] },
];

// The public Overpass server is shared by everyone. Keep this at 2s or more.
const DELAY_MS = 2000;

const OUTPUT_FILE = path.join(__dirname, "leads-output-osm.csv");

// ---------------------------------------------------------------------------

const ENDPOINT = "https://overpass-api.de/api/interpreter";
const USER_AGENT = "firstpin-get-leads-osm/1.0 (+https://firstpinlocal.com)";
const MAX_RETRIES = 3;

const CSV_COLUMNS = ["name", "address", "city", "state", "phone", "category_searched", "osm_id"];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function buildQuery(tags, [south, west, north, east]) {
  const box = `${south},${west},${north},${east}`;
  const filters = tags
    .flatMap(([k, v]) => [`node["${k}"="${v}"]["name"](${box});`, `way["${k}"="${v}"]["name"](${box});`])
    .join("\n  ");
  // "out tags" returns just the tags, no geometry: smaller and faster.
  return `[out:json][timeout:60];\n(\n  ${filters}\n);\nout tags;`;
}

async function overpass(query) {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": USER_AGENT },
      body: new URLSearchParams({ data: query }),
    });
    if (res.ok) return res.json();

    // 429 = too many requests, 504 = server busy. Back off and try again.
    if ((res.status === 429 || res.status === 504) && attempt < MAX_RETRIES) {
      const wait = 15000 * (attempt + 1);
      process.stdout.write(`server busy (HTTP ${res.status}), waiting ${wait / 1000}s... `);
      await sleep(wait);
      continue;
    }
    // Overpass errors come back as HTML pages; keep only the readable text.
    const detail = (await res.text()).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    throw new Error(`HTTP ${res.status}${detail ? `: ${detail.slice(0, 160)}` : ""}`);
  }
}

function firstPhone(tags) {
  const raw = tags.phone || tags["contact:phone"] || "";
  // OSM allows several numbers separated by ";". Keep the first.
  return raw.split(";")[0].trim();
}

function formatAddress(tags) {
  const street = [tags["addr:housenumber"], tags["addr:street"]].filter(Boolean).join(" ");
  const stateZip = [tags["addr:state"], tags["addr:postcode"]].filter(Boolean).join(" ");
  return [street, tags["addr:city"], stateZip].filter(Boolean).join(", ");
}

function csvCell(value) {
  const s = value === undefined || value === null ? "" : String(value);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

async function main() {
  const categories = Object.entries(CATEGORIES);
  const totalSearches = categories.length * CITIES.length;
  const leads = new Map(); // osm_id -> row
  let searchNo = 0;
  let failures = 0;
  let noPhone = 0;

  console.log("Using free public OpenStreetMap data via Overpass. Zero cost, no API key.\n");
  console.log(`Running ${totalSearches} searches (${categories.length} categories x ${CITIES.length} cities)\n`);

  for (const [category, tags] of categories) {
    for (const place of CITIES) {
      searchNo++;
      if (searchNo > 1) await sleep(DELAY_MS);
      process.stdout.write(`[${searchNo}/${totalSearches}] Searching: ${category} in ${place.city}, ${place.state}... `);

      let elements;
      try {
        elements = (await overpass(buildQuery(tags, place.bbox))).elements || [];
      } catch (err) {
        failures++;
        console.log(`FAILED (${err.message})`);
        continue;
      }

      let kept = 0;
      for (const el of elements) {
        const t = el.tags || {};
        const phone = firstPhone(t);
        if (!t.name) continue;
        if (!phone) {
          noPhone++;
          continue;
        }
        const osmId = `${el.type}/${el.id}`;
        // Same business can match two categories; keep the first one found.
        if (leads.has(osmId)) continue;

        leads.set(osmId, {
          name: t.name,
          address: formatAddress(t),
          city: t["addr:city"] || place.city,
          state: t["addr:state"] || place.state,
          phone,
          category_searched: category,
          osm_id: osmId,
        });
        kept++;
      }

      console.log(`found ${elements.length} results, ${kept} new leads with a phone number`);
    }
  }

  const rows = [...leads.values()].sort(
    (a, b) => a.category_searched.localeCompare(b.category_searched) || a.name.localeCompare(b.name),
  );
  const csv = [CSV_COLUMNS.join(","), ...rows.map((r) => CSV_COLUMNS.map((c) => csvCell(r[c])).join(","))].join("\n");
  fs.writeFileSync(OUTPUT_FILE, csv + "\n", "utf8");

  console.log("\nDone.");
  console.log(`  Failed searches:   ${failures}`);
  console.log(`  Skipped, no phone: ${noPhone}`);
  console.log(`  Unique leads:      ${rows.length}`);
  console.log(`  Saved to:          ${path.relative(process.cwd(), OUTPUT_FILE)}`);
  console.log("  Cost:              $0 (public OpenStreetMap data, © OpenStreetMap contributors)");
}

main().catch((err) => {
  console.error("\nUnexpected error:", err);
  process.exit(1);
});
