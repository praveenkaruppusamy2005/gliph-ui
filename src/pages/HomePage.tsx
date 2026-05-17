import { useNavigate } from 'react-router-dom';
import type { Platform, Theme } from '../types';

export function HomePage({ platform, theme }: { platform: Platform, theme: Theme }) {
  const navigate = useNavigate();
  const isRN = platform === 'react-native';
  const isDark = theme === 'dark';

  return (
    <>
      <section className="flex flex-col min-h-[calc(100vh-8rem)] justify-center py-8 lg:py-0">
        <div className="max-w-3xl">
          <h1 className={`text-5xl font-bold leading-[1.08] sm:text-6xl lg:text-7xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Supercharge your
            <span className={`block ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{isRN ? 'React Native' : 'Flutter'}</span>
            development
          </h1>

          <p className={`mt-8 max-w-2xl text-lg font-medium leading-8 ${isDark ? 'text-white/70' : 'text-slate-600'}`}>
            Ready-to-use {isRN ? 'React Native' : 'Flutter'} components crafted for clean mobile
            interfaces. Copy, customize, and ship polished screens faster.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => navigate(isRN ? '/components' : '/flutter/components')}
              className={`rounded-full px-8 py-4 text-center text-base font-bold shadow-2xl transition duration-300 hover:-translate-y-1 ${isDark ? 'bg-white text-black hover:bg-zinc-200 shadow-white/10 hover:shadow-white/20' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-black/10 hover:shadow-black/20'}`}
            >
              Browse {isRN ? 'RN' : 'Flutter'} Components
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
