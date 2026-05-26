import { useState } from 'react';
import type { Theme } from '../types';
import { Send, CheckCircle } from 'lucide-react';

export function AboutPage({ theme }: { theme: Theme }) {
  const isDark = theme === 'dark';
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    }
  };

  return (
    <div className={`py-16 md:py-24 max-w-5xl mx-auto px-4 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
      
      {/* Decorative Blur */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <div className={`absolute top-20 right-10 w-80 h-80 rounded-full blur-[140px] opacity-25 transition-colors duration-1000 ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-200/30'}`} />
        <div className={`absolute bottom-20 left-10 w-96 h-96 rounded-full blur-[130px] opacity-20 transition-colors duration-1000 ${isDark ? 'bg-pink-500/10' : 'bg-pink-200/20'}`} />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* About Section - 7 cols */}
        <div className="lg:col-span-7 flex flex-col justify-start">
          <h1 className={`text-4xl font-extrabold tracking-tight sm:text-5xl mb-6 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            About Gliph UI
          </h1>
          
          <p className="text-lg leading-relaxed mb-6 font-medium">
            Gliph UI is a premium open-source collection of beautiful, high-fidelity mobile components crafted specifically for React Native and Flutter. 
          </p>
          
          <p className="leading-relaxed mb-6">
            Mobile design systems often prioritize speed over smooth visual transitions, physics-based gesture interactions, and premium aesthetics. We started Gliph UI to fill this gap. Every component in our library—from weight scroll wheels to fluid calendar views—is built with performance, animation consistency, and glassmorphic aesthetics in mind.
          </p>

          <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            Why Choose Gliph UI?
          </h3>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <span className={`h-6 w-6 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${isDark ? 'bg-pink-500/10 text-pink-400' : 'bg-pink-100 text-pink-600'}`}>1</span>
              <div>
                <strong className={isDark ? 'text-white' : 'text-zinc-900'}>Zero-Dependency Customization</strong>
                <p className="text-sm mt-0.5 opacity-80">Copy-paste component code directly. No heavy, opinionated libraries polluting your dependencies.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className={`h-6 w-6 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${isDark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>2</span>
              <div>
                <strong className={isDark ? 'text-white' : 'text-zinc-900'}>Premium Animations</strong>
                <p className="text-sm mt-0.5 opacity-80">Built utilizing React Native Reanimated and Flutter's CustomPainters, ensuring 60+ FPS interactions.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className={`h-6 w-6 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${isDark ? 'bg-teal-500/10 text-teal-400' : 'bg-teal-100 text-teal-600'}`}>3</span>
              <div>
                <strong className={isDark ? 'text-white' : 'text-zinc-900'}>Haptic-Style Scrolling</strong>
                <p className="text-sm mt-0.5 opacity-80">Pickers simulate realistic physics and tactile snaps for an ultra-premium user experience.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Contact Section - 5 cols */}
        <div className="lg:col-span-5">
          <div className={`p-8 rounded-3xl border glass-panel shadow-2xl relative overflow-hidden transition-all duration-300 ${
            isDark ? 'border-white/[0.06] bg-zinc-950/40' : 'border-slate-200 bg-white'
          }`}>
            <h2 className={`text-2xl font-bold mb-2 tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              Contact Us
            </h2>
            <p className="text-sm opacity-60 mb-6 font-medium">Have a question or request? Send us a message.</p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in duration-300">
                <CheckCircle size={44} className="text-emerald-500 mb-4" />
                <h4 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-zinc-900'}`}>Message Sent!</h4>
                <p className="text-sm opacity-60 mt-1 max-w-xs">Thank you for reaching out. We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={`w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-1 ${
                      isDark 
                        ? 'bg-white/[0.02] border-white/10 text-white focus:border-pink-500 focus:ring-pink-500' 
                        : 'bg-black/[0.02] border-black/10 text-zinc-900 focus:border-pink-600 focus:ring-pink-600'
                    }`}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className={`w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-1 ${
                      isDark 
                        ? 'bg-white/[0.02] border-white/10 text-white focus:border-pink-500 focus:ring-pink-500' 
                        : 'bg-black/[0.02] border-black/10 text-zinc-900 focus:border-pink-600 focus:ring-pink-600'
                    }`}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className={`w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-1 resize-none ${
                      isDark 
                        ? 'bg-white/[0.02] border-white/10 text-white focus:border-pink-500 focus:ring-pink-500' 
                        : 'bg-black/[0.02] border-black/10 text-zinc-900 focus:border-pink-600 focus:ring-pink-600'
                    }`}
                    placeholder="Tell us what you're building..."
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-black shadow-lg transition duration-200 hover:-translate-y-0.5 cursor-pointer ${
                    isDark 
                      ? 'bg-white text-black hover:bg-zinc-200 hover:shadow-white/5' 
                      : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-slate-900/10'
                  }`}
                >
                  <Send size={13} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
