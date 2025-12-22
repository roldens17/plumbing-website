import { tradeConfig } from "@/config/trade.config";

export function Testimonials() {
    const testimonials = tradeConfig.testimonialsSection.items;
    return (
        <section id="reviews" className="mt-16 space-y-6 lg:mt-24">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
                        {tradeConfig.testimonialsSection.eyebrow}
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        {tradeConfig.testimonialsSection.title}
                    </h2>
                </div>
                <p className="max-w-xl text-sm text-slate-300">
                    {tradeConfig.testimonialsSection.description}
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {testimonials.map((item) => (
                    <div
                        key={item.name}
                        className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5"
                    >
                        <div className="flex items-center gap-1 text-sky-400">
                            {"★★★★★".split("").map((star, index) => (
                                <span key={`${item.name}-star-${index}`}>{star}</span>
                            ))}
                        </div>
                        <p className="mt-4 text-sm text-slate-200">“{item.quote}”</p>
                        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                            <span className="font-semibold uppercase tracking-[0.2em]">
                                {item.name}
                            </span>
                            <span>{item.meta}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
