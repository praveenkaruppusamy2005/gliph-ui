import { useNavigate } from 'react-router-dom';
import { Sparkles, ChevronRight } from 'lucide-react';
import type { Platform, Theme } from '../types';
import { AdBanner } from '../components/AdBanner';

export function HomePage({ platform, theme }: { platform: Platform, theme: Theme }) {
  const navigate = useNavigate();
  const isRN = platform === 'react-native';
  const isDark = theme === 'dark';

  if (isRN) {
    // React Native Homepage: Centered Developer Layout with Feature Highlights
    return (
      <section className="relative min-h-[calc(100vh-8rem)] flex flex-col justify-center py-12 md:py-20 overflow-hidden bg-grid-pattern animate-grid">
        {/* Background Decorative Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          <div className="absolute top-0 right-0 w-[50%] h-[60%] diagonal-stripes opacity-75" />
          <div className={`absolute top-10 right-10 w-96 h-96 rounded-full blur-[130px] opacity-35 animate-blob transition-colors duration-1000 ${isDark ? 'bg-pink-500/15' : 'bg-pink-200/50'}`} />
          <div className={`absolute top-40 left-10 w-80 h-80 rounded-full blur-[120px] opacity-30 animate-blob animation-delay-2000 transition-colors duration-1000 ${isDark ? 'bg-indigo-500/15' : 'bg-indigo-200/40'}`} />
          <div className={`absolute bottom-10 right-20 w-[350px] h-[350px] rounded-full blur-[140px] opacity-25 animate-blob animation-delay-4000 transition-colors duration-1000 ${isDark ? 'bg-teal-500/10' : 'bg-teal-100/30'}`} />
        </div>

        {/* Hero Container */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center flex flex-col items-center justify-center">
          {/* Badge announcement */}
          <div className="flex justify-center mb-6">
            <div 
              onClick={() => navigate('/components')}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold cursor-pointer backdrop-blur transition-all duration-300 ${
                isDark 
                  ? 'bg-zinc-900/70 border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900' 
                  : 'bg-zinc-100/90 border-zinc-200 text-zinc-800 hover:border-zinc-300 hover:bg-zinc-150'
              }`}
            >
              <Sparkles size={12} className="text-pink-500 animate-pulse" />
              <span>Gliph UI Components are now available in Beta</span>
              <ChevronRight size={12} className="opacity-60" />
            </div>
          </div>

          {/* Hero Title */}
          <h1 className={`text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-7xl ${isDark ? 'text-zinc-50' : 'text-zinc-900'}`}>
            Supercharge your <br />
            <span className="inline-block mt-2 mb-3 text-transparent bg-clip-text clip-text-pattern animate-pulse-slow font-black select-none tracking-tight">
              React Native
            </span> <br />
            development
          </h1>

          {/* Hero Subtitle */}
          <p className={`mt-6 max-w-2xl mx-auto text-lg sm:text-xl font-medium leading-8 transition-colors duration-500 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Copy, customize, and ship polished screens faster. A premium suite of high-fidelity interactive React Native elements handcrafted for clean mobile interfaces.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigate('/components')}
              className={`w-full sm:w-auto rounded-full h-12 px-8 text-center text-sm font-bold shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
                isDark 
                  ? 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 shadow-zinc-950/20' 
                  : 'bg-zinc-900 text-zinc-100 hover:bg-zinc-800 shadow-zinc-900/10'
              }`}
            >
              Browse RN Components
            </button>
            <button
              onClick={() => navigate('/musicplayer')}
              className={`w-full sm:w-auto inline-flex items-center justify-center rounded-full h-12 border px-8 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
                isDark 
                  ? 'border-zinc-800 bg-zinc-900/30 text-zinc-300 hover:bg-zinc-900/70 hover:text-zinc-100' 
                  : 'border-zinc-200 bg-white/60 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900'
              }`}
            >
              Explore Music Player Docs
            </button>
          </div>

          {/* AdSense Ads Placement */}
          <div className="mt-16 w-full max-w-4xl mx-auto">
            <p className="text-center text-[10px] uppercase font-bold tracking-widest opacity-35 mb-2">Advertisement</p>
            <AdBanner adSlot="4101818143" className="mt-2" />
          </div>
        </div>
      </section>
    );
  } else {
    // Flutter Homepage: Split Screen Widget Showcase Layout
    return (
      <section className="relative min-h-[calc(100vh-8rem)] flex flex-col justify-center py-12 md:py-20 overflow-hidden bg-grid-pattern animate-grid">
        {/* Background Decorative Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          <div className="absolute top-0 right-0 w-[50%] h-[60%] diagonal-stripes opacity-75" />
          <div className={`absolute top-10 right-10 w-[450px] h-[450px] rounded-full blur-[140px] opacity-35 animate-blob transition-colors duration-1000 ${isDark ? 'bg-violet-500/15' : 'bg-violet-200/40'}`} />
          <div className={`absolute top-40 left-10 w-80 h-80 rounded-full blur-[120px] opacity-25 animate-blob animation-delay-2000 transition-colors duration-1000 ${isDark ? 'bg-purple-500/10' : 'bg-purple-250/30'}`} />
          <div className={`absolute bottom-10 right-20 w-96 h-96 rounded-full blur-[130px] opacity-30 animate-blob animation-delay-4000 transition-colors duration-1000 ${isDark ? 'bg-fuchsia-500/10' : 'bg-fuchsia-250/30'}`} />
        </div>

        {/* Hero Split Layout Container */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Column: Typography & CTAs */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Badge announcement */}
            <div className="inline-flex justify-center mb-6">
              <div 
                onClick={() => navigate('/flutter/components')}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold cursor-pointer backdrop-blur transition-all duration-300 ${
                  isDark 
                    ? 'bg-zinc-900/70 border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900' 
                    : 'bg-zinc-100/90 border-zinc-200 text-zinc-800 hover:border-zinc-300 hover:bg-zinc-150'
                }`}
              >
                <Sparkles size={12} className="text-violet-500 animate-pulse" />
                <span>Premium Flutter UI Kit is now available in Beta</span>
                <ChevronRight size={12} className="opacity-60" />
              </div>
            </div>

            {/* Hero Title */}
            <h1 className={`text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl ${isDark ? 'text-zinc-50' : 'text-zinc-900'}`}>
              Craft Fluid <br />
              <span className="inline-block mt-2 mb-3 text-transparent bg-clip-text clip-text-pattern animate-pulse-slow font-black select-none tracking-tight">
                Flutter Widgets
              </span> <br />
              With Style
            </h1>

            {/* Hero Subtitle */}
            <p className={`mt-6 max-w-lg text-lg font-medium leading-8 transition-colors duration-500 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Stunning glassmorphic custom scroll pickers, fluid dates selectors, and highly-optimized animations. Custom-built for Dart developers who care about pixel-perfect mobile design.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => navigate('/flutter/components')}
                className={`w-full sm:w-auto rounded-full h-12 px-8 text-center text-sm font-bold shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
                  isDark 
                    ? 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 shadow-zinc-950/20' 
                    : 'bg-zinc-900 text-zinc-100 hover:bg-zinc-800 shadow-zinc-900/10'
                }`}
              >
                Browse Flutter Components
              </button>
              <button
                onClick={() => navigate('/flutter/components/scale')}
                className={`w-full sm:w-auto inline-flex items-center justify-center rounded-full h-12 border px-8 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
                  isDark 
                    ? 'border-zinc-800 bg-zinc-900/30 text-zinc-300 hover:bg-zinc-900/70 hover:text-zinc-100' 
                    : 'border-zinc-200 bg-white/60 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
              >
                Interactive Scale Demo
              </button>
            </div>
          </div>

          {/* Right Column: Live Mock Widget Showcase Card */}
          <div className="w-full lg:w-1/2 flex items-center justify-center mt-12 lg:mt-0 z-10 animate-in fade-in slide-in-from-right-8 duration-700">
            {/* Decorative glows behind the device */}
            <div className="absolute w-72 h-72 bg-gradient-to-tr from-violet-500/10 to-pink-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className={`relative border rounded-3xl p-6 shadow-2xl w-full max-w-[320px] aspect-[9/16] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
              isDark 
                ? 'bg-[#0f0f15]/80 border-white/[0.08] shadow-black/60' 
                : 'bg-white/85 border-slate-200/80 shadow-slate-200/40'
            }`}>
              {/* Phone Status Bar */}
              <div className="flex justify-between items-center text-[10px] font-bold opacity-45 px-1 mb-4">
                <span>9:41 AM</span>
                <div className="flex items-center gap-1.5">
                  <span>5G</span>
                  <div className="w-4 h-2.5 border border-current rounded-sm p-0.5 flex items-center">
                    <div className="w-full h-full bg-current rounded-3xs" />
                  </div>
                </div>
              </div>

              {/* Simulated Widget Content */}
              <div className="flex-1 flex flex-col justify-center items-center py-4 relative">
                <span className={`text-[10px] font-extrabold uppercase tracking-widest mb-1.5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`}>
                  Gliph Scroll Picker
                </span>
                <h3 className={`text-base font-black tracking-tight mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Select Target Weight
                </h3>

                {/* Vertical Scroll Wheel */}
                <div className="relative w-full flex flex-col items-center justify-center py-4 overflow-hidden h-44 select-none">
                  {/* Highlight active zone */}
                  <div className={`absolute left-0 right-0 h-12 border-y pointer-events-none transition-colors ${
                    isDark ? 'border-white/[0.08] bg-white/[0.02]' : 'border-slate-200 bg-slate-900/[0.02]'
                  }`} />

                  {/* Fade overlays */}
                  <div className={`absolute top-0 left-0 right-0 h-8 pointer-events-none bg-gradient-to-b ${
                    isDark ? 'from-[#0f0f15] to-transparent' : 'from-white to-transparent'
                  }`} />
                  <div className={`absolute bottom-0 left-0 right-0 h-8 pointer-events-none bg-gradient-to-t ${
                    isDark ? 'from-[#0f0f15] to-transparent' : 'from-white to-transparent'
                  }`} />

                  {/* Numbers */}
                  <div className="flex flex-col items-center gap-4 pt-1">
                    <span className="text-xs font-semibold opacity-20">68 kg</span>
                    <span className="text-sm font-semibold opacity-40">69 kg</span>
                    <span className={`text-xl font-black tracking-tight ${isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600'}`}>
                      70 kg
                    </span>
                    <span className="text-sm font-semibold opacity-40">71 kg</span>
                    <span className="text-xs font-semibold opacity-20">72 kg</span>
                  </div>
                </div>

                {/* Dial Indicator */}
                <div className="mt-6 flex flex-col items-center gap-1.5 w-full">
                  <div className={`h-1.5 w-16 rounded-full ${isDark ? 'bg-zinc-800' : 'bg-slate-200'}`} />
                  <span className="text-[10px] font-bold opacity-30 uppercase tracking-wider">Drag to adjust</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 flex flex-col gap-2">
                <button 
                  onClick={() => navigate('/flutter/components/weight')}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-200 hover:bg-opacity-80 active:scale-[0.98] ${
                    isDark 
                      ? 'bg-zinc-800 border border-white/[0.06] text-white' 
                      : 'bg-slate-100 border border-slate-200 text-slate-800'
                  }`}
                >
                  View Widget Code
                </button>
                <button 
                  onClick={() => navigate('/flutter/components')}
                  className="w-full py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-violet-600 to-indigo-650 hover:from-violet-500 hover:to-indigo-550 text-white transition-all duration-200 shadow-md shadow-indigo-600/10 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get Widget
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
