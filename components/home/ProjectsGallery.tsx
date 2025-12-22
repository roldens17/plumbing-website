"use client";

import { tradeConfig } from "@/config/trade.config";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const projectImages = [
    "/img/IMG_1891.jpg",
    "/img/IMG_1895.jpg",
    "/img/IMG_1887.jpg",
    "/img/IMG_1894.jpg",
    "/img/IMG_1893.jpg",
    "/img/IMG_1892.jpg",
    "/img/IMG_1890.jpg",
    "/img/IMG_1889.jpg",
    "/img/IMG_1888.jpg",
    "/img/IMG_1886.jpg",
    "/img/IMG_1885.jpg",
    "/img/IMG_1884.jpg",
    "/img/IMG_1883.jpg",
    "/img/IMG_1882.jpg",
    "/img/IMG_1881.jpg",
    "/img/IMG_1880.jpg",
    "/img/IMG_1879.jpg",
    "/img/IMG_1877.jpg",
    "/img/IMG_1876.jpg",
    "/img/IMG_1875.jpg",
    "/img/IMG_1874.jpg",
    "/img/IMG_1873.jpg",
    "/img/IMG_1872.jpg",
    "/img/IMG_1871.jpg",
    "/img/IMG_1869.jpg",
    "/img/IMG_1868.jpg",
    "/img/IMG_1867.jpg",
    "/img/IMG_1866.jpg",
    "/img/IMG_1865.jpg",
] as const;

interface ProjectsGalleryProps {
    selectedIndex: number | null;
    setSelectedIndex: (index: number | null) => void;
}

export function ProjectsGallery({ selectedIndex, setSelectedIndex }: ProjectsGalleryProps) {
    const [activeProjectIndex, setActiveProjectIndex] = useState(0);
    const [loadedProjectImages, setLoadedProjectImages] = useState<Record<string, boolean>>({});

    const modalRef = useRef<HTMLDivElement | null>(null);
    const closeButtonRef = useRef<HTMLButtonElement | null>(null);
    const lastFocusedRef = useRef<HTMLElement | null>(null);
    const projectsScrollerRef = useRef<HTMLDivElement | null>(null);
    const projectCardRefs = useRef<Array<HTMLButtonElement | null>>([]);

    const markProjectImageLoaded = (src: string) => {
        setLoadedProjectImages((prev) =>
            prev[src]
                ? prev
                : {
                    ...prev,
                    [src]: true,
                },
        );
    };

    // Logic for horizontal scroll spy
    useEffect(() => {
        const scroller = projectsScrollerRef.current;
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
            setActiveProjectIndex(closestIndex);
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

    // Keyboard controls for gallery (Esc to close, arrows to navigate)
    useEffect(() => {
        if (selectedIndex === null) {
            document.body.style.overflow = "";
            return;
        }

        lastFocusedRef.current =
            document.activeElement instanceof HTMLElement
                ? document.activeElement
                : null;
        document.body.style.overflow = "hidden";
        closeButtonRef.current?.focus();

        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedIndex(null);
            } else if (event.key === "ArrowRight") {
                setSelectedIndex(
                    (selectedIndex + 1) % projectImages.length,
                );
            } else if (event.key === "ArrowLeft") {
                setSelectedIndex(
                    (selectedIndex - 1 + projectImages.length) % projectImages.length,
                );
            } else if (event.key === "Tab") {
                const modal = modalRef.current;
                if (!modal) return;
                const focusable = Array.from(
                    modal.querySelectorAll<HTMLElement>(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
                    ),
                ).filter((element) => !element.hasAttribute("disabled"));
                if (focusable.length === 0) {
                    event.preventDefault();
                    return;
                }
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => {
            window.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
            lastFocusedRef.current?.focus();
        };
    }, [selectedIndex, setSelectedIndex]);

    return (
        <>
            <section id="projects" className="mt-16 space-y-6 lg:mt-24">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
                            {tradeConfig.projectsSection.eyebrow}
                        </p>
                        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                            {tradeConfig.projectsSection.title}
                        </h2>
                    </div>
                    <p className="max-w-xl text-sm text-slate-300">
                        {tradeConfig.projectsSection.description}
                    </p>
                </div>

                <div
                    ref={projectsScrollerRef}
                    className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory md:mx-0 md:grid md:gap-4 md:overflow-visible md:px-0 md:pb-0 md:grid-cols-3 md:auto-rows-[120px] lg:grid-cols-4 lg:auto-rows-[140px]"
                >
                    {projectImages.slice(0, 6).map((src, index) => (
                        <button
                            key={src}
                            type="button"
                            onClick={() => setSelectedIndex(index)}
                            ref={(node) => {
                                projectCardRefs.current[index] = node;
                            }}
                            className={`group relative min-w-[78%] snap-start overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 focus:outline-none focus:ring-2 focus:ring-sky-500/70 sm:min-w-[60%] md:min-w-0 ${index === 0
                                ? "md:col-span-2 md:row-span-2 lg:row-span-3"
                                : index === 3
                                    ? "md:row-span-2"
                                    : "md:row-span-1"
                                }`}
                        >
                            {!loadedProjectImages[src] && (
                                <div
                                    className="absolute inset-0 flex items-center justify-center bg-slate-800/70"
                                    aria-hidden="true"
                                >
                                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-600/80 bg-slate-900/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-100">
                                        {tradeConfig.brand.shortName}
                                        <span className="h-1 w-1 rounded-full bg-sky-400" />
                                        Loading
                                    </span>
                                </div>
                            )}
                            <Image
                                src={src}
                                alt={`${tradeConfig.brand.name} project photo`}
                                width={1200}
                                height={900}
                                onLoad={() => markProjectImageLoaded(src)}
                                className={`h-full w-full object-cover transition duration-300 group-hover:scale-[1.04] ${loadedProjectImages[src] ? "opacity-100" : "opacity-0"
                                    }`}
                                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 80vw"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-90 transition group-hover:opacity-100" />
                            <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-100">
                                {tradeConfig.projectsSection.projectLabel}
                                <span className="h-1 w-1 rounded-full bg-sky-400" />
                                {tradeConfig.projectsSection.projectView}
                            </div>
                        </button>
                    ))}
                </div>
                <div className="mt-4 flex justify-center gap-2 md:hidden">
                    {projectImages.slice(0, 6).map((src, index) => (
                        <button
                            key={src}
                            type="button"
                            onClick={() => {
                                const card = projectCardRefs.current[index];
                                card?.scrollIntoView({
                                    behavior: "smooth",
                                    inline: "center",
                                    block: "nearest",
                                });
                            }}
                            className={`h-2 w-2 rounded-full ${index === activeProjectIndex
                                ? "bg-sky-400"
                                : "bg-slate-700"
                                }`}
                            aria-label={`Go to project ${index + 1}`}
                        />
                    ))}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{projectImages.length} project photos</span>
                    <button
                        type="button"
                        onClick={() => setSelectedIndex(0)}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-100 transition hover:border-sky-400 hover:text-sky-300"
                    >
                        {tradeConfig.projectsSection.viewFullGallery}
                        <span aria-hidden="true">→</span>
                    </button>
                </div>
            </section>

            {/* Modal */}
            {selectedIndex !== null && (
                <div
                    className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 px-4"
                    onClick={() => setSelectedIndex(null)}
                >
                    <div
                        className="relative max-h-[90vh] w-full max-w-5xl"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Project gallery"
                        ref={modalRef}
                    >
                        {/* Overlaid arrows on the image */}
                        <button
                            type="button"
                            onClick={() =>
                                setSelectedIndex(
                                    (selectedIndex - 1 + projectImages.length) % projectImages.length,
                                )
                            }
                            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-black/70 text-lg text-slate-100 shadow-md hover:bg-black"
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                setSelectedIndex(
                                    (selectedIndex + 1) % projectImages.length,
                                )
                            }
                            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-black/70 text-lg text-slate-100 shadow-md hover:bg-black"
                        >
                            ›
                        </button>

                        <div className="relative">
                            {/* Top controls: counter + close */}
                            <div className="absolute left-3 top-3 z-20 flex items-center gap-2 text-xs text-slate-200">
                                <span className="rounded-full bg-black/70 px-2 py-1 text-[11px] font-medium">
                                    {selectedIndex + 1} / {projectImages.length}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedIndex(null)}
                                className="absolute right-3 top-3 z-20 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-slate-100 shadow-md hover:bg-black"
                                ref={closeButtonRef}
                            >
                                Close
                            </button>
                            <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-black">
                                {!loadedProjectImages[projectImages[selectedIndex]] && (
                                    <div
                                        className="absolute inset-0 flex items-center justify-center bg-slate-800/70"
                                        aria-hidden="true"
                                    >
                                        <span className="inline-flex items-center gap-2 rounded-full border border-slate-600/80 bg-slate-900/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-100">
                                            {tradeConfig.brand.shortName}
                                            <span className="h-1 w-1 rounded-full bg-sky-400" />
                                            Loading
                                        </span>
                                    </div>
                                )}
                                <Image
                                    src={projectImages[selectedIndex]}
                                    alt="Expanded project photo"
                                    width={1600}
                                    height={1200}
                                    onLoad={() =>
                                        markProjectImageLoaded(projectImages[selectedIndex])
                                    }
                                    className={`max-h-[80vh] w-full object-contain transition-opacity duration-300 ${loadedProjectImages[projectImages[selectedIndex]]
                                        ? "opacity-100"
                                        : "opacity-0"
                                        }`}
                                    sizes="(min-width: 1024px) 900px, 90vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
