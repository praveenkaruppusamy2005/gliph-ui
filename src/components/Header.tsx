import { Sun, Moon, Smartphone, Code2, Menu, X, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Theme } from '../types';
import { SIDEBAR_COMPONENTS } from '../pages/ComponentsPage';

export function Header({ theme, toggleTheme }: { theme: Theme, toggleTheme: () => void }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPath = location.pathname;
  const isRN = !currentPath.startsWith('/flutter');

  const basePath = isRN ? '' : '/flutter';
  const componentsPath = isRN ? '/components' : '/flutter/components';
  const isDark = theme === 'dark';

  const isDocsRoute = currentPath.startsWith('/components') || currentPath.startsWith('/flutter/components');
  const isMusicPlayer = currentPath === '/musicplayer' || currentPath === '/react-native-gliph-player';

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  if (isMusicPlayer) return null;

  // Handle mobile menu clicks for components
  const handleComponentClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header 
        className={isDocsRoute 
          ? `sticky top-0 z-40 w-full flex h-16 items-center justify-between px-4 sm:px-6 backdrop-blur-xl transition-all border-b ${isDark ? 'bg-[#0a0a0a]/90 border-white/10' : 'bg-white/90 border-black/5'}` 
          : `sticky top-6 z-40 flex h-16 items-center justify-between rounded-full px-6 backdrop-blur-xl transition-all mb-12 max-w-5xl mx-4 sm:mx-6 lg:mx-auto ${isDark ? 'bg-white/5 border border-white/10 shadow-lg shadow-black/20' : 'bg-white/70 border border-black/5 shadow-lg shadow-black/5'}`
        }
      >
        <Link
          className={`flex items-center gap-3 text-lg font-bold cursor-pointer transition-transform hover:scale-105 ${isDark ? 'text-white' : 'text-slate-900'}`}
          to={basePath || '/'}
          onClick={() => setIsMenuOpen(false)}
        >
          Gliph UI
          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${isDark ? 'bg-white/20 text-white' : 'bg-black/10 text-slate-900'}`}>
            Beta
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`hidden items-center gap-8 text-sm font-semibold md:flex ${isDark ? 'text-white/80' : 'text-slate-600'}`}>
          <Link className="transition hover:text-blue-500 cursor-pointer" to={componentsPath}>
            Components
          </Link>
          {isRN && (
            <Link className="transition hover:text-blue-500 cursor-pointer" to="/musicplayer">
              Music Player
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            className={`hidden md:flex h-9 w-9 items-center justify-center rounded-full border transition-all ${isDark ? 'border-white/10 bg-white/5 text-white hover:bg-white/15' : 'border-black/10 bg-white/50 text-slate-900 hover:bg-black/5'}`}
            title="Search"
          >
            <Search size={16} />
          </button>

          <button
            onClick={toggleTheme}
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all ${isDark ? 'border-white/10 bg-white/5 text-white hover:bg-white/15' : 'border-black/10 bg-white/50 text-slate-900 hover:bg-black/5'}`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Desktop Platform Switch */}
          <Link
            to={isRN ? '/flutter' : '/'}
            className={`hidden lg:flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all border ${isDark ? 'border-white/10 bg-white/5 text-white/90 hover:bg-white/10' : 'border-black/10 bg-black/5 text-slate-900 hover:bg-black/10'}`}
          >
            {isRN ? <Smartphone size={16} className="text-[#38bdf8]" /> : <Code2 size={16} className="text-[#61dafb]" />}
            {isRN ? "Flutter" : "React Native"}
          </Link>

          {!isDocsRoute && (
            <Link
              className={`hidden sm:flex rounded-full px-5 py-2 text-sm font-bold shadow-xl transition duration-200 hover:-translate-y-0.5 cursor-pointer ${isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
              to={componentsPath}
            >
              Get Started
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden flex h-9 w-9 items-center justify-center rounded-full border transition-all ${isDark ? 'border-white/10 bg-white/5 text-white' : 'border-black/10 bg-white/50 text-slate-900'}`}
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={16} />
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className={`fixed inset-0 z-50 flex flex-col transition-all ${isDark ? 'bg-[#111111] text-white' : 'bg-slate-50 text-slate-900'}`}>
          <div className={`flex items-center justify-between p-4 sm:p-6 border-b ${isDark ? 'border-white/5' : 'border-black/5'}`}>
            <Link
              className={`flex items-center gap-3 text-xl font-bold cursor-pointer ${isDark ? 'text-white' : 'text-slate-900'}`}
              to={basePath || '/'}
              onClick={() => setIsMenuOpen(false)}
            >
              Gliph UI
            </Link>
            
            <div className="flex items-center gap-3">
              <button
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${isDark ? 'border-white/10 bg-white/5 text-white' : 'border-black/10 bg-white/50 text-slate-900'}`}
                title="Search"
              >
                <Search size={20} />
              </button>
              <button
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${isDark ? 'border-white/10 bg-white/5 text-white' : 'border-black/10 bg-white/50 text-slate-900'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 mt-4">
            <nav className="flex flex-col gap-8 text-sm font-bold tracking-widest uppercase">
              {isDocsRoute ? (
                <>
                  {SIDEBAR_COMPONENTS.map((comp) => (
                    <Link
                      key={comp.id}
                      to={`${componentsPath}/${comp.id}`}
                      onClick={handleComponentClick}
                      className={`transition flex items-center gap-4 ${isDark ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                      {comp.title}
                    </Link>
                  ))}
                </>
              ) : (
                <>
                  <Link
                    className={`transition ${isDark ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
                    to={componentsPath}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                  <Link
                    className={`transition ${isDark ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
                    to={componentsPath}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Components
                  </Link>
                  {isRN && (
                    <Link
                      className={`transition ${isDark ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
                      to="/musicplayer"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Music Player
                    </Link>
                  )}
                </>
              )}
            </nav>

            <div className={`mt-16 pt-8 border-t ${isDark ? 'border-white/5' : 'border-black/5'}`}>
              <Link
                to={isRN ? '/flutter' : '/'}
                onClick={() => setIsMenuOpen(false)}
                className={`w-full py-4 px-4 rounded-xl border flex items-center justify-center gap-3 text-sm font-bold transition-all ${isDark ? 'border-white/10 bg-white/5 text-white/90 active:bg-white/10' : 'border-black/10 bg-black/5 text-slate-900 active:bg-black/10'}`}
              >
                {isRN ? <Smartphone size={18} className="text-[#38bdf8]" /> : <Code2 size={18} className="text-[#61dafb]" />}
                {isRN ? "Are you a Flutter developer?" : "Switch to React Native"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
