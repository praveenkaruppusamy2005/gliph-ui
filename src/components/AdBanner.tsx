import { useEffect } from 'react';

interface AdBannerProps {
  adSlot?: string;
  className?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
}

export function AdBanner({ adSlot = '4101818143', className = '', format = 'auto' }: AdBannerProps) {
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    if (!isDev) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense initialization error:', err);
      }
    }
  }, [isDev, adSlot]);

  if (isDev) {
    // Elegant, premium-looking placeholder for local development
    return (
      <div className={`my-8 p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden glass-panel shadow-lg ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 to-indigo-500/5 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center py-4">
          <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-zinc-800 text-pink-400 border border-zinc-700/50 mb-2">
            AdSense Placeholder
          </span>
          <h4 className="font-extrabold text-sm tracking-tight text-white/80">Sponsored Advertisement</h4>
          <p className="text-xs text-white/40 mt-1 max-w-md">
            This ad slot (ID: <code className="text-pink-400 font-mono">{adSlot}</code>) will display active AdSense units when deployed to production.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`my-8 overflow-hidden flex justify-center w-full min-h-[90px] ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-9390891415071406"
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
