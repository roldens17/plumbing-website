import { tradeConfig } from "@/config/trade.config";
import Image from "next/image";

export function Hero() {
    const handlePrimaryClick = () => {
        if (typeof window === "undefined") return;

        const isMobile = window.matchMedia("(max-width: 639px)").matches;

        if (isMobile) {
            window.location.href = `tel:${tradeConfig.brand.phoneE164}`;
            return;
        }

        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            window.location.hash = "#contact";
        }
    };

    return (
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
            <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
                    {tradeConfig.hero.eyebrow}
                </p>
                <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                    {tradeConfig.hero.headline}
                </h1>
                <p className="mt-2 text-sm font-medium text-slate-200">
                    Licensed &amp; insured plumber serving {tradeConfig.brand.location}.
                </p>
                <div className="max-w-xl space-y-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                    <p>{tradeConfig.hero.descriptionMain}</p>
                    <p>{tradeConfig.hero.descriptionSecondary}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        type="button"
                        onClick={handlePrimaryClick}
                        className="inline-flex rounded-full bg-sky-500 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-slate-950 shadow-md shadow-sky-500/40 transition hover:bg-sky-400"
                    >
                        {tradeConfig.hero.primaryCtaLabel}
                    </button>
                    <a
                        href="#services"
                        className="rounded-full border border-slate-600 px-6 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-sky-400 hover:text-sky-300"
                    >
                        {tradeConfig.hero.secondaryCtaLabel}
                    </a>
                </div>
                <div className="flex flex-wrap gap-3 pt-2 text-xs text-slate-300 sm:text-sm">
                    {tradeConfig.hero.badges.map((label) => (
                        <span
                            key={label}
                            className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-200"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                            {label}
                        </span>
                    ))}
                </div>
                <p className="mt-3 max-w-xl text-xs text-slate-400 sm:text-sm">
                    “{tradeConfig.testimonialsSection.items[0].quote}” — {tradeConfig.testimonialsSection.items[0].name}
                </p>
            </div>

            <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl shadow-sky-950/40">
                <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950">
                    <Image
                        src={tradeConfig.heroCard.imageSrc}
                        alt={tradeConfig.heroCard.imageAlt}
                        width={900}
                        height={600}
                        className="h-52 w-full object-cover"
                        sizes="(min-width: 1024px) 480px, 100vw"
                        priority
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-slate-950/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-100">
                        {tradeConfig.heroCard.sameDayLabel}
                        <span className="h-1 w-1 rounded-full bg-sky-400" />
                        {tradeConfig.heroCard.sameDayNote}
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                    {tradeConfig.stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-3 text-center"
                        >
                            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                                {stat.label}
                            </p>
                            <p className="text-sm font-semibold text-slate-50">
                                {stat.value}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-xs text-slate-300">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                                {tradeConfig.heroCard.directLineLabel}
                            </p>
                            <a
                                href={`tel:${tradeConfig.brand.phoneE164}`}
                                className="block text-lg font-semibold text-slate-50 sm:text-xl"
                            >
                                {tradeConfig.brand.phoneDisplay}
                            </a>
                            <p className="mt-1 text-[11px] text-slate-400">
                                {tradeConfig.heroCard.emergencyNote}
                            </p>
                        </div>
                        <a
                            href={`mailto:${tradeConfig.brand.email}`}
                            className="text-[11px] text-slate-400 hover:text-sky-300"
                        >
                            {tradeConfig.brand.email}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
