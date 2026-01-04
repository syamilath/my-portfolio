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

  // Fallback to native smooth scroll dengan custom animation untuk smooth lebih baik
  const startPos = window.scrollY || document.documentElement.scrollTop;
  const targetPos = element.getBoundingClientRect().top + startPos;
  const distance = targetPos - startPos;
  const duration = opts.duration || 1500; // Increased dari 1000 menjadi 1500ms
  const startTime = performance.now();

  function easeInOutCubic(t) {
    // Smooth easing function untuk scroll lebih halus
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easeInOutCubic(progress);
    
    window.scrollTo(0, startPos + distance * easeProgress);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    } else {
      if (opts.onComplete) opts.onComplete();
    }
  }

  try {
    // Coba native smooth scroll dulu
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (e) {
    // Fallback ke custom animation jika native smooth tidak support
    requestAnimationFrame(animateScroll);
  }
  
  if (opts.onComplete) {
    const estimatedDuration = opts.duration || 1500;
    setTimeout(opts.onComplete, estimatedDuration);
  }
}
  }
}
