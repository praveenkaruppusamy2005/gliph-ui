import { useState, useEffect } from 'react';
import { ChevronLeft, Code2, Smartphone, PlaySquare } from 'lucide-react';
import type { Category, Platform, Theme } from '../types';
import { CATEGORY_CONTENT } from '../data/categories';
import { CodeBlock } from './CodeBlock';

export function CategoryDetails({ category, platform, onBack, theme }: { category: Category, platform: Platform, onBack: () => void, theme: Theme }) {
  const data = CATEGORY_CONTENT[category];
  const platformData = platform === 'react-native' ? data.reactNative : data.flutter;
  const isDark = theme === 'dark';
  const [rnLoading, setRnLoading] = useState(true);
  const [flutterLoading, setFlutterLoading] = useState(true);
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [rnLanguage, setRnLanguage] = useState<'tsx' | 'jsx'>('tsx');
  const [musicPlayerTab, setMusicPlayerTab] = useState<'full' | 'mini'>('full');

  const rnGif = data.reactNative?.previewGif || (category !== 'calendar' && category !== 'scale' ? data.previewGif : undefined);
  const flutterGif = data.flutter?.previewGif || (category !== 'calendar' && category !== 'scale' ? data.previewGif : undefined);

  useEffect(() => {
    setRnLoading(true);
    setFlutterLoading(true);
    setActiveVariantIndex(0);
    const timer = setTimeout(() => {
      setRnLoading(false);
      setFlutterLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [category]);

  const getCode = () => {
    if (platform === 'flutter') {
      return data.variants
        ? (data.variants[activeVariantIndex].flutterUsage || data.variants[activeVariantIndex].usage)
        : platformData.usage;
    }

    // React Native
    if (data.variants) {
      const v = data.variants[activeVariantIndex];
      return (rnLanguage === 'jsx'
        ? (v.reactNativeUsageJs || v.reactNativeUsage || v.usage)
        : (v.reactNativeUsage || v.usage));
    } else {
      return (rnLanguage === 'jsx'
        ? (platformData.usageJs || platformData.usage)
        : platformData.usage);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={onBack}
        className={`group flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all mb-8 ${isDark ? 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white' : 'border-black/10 bg-black/5 text-black/70 hover:bg-black/10 hover:text-black'}`}
      >
        <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        Back to components
      </button>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
        <h2 className={`text-4xl font-bold leading-tight sm:text-5xl tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
          {data.title}
        </h2>

        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
          {platform === 'react-native' ? (
            <><Code2 size={16} className="text-[#61dafb]" /> <span className={`text-sm font-medium tracking-tight ${isDark ? 'text-white/80' : 'text-black/70'}`}>React Native API</span></>
          ) : (
            <><Smartphone size={16} className="text-[#38bdf8]" /> <span className={`text-sm font-medium tracking-tight ${isDark ? 'text-white/80' : 'text-black/70'}`}>Flutter API</span></>
          )}
        </div>
      </div>

      <p className={`mt-5 text-lg leading-8 max-w-2xl ${isDark ? 'text-white/60' : 'text-black/60'}`}>
        {data.description}
      </p>

      {data.variants ? (
        <div className="mt-16">
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-12">
            {data.variants.map((v, idx) => (
              <button
                key={v.name}
                onClick={() => setActiveVariantIndex(idx)}
                className={`rounded-xl px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold transition-all border ${activeVariantIndex === idx
                  ? (isDark ? 'bg-white text-black border-white shadow-lg shadow-white/10' : 'bg-black text-white border-black shadow-lg shadow-black/10')
                  : (isDark ? 'border-white/10 text-white/50 hover:border-white/20 hover:text-white bg-white/[0.02]' : 'border-black/10 text-black/50 hover:border-black/20 hover:text-black bg-black/[0.02]')
                  }`}
              >
                {v.name}
              </button>
            ))}
          </div>

          <div key={`${category}-${activeVariantIndex}`} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {(() => {
              const variant = data.variants[activeVariantIndex];
              return (
                <div className="flex flex-col gap-8">
                  <div>
                    <h3 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{variant.name} Variant</h3>
                    <p className={`text-lg ${isDark ? 'text-white/50' : 'text-black/50'}`}>
                      The {variant.name.toLowerCase()} design for the {data.title.toLowerCase()}.
                    </p>
                  </div>

                  <div className="flex flex-col gap-16 items-center">
                    {/* Phone Preview */}
                    <div className="flex flex-col items-center">
                      <p className={`mb-6 text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                        Visual Preview
                      </p>
                      <div className={`relative w-[280px] aspect-[9/19] rounded-[3rem] border-[12px] ${category === 'navbar' ? 'bg-white' : 'bg-black'} shadow-2xl overflow-hidden ${isDark ? 'border-[#1a1a1a]' : 'border-zinc-800'}`}>
                        <div className="absolute top-0 inset-x-0 flex justify-center z-20 pt-3">
                          <div className="h-6 w-24 rounded-full bg-[#1a1a1a]"></div>
                        </div>

                        {(() => {
                          const preview = platform === 'react-native'
                            ? variant.reactNativePreview || variant.previewGif
                            : variant.flutterPreview || variant.previewGif;

                          if (!preview) return null;

                          return preview.includes('.mp4') ? (
                            <video
                              src={preview}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className={`absolute inset-0 h-full w-full ${category === 'navbar' ? 'object-contain object-bottom' : 'object-cover'}`}
                            />
                          ) : (
                            <img
                              src={preview}
                              alt={variant.name}
                              className={`absolute inset-0 h-full w-full ${category === 'navbar' ? 'object-contain object-bottom' : 'object-cover'}`}
                            />
                          );
                        })()}
                      </div>
                    </div>

                    {/* Expo Playground */}
                    {platform === 'react-native' && (
                      <div className="flex flex-col gap-6 w-full max-w-4xl">
                        <p className={`text-sm font-semibold uppercase tracking-wider text-center ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                          Live Playground
                        </p>
                        <div className={`overflow-hidden rounded-2xl border shadow-xl ${isDark ? 'border-white/10 bg-[#0a0a0a]' : 'border-black/10 bg-white'}`}>
                          <iframe
                            src={`https://snack.expo.dev/embedded?dependencies=gliph-ui@1.2.6,react-native-svg,lucide-react-native&name=${encodeURIComponent(variant.name)}&platform=android&theme=dark&code=${encodeURIComponent(rnLanguage === 'jsx' ? (variant.reactNativeUsageJs || variant.reactNativeUsage || variant.usage || '') : (variant.reactNativeUsage || variant.usage || ''))}`}
                            style={{ width: '100%', height: '600px', border: 0 }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      ) : (
        <>
          {/* Previews Grid */}
          <div className={`mt-16 border-t pt-16 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
            <div className={`mb-8 flex items-center justify-between gap-3 ${isDark ? 'text-white' : 'text-black'}`}>
              <div className="flex items-center gap-3">
                <PlaySquare className="text-[#38bdf8]" size={28} />
                <h3 className="text-2xl font-bold">Live Previews</h3>
              </div>
            </div>

            <div className="flex flex-col items-center gap-16">
              <div className="flex flex-col items-center w-full max-w-md">
                <p className={`mb-6 text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                  {platform === 'react-native' ? 'React Native' : 'Flutter'} Demonstration
                </p>

                <div className={`relative ${category === 'navbar' ? 'w-[240px]' : 'w-[300px]'} aspect-[9/19] rounded-[3rem] border-[12px] ${category === 'navbar' ? 'bg-white' : 'bg-black'} shadow-2xl flex items-center justify-center overflow-hidden ${isDark ? 'border-[#1a1a1a] shadow-white/5' : 'border-zinc-800 shadow-black/20'}`}>
                  {/* Notch */}
                  <div className="absolute top-0 inset-x-0 flex justify-center z-30 pt-3">
                    <div className="h-6 w-24 rounded-full bg-[#1a1a1a]"></div>
                  </div>

                  {/* Music Player Tab Switcher Overlay */}
                  {category === 'music-player' && (
                    <div className="absolute top-12 inset-x-0 z-30 px-6">
                      <div className="flex p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                        <button
                          onClick={() => setMusicPlayerTab('full')}
                          className={`flex-1 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${musicPlayerTab === 'full' ? 'bg-white text-black shadow-lg' : 'text-white/60'}`}
                        >
                          Full
                        </button>
                        <button
                          onClick={() => setMusicPlayerTab('mini')}
                          className={`flex-1 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${musicPlayerTab === 'mini' ? 'bg-white text-black shadow-lg' : 'text-white/60'}`}
                        >
                          Mini
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Loading overlay */}
                  {(platform === 'react-native' ? rnLoading : flutterLoading) && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0a0a0a] rounded-[2.2rem] gap-4">
                      {/* Spinner */}
                      <div className="relative w-12 h-12">
                        <div className="absolute inset-0 rounded-full border-[3px] border-white/10"></div>
                        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-white animate-spin"></div>
                      </div>
                      <span className="text-white/40 text-xs font-medium tracking-widest uppercase">Loading</span>
                    </div>
                  )}

                  {platform === 'react-native' ? (
                    rnGif ? (
                      rnGif.includes('.mp4') ? (
                        <video
                          key={`${category}-rn-video`}
                          src={rnGif}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className={`absolute inset-0 h-full w-full ${category === 'navbar' ? 'object-contain object-bottom' : 'object-cover'}`}
                          onCanPlayThrough={() => setRnLoading(false)}
                        />
                      ) : (
                        <img
                          key={`${category}-rn-img`}
                          src={rnGif}
                          alt={data.title}
                          className={`absolute inset-0 h-full w-full ${category === 'navbar' ? 'object-contain object-bottom' : 'object-cover'}`}
                          onLoad={() => setRnLoading(false)}
                        />
                      )
                    ) : null
                  ) : (
                    flutterGif ? (
                      flutterGif.includes('.mp4') ? (
                        <video
                          key={`${category}-flutter-video`}
                          src={flutterGif}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className={`absolute inset-0 h-full w-full ${category === 'navbar' ? 'object-contain object-bottom' : 'object-cover'}`}
                          onCanPlayThrough={() => setFlutterLoading(false)}
                        />
                      ) : (
                        <img
                          key={`${category}-flutter-img`}
                          src={flutterGif}
                          alt={data.title}
                          className={`absolute inset-0 h-full w-full ${category === 'navbar' ? 'object-contain object-bottom' : 'object-cover'}`}
                          onLoad={() => setFlutterLoading(false)}
                        />
                      )
                    ) : null
                  )}
                </div>
              </div>


              {platform === 'react-native' && (
                <div className={`flex flex-col w-full pt-8 border-t animate-in fade-in duration-500 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                  <div className="mb-6 flex items-center gap-3">
                    <PlaySquare className="text-[#38bdf8]" size={28} />
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>Live Playground</h3>
                  </div>
                  <p className={`mb-6 text-base ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                    {category === 'calendar'
                      ? 'Tap any day, open the year dropdown, or jump to today — all running live on device via Expo Go.'
                      : category === 'scale'
                        ? 'Scroll the ruler to select values, see high-fidelity feedback, and test the inertia physics.'
                        : 'Interactive momentum pickers with clean haptic-style feedback. Test the scroll physics directly in the browser.'}
                  </p>
                  <div className={`overflow-hidden rounded-2xl border shadow-xl ${isDark ? 'border-white/10 bg-[#0a0a0a]' : 'border-black/10 bg-white'}`}>
                    <iframe
                      src={`https://snack.expo.dev/embedded?dependencies=gliph-ui@1.2.6,react-native-svg,lucide-react-native&name=${encodeURIComponent(data.title)}&platform=android&theme=dark&code=${encodeURIComponent(rnLanguage === 'jsx' ? (platformData.usageJs || platformData.usage) : platformData.usage)}`}
                      style={{ width: '100%', height: '600px', border: 0 }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* API Reference */}
      <div className="mt-24">
        <h3 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-black'}`}>API Reference</h3>
        
        {platform === 'react-native' && (
          <div className="mb-8 flex gap-2">
            <button 
              onClick={() => setRnLanguage('tsx')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${rnLanguage === 'tsx' ? (isDark ? 'bg-white text-black' : 'bg-black text-white') : (isDark ? 'bg-white/5 text-white/50' : 'bg-black/5 text-black/50')}`}
            >
              TypeScript
            </button>
            <button 
              onClick={() => setRnLanguage('jsx')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${rnLanguage === 'jsx' ? (isDark ? 'bg-white text-black' : 'bg-black text-white') : (isDark ? 'bg-white/5 text-white/50' : 'bg-black/5 text-black/50')}`}
            >
              JavaScript
            </button>
          </div>
        )}

        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          <div className="space-y-12">
            <section>
              <h4 className={`text-sm font-bold uppercase tracking-widest mb-6 ${isDark ? 'text-white/30' : 'text-black/30'}`}>Usage</h4>
              <CodeBlock code={getCode()} language={platform === 'flutter' ? 'dart' : (rnLanguage === 'tsx' ? 'tsx' : 'jsx')} theme={theme} />
            </section>

            <section>
              <h4 className={`text-sm font-bold uppercase tracking-widest mb-6 ${isDark ? 'text-white/30' : 'text-black/30'}`}>Props</h4>
              <div className={`overflow-hidden rounded-2xl border ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={isDark ? 'bg-white/5' : 'bg-black/5'}>
                      <th className={`px-4 py-3 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-black/40'}`}>Prop</th>
                      <th className={`px-4 py-3 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-black/40'}`}>Type</th>
                      <th className={`px-4 py-3 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-black/40'}`}>Default</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDark ? 'divide-white/10' : 'divide-black/10'}`}>
                    {platformData.props.map((prop) => (
                      <tr key={prop.name} className={isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-black/[0.02]'}>
                        <td className="px-4 py-4">
                          <code className={`text-sm font-bold ${isDark ? 'text-[#f472b6]' : 'text-[#db2777]'}`}>{prop.name}</code>
                          <p className={`mt-1 text-xs ${isDark ? 'text-white/50' : 'text-black/50'}`}>{prop.desc}</p>
                        </td>
                        <td className="px-4 py-4">
                          <code className={`text-xs ${isDark ? 'text-[#93c5fd]' : 'text-[#2563eb]'}`}>{prop.type}</code>
                        </td>
                        <td className="px-4 py-4">
                          <code className={`text-xs ${isDark ? 'text-white/40' : 'text-black/40'}`}>{prop.default}</code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <aside className="space-y-8">
             {/* Component Specific Notes could go here */}
          </aside>
        </div>
      </div>
    </div>
  );
}
