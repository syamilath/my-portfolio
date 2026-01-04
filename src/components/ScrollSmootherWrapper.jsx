"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function ScrollSmootherWrapper({ children }) {
  const smootherRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Hanya aktif di browser
    if (typeof window === "undefined") return;

    // Check if mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      return mobile;
    };

    const mobile = checkMobile();
    window.addEventListener("resize", checkMobile);

    // Enable scroll-behavior: smooth di CSS untuk native smooth scroll
    document.documentElement.style.scrollBehavior = "smooth";

    // Hanya gunakan ScrollSmoother di desktop
    if (!mobile && !smootherRef.current) {
      try {
        smootherRef.current = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.5, // kehalusan scroll
          effects: true, // aktifkan parallax
        });
        // expose smoother to global so other components can use its methods
        window.__gsap_smoother = smootherRef.current;
      } catch (e) {
        // ignore
      }
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      if (smootherRef.current && !mobile) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
      try {
        window.__gsap_smoother = null;
      } catch (e) {
        // ignore
      }
    };
  }, [isMobile]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
