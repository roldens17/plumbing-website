import { tradeConfig } from "@/config/trade.config";

export function Footer() {
    return (
        <footer
            id="contact"
            aria-labelledby="footer-heading"
            className="relative mt-16 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 p-6 text-slate-100 shadow-[0_24px_80px_-60px_rgba(15,23,42,0.65)] lg:mt-24 lg:p-8"
        >
            <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-slate-800/40 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr_1fr]">
                <div className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
                        {tradeConfig.footer.eyebrow}
                    </p>
                    <h2
                        id="footer-heading"
                        className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl"
                    >
                        {tradeConfig.footer.headline}
                    </h2>
                    <p className="text-sm text-slate-300">
                        {tradeConfig.footer.description}
                    </p>
                    <address className="not-italic text-sm text-slate-200">
                        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="h-3.5 w-3.5 text-sky-400"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 21s7-7.25 7-12a7 7 0 1 0-14 0c0 4.75 7 12 7 12Z"
                                />
                                <circle cx="12" cy="9" r="2.5" />
                            </svg>
                            {tradeConfig.footer.serviceAreaLabel}
                        </p>
                        <p className="mt-1">{tradeConfig.brand.location}</p>
                        <div className="mt-3 space-y-2">
                            <a
                                href={`tel:${tradeConfig.brand.phoneE164}`}
                                className="flex items-center gap-2 text-slate-200 hover:text-sky-300"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="h-4 w-4 text-slate-400"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.5 6.5c0 7.18 5.82 13 13 13h2.5a1 1 0 0 0 1-1v-3.1a1 1 0 0 0-.76-.97l-3.2-.8a1 1 0 0 0-1.06.48l-.8 1.28a12.2 12.2 0 0 1-5.2-5.2l1.28-.8a1 1 0 0 0 .48-1.06l-.8-3.2A1 1 0 0 0 6.6 3H3.5a1 1 0 0 0-1 1v2.5Z"
                                    />
                                </svg>
                                {tradeConfig.brand.phoneDisplay}
                            </a>
                            <a
                                href={`mailto:${tradeConfig.brand.email}`}
                                className="flex items-center gap-2 text-slate-200 hover:text-sky-300"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="h-4 w-4 text-slate-400"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6.5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m4 7.5 8 6 8-6"
                                    />
                                </svg>
                                {tradeConfig.brand.email}
                            </a>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-3">
                            <a
                                href="#contact-form"
                                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-950 shadow-md shadow-sky-500/40 transition hover:bg-sky-400"
                            >
                                {tradeConfig.hero.primaryCtaLabel}
                            </a>
                        </div>
                    </address>
                </div>

                <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-xs text-slate-300">
                    <p className="font-semibold text-slate-100">
                        {tradeConfig.footer.hoursTitle}
                    </p>
                    <div className="flex items-start gap-2">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="mt-0.5 h-4 w-4 text-slate-400"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6l3.5 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        <p>{tradeConfig.footer.hoursLine1}</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="mt-0.5 h-4 w-4 text-slate-400"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6l3.5 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        <p>{tradeConfig.footer.hoursLine2}</p>
                    </div>
                    <div className="pt-2">
                        <p className="text-[11px] text-slate-500">
                            {tradeConfig.footer.licenseNote}
                        </p>
                    </div>
                </div>

                <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-xs text-slate-300">
                    <p className="font-semibold text-slate-100">
                        {tradeConfig.footer.mapTitle}
                    </p>
                    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60">
                        <iframe
                            title={`${tradeConfig.brand.name} service area map`}
                            src={`https://www.google.com/maps?q=${tradeConfig.footer.mapQuery}&output=embed`}
                            className="h-40 w-full"
                            loading="lazy"
                        />
                    </div>
                    <nav
                        aria-label="Footer"
                        className="pt-2 text-[11px] text-slate-500"
                    >
                        {tradeConfig.footer.footerLinks.map((link, index) => (
                            <span key={link.href}>
                                <a href={link.href} className="hover:text-sky-300">
                                    {link.label}
                                </a>
                                {index < tradeConfig.footer.footerLinks.length - 1
                                    ? " · "
                                    : ""}
                            </span>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="relative mt-6 border-t border-slate-800 pt-4 text-[11px] text-slate-500 md:flex md:items-center md:justify-between">
                <p>
                    © {new Date().getFullYear()} {tradeConfig.brand.name}.{" "}
                    {tradeConfig.footer.copyrightSuffix}{" "}
                    <a
                        href={tradeConfig.brand.websiteCreditUrl}
                        className="text-slate-400 hover:text-sky-300"
                    >
                        {tradeConfig.brand.websiteCreditName}
                    </a>
                    .
                </p>
                <p className="mt-2 md:mt-0">
                    {tradeConfig.footer.hoursLine2}
                </p>
            </div>
        </footer>
    );
}
