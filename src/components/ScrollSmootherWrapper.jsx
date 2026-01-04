"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function ScrollSmootherWrapper({ children }) {
  const smootherRef = useRef(null);

  useEffect(() => {
    // Hanya aktif di browser
    if (typeof window === "undefined") return;

    if (!smootherRef.current) {
      smootherRef.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5, // kehalusan scroll
        effects: true, // aktifkan parallax
      });
      // expose smoother to global so other components can use its methods
      try {
        window.__gsap_smoother = smootherRef.current;
      } catch (e) {
        // ignore when running in environments without window
      }
    }

    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
        try {
          window.__gsap_smoother = null;
        } catch (e) {
          // ignore when running in environments without window
        }
      }
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
