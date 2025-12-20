"use client";

import Image from "next/image";
import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";

const projectImages = [
  "/project1.png",
  "/project2.png",
  "/project%203.png",
  "/project4.png",
  "/project5.png",
  "/project6.png",
] as const;

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const servicesScrollerRef = useRef<HTMLDivElement | null>(null);
  const projectsScrollerRef = useRef<HTMLDivElement | null>(null);
  const serviceCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const projectCardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
    setMessages,
  } = useChat({
    api: "/api/chat",
    streamProtocol: "text",
    initialMessages: [],
  });

  useEffect(() => {
    const stored = localStorage.getItem("donel-chat-messages");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      } catch {
        // fall through to seed message
      }
    }
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hello, how can Donel plumbing help you?",
        parts: [],
      },
    ]);
  }, [setMessages]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("donel-chat-messages", JSON.stringify(messages));
    }
  }, [messages]);

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
          (prev) =>
            prev === null
              ? null
              : (prev + 1) % projectImages.length,
        );
      } else if (event.key === "ArrowLeft") {
        setSelectedIndex(
          (prev) =>
            prev === null
              ? null
              : (prev - 1 + projectImages.length) % projectImages.length,
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
  }, [selectedIndex]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

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

  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const services = [
    {
      icon: "SR",
      title: "Service &amp; Repair",
      description:
        "Diagnosis and repair of leaks, clogs, low water pressure, and other plumbing issues.",
    },
    {
      icon: "FI",
      title: "Faucet Installation",
      description:
        "Upgrade kitchens and bathrooms with modern, efficient fixtures installed correctly.",
    },
    {
      icon: "SH",
      title: "Shower Repair",
      description:
        "Fix dripping showers, inconsistent temperatures, and low flow problems.",
    },
    {
      icon: "WH",
      title: "Water Heater",
      description:
        "Repair and replacement for tank and tankless water heaters to keep hot water flowing.",
    },
    {
      icon: "TR",
      title: "Toilet Repair",
      description:
        "Resolve running, clogged, or leaking toilets with long-lasting solutions.",
    },
    {
      icon: "WD",
      title: "Waste Disposal",
      description:
        "Garbage disposal installation, repair, and replacement for kitchens of any size.",
    },
  ];
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Top bar */}
      <header
        className="border-b border-slate-800 bg-slate-950/95 backdrop-blur"
        aria-hidden={selectedIndex !== null}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-lg font-bold text-slate-950">
              D
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">
                Donel &amp; D Plumbing
              </p>
              <p className="text-xs text-slate-400">Naples, Florida</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <a href="tel:12393980838" className="hidden text-slate-300 sm:inline">
              Call: 239-398-0838
            </a>
            <a
              href="tel:12393980838"
              className="rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-950 shadow-sm shadow-sky-500/40 transition hover:bg-sky-400"
            >
              Call Now
            </a>
          </div>
        </div>
      </header>

      <main
        className="mx-auto max-w-6xl px-4 pb-16 pt-10 lg:px-8 lg:pb-24 lg:pt-16"
        aria-hidden={selectedIndex !== null}
      >
        {/* Hero */}
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
              Elite Plumbing Services
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              We deliver elite plumbing services for homes &amp; businesses.
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              At Donel &amp; D we install, repair, and maintain pipes, valves,
              fittings, drainage systems, and fixtures in commercial and
              residential structures. We collaborate with general contractors,
              electricians, and other construction professionals, follow
              building plans and blueprints, and respond to diagnose and
              resolve plumbing emergencies.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="rounded-full bg-sky-500 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-slate-950 shadow-md shadow-sky-500/40 transition hover:bg-sky-400"
              >
                Get A Quote
              </a>
              <a
                href="#services"
                className="rounded-full border border-slate-600 px-6 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-sky-400 hover:text-sky-300"
              >
                View Services
              </a>
            </div>
            <div className="flex flex-wrap gap-3 pt-2 text-xs text-slate-300 sm:text-sm">
              {[
                "Licensed & Insured",
                "Fast Response Times",
                "Upfront Pricing",
                "Satisfaction Guaranteed",
              ].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-200"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl shadow-sky-950/40">
            <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950">
              <Image
                src="/project4.png"
                alt="Plumber working on residential plumbing system"
                width={900}
                height={600}
                className="h-52 w-full object-cover"
                sizes="(min-width: 1024px) 480px, 100vw"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-slate-950/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-100">
                Same-Day Service
                <span className="h-1 w-1 rounded-full bg-sky-400" />
                When Available
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: "Response", value: "Fast Scheduling" },
                { label: "Service Area", value: "Naples, FL" },
                { label: "Licensed", value: "& Insured" },
              ].map((stat) => (
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
                    Direct Line
                  </p>
                  <a
                    href="tel:12393980838"
                    className="text-sm font-semibold text-slate-50"
                  >
                    (239) 398-0838
                  </a>
                </div>
                <a
                  href="mailto:doneldestine5@gmail.com"
                  className="text-[11px] text-slate-400 hover:text-sky-300"
                >
                  doneldestine5@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mt-16 space-y-8 lg:mt-24">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
                Services
              </p>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Plumbing services for every type of issue.
              </h2>
            </div>
            <p className="max-w-xl text-sm text-slate-300">
              From common clogs and leaks to full mainline replacements, we
              handle residential and light commercial plumbing with care and
              precision.
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
                  <span>Residential &amp; Commercial</span>
                  <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] uppercase tracking-wide text-sky-300">
                    Licensed &amp; Insured
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
                className={`h-2 w-2 rounded-full ${
                  index === activeServiceIndex
                    ? "bg-sky-400"
                    : "bg-slate-700"
                }`}
                aria-label={`Go to ${service.title}`}
              />
            ))}
          </div>
        </section>

        {/* Why choose us */}
        <section className="mt-16 space-y-8 lg:mt-24">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
                Why Choose Us
              </p>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Premium service, fast response, and clean workmanship.
              </h2>
              <p className="text-sm text-slate-300">
                We treat every job like it&apos;s our own home. Expect clear
                communication, respectful technicians, and fixes that last.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Upfront Pricing",
                    description:
                      "Know the full cost before we begin. No surprises at the end.",
                    icon: "$",
                  },
                  {
                    title: "Clean Worksites",
                    description:
                      "We protect your home, wear shoe covers, and clean up fully.",
                    icon: "✓",
                  },
                  {
                    title: "Quality Materials",
                    description:
                      "We install reliable, proven brands built to last.",
                    icon: "★",
                  },
                  {
                    title: "Local & Family-Owned",
                    description:
                      "Proudly serving Naples with honest, neighborly service.",
                    icon: "N",
                  },
                ].map((item, index) => (
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

            <div
              className="animate-fadeUp rounded-3xl border border-slate-800 bg-slate-950/80 p-6"
              style={{ animationDelay: "80ms" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
                    Fast Help
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-50">
                    Need plumbing help today?
                  </h3>
                  <p className="mt-2 text-xs text-slate-300">
                    Share a few details and we&apos;ll follow up with the next
                    available appointment.
                  </p>
                </div>
                <div className="hidden rounded-2xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-slate-300 sm:block">
                  Response in 24h
                </div>
              </div>

              <form className="mt-5 space-y-3 text-xs">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="block text-[11px] text-slate-300">
                      Name
                    </label>
                    <input
                      type="text"
                      className="h-9 w-full rounded-md border border-slate-700 bg-slate-950 px-3 text-xs text-slate-100 outline-none ring-sky-500/60 focus:border-sky-400 focus:ring-1"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] text-slate-300">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="h-9 w-full rounded-md border border-slate-700 bg-slate-950 px-3 text-xs text-slate-100 outline-none ring-sky-500/60 focus:border-sky-400 focus:ring-1"
                      placeholder="(239) 398-0838"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] text-slate-300">
                    How can we help?
                  </label>
                  <textarea
                    rows={3}
                    className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none ring-sky-500/60 focus:border-sky-400 focus:ring-1"
                    placeholder="Tell us about your plumbing issue, project, or renovation."
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-sky-500 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-950 shadow-md shadow-sky-500/40 transition hover:bg-sky-400 sm:w-auto"
                  >
                    Request A Call Back
                  </button>
                  <p className="text-[10px] text-slate-500">
                    We respect your privacy. No spam.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Projects / Recent work */}
        <section className="mt-16 space-y-6 lg:mt-24">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
                Projects
              </p>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Recent plumbing work.
              </h2>
            </div>
            <p className="max-w-xl text-sm text-slate-300">
              A snapshot of the type of projects we handle every week across
              Naples and the surrounding area.
            </p>
          </div>

          <div
            ref={projectsScrollerRef}
            className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory md:mx-0 md:grid md:gap-4 md:overflow-visible md:px-0 md:pb-0 md:grid-cols-3 md:auto-rows-[120px] lg:grid-cols-4 lg:auto-rows-[140px]"
          >
            {projectImages.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setSelectedIndex(index)}
                ref={(node) => {
                  projectCardRefs.current[index] = node;
                }}
                className={`group relative min-w-[78%] snap-start overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 focus:outline-none focus:ring-2 focus:ring-sky-500/70 sm:min-w-[60%] md:min-w-0 ${
                  index === 0
                    ? "md:col-span-2 md:row-span-2 lg:row-span-3"
                    : index === 3
                      ? "md:row-span-2"
                      : "md:row-span-1"
                }`}
              >
                <Image
                  src={src}
                  alt="Donel & D Plumbing project photo"
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 80vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-90 transition group-hover:opacity-100" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-100">
                  Project
                  <span className="h-1 w-1 rounded-full bg-sky-400" />
                  View
                </div>
              </button>
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-2 md:hidden">
            {projectImages.map((src, index) => (
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
                className={`h-2 w-2 rounded-full ${
                  index === activeProjectIndex
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
              View Full Gallery
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-16 space-y-6 lg:mt-24">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
                Testimonials
              </p>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Trusted by homeowners in Naples.
              </h2>
            </div>
            <p className="max-w-xl text-sm text-slate-300">
              Clear communication, fair pricing, and reliable workmanship.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                name: "Kelli Ungs",
                quote:
                  "Great work professional efficient work.",
                meta: "Local Guide · 300 reviews",
              },
              {
                name: "Stuart H.",
                quote:
                  "This was a complicated job and he had to break into the concrete floor to install some of the pipes. Everything has gone well.",
                meta: "Verified Review",
              },
            ].map((item) => (
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

        {/* Contact / Footer */}
        <section
          id="contact"
          className="mt-16 rounded-3xl border border-slate-800 bg-slate-950/80 p-6 lg:mt-24 lg:p-8"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
                Contact
              </p>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Get in touch with Donel &amp; D Plumbing.
              </h2>
              <p className="text-sm text-slate-300">
                Complete the form above or reach out directly using the
                details below and let us know how we can assist with your
                plumbing needs.
              </p>
              <dl className="space-y-3 text-sm text-slate-200">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Area
                  </dt>
                  <dd>Naples, Florida</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Email
                  </dt>
                  <dd>
                    <a
                      href="mailto:doneldestine5@gmail.com"
                      className="hover:text-sky-300"
                    >
                      doneldestine5@gmail.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Phone
                  </dt>
                  <dd>
                    <a href="tel:12393980838" className="hover:text-sky-300">
                      +1 (239) 398-0838
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-xs text-slate-300">
              <p className="font-semibold text-slate-100">Hours</p>
              <p>Monday – Saturday: 8:00 AM – 6:00 PM</p>
              <p>Emergency service available after hours.</p>
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60">
                <iframe
                  title="Donel & D Plumbing service area map"
                  src="https://www.google.com/maps?q=Naples,+FL&output=embed"
                  className="h-40 w-full"
                  loading="lazy"
                />
              </div>
              <p className="pt-2 text-[11px] text-slate-500">
                © {new Date().getFullYear()} Donel &amp; D Plumbing. All rights
                reserved.
              </p>
              <p className="text-[11px] text-slate-500">
                Licensed and insured plumbing contractor. Serving homeowners
                and businesses throughout Naples, FL.
              </p>
            </div>
          </div>
        </section>
      </main>

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
                  (prev) =>
                    prev === null
                      ? null
                      : (prev - 1 + projectImages.length) % projectImages.length,
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
                  (prev) =>
                    prev === null
                      ? null
                      : (prev + 1) % projectImages.length,
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
              <div className="overflow-hidden rounded-2xl border border-slate-700 bg-black">
                <Image
                  src={projectImages[selectedIndex]}
                  alt="Expanded project photo"
                  width={1600}
                  height={1200}
                  className="max-h-[80vh] w-full object-contain"
                  sizes="(min-width: 1024px) 900px, 90vw"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {isChatOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px] sm:items-end sm:justify-end sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Ask AI chat"
          onClick={() => setIsChatOpen(false)}
        >
          <div
            className="flex max-h-[85vh] w-full max-w-[92vw] animate-[chatSlideIn_260ms_ease-out] flex-col overflow-hidden rounded-3xl bg-slate-950 text-slate-50 shadow-2xl sm:max-h-[80vh] sm:max-w-sm sm:animate-[chatSlideInRight_260ms_ease-out]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-sky-500 px-5 py-4 text-slate-950">
              <div>
                <p className="text-sm font-semibold">Ask Donel</p>
                <p className="text-[11px] text-slate-900/80">
                  Donel &amp; D Plumbing
                </p>
              </div>
              <button
                type="button"
                className="rounded-full p-1 text-slate-950/80 transition hover:text-slate-950"
                onClick={() => setIsChatOpen(false)}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto bg-slate-950 px-5 py-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-lg text-slate-950">
                  D
                </div>
                <div className="rounded-2xl bg-slate-900 px-4 py-3 text-sm text-slate-100">
                  👋 Hi! I&apos;m Donel&apos;s AI assistant. Ask me anything about
                  your plumbing issue.
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                {[
                  "What should I do for a leaking faucet?",
                  "Do I need a tank or tankless heater?",
                  "How do I handle a burst pipe?",
                  "I have a different question",
                ].map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() =>
                      append({ role: "user", content: label, parts: [] })
                    }
                    className="rounded-full border border-sky-500 px-4 py-2 text-xs font-semibold text-sky-300 transition hover:bg-slate-900"
                  >
                    {label}
                  </button>
                ))}
              </div>

              <a
                href="tel:12393980838"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-950 shadow-sm transition hover:bg-sky-400"
              >
                Call now
              </a>

              <div className="max-h-64 space-y-3 overflow-y-auto pr-1 text-sm">
                {messages.map((message) => {
                  const text = message.parts
                    .filter((part) => part.type === "text")
                    .map((part) => part.text)
                    .join("");
                  const content =
                    text ||
                    ("content" in message && typeof message.content === "string"
                      ? message.content
                      : "");
                  return (
                    <div
                      key={message.id}
                      className={
                        message.role === "user"
                          ? "ml-auto w-fit max-w-[85%] rounded-2xl bg-sky-500 px-4 py-2 text-slate-950"
                          : "w-fit max-w-[85%] rounded-2xl bg-slate-900 px-4 py-2 text-slate-100"
                      }
                    >
                      <p className="whitespace-pre-wrap">{content}</p>
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-slate-800 bg-slate-950 px-4 py-3"
            >
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Type and press [enter]..."
                className="h-11 flex-1 rounded-full border border-slate-800 bg-slate-900 px-4 text-sm text-slate-100 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-500/40"
              />
              <button
                type="submit"
                disabled={isLoading || input.trim().length === 0}
                className="rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-950 shadow-sm transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
      {!isChatOpen && (
        <a
          href="#assistant"
          onClick={(event) => {
            event.preventDefault();
            setIsChatOpen(true);
          }}
          className="group fixed bottom-6 right-6 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-sky-500 bg-sky-500 text-slate-950 shadow-lg shadow-sky-900/40 transition hover:bg-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          aria-label="Ask Donel"
        >
          <span
            className="text-[11px] font-bold uppercase tracking-[0.12em]"
            aria-hidden="true"
          >
            AI
          </span>
          <span className="sr-only">Ask Donel</span>
          <span className="pointer-events-none absolute bottom-14 right-0 hidden whitespace-nowrap rounded-full bg-slate-950 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-100 shadow-md sm:inline-flex sm:opacity-0 sm:transition sm:group-hover:opacity-100">
            Ask Donel
          </span>
        </a>
      )}
    </div>
  );
}
