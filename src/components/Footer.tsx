import { Link, useLocation } from 'react-router-dom';
import type { Theme } from '../types';
import gLogo from '../assets/G.png';
import { Mail } from 'lucide-react';

export function Footer({ theme }: { theme: Theme }) {
  const isDark = theme === 'dark';
  const location = useLocation();

  // Hide footer on full-screen music player docs page if needed (Header does this too)
  const isMusicPlayer = location.pathname === '/musicplayer' || location.pathname === '/react-native-gliph-player';
  if (isMusicPlayer) return null;

  return (
    <footer className={`border-t mt-20 transition-all duration-500 relative z-20 ${
      isDark ? 'bg-[#0a0a0c]/90 border-white/5 text-zinc-400' : 'bg-white border-zinc-200 text-zinc-600'
    }`}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Column 1 */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={gLogo} alt="Gliph UI" className="w-5 h-5 object-contain" />
              <span className={`font-black text-base tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Gliph UI
              </span>
            </Link>
            <p className="text-xs leading-relaxed max-w-xs opacity-75">
              Premium UI components kit for React Native and Flutter. Build fluid, high-fidelity mobile interfaces with haptic-snapping physics.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className={`hover:scale-105 transition-transform ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`} aria-label="GitHub">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className={`hover:scale-105 transition-transform ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`} aria-label="Twitter">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <Link to="/about" className={`hover:scale-105 transition-transform ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`} aria-label="Contact Email">
                <Mail size={16} />
              </Link>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className="flex flex-col gap-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Platform Kits
            </h4>
            <div className="flex flex-col gap-2 text-xs font-semibold">
              <Link to="/" className={`hover:underline ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>React Native Home</Link>
              <Link to="/components" className={`hover:underline ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>React Native Components</Link>
              <Link to="/flutter" className={`hover:underline ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>Flutter Home</Link>
              <Link to="/flutter/components" className={`hover:underline ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>Flutter Components</Link>
            </div>
          </div>

          {/* Column 3: Resources & Guides */}
          <div className="flex flex-col gap-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Resources
            </h4>
            <div className="flex flex-col gap-2 text-xs font-semibold">
              <Link to="/blog" className={`hover:underline ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>Guides & Blog</Link>
              <Link to="/musicplayer" className={`hover:underline ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>Music Player Package</Link>
              <a href="https://github.com" target="_blank" rel="noreferrer" className={`hover:underline ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>GitHub Repository</a>
            </div>
          </div>

          {/* Column 4: Compliance & Info */}
          <div className="flex flex-col gap-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Legal & Support
            </h4>
            <div className="flex flex-col gap-2 text-xs font-semibold">
              <Link to="/privacy-policy" className={`hover:underline ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>Privacy Policy</Link>
              <Link to="/terms-of-service" className={`hover:underline ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>Terms of Service</Link>
              <Link to="/about" className={`hover:underline ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>About & Contact</Link>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className={`border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bold ${
          isDark ? 'border-white/5' : 'border-zinc-200'
        }`}>
          <span>&copy; {new Date().getFullYear()} Gliph UI. All rights reserved.</span>
          <span>Designed for modern app developers.</span>
        </div>
      </div>
    </footer>
  );
}
