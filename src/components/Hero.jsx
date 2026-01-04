"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import dynamic from 'next/dynamic';
import scrollToSection from "@/lib/scrollTo";

// Load LightRays only on the client to avoid SSR/client DOM mismatches
const LightRays = dynamic(() => import('./LightRays'), { ssr: false });

const Hero = ({ setActiveSection }) => {
  const containerRef = useRef(null);

  const handleNavClick = (item) => {
    const sectionId = item.toLowerCase().replace(" ", "-");
    setActiveSection(sectionId);
    scrollToSection(sectionId, { onComplete: () => setActiveSection(sectionId) });
  };

  useEffect(() => {
    const container = containerRef.current;

    // Ambil semua elemen teks di dalam container (h1 dan h2)
    const texts = container.querySelectorAll(".animate-text");

    // Pecah setiap teks menjadi <span> per kata
    texts.forEach((textEl) => {
      const words = textEl.innerText.split(" ");
      textEl.innerHTML = words
        .map(
          (word) => `<span class="inline-block opacity-0 translate-y-6">${word}</span>`
        )
        .join(" ");
    });

    // Ambil semua span dari kedua teks
    const spans = container.querySelectorAll("span");

    // Animasi GSAP per kata
    gsap.to(spans, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.3, // jarak waktu antar kata
      ease: "power3.out",
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden bg-black " style={{ perspective: "1000px" }}>
      {/* === BACKGROUND EFFECT === */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.5}
          lightSpread={2}
          rayLength={1}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays w-full h-full"
        />
      </div>

      {/* === MAIN CONTENT === */}
      <div
        ref={containerRef}
        className="relative z-10 container mx-auto text-center"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {/* JUDUL */}
          <h1 className="animate-text text-5xl md:text-7xl font-bold text-[#C3874C] mb-1">
            <span className="text-[#C3874C]">Syamil Athalla Rahman</span>
          </h1>

          {/* SUB JUDUL */}
          <h2 className="animate-text text-3xl md:text-6xl font-bold text-white mb-10">
            a Cyber Enthusiast and Programmer
          </h2>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-4">
            <button onClick={() => handleNavClick("Projects")} className="w-full sm:w-auto bg-[#C3874C] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-medium hover:bg-[#B27642] transition-colors shadow-lg hover:scale-[1.02] transition-transform duration-300">
              View Project
            </button>

            <button onClick={() => handleNavClick("About")} className="group relative w-full sm:w-auto overflow-hidden bg-white/10 backdrop-blur-2xl text-[#fff] px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-medium transition-all duration-300 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.3)] hover:scale-[1.02]">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
              <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/10 to-transparent rounded-full" />
              <span className="relative z-10 drop-shadow-sm text-[#c3874c]" >Get Started Now</span>
            </button>
          </div>

          {/* DESKRIPSI */}
          <div className="mt-12">
            <p className="text-white text-lg mb-8">
              Passionate about cybersecurity and software development
            </p>
            <div className="flex justify-center items-center gap-6">
              {/* Social Links bisa ditaruh di sini */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
