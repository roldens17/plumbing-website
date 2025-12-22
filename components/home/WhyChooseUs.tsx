import { tradeConfig } from "@/config/trade.config";
import { ContactForm } from "./ContactForm";

export function WhyChooseUs() {
    return (
        <section className="mt-16 space-y-8 lg:mt-24">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
                <div className="space-y-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
                        {tradeConfig.whySection.eyebrow}
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        {tradeConfig.whySection.title}
                    </h2>
                    <p className="text-sm text-slate-300">
                        {tradeConfig.whySection.description}
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {tradeConfig.whySection.cards.map((item, index) => (
                            <div
                                key={item.title}
                                className="animate-fadeUp rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
                                style={{ animationDelay: `${index * 90}ms` }}
                            >
                                <div className="flex items-start gap-3">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-500/60 bg-slate-950 text-xs font-semibold text-sky-300">
                                        {item.icon}
                                    </span>
                                    <div className="space-y-1">
                                        <p className="text-sm font-semibold text-slate-50">
                                            {item.title}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <ContactForm />
            </div>
        </section>
    );
}
