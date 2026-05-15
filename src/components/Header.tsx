import { Sun, Moon, Smartphone, Code2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import type { Theme } from '../types';

export function Header({ theme, toggleTheme }: { theme: Theme, toggleTheme: () => void }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const isRN = !currentPath.startsWith('/flutter');

  const basePath = isRN ? '' : '/flutter';
  const componentsPath = isRN ? '/components' : '/flutter/components';
  const isDark = theme === 'dark';

  return (
    <>
      <header className="flex h-24 items-center justify-between">
        <Link
          className={`flex items-center gap-3 text-2xl font-bold cursor-pointer ${isDark ? 'text-white' : 'text-black'}`}
          to={basePath || '/'}
        >
          Gliph UI
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${isDark ? 'bg-white/75 text-black' : 'bg-black/75 text-white'}`}>
            Beta
          </span>
        </Link>

        <nav className={`hidden items-center gap-10 text-sm font-semibold md:flex ${isDark ? 'text-white/85' : 'text-black/70'}`}>
          <Link
            className="transition hover:text-blue-500 cursor-pointer"
            to={componentsPath}
          >
            Components
          </Link>
          {isRN && (
            <Link
              className="transition hover:text-blue-500 cursor-pointer"
              to="/musicplayer"
            >
              Music Player
            </Link>
          )}
          <Link className="transition hover:text-blue-500" to="/pricing">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-3 sm:gap-6">
          <button
            onClick={toggleTheme}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${isDark ? 'border-white/10 bg-white/5 text-white hover:bg-white/15' : 'border-black/10 bg-black/5 text-black hover:bg-black/10'}`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link
            className={`hidden sm:flex text-sm font-semibold transition hover:text-blue-500 cursor-pointer ${isDark ? 'text-white/70' : 'text-black/60'}`}
            to={isRN ? '/flutter' : '/'}
          >
            {isRN ? "Are you a Flutter developer?" : "Switch to React Native"}
          </Link>

          <Link
            className={`rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold shadow-xl transition duration-200 hover:-translate-y-0.5 cursor-pointer ${isDark ? 'bg-white text-black hover:bg-zinc-200 shadow-white/5' : 'bg-black text-white hover:bg-zinc-800 shadow-black/5'}`}
            to={componentsPath}
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Mobile Only Platform Switcher */}
      <div className="sm:hidden mb-6">
        <Link
          to={isRN ? '/flutter' : '/'}
          className={`w-full py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${isDark ? 'border-white/10 bg-white/5 text-white/70 active:bg-white/10' : 'border-black/10 bg-black/5 text-black/70 active:bg-black/10'}`}
        >
          {isRN ? <Smartphone size={14} className="text-[#38bdf8]" /> : <Code2 size={14} className="text-[#61dafb]" />}
          {isRN ? "Are you a Flutter developer?" : "Switch to React Native"}
        </Link>
      </div>
    </>
  );
}
