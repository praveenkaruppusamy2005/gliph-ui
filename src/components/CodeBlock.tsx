import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import type { Theme } from '../types';

export function CodeBlock({ code, language, theme }: { code: string, language: string, theme: Theme }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isDark = theme === 'dark';

  return (
    <div className={`relative group w-full max-w-full overflow-hidden rounded-2xl border ${isDark ? 'border-white/10 bg-[#0d0d0d]' : 'border-black/10 bg-zinc-50'} p-6 shadow-2xl transition hover:border-blue-500/30`}>
      <button
        onClick={copyToClipboard}
        className={`absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${isDark ? 'border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white' : 'border-black/10 bg-black/5 text-black/50 hover:bg-black/10 hover:text-black'} opacity-0 group-hover:opacity-100`}
        title="Copy code"
      >
        {copied ? <Check size={18} className="text-[#4ade80]" /> : <Copy size={18} />}
      </button>
      <div className={`absolute right-16 top-6 z-10 text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-white/20' : 'text-black/20'}`}>
        {language}
      </div>
      <div 
        className="w-full max-w-full overflow-x-auto overflow-y-hidden pb-4" 
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <pre className={`pt-1 text-[14px] leading-relaxed whitespace-pre md:whitespace-pre-wrap md:break-words selection:bg-[#38bdf8]/30 ${isDark ? 'text-[#c9d1d9]' : 'text-zinc-800'}`} style={{ fontFamily: '"Fira Code", "JetBrains Mono", monospace' }}>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
