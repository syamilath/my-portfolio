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

  // Fallback to native smooth scroll - works on all devices
  const startPosition = window.scrollY;
  const targetPosition = element.getBoundingClientRect().top + window.scrollY;
  const distance = targetPosition - startPosition;
  const duration = opts.duration || 1000;
  let start = null;

  // Use requestAnimationFrame for smooth animation
  const animation = (currentTime) => {
    if (start === null) start = currentTime;
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth scroll
    const easeInOutQuad = progress < 0.5 ? 
      2 * progress * progress : 
      -1 + (4 - 2 * progress) * progress;
    
    window.scrollTo(0, startPosition + distance * easeInOutQuad);
    
    if (progress < 1) {
      requestAnimationFrame(animation);
    } else {
      if (opts.onComplete) opts.onComplete();
    }
  };

  requestAnimationFrame(animation);
}
