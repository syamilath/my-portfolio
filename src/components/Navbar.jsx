"use client";
import { useState } from "react";
import scrollToSection from "@/lib/scrollTo";

const Navbar = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["Home", "About", "Achievement", "Projects", "Contact"];

  const handleNavClick = (item) => {
    const sectionId = item.toLowerCase().replace(" ", "-");
    setActiveSection(sectionId);
    scrollToSection(sectionId, { 
      duration: 1000,
      onComplete: () => setActiveSection(sectionId) 
    });
    // Close mobile menu jika terbuka
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[92%] md:w-10/12 md:max-w-4xl">
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .mobile-menu-enter {
          animation: slideDown 0.3s ease-out;
        }
        .menu-item-stagger {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-4xl md:rounded-full shadow-xl px-5 py-4 md:px-6 md:py-2.5">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-6 sm:h-8 w-auto object-contain"
            />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-4 lg:space-x-6 items-center">
            {navItems.map((item) => {
              const id = item.toLowerCase().replace(" ", "-");
              return (
                <li key={item}>
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`text-xs lg:text-sm font-medium transition-colors ${
                      activeSection === id
                        ? "text-white"
                        : "text-white/80 hover:text-[#C3874C]"
                    }`}
                  >
                    {item}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* CTA Desktop */}
          <button onClick={() => handleNavClick("Contact")} className="hidden md:block bg-[#C3874C] text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-full text-xs lg:text-sm font-medium hover:bg-[#B27642] transition-colors shadow-lg">
            Get In Touch
          </button>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-2 space-y-2 mobile-menu-enter">
            {navItems.map((item, index) => {
              const id = item.toLowerCase().replace(" ", "-");
              return (
                <button
                  key={item}
                  onClick={() => {
                    handleNavClick(item);
                    setIsOpen(false);
                  }}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors menu-item-stagger ${
                    activeSection === id
                      ? "bg-white/20 text-white"
                      : "text-white/80 hover:bg-white/10"
                  }`}
                >
                  {item}
                </button>
              );
            })}

            <button onClick={() => { handleNavClick("Contact"); setIsOpen(false); }} style={{ animationDelay: `${navItems.length * 0.05}s` }} className="w-full bg-[#C3874C] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#B27642] transition-colors shadow-lg menu-item-stagger">
              Get In Touch
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
