"use client";

import {
  Mail,
  Linkedin,
  Github,
  Award,
  Trophy,
  Target,
  Code,
  Shield,
  Terminal,
} from "lucide-react";
import TextType from "./TextType";
import Image from 'next/image';

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 md:py-20 bg-black relative overflow-hidden -translate-y-20 md:-translate-y-40"
    >
      {/* Background Text */}
      <div className="absolute inset-0 flex items-start justify-center pt-10 md:pt-5 md:items-center">
        <h3 className="text-[#C3874C]/20 text-[4rem] xs:text-[5rem] sm:text-[7rem] md:text-[12rem] lg:text-[17rem] font-bold tracking-wider uppercase select-none pointer-events-none md:mr-30 -translate-y-10 md:-translate-y-43">
          ABOUT
        </h3>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-4 md:gap-12 lg:gap-10 xl:gap-18 items-center mr-0 md:mr-40">
          {/* Image Section */}
          <div className="relative flex justify-center md:justify-end -mt-15 md:mb-0">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-md">
              {/* Cahaya lembut di belakang foto */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-75 md:h-75 bg-white rounded-full blur-2xl opacity-30 md:mt-50" />
              </div>

              {/* Gambar */}
              <div className="aspect-3/4 overflow-hidden relative z-10">
                <Image
                  src="/jas1.png"
                  alt="Syamil Athalla Rahman"
                  className="w-full h-full object-cover"
                  width={400}
                  height={533}
                  priority
                />
              </div>
            </div>
          </div>

          {/* Text Section */}
          <div className="text-center md:text-left md:pl-4 lg:pl-4 w-full max-w-full md:max-w-[600px] lg:max-w-[650px] -mt-4 md:mt-0">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 md:mb-8">
              Who Am I?
            </h2>

            <div className="space-y-4 text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-10 px-2 sm:px-0">
              <TextType
                text={[ 
                  `Let me introduce myself, my name is Syamil Athalla Rahman, I am a student of SMKN 1 Cibinong. As an individual who continues to learn and develop, I am currently exploring various fields in information technology to find my passion. I have tried various disciplines, including web programming, network engineering, system administration, and cybersecurity.. `,      
                ]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
              />
            </div>

            {/* Button Section */}
            <div className="flex justify-center md:justify-start px-2 sm:px-0">
              <a
                href="/Portfolio.pdf"
                download
                className="group relative w-full sm:w-auto max-w-xs sm:max-w-none overflow-hidden bg-white/10 backdrop-blur-2xl text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-medium transition-all duration-300 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.3)] hover:scale-[1.02] inline-block text-center"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-linear-to-t from-black/10 to-transparent rounded-full" />
                <span className="relative z-10 drop-shadow-sm text-[#c3874c]">
                  Download Portfolio
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;