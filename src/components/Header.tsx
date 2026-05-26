import { Sun, Moon, Menu, X, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Theme } from '../types';
import { SIDEBAR_COMPONENTS } from '../pages/ComponentsPage';
import gLogo from '../assets/G.png';

export function Header({ theme, toggleTheme }: { theme: Theme, toggleTheme: () => void }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  
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

  // Determine active tab for sliding indicator
  let activeTab: string | null = null;
  if (isDocsRoute) {
    activeTab = 'components';
  } else if (isRN && (currentPath === '/musicplayer' || currentPath === '/react-native-gliph-player')) {
    activeTab = 'musicplayer';
  } else if (currentPath.startsWith('/blog')) {
    activeTab = 'blog';
  }

  const currentTab = hoveredTab || activeTab;

  // Exact sizes & left offsets for sliding tabs
  let pillStyle = { left: '0px', width: '0px', opacity: 0 };
  if (currentTab === 'components') {
    pillStyle = { left: '4px', width: '110px', opacity: 1 };
  } else if (currentTab === 'musicplayer' && isRN) {
    pillStyle = { left: '118px', width: '120px', opacity: 1 };
  } else if (currentTab === 'blog') {
    pillStyle = { left: isRN ? '242px' : '118px', width: '65px', opacity: 1 };
  }

  return (
    <>
      <header 
        className={isDocsRoute 
          ? `sticky top-0 z-40 w-full flex h-16 items-center justify-between px-4 sm:px-6 backdrop-blur-2xl transition-all border-b ${
              isDark ? 'bg-[#0a0a0c]/85 border-white/5 shadow-sm' : 'bg-white/85 border-black/5 shadow-sm'
            }` 
          : `sticky top-6 z-40 flex h-16 items-center justify-between rounded-full px-6 backdrop-blur-2xl transition-all mb-12 max-w-5xl mx-4 sm:mx-6 lg:mx-auto border shadow-2xl transition-all duration-300 ${
              isDark 
                ? 'bg-[#0a0a0d]/65 border-white/[0.06] shadow-black/40 hover:border-white/[0.12] hover:bg-[#0c0c11]/80' 
                : 'bg-white/75 border-slate-200/50 shadow-slate-100/30 hover:border-slate-350/80 hover:bg-white/90'
            }`
        }
      >
        <Link
          className={`flex items-center gap-2.5 text-lg font-black cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 group ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
          to={basePath || '/'}
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={gLogo} alt="Gliph UI Logo" className="w-6 h-6 object-contain" />
          <span 
            className={`font-black text-lg tracking-tight transition-colors duration-200 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Gliph UI
          </span>
          <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase transition-colors ${
            isDark ? 'bg-zinc-800 text-zinc-300 group-hover:bg-zinc-700' : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
          }`}>
            Beta
          </span>
        </Link>

        {/* Desktop Navigation with sliding pill background */}
        <nav 
          onMouseLeave={() => setHoveredTab(null)}
          className={`hidden items-center gap-1.5 text-sm font-bold md:flex relative p-1 rounded-full border ${
            isDark ? 'bg-white/[0.03] border-white/[0.05]' : 'bg-slate-500/[0.04] border-black/[0.04]'
          }`}
        >
          {/* Sliding Pill Indicator */}
          <div 
            className={`absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-out pointer-events-none ${
              isDark ? 'bg-white/[0.07] border border-white/5' : 'bg-slate-900/5 border border-slate-900/5'
            }`}
            style={pillStyle}
          />
          
          <Link 
            onMouseEnter={() => setHoveredTab('components')}
            className={`px-4 py-1.5 rounded-full transition-colors relative z-10 ${
              activeTab === 'components'
                ? (isDark ? 'text-white' : 'text-slate-900') 
                : (isDark ? 'text-zinc-400 hover:text-white' : 'text-slate-500 hover:text-slate-900')
            }`} 
            to={componentsPath}
          >
            Components
          </Link>
          
          {isRN && (
            <Link 
              onMouseEnter={() => setHoveredTab('musicplayer')}
              className={`px-4 py-1.5 rounded-full transition-colors relative z-10 ${
                activeTab === 'musicplayer'
                  ? (isDark ? 'text-white' : 'text-slate-900') 
                  : (isDark ? 'text-zinc-400 hover:text-white' : 'text-slate-500 hover:text-slate-900')
              }`} 
              to="/musicplayer"
            >
              Music Player
            </Link>
          )}

          <Link 
            onMouseEnter={() => setHoveredTab('blog')}
            className={`px-4 py-1.5 rounded-full transition-colors relative z-10 ${
              activeTab === 'blog'
                ? (isDark ? 'text-white' : 'text-slate-900') 
                : (isDark ? 'text-zinc-400 hover:text-white' : 'text-slate-500 hover:text-slate-900')
            }`} 
            to="/blog"
          >
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            className={`hidden md:flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 hover:scale-105 active:scale-95 ${
              isDark 
                ? 'border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_12px_rgba(255,255,255,0.05)]' 
                : 'border-black/10 bg-white/50 text-slate-900 hover:bg-black/5 hover:border-black/20'
            }`}
            title="Search"
          >
            <Search size={15} />
          </button>

          <button
            onClick={toggleTheme}
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 hover:scale-105 active:scale-95 ${
              isDark 
                ? 'border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_12px_rgba(255,255,255,0.05)]' 
                : 'border-black/10 bg-white/50 text-slate-900 hover:bg-black/5 hover:border-black/20'
            }`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Desktop Platform Switcher text link */}
          <Link
            to={isRN ? '/flutter' : '/'}
            className={`hidden md:block text-xs font-bold transition-all duration-200 hover:underline ${
              isDark 
                ? 'text-zinc-400 hover:text-white' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {isRN ? "Are you a Flutter developer?" : "Switch to React Native"}
          </Link>

          {!isDocsRoute && (
            <Link
              className={`hidden sm:flex rounded-full px-5 py-2 text-xs font-black shadow-lg transition duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 cursor-pointer ${
                isDark 
                  ? 'bg-white text-black hover:bg-zinc-200 hover:shadow-white/5' 
                  : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-slate-900/10'
              }`}
              to={componentsPath}
            >
              Get Started
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden flex h-9 w-9 items-center justify-center rounded-full border transition-all active:scale-90 ${
              isDark ? 'border-white/10 bg-white/5 text-white' : 'border-black/10 bg-white/50 text-slate-900'
            }`}
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={15} />
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className={`fixed inset-0 z-50 flex flex-col transition-all ${isDark ? 'bg-[#111111] text-white' : 'bg-slate-50 text-slate-900'}`}>
          <div className={`flex items-center justify-between p-4 sm:p-6 border-b ${isDark ? 'border-white/5' : 'border-black/5'}`}>
            <Link
              className={`flex items-center gap-2.5 text-xl font-bold cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 group ${isDark ? 'text-white' : 'text-slate-900'}`}
              to={basePath || '/'}
              onClick={() => setIsMenuOpen(false)}
            >
              <img src={gLogo} alt="Gliph UI Logo" className="w-6 h-6 object-contain" />
              <span className={`font-black text-xl tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Gliph UI
              </span>
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
                      onClick={() => setIsMenuOpen(false)}
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
                  <Link
                    className={`transition ${isDark ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
                    to="/blog"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link
                    className={`transition ${isDark ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
                    to="/about"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                </>
              )}
            </nav>

            <div className={`mt-16 pt-8 border-t ${isDark ? 'border-white/5' : 'border-black/5'}`}>
              <Link
                to={isRN ? '/flutter' : '/'}
                onClick={() => setIsMenuOpen(false)}
                className={`w-full py-4 px-4 rounded-xl border flex items-center justify-center text-sm font-bold transition-all ${isDark ? 'border-white/10 bg-white/5 text-white/90 active:bg-white/10' : 'border-black/10 bg-black/5 text-slate-900 active:bg-black/10'}`}
              >
                {isRN ? "Are you a Flutter developer?" : "Switch to React Native"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
