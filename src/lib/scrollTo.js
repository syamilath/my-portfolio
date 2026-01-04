// Helper to scroll to a target section, supporting GSAP ScrollSmoother when present
export default function scrollToSection(sectionId, opts = {}) {
  if (typeof window === "undefined") return;

  const element = document.getElementById(sectionId);
  if (!element) return;

  // Detect mobile
  const isMobile = window.innerWidth < 768;
  
  // Jika desktop, gunakan GSAP ScrollSmoother (desktop smooth scroll handling)
  try {
    const smoother = window.__gsap_smoother;
    if (smoother && typeof smoother.scrollTo === "function" && !isMobile) {
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

  // Fallback to custom animation (untuk mobile terutama)
  const startPos = window.scrollY || document.documentElement.scrollTop;
  const targetPos = element.getBoundingClientRect().top + startPos;
  const distance = targetPos - startPos;
  
  // Duration lebih panjang untuk mobile (2000ms), normal untuk desktop (800ms)
  const defaultDuration = isMobile ? 2000 : 800;
  const duration = opts.duration || defaultDuration;
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

  // Gunakan custom animation untuk smooth yang lebih baik
  requestAnimationFrame(animateScroll);
  
  if (opts.onComplete) {
    const estimatedDuration = opts.duration || defaultDuration;
    setTimeout(opts.onComplete, estimatedDuration);
  }
}
