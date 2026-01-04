import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ExpertiseSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  const scrollThreshold = 50; // Threshold untuk mengurangi sensitivitas

  const expertiseData = [
    {
      title: "Experience - Capture The Flag",
      subtitle: "Has participated in many CTF competitions",
      date: "Juli 2023",
      description:
        "To hone my skills in cybersecurity and gain experience, I actively participate in various cybersecurity competitions, such as Capture The Flag (CTF).",
    },
    {
      title: "Experience - Nevtik Organization",
      subtitle: "Deputy chairman of nevtik organization",
      date: "December 2023",
      description:
        "In the NEVTIK organization, I serve as Deputy Chairperson and am also part of the CyberSecurity division. My involvement in this organization is an important step to build relationships, broaden horizons, and gain experience in the field of technology, especially cybersecurity.",
    },
    {
      title: "Journey - SMPIT Tri Sukses",
      subtitle:
        "As well as being a student at the Roudlotul Qur'an Islamic boarding school, Depok",
      date: "September 2021",
      description:
        "I have also served as Vice Chairman of OSIS at SMPIT Tri Sukses and Vice Chairman of Santri at Pondok Pesantren Roudhotul Quran. This experience helped me develop leadership skills, responsibility, and cooperation in various organizational activities.",
    },
    {
      title: "Journey - SMKN 1 Cibinong",
      subtitle: "Majoring in network information systems and applications",
      date: "Desember 2023",
      description:
        "At SMKN 1 Cibinong, I studied Information Systems, Networking, and Applications for four years. During this time, I focused on exploring and developing my skills by trying out various fields within the world of technology.",
    },
  ];

  const scrollToNext = () => {
    if (isScrolling || currentIndex >= expertiseData.length - 1) return;

    setIsScrolling(true);
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    setTimeout(() => setIsScrolling(false), 800);
  };

  const scrollToPrev = () => {
    if (isScrolling || currentIndex <= 0) return;

    setIsScrolling(true);
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);

    setTimeout(() => setIsScrolling(false), 800);
  };

  const scrollToIndex = (index) => {
    if (isScrolling || index === currentIndex) return;

    setIsScrolling(true);
    setCurrentIndex(index);

    setTimeout(() => setIsScrolling(false), 800);
  };

  // Handle wheel scroll dengan debounce dan threshold
  useEffect(() => {
    let scrollAccumulator = 0;
    
    const handleWheel = (e) => {
      // Hanya prevent default jika cursor ada di dalam container
      if (!isHovering) return;
      
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      
      // Akumulasi scroll untuk mengurangi sensitivitas
      scrollAccumulator += e.deltaY;

      // Hanya scroll jika sudah melewati threshold
      if (Math.abs(scrollAccumulator) >= scrollThreshold) {
        if (scrollAccumulator > 0) {
          scrollToNext();
        } else {
          scrollToPrev();
        }
        scrollAccumulator = 0; // Reset accumulator
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [currentIndex, isScrolling, isHovering]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        scrollToNext();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        scrollToPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, isScrolling]);

  return (
    <div
      ref={containerRef}
      className="h-screen bg-black overflow-hidden relative " style={{ marginTop: "-130px" }}
    >
      {/* Header - Fixed */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-12 pb-6 px-8">
        <div className="text-center">
          <p className="text-lg text-[#C3874C] uppercase tracking-wider mb-2">
            Expertise
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            My Journey & Experience
          </h1>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="h-full flex items-center justify-center px-8 pt-32 pb-24 mt-10">
        <div className="max-w-4xl w-full relative h-full flex items-center">
          {/* Content Cards Container */}
          <div 
            className="w-full relative" 
            style={{ height: "500px" }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {expertiseData.map((item, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-all duration-700 ease-in-out"
                style={{
                  transform: `translateY(${(index - currentIndex) * 100}%)`,
                  opacity: index === currentIndex ? 1 : 0,
                  pointerEvents: index === currentIndex ? "auto" : "none",
                }}
              >
                <div className="p-8 md:p-12 h-full relative overflow-hidden flex flex-col">
                  {/* Content */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    {/* Title Section */}
                    <div className="mb-6 text-center justify-center">
                      <div className="inline-block px-4 py-2 mb-4">
                        <button className="group relative w-auto overflow-hidden bg-white/10 backdrop-blur-2xl text-[#c3874c] px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.3)] hover:scale-[1.02]">
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/10 to-transparent rounded-full" />
                          <span className="relative z-10 drop-shadow-sm">
                            {item.date}
                          </span>
                        </button>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-[#C3874C] mb-3">
                        {item.title}
                      </h2>
                      <p className="text-amber-600 font-medium text-white">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <div className="flex-1 mb-6 text-center justify-center">
                      <p className="text-white leading-relaxed text-lg">
                        {item.description}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-auto"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Controls - Fixed Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-8 px-8 to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
          </div>

          {/* Counter & Instructions */}
          <div className="text-center">
            <p className="text-gray-400 text-xs">
              Scroll or use arrow keys to navigate
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator Animation */}
      {currentIndex < expertiseData.length - 1 && (
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      )}
    </div>
  );
}