// Map-ranking grid: where a business shows up for "contractor near me" when searched
// from 25 spots around one town. 21 means "not in the top 20".
const YOU = [
  [21, 16, 14, 17, 21],
  [15, 12, 10, 12, 18],
  [13, 10, 9, 11, 15],
  [17, 12, 10, 13, 19],
  [21, 18, 15, 19, 21],
];
const THEM = [
  [4, 3, 2, 3, 5],
  [3, 2, 2, 1, 3],
  [2, 1, 3, 2, 4],
  [3, 2, 2, 3, 6],
  [5, 4, 3, 5, 7],
];

function countTop3(grid: number[][]) {
  return grid.flat().filter((n) => n <= 3).length;
}

function cellStyle(n: number) {
  if (n <= 3) return "bg-orange text-navy";
  if (n <= 10) return "bg-offwhite text-navy ring-2 ring-inset ring-navy";
  return "bg-offwhite/60 text-charcoal/45 ring-1 ring-inset ring-charcoal/20";
}

function Grid({ who, grid, accent }: { who: string; grid: number[][]; accent: boolean }) {
  const top3 = countTop3(grid);
  return (
    <figure className="min-w-0">
      <figcaption>
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-charcoal sm:text-xs">
          {who}
        </p>
        <p className="mt-1 flex items-baseline gap-1.5">
          <span className={`font-headline text-4xl leading-none sm:text-5xl ${accent ? "text-orange" : "text-navy"}`}>
            {top3}
          </span>
          <span className="text-xs font-semibold leading-tight text-charcoal sm:text-sm">
            of 25 spots
            <br />
            in the top 3
          </span>
        </p>
      </figcaption>

      <div className="relative mt-3 border-2 border-navy bg-[#ebe8e0] p-1 sm:p-1.5">
        <Streets />
        <div className="relative grid grid-cols-5 gap-[3px] sm:gap-1">
          {grid.flat().map((n, i) => {
            const row = Math.floor(i / 5);
            const col = i % 5;
            const ring = Math.max(Math.abs(row - 2), Math.abs(col - 2));
            const isShop = ring === 0;
            return (
              <div
                key={i}
                style={{ "--ring": ring } as React.CSSProperties}
                className={`cell-in relative flex aspect-square items-center justify-center font-mono text-[11px] font-bold sm:text-sm ${cellStyle(n)}`}
              >
                {n > 20 ? "20+" : n}
                {isShop && (
                  <span
                    aria-hidden
                    className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-navy"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </figure>
  );
}

// A few faint "roads" so the grid reads as a map of a town, not a spreadsheet.
function Streets() {
  return (
    <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <g stroke="#1B2A41" strokeOpacity="0.14" fill="none" strokeLinecap="square">
        <path d="M0 31 L100 27" strokeWidth="3" />
        <path d="M0 72 L100 77" strokeWidth="2" />
        <path d="M37 0 L33 100" strokeWidth="3" />
        <path d="M71 0 L74 100" strokeWidth="1.5" />
        <path d="M0 100 L100 6" strokeWidth="2" />
      </g>
    </svg>
  );
}

export default function RankMap() {
  return (
    <div className="border-4 border-navy bg-offwhite shadow-hard">
      <div className="flex items-center justify-between gap-3 border-b-4 border-navy bg-navy px-4 py-2.5 sm:px-5">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-offwhite sm:text-xs">
          Google Maps, &ldquo;contractor near me&rdquo;
        </p>
        <p className="hidden font-mono text-xs font-bold uppercase tracking-[0.14em] text-orange sm:block">
          Sample town
        </p>
      </div>

      <div className="p-4 sm:p-6">
        <p className="max-w-md text-sm leading-snug text-charcoal sm:text-[15px]">
          We searched from <strong className="text-navy">25 spots around town</strong>, the way a
          homeowner would. Each square is one spot, and the middle one is your shop. The number is
          where that business showed up.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:gap-6">
          <Grid who="Your business" grid={YOU} accent={false} />
          <Grid who="Top local competitor" grid={THEM} accent />
        </div>

        <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t-2 border-navy pt-4 text-xs sm:text-[13px]">
          <Key swatch="bg-orange" term="1-3" desc="On the map. Gets the call." />
          <Key swatch="bg-offwhite ring-2 ring-inset ring-navy" term="4-10" desc="Scrolled past." />
          <Key swatch="bg-offwhite/60 ring-1 ring-inset ring-charcoal/30" term="11+" desc="Never seen." />
        </dl>
      </div>
    </div>
  );
}

function Key({ swatch, term, desc }: { swatch: string; term: string; desc: string }) {
  return (
    <div className="flex items-center gap-2">
      <span aria-hidden className={`block h-4 w-4 shrink-0 ${swatch}`} />
      <dt className="whitespace-nowrap font-mono font-bold text-navy">{term}</dt>
      <dd className="text-charcoal">{desc}</dd>
    </div>
  );
}
