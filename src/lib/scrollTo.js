// Helper to scroll to a target section, supporting GSAP ScrollSmoother when present
export default function scrollToSection(sectionId, opts = {}) {
  if (typeof window === "undefined") return;

  const element = document.getElementById(sectionId);
  if (!element) return;

  try {
    const smoother = window.__gsap_smoother;
    if (smoother && typeof smoother.scrollTo === "function") {
      // ScrollSmoother prefers targets (selector or element)
      smoother.scrollTo(element, {
        // let ScrollSmoother control easing; allow optional callback
        onComplete: () => {
          if (opts.onComplete) opts.onComplete();
        },
      });
      return;
    }
  } catch (e) {
    // ignore and fall back
  }

  // Fallback to native smooth scroll - dengan polyfill untuk browser yang tidak support
  try {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (e) {
    // Fallback untuk browser yang tidak support smooth scroll
    element.scrollIntoView({ block: "start" });
  }
  
  if (opts.onComplete) {
    // Estimate duration dan call onComplete after delay
    const estimatedDuration = opts.duration || 1000;
    setTimeout(opts.onComplete, estimatedDuration);
  }
}
