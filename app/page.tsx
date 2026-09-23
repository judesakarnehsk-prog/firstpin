"use client";

import { useState } from "react";

const rankGrid = [9, 14, 22, 6, 11, 3, 18, 27, 8, 15, 31, 12, 19, 24, 7];

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <Header />
      <Hero />
      <Problem />
      <Proof />
      <WhatWeDo />
      <Guarantee />
      <Price />
      <About />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="border-b-4 border-navy bg-offwhite">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <span className="font-headline text-xl text-navy tracking-tight">
          FIRSTPIN
        </span>
        <a
          href="#audit"
          className="border-2 border-navy px-3 py-1.5 text-sm font-bold text-navy"
        >
          Free Audit
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="border-b-4 border-navy bg-navy text-offwhite">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
        <h1 className="font-headline text-5xl leading-[0.95] tracking-tight sm:text-7xl">
          You&apos;re 9th.
          <br />
          <span className="text-orange">They&apos;re 3rd.</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg text-offwhite/90 sm:text-xl">
          We get roofers into the top 3 on Google Maps, where the calls are.
        </p>

        <div className="mt-10 grid grid-cols-5 gap-2 max-w-md sm:max-w-lg">
          {rankGrid.map((n, i) => (
            <div
              key={i}
              className={`flex aspect-square items-center justify-center border-2 font-headline text-lg sm:text-xl ${
                n <= 3
                  ? "border-green bg-green/20 text-green"
                  : "border-red bg-red/10 text-red"
              }`}
            >
              {n}
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs uppercase tracking-widest text-offwhite/60">
          Map ranking positions for &quot;roofer near me&quot; — most contractors, most cities
        </p>

        <a
          href="#audit"
          className="mt-10 inline-block border-2 border-orange bg-orange px-8 py-4 text-lg font-bold text-navy hover:bg-offwhite hover:text-orange transition-colors"
        >
          Get your free audit
        </a>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="border-b-4 border-navy">
      <div className="mx-auto max-w-5xl px-5 py-14">
        <h2 className="font-headline text-3xl text-navy sm:text-4xl">
          THE TOP 3 GET THE CALLS.
        </h2>
        <div className="mt-4 h-1.5 w-24 bg-orange" />
        <p className="mt-6 max-w-2xl text-lg leading-relaxed">
          When someone searches &quot;roofer near me,&quot; Google shows three
          companies on the map. Those three get almost every call. Everyone
          below them is fighting over scraps — or not getting found at all.
        </p>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed font-bold text-navy">
          It doesn&apos;t matter how good your work is if nobody can find you.
        </p>
      </div>
    </section>
  );
}

function Proof() {
  const rows: [string, string, string, boolean][] = [
    ["Reviews", "31", "214", false],
    ["Services listed", "1", "6", false],
    ["Photos", "4", "87", false],
  ];
  return (
    <section className="border-b-4 border-navy bg-navy/5">
      <div className="mx-auto max-w-5xl px-5 py-14">
        <h2 className="font-headline text-3xl text-navy sm:text-4xl">
          HERE&apos;S WHAT THAT LOOKS LIKE.
        </h2>
        <div className="mt-4 h-1.5 w-24 bg-orange" />

        <div className="mt-8 border-4 border-navy bg-offwhite">
          <div className="border-b-2 border-navy bg-navy px-5 py-2">
            <span className="text-xs font-bold uppercase tracking-widest text-orange">
              Example audit — real numbers, anonymized business
            </span>
          </div>

          <div className="grid grid-cols-3">
            <div className="border-b-2 border-r-2 border-navy px-4 py-3" />
            <div className="border-b-2 border-r-2 border-navy px-4 py-3 text-center font-headline text-navy">
              YOU
            </div>
            <div className="border-b-2 border-navy px-4 py-3 text-center font-headline text-navy">
              TOP COMPETITOR
            </div>

            {rows.map(([label, you, them]) => (
              <RowCells key={label} label={label} you={you} them={them} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RowCells({
  label,
  you,
  them,
}: {
  label: string;
  you: string;
  them: string;
}) {
  return (
    <>
      <div className="border-b-2 border-r-2 border-navy px-4 py-4 text-sm font-bold uppercase tracking-wide text-charcoal">
        {label}
      </div>
      <div className="border-b-2 border-r-2 border-navy px-4 py-4 text-center font-headline text-2xl text-red">
        {you}
      </div>
      <div className="border-b-2 border-navy px-4 py-4 text-center font-headline text-2xl text-green">
        {them}
      </div>
    </>
  );
}

function WhatWeDo() {
  const groups = [
    {
      title: "SETUP",
      sub: "First 2 weeks",
      items: [
        "Fix and complete your Google Business Profile",
        "Add every service you actually offer",
        "Upload real photos of your jobs",
        "Fix categories, service areas, and hours",
      ],
    },
    {
      title: "EVERY MONTH",
      sub: "Ongoing",
      items: [
        "Get you a steady flow of new reviews",
        "Respond to every review, good or bad",
        "Post updates so Google knows you're active",
        "Track and outmaneuver your local competitors",
      ],
    },
    {
      title: "REPORTING",
      sub: "You always know where you stand",
      items: [
        "Monthly ranking report for your top searches",
        "Plain-English summary, no jargon",
        "Direct line to us if you have questions",
      ],
    },
  ];

  return (
    <section className="border-b-4 border-navy">
      <div className="mx-auto max-w-5xl px-5 py-14">
        <h2 className="font-headline text-3xl text-navy sm:text-4xl">
          WHAT WE DO.
        </h2>
        <div className="mt-4 h-1.5 w-24 bg-orange" />

        <div className="mt-8 grid gap-0 sm:grid-cols-3">
          {groups.map((g, i) => (
            <div
              key={g.title}
              className={`border-navy px-5 py-6 ${
                i > 0 ? "border-t-2 sm:border-t-0 sm:border-l-2" : ""
              }`}
            >
              <h3 className="font-headline text-xl text-orange">{g.title}</h3>
              <p className="mt-1 text-xs uppercase tracking-widest text-navy/60">
                {g.sub}
              </p>
              <ul className="mt-4 space-y-3">
                {g.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-snug">
                    <span className="mt-0.5 text-orange">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Guarantee() {
  return (
    <section className="border-b-4 border-navy bg-navy">
      <div className="mx-auto max-w-5xl px-5 py-14">
        <div className="relative mx-auto max-w-2xl border-4 border-orange p-8 text-center sm:p-12">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-navy px-3">
            <span className="font-headline text-xs tracking-widest text-orange">
              THE GUARANTEE
            </span>
          </div>
          <p className="font-headline text-2xl leading-tight text-offwhite sm:text-3xl">
            IF YOUR MAPS RANKING HASN&apos;T IMPROVED AFTER 30 DAYS,
            <span className="text-orange"> MONTH TWO IS FREE.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Price() {
  return (
    <section className="border-b-4 border-navy">
      <div className="mx-auto max-w-5xl px-5 py-14">
        <h2 className="font-headline text-3xl text-navy sm:text-4xl">
          THE PRICE.
        </h2>
        <div className="mt-4 h-1.5 w-24 bg-orange" />

        <div className="mt-8 flex flex-col items-start gap-2 border-4 border-navy p-8 sm:p-10">
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-6xl text-orange sm:text-7xl">
              $300
            </span>
            <span className="text-xl font-bold text-navy">/month</span>
          </div>
          <ul className="mt-4 space-y-2 text-lg">
            <li>
              <span className="font-bold text-green">No setup fee</span> for
              founding clients
            </li>
            <li>
              <span className="font-bold text-navy">Month-to-month.</span> No
              contracts, cancel anytime
            </li>
            <li>One roofing company per city. We don&apos;t work with your competitors</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="border-b-4 border-navy bg-navy/5">
      <div className="mx-auto max-w-5xl px-5 py-14">
        <h2 className="font-headline text-3xl text-navy sm:text-4xl">
          WHO&apos;S BEHIND THIS.
        </h2>
        <div className="mt-4 h-1.5 w-24 bg-orange" />

        <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="flex h-32 w-32 shrink-0 items-center justify-center border-4 border-navy bg-navy/10 font-headline text-sm text-navy/50">
            PHOTO
          </div>
          <div>
            <p className="font-headline text-xl text-navy">
              Hi, I&apos;m Jude.
            </p>
            <p className="mt-3 max-w-xl text-lg leading-relaxed">
              I started Firstpin because I watched good roofing companies
              lose jobs to worse ones that just had more reviews and a
              better Google listing. I fix that, one profile at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "Isn't winter slow?",
      a: "Winter's slower for everyone. That's actually the best time to do this, because we build your reviews and ranking now, so when spring hits you're already above the competitors who waited.",
    },
    {
      q: "How long until I see results?",
      a: "Most guys see ranking movement in the first 30 days. Real momentum — more calls, more jobs — usually builds over 60 to 90 days. Google rewards consistency, not shortcuts.",
    },
    {
      q: "Do I need to do anything?",
      a: "Send us photos from your finished jobs when you can, and text your happy customers a review link we give you. That's it. We handle the rest.",
    },
    {
      q: "What if I'm already ranking okay?",
      a: "Then we help you hold the spot and pull further ahead. Rankings move. Competitors catch up. Somebody has to stay on it.",
    },
    {
      q: "Is there a contract?",
      a: "No. Month-to-month. If we're not getting it done, you walk.",
    },
  ];

  return (
    <section className="border-b-4 border-navy">
      <div className="mx-auto max-w-5xl px-5 py-14">
        <h2 className="font-headline text-3xl text-navy sm:text-4xl">
          QUESTIONS.
        </h2>
        <div className="mt-4 h-1.5 w-24 bg-orange" />

        <div className="mt-8 divide-y-2 divide-navy border-t-2 border-navy">
          {faqs.map((f) => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-headline text-base text-navy sm:text-lg">
          {q}
        </span>
        <span className="shrink-0 font-headline text-2xl text-orange">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <p className="pb-5 text-base leading-relaxed text-charcoal sm:max-w-2xl">
          {a}
        </p>
      )}
    </div>
  );
}

function FinalCTA() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="audit" className="border-b-4 border-navy bg-navy text-offwhite">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
        <h2 className="font-headline text-4xl leading-[0.95] sm:text-5xl">
          GET YOUR
          <br />
          <span className="text-orange">FREE AUDIT.</span>
        </h2>
        <p className="mt-4 max-w-md text-lg text-offwhite/90">
          We&apos;ll show you exactly where you rank and what your top
          competitor has that you don&apos;t. No charge, no catch.
        </p>

        <div className="mt-8 max-w-md">
          {submitted ? (
            <div className="border-4 border-orange p-6">
              <p className="font-headline text-xl text-orange">
                GOT IT.
              </p>
              <p className="mt-2 text-offwhite/90">
                We&apos;ll get your audit over to you shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex flex-col gap-3"
            >
              <Field label="Your name" name="name" />
              <Field label="Business name" name="business" />
              <Field label="City" name="city" />
              <Field label="Email" name="email" type="email" />
              <button
                type="submit"
                className="mt-2 border-2 border-orange bg-orange px-8 py-4 text-lg font-bold text-navy hover:bg-navy hover:text-orange transition-colors"
              >
                Get your free audit
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-bold uppercase tracking-widest text-offwhite/70">
        {label}
      </span>
      <input
        required
        type={type}
        name={name}
        className="border-2 border-offwhite/40 bg-navy px-4 py-3 text-offwhite placeholder:text-offwhite/40 focus:border-orange focus:outline-none"
      />
    </label>
  );
}

function Footer() {
  return (
    <footer className="bg-offwhite">
      <div className="mx-auto max-w-5xl px-5 py-8 text-sm text-charcoal/60">
        <p>Firstpin — firstpinlocal.com</p>
        <p className="mt-1">© {new Date().getFullYear()} Firstpin. Built for roofers.</p>
      </div>
    </footer>
  );
}
