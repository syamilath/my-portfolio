"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Achievement = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const certificates = [
    {
      id: 1,
      title: "Cyber Sentrix",
      date: "02/CNT/1/25",
      image: "/certificate/1709345731605.jpg",
      description: "Achievement in Cybersecurity Excellence"
    },
    {
      id: 2,
      title: "Network Security Specialist",
      date: "2024",
      image: "/certificate/1750750965673_page-0001.jpg",
      description: "Advanced Network Security Certification"
    },
    {
      id: 3,
      title: "Web Development Excellence",
      date: "2024",
      image: "/certificate/Sertifikat - Syamil Athalla Rahman 2_page-0001 (1).jpg",
      description: "Full Stack Development Certification"
    },
    {
      id: 4,
      title: "Web Development Excellence",
      date: "2024",
      image: "/certificate/IMG_0381.PNG",
      description: "Full Stack Development Certification"
    },
    {
      id: 5,
      title: "Web Development Excellence",
      date: "2024",
      image: "/certificate/Certificate of Attendance (RH124-9.3)_page-0001.jpg",
      description: "Full Stack Development Certification"
    },
    {
      id: 6,
      title: "Web Development Excellence",
      date: "2024",
      image: "/certificate/sertifikat_course_251_4255903_230225141030_page-0001.jpg",
      description: "Full Stack Development Certification"
    },
    {
      id: 7,
      title: "Web Development Excellence",
      date: "2024",
      image: "/certificate/Syamil Athalla Rahman.png",
      description: "Full Stack Development Certification"
    },
    {
      id: 8,
      title: "Web Development Excellence",
      date: "2024",
      image: "/certificate/cyber_jawara.jpg",
      description: "Full Stack Development Certification"
    },
    {
      id: 9,
      title: "Web Development Excellence",
      date: "2024",
      image: "/certificate/1751943963903_page-0001.jpg",
      description: "Full Stack Development Certification"
    },
    {
      id: 10,
      title: "Web Development Excellence",
      date: "2024",
      image: "/certificate/cybersentrix.jpeg",
      description: "Full Stack Development Certification"
    },

     {
      id: 10,
      title: "Web Development Excellence",
      date: "2024",
      image: "/certificate/udemy.jpg",
      description: "Full Stack Development Certification"
    }
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === certificates.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? certificates.length - 1 : prevIndex - 1
    );
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? -45 : 45
    })
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-black relative overflow-hidden">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h3 className="text-[#C3874C]/20 text-[4rem] xs:text-[5rem] sm:text-[7rem] md:text-[12rem] lg:text-[17rem] font-bold tracking-wider uppercase select-none">
          AWARDS
        </h3>
      </div>

      <div className="w-full relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Achievements & Certifications
          </h2>
          <p className="text-[#C3874C] text-lg md:text-xl">
            Milestones in My Journey
          </p>
        </div>

        {/* Certificate Showcase */}
        <div className="relative w-full">
          <div className="flex justify-center items-center w-full">
            <button
              onClick={prevSlide}
              className="absolute left-8 z-10 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors text-white"
            >
              <ChevronLeft size={32} />
            </button>
<div className="relative overflow-hidden w-full px-4 md:px-32" style={{ perspective: '2000px' }}>
  <div className="relative aspect-[4/3] w-full max-w-full md:max-w-130 mx-auto">
    <AnimatePresence initial={false} custom={direction} mode="wait">
      <motion.div
        key={currentIndex}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ 
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.3 },
          scale: { duration: 0.4 },
          rotateY: { duration: 0.5 }
        }}
        className="absolute w-full h-full"
      >
        <div className="group relative w-full h-full p-4">
          <img
            src={certificates[currentIndex].image}
            alt={certificates[currentIndex].title}
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
</div>
            <button
              onClick={nextSlide}
              className="absolute right-8 z-10 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors text-white"
            >
              <ChevronRight size={32} />
            </button>
          </div>

          {/* Certificate Navigation Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {certificates.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#C3874C] w-6"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to certificate ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievement;