export type TradeKey =
  | "plumbing"
  | "hvac"
  | "electrician"
  | "roofing"
  | "handyman";

export type ServiceItem = {
  icon: string;
  title: string;
  description: string;
};

export const tradeConfig = {
  trade: "plumbing" as TradeKey,
  brand: {
    name: "Donel & D Plumbing",
    shortName: "Donel & D",
    location: "Naples, Florida",
    phoneDisplay: "(239) 398-0838",
    phoneE164: "+12393980838",
    email: "doneldestine5@gmail.com",
    initials: "D",
    websiteCreditName: "KlickSpark Media",
    websiteCreditUrl: "https://www.klicksparkmedia.com/",
  },
  hero: {
    eyebrow: "Elite Plumbing Services",
    headline: "We deliver elite plumbing services for homes & businesses.",
    descriptionMain:
      "We provide fast, licensed plumbing repairs and installations for homes and businesses in Naples, Marco Island, and Bonita Springs, FL.",
    descriptionSecondary:
      "From leaks and clogs to water heaters and fixture upgrades, we handle residential and light commercial plumbing with clear communication and clean workmanship.",
    badges: [
      "Licensed & Insured",
      "Fast Response Times",
      "Upfront Pricing",
      "Satisfaction Guaranteed",
    ],
    primaryCtaLabel: "Call Now",
    secondaryCtaLabel: "View Services",
  },
  heroCard: {
    imageSrc: "/img/IMG_1870.jpg",
    imageAlt: "Plumber working on residential plumbing system",
    sameDayLabel: "Same-Day Service",
    sameDayNote: "When Available",
    directLineLabel: "Direct Line",
    emergencyNote:
      "For plumbing emergencies or urgent issues, tap to call now.",
  },
  stats: [
    { label: "Response", value: "Fast Scheduling" },
    { label: "Service Area", value: "Naples, Marco Island & Bonita Springs" },
    { label: "Licensed", value: "& Insured" },
  ],
  servicesSection: {
    eyebrow: "Services",
    title: "Plumbing services for every type of issue.",
    description:
      "From common clogs and leaks to full mainline replacements, we handle residential and light commercial plumbing with care and precision.",
    footerLeft: "Residential & Commercial",
    footerBadge: "Licensed & Insured",
  },
  services: [
    {
      icon: "SR",
      title: "Service & Repair",
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
  ],
  whySection: {
    eyebrow: "Why Choose Us",
    title: "Premium service, fast response, and clean workmanship.",
    description:
      "We treat every job like it's our own home. Expect clear communication, respectful technicians, and fixes that last.",
    cards: [
      {
        icon: "$",
        title: "Upfront Pricing",
        description: "Know the full cost before we begin. No surprises at the end.",
      },
      {
        icon: "✓",
        title: "Clean Worksites",
        description: "We protect your home, wear shoe covers, and clean up fully.",
      },
      {
        icon: "★",
        title: "Quality Materials",
        description: "We install reliable, proven brands built to last.",
      },
      {
        icon: "N",
        title: "Local & Family-Owned",
        description: "Proudly serving Naples, Marco Island, and Bonita Springs with honest, neighborly service.",
      },
    ],
    aside: {
      eyebrow: "Fast Help",
      title: "Need plumbing help today?",
      description:
        "Share a few details and we'll follow up with the next available appointment.",
      badge: "Response in 24h",
      formPrivacy: "We respect your privacy. No spam.",
      submitIdle: "Request A Call Back",
      submitLoading: "Sending...",
      successMsg:
        "Thanks! Your request is in. We'll call you within 24 hours to schedule.",
    },
  },
  projectsSection: {
    eyebrow: "Projects",
    title: "Recent plumbing work.",
    description:
      "A snapshot of the type of projects we handle every week across Naples and the surrounding area.",
    projectLabel: "Project",
    projectView: "View",
    viewFullGallery: "View Full Gallery",
  },
  testimonialsSection: {
    eyebrow: "Testimonials",
    title: "Trusted by homeowners in Naples.",
    description: "Clear communication, fair pricing, and reliable workmanship.",
    items: [
      {
        name: "Kelli Ungs",
        quote: "Great work professional efficient work.",
        meta: "Local Guide · 300 reviews",
      },
      {
        name: "Stuart H.",
        quote:
          "This was a complicated job and he had to break into the concrete floor to install some of the pipes. Everything has gone well.",
        meta: "Verified Review",
      },
    ],
  },
  chat: {
    storageKey: "donel-chat-messages",
  },
  footer: {
    eyebrow: "Contact",
    headline: "Get in touch with Donel & D Plumbing.",
    description:
      "Complete the form above or reach out directly using the details below and let us know how we can assist with your plumbing needs.",
    serviceAreaLabel: "Service area",
    hoursTitle: "Hours",
    hoursLine1: "Monday – Saturday: 8:00 AM – 6:00 PM",
    hoursLine2: "Emergency service available after hours.",
    licenseNote:
      "Licensed and insured plumbing contractor. Serving homeowners and businesses throughout Naples, Marco Island, and Bonita Springs, FL.",
    mapTitle: "Service map",
    mapQuery: "Naples,+Marco+Island,+Bonita+Springs,+FL",
    footerLinks: [
      { label: "Services", href: "#services" },
      { label: "Projects", href: "#projects" },
      { label: "Reviews", href: "#reviews" },
      { label: "Contact", href: "#contact" },
    ],
    copyrightSuffix: "All rights reserved. Built & designed by",
  },
} as const;
