"use client";

import { tradeConfig } from "@/config/trade.config";
import { useEffect, useRef, useState } from "react";

export function Services() {
    const servicesScrollerRef = useRef<HTMLDivElement | null>(null);
    const serviceCardRefs = useRef<Array<HTMLDivElement | null>>([]);
    const [activeServiceIndex, setActiveServiceIndex] = useState(0);
    const services = tradeConfig.services;

    useEffect(() => {
        const scroller = servicesScrollerRef.current;
        if (!scroller) return;

        let rafId = 0;
        const updateActive = () => {
            const children = Array.from(scroller.children) as HTMLElement[];
            if (children.length === 0) return;
            const target = scroller.scrollLeft + scroller.clientWidth / 2;
            let closestIndex = 0;
            let closestDistance = Number.POSITIVE_INFINITY;
            children.forEach((child, index) => {
                const center = child.offsetLeft + child.offsetWidth / 2;
                const distance = Math.abs(center - target);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });
            setActiveServiceIndex(closestIndex);
        };

        const onScroll = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(updateActive);
        };

        updateActive();
        scroller.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", updateActive);

        return () => {
            scroller.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", updateActive);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <section id="services" className="mt-16 space-y-8 lg:mt-24">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
                        {tradeConfig.servicesSection.eyebrow}
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        {tradeConfig.servicesSection.title}
                    </h2>
                </div>
                <p className="max-w-xl text-sm text-slate-300">
                    {tradeConfig.servicesSection.description}
                </p>
            </div>

            <div
                ref={servicesScrollerRef}
                className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory md:mx-0 md:grid md:gap-4 md:overflow-visible md:px-0 md:pb-0 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
            >
                {services.map((service, index) => (
                    <div
                        key={service.title}
                        ref={(node) => {
                            serviceCardRefs.current[index] = node;
                        }}
                        className="group flex min-w-[78%] snap-start flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm shadow-slate-950/40 transition hover:border-sky-400/70 hover:shadow-sky-900/60 sm:min-w-[60%] sm:p-5 md:min-w-0"
                    >
                        <div className="space-y-3">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-500/60 bg-slate-950 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-300">
                                        {service.icon}
                                    </span>
                                    <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
                                        {service.title}
                                    </h3>
                                </div>
                            </div>
                            <p className="text-[11px] leading-relaxed text-slate-300 sm:text-sm">
                                {service.description}
                            </p>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
                            <span>{tradeConfig.servicesSection.footerLeft}</span>
                            <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] uppercase tracking-wide text-sky-300">
                                {tradeConfig.servicesSection.footerBadge}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex justify-center gap-2 md:hidden">
                {services.map((service, index) => (
                    <button
                        key={service.title}
                        type="button"
                        onClick={() => {
                            const card = serviceCardRefs.current[index];
                            card?.scrollIntoView({
                                behavior: "smooth",
                                inline: "center",
                                block: "nearest",
                            });
                        }}
                        className={`h-2 w-2 rounded-full ${index === activeServiceIndex
                                ? "bg-sky-400"
                                : "bg-slate-700"
                            }`}
                        aria-label={`Go to ${service.title}`}
                    />
                ))}
            </div>
        </section>
    );
}
