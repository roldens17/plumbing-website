"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ProjectsGallery } from "@/components/home/ProjectsGallery";
import { Testimonials } from "@/components/home/Testimonials";
import { ChatWidget } from "@/components/shared/ChatWidget";

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Header selectedIndex={selectedIndex} />

      <main
        className="mx-auto max-w-6xl px-4 pb-16 pt-10 lg:px-8 lg:pb-24 lg:pt-16"
        aria-hidden={selectedIndex !== null}
      >
        <Hero />
        <Services />
        <WhyChooseUs />
        <ProjectsGallery
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <Testimonials />
        <Footer />
      </main>

      <ChatWidget />
    </div>
  );
}
