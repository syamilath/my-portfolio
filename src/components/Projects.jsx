import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "motion/react";
import { X } from "lucide-react";

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

function ProjectCard({
  title,
  subtitle,
  image,
  color = "#C3874C",
  description,
  technologies,
  features,
  onClick,
}) {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const glowOpacity = useSpring(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  function handleMouse(e) {
    if (!ref.current || isMobile) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -8;
    const rotationY = (offsetX / (rect.width / 2)) * 8;

    rotateX.set(rotationX);
    rotateY.set(rotationY);
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  function handleMouseEnter() {
    if (isMobile) return;
    scale.set(1.03);
    glowOpacity.set(0.8);
  }

  function handleMouseLeave() {
    glowOpacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div
      className="project-card"
      style={{
        perspective: isMobile ? "none" : "1000px",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (typeof onClick === "function") {
            onClick(e);
          }
        }}
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          scale: isMobile ? 1 : scale,
          transformStyle: isMobile ? "initial" : "preserve-3d",
          position: "relative",
          pointerEvents: "auto",
        }}
        className="relative rounded-3xl overflow-hidden h-[250px] w-full cursor-pointer"
      >
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover opacity-20 filter grayscale"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Liquid Glass Layer */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          {/* Animated Liquid Blob */}
          <motion.div
            className="absolute w-full h-full"
            style={{
              x,
              y,
              background: `radial-gradient(
                500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                rgba(255,255,255,0.10), 
                transparent 60%
              )`,
            }}
          />

          {/* Glass Morphism Layer */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(25px)",
              WebkitBackdropFilter: "blur(25px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          />

          {/* Amber Glow */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: glowOpacity,
              background:
                "radial-gradient(circle at 70% 30%, rgba(195, 135, 76, 0.25), transparent 70%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-20 p-8 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2 text-white leading-tight">
                {title}
              </h3>
            </div>
            <div className="text-sm font-semibold opacity-70 text-[#C3874C]">
              XYZ
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="text-sm text-white/70">{subtitle}</div>
          </div>
        </div>

        {/* Border Glow */}
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none rounded-3xl"
          style={{
            opacity: glowOpacity,
            boxShadow:
              "0 0 40px rgba(195, 135, 76, 0.4), inset 0 0 30px rgba(195, 135, 76, 0.18)",
          }}
        />
      </motion.div>
    </div>
  );
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const autoSlideIntervalRef = useRef(null);

  // Auto-slide effect
  useEffect(() => {
    if (
      !selectedProject ||
      !selectedProject.images ||
      selectedProject.images.length <= 1
    ) {
      return;
    }

    const startAutoSlide = () => {
      autoSlideIntervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) =>
          prev === selectedProject.images.length - 1 ? 0 : prev + 1
        );
      }, 3000); // Auto-slide setiap 4 detik
    };

    startAutoSlide();

    return () => {
      if (autoSlideIntervalRef.current) {
        clearInterval(autoSlideIntervalRef.current);
      }
    };
  }, [selectedProject]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedProject.images.length - 1 : prev - 1
    );
    // Reset interval saat user manual navigate
    if (autoSlideIntervalRef.current) {
      clearInterval(autoSlideIntervalRef.current);
    }
    autoSlideIntervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }, 4000);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === selectedProject.images.length - 1 ? 0 : prev + 1
    );
    // Reset interval saat user manual navigate
    if (autoSlideIntervalRef.current) {
      clearInterval(autoSlideIntervalRef.current);
    }
    autoSlideIntervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }, 4000);
  };

  const handleDotClick = (idx) => {
    setCurrentImageIndex(idx);
    // Reset interval saat user klik dot
    if (autoSlideIntervalRef.current) {
      clearInterval(autoSlideIntervalRef.current);
    }
    autoSlideIntervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }, 4000);
  };

  const projects = [
    {
      title: "AntaraBogor : Web-Based News Management Platform",
      subtitle: "News Website",
      image: "/project/web_berita/1.png",
      images: [
        "/project/web_berita/1.png",
        "/project/web_berita/2.png",
        "/project/web_berita/3.png",
        "/project/web_berita/4.png",
        "/project/web_berita/5.png",
      ],
     description:
  "AntaraBogor is an integrated digital news platform that combines an easy-to-use content management system with real-time information delivery. Beyond serving as a backend article management tool, the website is designed as a modern public news portal that delivers up-to-date and reliable news to the public through breaking news features and dynamic content categories.",

technologies: ["Next.js", "Node.js", "MySQL", "Tailwind CSS"],

features: [
  "Interactive dashboard for monitoring visitor statistics",
  "Content Management System (CMS) with a rich text editor",
  "Real-time news delivery through a Breaking News feature",
  "Fully responsive design for seamless access across all devices",
],

    },
    {
      title: "Heritage-Shop: A Modern Automotive E-Commerce Solution",
      subtitle: "e-commerce website",
      image:
        "/project/web_ecomerce/1.png",
      images: [
        "/project/web_ecomerce/1.png",
        "/project/web_ecomerce/2.png",
        "/project/web_ecomerce/3.png",
        "/project/web_ecomerce/4.png",
        "/project/web_ecomerce/5.png",
      ],
      description: 
  "Heritage-Shop is a modern automotive e-commerce platform dedicated to motorcycle enthusiasts, seamlessly blending retro aesthetics with a contemporary digital shopping experience. The website serves as both a high-end product showcase and an efficient marketplace, providing users with in-depth technical specifications of vehicle components and a streamlined checkout process for a diverse range of models.",
      technologies: ["Bootstrap", "PHP", "MySQL"],
features: [
  "Interactive product catalog featuring real-time pricing for various motorcycle models",
  "Dynamic 'Future Product' section for upcoming inventory and trend monitoring",
  "Responsive UI/UX optimized for seamless navigation across all digital devices",
],
    },
    {
      title: "Anti-Bobol Server: Advanced Multi-Layered Security Hardening on Ubuntu 22.04",
      subtitle: "Cybersecurity",
      image:
        "/project/server/1.png",
      images: [
        "/project/server/1.png",
        "/project/server/2.png",
        "/project/server/3.png",
        "/project/server/4.png",
        "/project/server/5.png",
        "/project/server/6.png",
        "/project/server/7.png",
      ],
     description: 
  "This project implements a comprehensive 'Defense in Depth' strategy on Ubuntu Server 22.04 to create a high-security environment resistant to Brute Force attacks, web exploits, and Denial of Service (DoS). By layering network filtering, intrusion prevention, and full disk encryption, the system acts as a digital fortress protecting critical data from both remote cyber threats and physical theft.",
technologies: ["Ubuntu Server 22.04 LTS", "Suricata (IDS/IPS)", "Fail2Ban", "UFW Firewall", "LUKS Encryption", "Apache2 (Mod_Evasive)", "SSH-keygen"],
features: [
  "Data Confidentiality: Secured physical data protection using LUKS Full Disk Encryption.",
  "Network Filtering: Implementation of a Stateful Firewall (UFW) that restricts access to essential ports only (80, 443, 2025) while closing standard SSH port 22.",
  "Intrusion Prevention System: Real-time detection and blocking of malicious traffic patterns like SQL Injection and XSS using Suricata.",
  "Automated Ban System: Proactive Brute Force protection via Fail2Ban, which automatically blocks attacking IPs based on system logs.",
  "Web Hardening: DoS mitigation through Mod_Evasive and implementation of Web Security Headers to prevent client-side attacks like Clickjacking.",
],
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4" style={{ background: "black" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ color: "#C3874C" }}
          >
            PROJECT SHOWCASE
          </h1>
          <p className="text-[#fff] text-lg md:text-xl">
            Just a simple example. There are still many things that need to be
            improved.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedProject(project);
                setCurrentImageIndex(0);
              }}
            />
          ))}
        </div>

        {/* Mobile Warning */}
        <div className="mt-12 text-center text-sm text-gray-500 md:hidden">
          Best experienced on desktop for full 3D effect
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-lg p-4"
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="relative w-full max-w-2xl max-h-[85vh] md:max-h-[70vh] overflow-y-auto rounded-3xl"
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {/* Modal Card Background (match ProjectCard) */}

              {/* Border/Glow */}
              {/* <div
                  className="absolute inset-0 z-30 pointer-events-none rounded-3xl"
                  style={{ boxShadow: '0 0 40px rgba(195, 135, 76, 0.4), inset 0 0 30px rgba(195, 135, 76, 0.18)' }}
                /> */}
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 p-2 rounded-full transition-all hover:scale-110"
                style={{ background: "rgba(195, 135, 76, 0.2)" }}
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Hero Image */}
              <div className="relative h-48 md:h-64 lg:h-80 overflow-hidden rounded-t-3xl bg-black">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  <img
                    src={
                      selectedProject.images?.[currentImageIndex] ||
                      selectedProject.image
                    }
                    alt={selectedProject.title}
                    className="w-full h-full object-cover opacity-40"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                {/* Navigation Buttons */}
                {selectedProject.images &&
                  selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full transition-all hover:scale-110"
                        style={{ background: "rgba(195, 135, 76, 0.3)" }}
                      >
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full transition-all hover:scale-110"
                        style={{ background: "rgba(195, 135, 76, 0.3)" }}
                      >
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>

                      {/* Dot Indicators */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                        {selectedProject.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleDotClick(idx)}
                            className="transition-all"
                            style={{
                              width: idx === currentImageIndex ? "24px" : "8px",
                              height: "8px",
                              borderRadius: "4px",
                              background:
                                idx === currentImageIndex
                                  ? "#C3874C"
                                  : "rgba(255,255,255,0.4)",
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}

                <div className="absolute bottom-8 left-8 right-8">
                  <div
                    className="text-sm font-semibold mb-2"
                    style={{ color: "#C3874C" }}
                  >
                    {selectedProject.subtitle}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    {selectedProject.title}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 lg:p-12 bg-black">
                {/* Description */}
                <div className="mb-8">
                  <h3
                    className="text-lg md:text-xl font-bold text-white mb-4"
                    style={{ color: "#C3874C" }}
                  >
                    About the Project
                  </h3>
                  <p className="text-white/80 leading-relaxed text-sm md:text-base">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h3
                    className="text-lg md:text-xl font-bold text-white mb-4"
                    style={{ color: "#C3874C" }}
                  >
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-semibold text-white"
                        style={{
                          background: "rgba(195, 135, 76, 0.2)",
                          border: "1px solid rgba(195, 135, 76, 0.3)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3
                    className="text-lg md:text-xl font-bold text-white mb-4"
                    style={{ color: "#C3874C" }}
                  >
                   Key Features
                  </h3>
                  <div className="space-y-2 md:space-y-3">
                    {selectedProject.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 md:gap-3">
                        <div
                          className="w-2 h-2 rounded-full mt-1.5 md:mt-2 flex-shrink-0"
                          style={{ background: "#C3874C" }}
                        />
                        <p className="text-white/80 text-sm md:text-base">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
