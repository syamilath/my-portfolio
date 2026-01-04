import { useState, useEffect } from 'react';
import { Instagram, Linkedin, Mail, Check, Send } from 'lucide-react';
import scrollToSection from '@/lib/scrollTo';

const Contact = ({ setActiveSection }) => {
  const handleNavClick = (item) => {
    const sectionId = item.toLowerCase().replace(" ", "-");
    setActiveSection(sectionId);
    
    // Delay sangat kecil untuk memastikan state update
    setTimeout(() => {
      scrollToSection(sectionId, { 
        duration: 1000,
        onComplete: () => setActiveSection(sectionId) 
      });
    }, 50);
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (status?.type === 'success') {
      const timer = setTimeout(() => setStatus(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({ type: 'success', message: 'Pesan terkirim. Terima kasih!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus({ type: 'error', message: data.error || 'Gagal mengirim pesan.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Gagal mengirim pesan.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Contact Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-black">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <p className="text-[#C3874C] text-sm font-medium tracking-widest mb-4">GET IN TOUCH</p>
            <h2 className="text-5xl font-bold text-white">Lets Work Together</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-zinc-900 border border-zinc-800 text-[#C3874C] placeholder-[#C3874C] focus:outline-none focus:border-[#C3874C] transition-colors"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-zinc-900 border border-zinc-800 text-[#C3874C] placeholder-[#C3874C] focus:outline-none focus:border-[#C3874C] transition-colors"
                required
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-zinc-900 border border-zinc-800 text-[#C3874C] placeholder-[#C3874C] focus:outline-none focus:border-[#C3874C] transition-colors"
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className="w-full px-6 py-4 bg-zinc-900 border border-zinc-800 text-[#C3874C] placeholder-[#C3874C] focus:outline-none focus:border-[#C3874C] transition-colors resize-none"
              required
            ></textarea>

            {/* Button with Status Feedback */}
            <div className="relative">
              <style>{`
                @keyframes pulse-check {
                  0% { opacity: 0; transform: scale(0.5); }
                  50% { opacity: 1; }
                  100% { opacity: 1; transform: scale(1); }
                }
                @keyframes paper-plane-throw {
                  0% {
                    opacity: 1;
                    transform: translateX(0) rotate(45deg) scale(1);
                  }
                  70% {
                    opacity: 1;
                  }
                  100% {
                    opacity: 0;
                    transform: translateX(400px) rotate(45deg) scale(1);
                  }
                }
                .plane-animate {
                  animation: paper-plane-throw 1.2s ease-in forwards;
                  transform-origin: center;
                }
                .btn-sending {
                  position: relative;
                  overflow: hidden;
                }
                .btn-sending::after {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: -100%;
                  width: 100%;
                  height: 100%;
                  background: rgba(195, 135, 76, 0.2);
                  animation: slide 1.5s infinite;
                }
                @keyframes slide {
                  0% { left: -100%; }
                  100% { left: 100%; }
                }
                .check-animate {
                  animation: pulse-check 0.6s ease-out;
                }
              `}</style>

              <button
                type="submit"
                className={`w-full px-6 py-4 font-medium tracking-wider transition-all ${
                  loading
                    ? 'bg-[#C3874C]/30 text-[#C3874C] btn-sending'
                    : status?.type === 'success'
                    ? 'bg-green-900/30 text-green-400'
                    : status?.type === 'error'
                    ? 'bg-rose-900/30 text-rose-400'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-[#C3874C]'
                }`}
                disabled={loading || status?.type === 'success'}
              >
                <div className="flex items-center justify-center gap-3 h-6">
                  {loading && (
                    <>
                      <span>Sending</span>
                      <Send className="w-5 h-5 plane-animate" />
                    </>
                  )}
                  {status?.type === 'success' && (
                    <>
                      <Check className="w-5 h-5 check-animate" />
                      <span>Message Sent!</span>
                    </>
                  )}
                  {status?.type === 'error' && <span>{status.message}</span>}
                  {!loading && !status && 'SEND MESSAGE'}
                </div>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#18181B] border-t border-zinc-900 py-6 px-4 leading-tight">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center space-y-8  leading-[0.3]">
            {/* Logo/Brand */}
            <h3 className="text-2xl font-bold text-[#C3874C] tracking-wider">SATHALLA.</h3>

            {/* Navigation Links */}
            <nav className="flex flex-wrap justify-center gap-8 text-white ">
              <button onClick={() => handleNavClick("Home")} className="hover:text-[#C3874C] transition-colors cursor-pointer">Home</button>
              <button onClick={() => handleNavClick("About")} className="hover:text-[#C3874C] transition-colors cursor-pointer">About</button>
              <button onClick={() => handleNavClick("Achievement")} className="hover:text-[#C3874C] transition-colors cursor-pointer">Achievement</button>
              <button onClick={() => handleNavClick("Projects")} className="hover:text-[#C3874C] transition-colors cursor-pointer">Projects</button>
              <button onClick={() => handleNavClick("Contact")} className="hover:text-[#C3874C] transition-colors cursor-pointer">Contact</button>
            </nav>

            {/* Social Media Icons */}
            <div className="flex gap-6">
              <a href="https://www.instagram.com/syamil.athalla" className="text-white hover:text-[#C3874C] transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://www.linkedin.com/in/syamil-athalla-rahman-0962162b8" className="text-white hover:text-[#C3874C] transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="mailto:syamilathalla@gmail.com" className="text-white hover:text-[#C3874C] transition-colors">
                <Mail size={24} />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-zinc-500 text-sm text-center">
              ©2025 Syamil Athalla Rahman. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;