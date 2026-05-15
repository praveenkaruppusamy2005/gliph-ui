import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Volume2, Disc3, Sparkles, Play, PlaySquare } from 'lucide-react';
import type { Theme } from '../types';
import { PLAYER_DOC_LINKS } from '../data/categories';
import { CategoryDetails } from '../components/CategoryDetails';

function MusicPlayerHeroTablet({ isDark }: { isDark: boolean }) {
  return (
    <div className={`relative mx-auto w-[320px] aspect-[3/4] rounded-[2rem] border-[12px] overflow-hidden shadow-2xl ${isDark ? 'border-[#18181b] bg-[#070711] shadow-emerald-500/10' : 'border-zinc-900 bg-[#070711] shadow-black/25'}`}>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30">
        <div className="h-1.5 w-12 rounded-full bg-white/10" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(34,197,94,0.45),transparent_30%),radial-gradient(circle_at_76%_34%,rgba(56,189,248,0.28),transparent_32%),linear-gradient(180deg,#07101a_0%,#050506_62%,#09090b_100%)]" />
      <div className="relative z-10 flex h-full flex-col px-6 pb-7 pt-16 text-white">
        <div className="flex items-center justify-between text-white/70">
          <ChevronLeft size={22} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Now Playing</span>
          <Volume2 size={20} />
        </div>
        <div className="mt-10 aspect-square rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,#16a34a,#0f172a_56%,#38bdf8)] p-4 shadow-2xl shadow-emerald-500/20">
          <div className="flex h-full items-center justify-center rounded-[1.35rem] border border-white/10 bg-black/30">
            <Disc3 size={82} className="text-white/85" />
          </div>
        </div>
        <div className="mt-9 text-center">
          <h2 className="text-2xl font-extrabold tracking-normal">Gliph Player</h2>
          <p className="mt-2 text-sm font-medium text-white/55">Background audio UI kit</p>
        </div>
        <div className="mt-8">
          <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-[58%] rounded-full bg-[#22c55e]" />
          </div>
          <div className="mt-2 flex justify-between text-[11px] font-semibold text-white/45">
            <span>1:42</span>
            <span>3:08</span>
          </div>
        </div>
        <div className="mt-auto flex items-center justify-center gap-8">
          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/80">
            <ChevronLeft size={21} />
          </button>
          <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-xl">
            <Play size={28} fill="currentColor" />
          </button>
          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/80">
            <ChevronLeft size={21} className="rotate-180" />
          </button>
        </div>
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#22c55e]" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold">Mini player enabled</p>
              <p className="truncate text-[11px] text-white/50">Lock-screen ready</p>
            </div>
            <PlaySquare size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MusicPlayerDocsPage({ theme }: { theme: Theme }) {
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  return (
    <section className="pb-28">
      <div className="grid min-h-[calc(100vh-6rem)] items-center gap-14 py-10 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div>
          <div className={`mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-widest ${isDark ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300' : 'border-emerald-600/20 bg-emerald-600/10 text-emerald-700'}`}>
            <Sparkles size={14} /> React Native Audio
          </div>
          <h1 className={`max-w-4xl text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl ${isDark ? 'text-white' : 'text-black'}`}>
            react-native-gliph-player documentation
          </h1>
          <p className={`mt-7 max-w-2xl text-lg font-medium leading-8 ${isDark ? 'text-white/62' : 'text-black/62'}`}>
            Build a premium audio player for React Native with a polished full-screen experience, floating mini player, background playback, lock-screen controls, queue support, and deep theme control.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => document.getElementById('player-docs')?.scrollIntoView({ behavior: 'smooth' })}
              className={`rounded-xl px-6 py-3.5 text-sm font-bold shadow-2xl transition duration-200 hover:-translate-y-0.5 ${isDark ? 'bg-white text-black hover:bg-zinc-200 shadow-white/5' : 'bg-black text-white hover:bg-zinc-800 shadow-black/5'}`}
            >
              Read Documentation
            </button>
            <button
              onClick={() => navigate('/components')}
              className={`rounded-xl border px-6 py-3.5 text-sm font-bold transition ${isDark ? 'border-white/10 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white' : 'border-black/10 bg-black/5 text-black/70 hover:bg-black/10 hover:text-black'}`}
            >
              Browse Components
            </button>
          </div>
        </div>
        <MusicPlayerHeroTablet isDark={isDark} />
      </div>

      <div className={`border-y py-8 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <p className={`mb-4 text-sm font-bold uppercase tracking-widest ${isDark ? 'text-white/35' : 'text-black/35'}`}>
          Documentation shortcuts
        </p>
        <div className="divide-y divide-white/10">
          {PLAYER_DOC_LINKS.map((item) => (
            <button
              key={item.title}
              onClick={() => document.getElementById('player-docs')?.scrollIntoView({ behavior: 'smooth' })}
              className={`group flex w-full items-center gap-4 py-5 text-left transition ${isDark ? 'hover:bg-white/[0.03]' : 'hover:bg-black/[0.03]'}`}
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-full border ${isDark ? 'border-white/10 bg-white/5 text-[#93c5fd]' : 'border-black/10 bg-black/5 text-[#2563eb]'}`}>
                {item.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className={`block text-xl font-bold ${isDark ? 'text-[#93c5fd]' : 'text-[#2563eb]'}`}>{item.title}</span>
                <span className={`mt-1 block text-base leading-6 ${isDark ? 'text-white/65' : 'text-black/65'}`}>{item.desc}</span>
              </span>
              <ChevronLeft size={22} className={`rotate-180 transition group-hover:translate-x-1 ${isDark ? 'text-white/35' : 'text-black/35'}`} />
            </button>
          ))}
        </div>
      </div>

      <div id="player-docs" className="pt-14">
        <CategoryDetails category="music-player" platform="react-native" onBack={() => navigate('/')} theme={theme} />
      </div>
    </section>
  );
}
