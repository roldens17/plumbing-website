import { tradeConfig } from "@/config/trade.config";

interface HeaderProps {
  selectedIndex: number | null;
}

export function Header({ selectedIndex }: HeaderProps) {
  return (
    <header
      className="border-b border-slate-800 bg-slate-950/95 backdrop-blur"
      aria-hidden={selectedIndex !== null}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-lg font-bold text-slate-950">
            {tradeConfig.brand.initials}
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight">
              {tradeConfig.brand.name}
            </p>
            <p className="text-xs text-slate-400">
              {tradeConfig.brand.location}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs sm:text-sm">
          <a
            href={`tel:${tradeConfig.brand.phoneE164}`}
            className="hidden text-slate-300 sm:inline"
          >
            Call: {tradeConfig.brand.phoneDisplay}
          </a>
          <a
            href={`tel:${tradeConfig.brand.phoneE164}`}
            className="rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-950 shadow-sm shadow-sky-500/40 transition hover:bg-sky-400"
          >
            Call Now
          </a>
        </div>
      </div>
    </header>
  );
}
