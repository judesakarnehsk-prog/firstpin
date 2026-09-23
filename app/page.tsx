import AuditForm from "./audit-form";
import RankMap from "./rank-map";

const CTA_LABEL = "Get my free audit";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Problem />
        <AuditSample />
        <WhatWeDo />
        <WhyUs />
        <Guarantee />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

/* ---------- shared ---------- */

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-8 ${className}`}>{children}</div>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-orange">{children}</p>
  );
}

function CtaButton({ size = "lg" }: { size?: "lg" | "sm" }) {
  const sizes = size === "lg" ? "px-7 py-4 text-base sm:text-lg" : "px-3.5 py-2 text-xs sm:text-sm";
  return (
    <a
      href="#audit"
      className={`inline-flex items-center gap-3 whitespace-nowrap bg-orange font-headline uppercase text-navy shadow-hard-sm transition-[transform,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${sizes}`}
    >
      {CTA_LABEL}
      {size === "lg" && <span aria-hidden>&rarr;</span>}
    </a>
  );
}

/* ---------- header ---------- */

function Header() {
  return (
    <header className="sticky top-0 z-20 border-b-4 border-navy bg-offwhite">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2 font-headline text-xl tracking-tight text-navy sm:text-2xl">
            <span aria-hidden className="block h-4 w-4 bg-orange sm:h-5 sm:w-5" />
            FIRSTPIN
          </a>
          <nav className="flex items-center gap-7">
            <div className="hidden items-center gap-7 text-sm font-semibold text-navy md:flex">
              <a href="#how" className="hover:text-orange">How it works</a>
              <a href="#why-us" className="hover:text-orange">Why us</a>
              <a href="#pricing" className="hover:text-orange">Pricing</a>
              <a href="#faq" className="hover:text-orange">FAQ</a>
            </div>
            <CtaButton size="sm" />
          </nav>
        </div>
      </Container>
    </header>
  );
}

/* ---------- hero ---------- */

function Hero() {
  return (
    <section className="border-b-4 border-navy">
      <Container>
        <div className="grid gap-12 pb-16 pt-10 sm:pt-16 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16 lg:pb-20">
          <div>
            <h1 className="font-headline text-display uppercase text-navy">
              <span className="lg:whitespace-nowrap">You&apos;re 9th.</span>
              <br />
              <span className="text-orange lg:whitespace-nowrap">They&apos;re 3rd.</span>
            </h1>
            <p className="mt-7 max-w-md text-lg leading-snug sm:text-xl">
              Same town. Same trade. Google shows them first, so they get the call. We get you into
              the top 3.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <CtaButton />
              <a href="#how" className="border-b-2 border-navy pb-0.5 text-sm font-bold text-navy hover:border-orange hover:text-orange">
                See how it works
              </a>
            </div>
          </div>
          <RankMap />
        </div>
      </Container>
    </section>
  );
}

/* ---------- the problem ---------- */

const MAP_PACK = ["Summit Ridge Contracting", "Hartley Home Services", "Cole & Sons Construction"];

function Problem() {
  return (
    <section className="border-b-4 border-navy">
      <Container>
        <div className="reveal py-20 sm:py-28">
          <h2 className="max-w-5xl font-headline text-section uppercase text-navy">
            Google shows 3 businesses. Everyone else is invisible.
          </h2>
          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="max-w-lg text-lg leading-relaxed">
                A homeowner needs a job done. They search, look at the map and call one of the first three.
                Most never tap &ldquo;More places.&rdquo;
              </p>
              <p className="mt-4 max-w-lg text-lg font-bold leading-relaxed text-navy">
                The top 3 usually aren&apos;t better at the work. They have better Google profiles. That&apos;s
                fixable.
              </p>
            </div>

            <ol className="self-center font-headline text-navy" aria-label="What a homeowner sees">
              {MAP_PACK.map((name, i) => (
                <li key={name} className="flex items-baseline gap-4 border-b-2 border-navy py-4 text-xl sm:text-2xl">
                  <span className="w-8 text-orange">{i + 1}</span>
                  {name}
                </li>
              ))}
              <li aria-hidden className="bg-orange px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-navy">
                The calls stop here
              </li>
              <li className="flex items-baseline gap-4 py-4 text-xl text-charcoal/35 sm:text-2xl">
                <span className="w-8">9</span>
                Your company
              </li>
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- sample audit ---------- */

const AUDIT_STATS: { label: string; you: string; them: string }[] = [
  { label: "Map rank", you: "#9", them: "#2" },
  { label: "Google reviews", you: "38", them: "212" },
  { label: "Reviews, last 90 days", you: "2", them: "27" },
  { label: "Photos on profile", you: "11", them: "140" },
];

const AUDIT_FIXES = [
  "Main category is too broad. Switch it to the one that matches your main service.",
  "An old listing at your previous address is splitting your reviews. Remove it.",
  "No services listed. Your top local competitor lists 9.",
];

function AuditSample() {
  return (
    <section className="border-b-4 border-navy bg-[#efece5]">
      <Container>
        <div className="reveal grid gap-12 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
          <div>
            <Eyebrow>The free audit</Eyebrow>
            <h2 className="mt-4 font-headline text-section uppercase text-navy">
              Your numbers next to theirs.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed">
              Where you rank, how you stack up against the top 3 in your town, and the fixes that move
              you up, in order. Here&apos;s a sample.
            </p>
          </div>

          <article className="border-4 border-navy bg-white shadow-hard">
            <header className="flex flex-wrap items-baseline justify-between gap-2 border-b-4 border-navy px-5 py-4 sm:px-7">
              <span className="font-headline text-lg uppercase text-navy">Sample audit</span>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-charcoal/70">
                Your business vs. top local competitor
              </span>
            </header>

            <div className="grid grid-cols-2">
              {AUDIT_STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`px-5 py-5 sm:px-7 sm:py-6 ${i % 2 === 0 ? "border-r-2" : ""} ${i < 2 ? "border-b-2" : ""} border-navy/15`}
                >
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-charcoal/70 sm:text-xs">
                    {s.label}
                  </p>
                  <p className="mt-2 flex items-baseline gap-2">
                    <span className="font-headline text-4xl leading-none text-orange sm:text-5xl">{s.you}</span>
                    <span className="text-sm font-semibold text-navy">
                      vs <span className="font-headline">{s.them}</span>
                    </span>
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t-4 border-navy bg-navy px-5 py-6 text-offwhite sm:px-7">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-orange">Top 3 fixes</p>
              <ol className="mt-4 space-y-3">
                {AUDIT_FIXES.map((f, i) => (
                  <li key={f} className="flex gap-3 leading-snug">
                    <span className="font-headline text-orange">{i + 1}</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ol>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}

/* ---------- what we do ---------- */

const SETUP = [
  "Audit you against your top 3 competitors",
  "Fix your categories",
  "Fill in every profile field",
  "Upload your job photos",
  "Fix your directory listings",
  "Remove duplicate listings",
  "Set up a review link and QR code for your crews",
];

const MONTHLY = [
  "Google posts every week",
  "New photos every week",
  "Reply to every review within 48 hours",
  "Review requests to your customers by text and email",
  "Answer questions on your profile",
  "Watch for fake reviews and suspension risks",
  "Track what your competitors are doing",
];

const REPORTING = [
  "Views, calls, direction requests, website clicks",
  "Your map-ranking grid, spot by spot",
  "What changed and why, in plain English",
];

function WhatWeDo() {
  return (
    <section id="how" className="scroll-mt-16 border-b-4 border-navy">
      <Container>
        <div className="py-20 sm:py-28">
          <h2 className="reveal max-w-4xl font-headline text-section uppercase text-navy">
            We run your Google profile. You run jobs.
          </h2>

          <div className="reveal mt-12 grid gap-4 lg:grid-cols-2 lg:grid-rows-[auto_auto]">
            <Tile className="bg-navy text-offwhite lg:row-span-2" title="Setup" when="First 2 weeks" whenClass="text-orange">
              <List items={SETUP} dot="bg-orange" />
            </Tile>
            <Tile className="border-4 border-navy bg-offwhite" title="Every month" when="Ongoing" whenClass="text-orange" titleClass="text-navy">
              <List items={MONTHLY} dot="bg-navy" cols />
            </Tile>
            <Tile className="bg-orange text-navy" title="Monthly report" when="One page" whenClass="text-navy/70" titleClass="text-navy">
              <List items={REPORTING} dot="bg-navy" />
            </Tile>
          </div>

          <p className="reveal mt-10 max-w-2xl text-xl leading-snug text-navy">
            <strong>Your part:</strong> text us job photos when you have them, and hand customers the
            review link. That&apos;s it.
          </p>
        </div>
      </Container>
    </section>
  );
}

function Tile({
  title,
  when,
  className,
  whenClass,
  titleClass = "",
  children,
}: {
  title: string;
  when: string;
  className: string;
  whenClass: string;
  titleClass?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`p-6 sm:p-9 ${className}`}>
      <p className={`font-mono text-xs font-bold uppercase tracking-[0.16em] ${whenClass}`}>{when}</p>
      <h3 className={`mt-2 font-headline text-3xl uppercase sm:text-4xl ${titleClass}`}>{title}</h3>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function List({ items, dot, cols = false }: { items: string[]; dot: string; cols?: boolean }) {
  return (
    <ul className={`grid gap-x-8 gap-y-3 ${cols ? "sm:grid-cols-2" : ""}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-snug">
          <span aria-hidden className={`mt-[0.45em] block h-2 w-2 shrink-0 ${dot}`} />
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ---------- about / why us ---------- */

const REASONS: { head: string; body: string }[] = [
  {
    head: "We show you the problem before you pay us anything.",
    body: "Every business gets a free audit first: your ranking against your real local competitors, side by side.",
  },
  {
    head: "We guarantee movement, not promises.",
    body: "If your Maps ranking hasn't improved within 30 days, your second month is free.",
  },
  {
    head: "We speak plainly.",
    body: "No “digital presence optimization.” Your ranking goes up, your reviews grow, your phone rings more.",
  },
  {
    head: "We're built for local trades, not enterprise marketing.",
    body: "Every client gets active, hands-on management, not a template running on autopilot.",
  },
];

function WhyUs() {
  return (
    <section id="why-us" className="scroll-mt-16 border-b-4 border-navy">
      <Container>
        <div className="reveal py-20 sm:py-28">
          <h2 className="font-headline text-section uppercase text-navy">Why us.</h2>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-navy sm:text-2xl sm:leading-relaxed">
            We help local service businesses get found first. One focus: getting you into the top 3
            spots on Google Maps, where the calls actually happen. No bloated retainers, no jargon, no
            12-month contracts. Just your ranking, your reviews, and a report every month that shows
            exactly what changed.
          </p>

          <div className="mt-14 grid gap-1 border-4 border-navy bg-navy sm:grid-cols-2">
            {REASONS.map((r) => (
              <div key={r.head} className="bg-offwhite p-6 sm:p-9">
                <span aria-hidden className="block h-2 w-10 bg-orange" />
                <h3 className="mt-5 font-headline text-xl uppercase leading-tight text-navy sm:text-2xl">
                  {r.head}
                </h3>
                <p className="mt-3 max-w-md text-lg leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- guarantee ---------- */

function Guarantee() {
  return (
    <section className="border-b-4 border-navy">
      <Container>
        <div className="reveal py-20 text-center sm:py-28">
          <p className="font-headline text-[7rem] leading-[0.8] text-orange sm:text-[11rem]">30</p>
          <p className="mt-2 font-mono text-sm font-bold uppercase tracking-[0.2em] text-navy">Day guarantee</p>
          <h2 className="mx-auto mt-8 max-w-5xl font-headline text-section uppercase text-navy">
            No better ranking in 30 days? Month two is free.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed">
            We check your map ranking the day we start and again at day 30. If it hasn&apos;t moved up,
            you don&apos;t pay for month two. No forms, no fine print.
          </p>
        </div>
      </Container>
    </section>
  );
}

/* ---------- pricing ---------- */

const TERMS: { head: string; body: string }[] = [
  { head: "No contract", body: "Month-to-month. Stop any time." },
  { head: "$0 setup", body: "For founding clients." },
  { head: "Everything included", body: "Setup, weekly work and the monthly report." },
  { head: "30-day guarantee", body: "No movement, month two is free." },
];

function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-16 border-b-4 border-navy bg-[#efece5]">
      <Container>
        <div className="reveal py-20 sm:py-28">
          <Eyebrow>Pricing</Eyebrow>
          <div className="mt-4 flex flex-wrap items-end gap-x-6 gap-y-2">
            <p className="font-headline text-[5.5rem] leading-[0.8] tracking-tight text-navy sm:text-[10rem]">
              $300
            </p>
            <p className="pb-2 font-headline text-2xl uppercase text-navy sm:pb-4 sm:text-3xl">/ month</p>
          </div>
          <p className="mt-6 max-w-xl text-lg">One price. One good job covers a year of it.</p>

          <dl className="mt-12 grid border-t-4 border-navy sm:grid-cols-2 lg:grid-cols-4">
            {TERMS.map((t, i) => (
              <div
                key={t.head}
                className={`border-b-2 border-navy/20 py-6 sm:pr-6 lg:border-b-0 ${i > 0 ? "lg:border-l-2 lg:pl-6" : ""}`}
              >
                <dt className="font-headline text-xl uppercase text-navy">{t.head}</dt>
                <dd className="mt-2 text-base">{t.body}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <CtaButton />
            <aside className="max-w-xl border-l-8 border-orange bg-offwhite px-5 py-4">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-orange">
                Founding clients
              </p>
              <p className="mt-2 text-base leading-relaxed text-navy">
                We&apos;re currently onboarding our first founding clients, which means founding
                pricing: no setup fee, and closer, hands-on attention while we build your results out.
              </p>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- FAQ ---------- */

const FAQS: { q: string; a: string }[] = [
  {
    q: "What's in the free audit?",
    a: "Where you rank on the map right now, how your profile compares to the top 3 businesses in your area, and the fixes that would move you up. It's yours to keep whether you hire us or not.",
  },
  {
    q: "Is there a contract?",
    a: "No. It's $300 a month, month-to-month. If it's not working, you stop.",
  },
  {
    q: "How fast will I move up?",
    a: "Most profiles move in the first 30 days once the setup fixes are in. That's why the guarantee is 30 days. Getting into the top 3 and staying there takes steady work every month, which is what the monthly plan covers.",
  },
  {
    q: "It's winter. Should I wait?",
    a: "Winter's slower for everyone. That's actually the best time to do this, because we build your reviews and ranking now, so when spring hits you're already above the competitors who waited.",
  },
  {
    q: "How much of my time does this take?",
    a: "A few minutes a week. Text us job photos when you have them, and have your crew hand customers the review link or QR code. We handle everything else.",
  },
  {
    q: "Do I need a new website?",
    a: "No. This is your Google Business Profile, the listing that shows on the map. It's where most homeowners pick who to call.",
  },
  {
    q: "What if my profile gets suspended?",
    a: "We watch for the things that get local businesses suspended, like address problems, keyword-stuffed names and bad edits, and fix them before Google notices.",
  },
];

function Faq() {
  return (
    <section id="faq" className="scroll-mt-16 border-b-4 border-navy">
      <Container>
        <div className="grid gap-10 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-headline text-section uppercase text-navy">Straight answers.</h2>
            <p className="mt-6 max-w-sm text-lg">
              Something else on your mind? Ask it in the audit form and we&apos;ll answer with your audit.
            </p>
          </div>
          <div className="border-t-4 border-navy">
            {FAQS.map((f) => (
              <details key={f.q} className="group border-b-2 border-navy">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-headline text-lg uppercase leading-tight text-navy transition-colors group-hover:text-orange sm:text-xl">
                    {f.q}
                  </span>
                  <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-navy font-headline text-xl text-navy transition-colors group-open:border-orange group-open:bg-orange"
                  >
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">&minus;</span>
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 pr-12 text-lg leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- final CTA ---------- */

function FinalCta() {
  return (
    <section id="audit" className="scroll-mt-16 bg-navy text-offwhite">
      <Container>
        <div className="grid gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>Free. No sales call.</Eyebrow>
            <h2 className="mt-4 font-headline text-display uppercase">
              Get your <span className="text-orange">free audit.</span>
            </h2>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-offwhite/85">
              Find out where you rank, who&apos;s beating you and what it takes to pass them.
            </p>
            <dl className="mt-10 grid max-w-md gap-5 border-t-2 border-offwhite/20 pt-8">
              {[
                ["Your ranking", "Across 25 spots in your service area."],
                ["Your competition", "You next to the top 3 competitors in town."],
                ["Your fixes", "What to change first, in order."],
              ].map(([t, d]) => (
                <div key={t}>
                  <dt className="font-headline uppercase text-orange">{t}</dt>
                  <dd className="mt-1 text-offwhite/85">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:pt-4">
            <AuditForm ctaLabel={CTA_LABEL} />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- footer ---------- */

const REGISTERED_OFFICE = "167-169 Great Portland Street, 5th Floor, London, England, W1W 5PF.";

const FOOTER_LINKS: [string, string][] = [
  ["How it works", "#how"],
  ["Why us", "#why-us"],
  ["Pricing", "#pricing"],
  ["FAQ", "#faq"],
  ["Free audit", "#audit"],
];

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-4 border-orange bg-navy text-offwhite/70">
      <FooterMap />
      <Container className="relative">
        <div className="flex flex-col gap-10 pb-10 pt-16 sm:pt-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-3 font-headline text-4xl tracking-tight text-offwhite sm:text-6xl">
              <span aria-hidden className="block h-7 w-7 bg-orange sm:h-10 sm:w-10" />
              FIRSTPIN
            </p>
            <p className="mt-4 max-w-sm text-base text-offwhite/80">
              Top 3 on Google Maps for local service businesses.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-offwhite">
            {FOOTER_LINKS.map(([label, href]) => (
              <a key={href} href={href} className="hover:text-orange">
                {label}
              </a>
            ))}
          </nav>
        </div>
        <p className="border-t-2 border-offwhite/15 py-5 text-[11px] leading-relaxed text-offwhite/50 sm:text-xs">
          &copy; 2026 Firstpin, a Humanaira Ltd company. Registered in England &amp; Wales.{" "}
          {REGISTERED_OFFICE}
        </p>
      </Container>
    </footer>
  );
}

// Faint street map behind the footer: a street grid, a few main roads and one pin.
function FooterMap() {
  const avenues = Array.from({ length: 16 }, (_, i) => 40 + i * 78);
  const streets = Array.from({ length: 8 }, (_, i) => 30 + i * 62);
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1200 480"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="#F7F5F0" fill="none" strokeLinecap="square">
        <g strokeOpacity="0.06" strokeWidth="1.5" transform="rotate(-9 600 240)">
          {avenues.map((x) => (
            <path key={`a${x}`} d={`M${x} -200 V680`} />
          ))}
          {streets.map((y) => (
            <path key={`s${y}`} d={`M-200 ${y} H1400`} />
          ))}
        </g>
        <g strokeOpacity="0.13" strokeWidth="6">
          <path d="M-20 410 C 260 360, 420 250, 640 230 S 1010 120, 1230 60" />
          <path d="M760 -20 L 700 500" />
        </g>
        <g strokeOpacity="0.1" strokeWidth="3.5">
          <path d="M-20 120 L 1220 300" />
          <circle cx="930" cy="330" r="120" />
        </g>
      </g>
      <g transform="translate(732 224)">
        <rect x="-26" y="-26" width="52" height="52" fill="none" stroke="#F26B1D" strokeOpacity="0.45" strokeWidth="2" />
        <rect x="-9" y="-9" width="18" height="18" fill="#F26B1D" />
      </g>
    </svg>
  );
}
