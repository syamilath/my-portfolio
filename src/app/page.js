"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Achievement from "@/components/Achievement";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import ExpertiseSection from "@/components/Expertise";
import ScrollSmootherWrapper from "@/components/ScrollSmootherWrapper";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <main className="min-h-screen bg-[#0D0D0D]">
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <ScrollSmootherWrapper>
        <div className="space-y-20 bg-black bg-fixed">

          <div id="home">
            <Hero setActiveSection={setActiveSection} />
          </div>

          <div id="about">
            <About />
            <ExpertiseSection />
          </div>

          <div id="achievement">
            <Achievement />
          </div>

          <div id="projects">
            <Projects />
          </div>

          <div id="contact">
            <Contact />
          </div>

        </div>
      </ScrollSmootherWrapper>
    </main>
  );
}
