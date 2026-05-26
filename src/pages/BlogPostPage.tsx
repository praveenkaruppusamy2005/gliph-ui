import { useParams, useNavigate, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blog';
import type { Theme } from '../types';
import { AdBanner } from '../components/AdBanner';
import { ArrowLeft, Clock, Calendar, User, Share2 } from 'lucide-react';
import { useState } from 'react';

export function BlogPostPage({ theme }: { theme: Theme }) {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const isDark = theme === 'dark';
  const [copied, setCopied] = useState(false);

  const post = BLOG_POSTS.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="py-24 text-center">
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>Article Not Found</h2>
        <p className="opacity-60 mt-2">The article you are looking for does not exist.</p>
        <Link to="/blog" className="text-pink-500 hover:underline mt-4 inline-block font-semibold">
          Back to Blog
        </Link>
      </div>
    );
  }

  const categoryColors = {
    Animations: isDark ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' : 'bg-pink-50 text-pink-700 border-pink-200',
    Performance: isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-700 border-blue-200',
    Styling: isDark ? 'bg-teal-500/10 text-teal-400 border-teal-500/20' : 'bg-teal-50 text-teal-700 border-teal-200'
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className={`py-16 md:py-24 max-w-4xl mx-auto px-4 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
      
      {/* Back to Blog */}
      <button
        onClick={() => navigate('/blog')}
        className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all mb-10 ${
          isDark 
            ? 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white' 
            : 'border-zinc-200 bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-950'
        }`}
      >
        <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
        Back to Blog
      </button>

      {/* Header Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${categoryColors[post.category]}`}>
          {post.category}
        </span>
        <span className="opacity-40">•</span>
        <div className="flex items-center gap-1.5 text-xs opacity-60 font-medium">
          <Calendar size={13} />
          <span>{post.date}</span>
        </div>
        <span className="opacity-40">•</span>
        <div className="flex items-center gap-1.5 text-xs opacity-60 font-medium">
          <Clock size={13} />
          <span>{post.readTime}</span>
        </div>
      </div>

      {/* Main Title */}
      <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-8 leading-[1.15] ${isDark ? 'text-white' : 'text-zinc-900'}`}>
        {post.title}
      </h1>

      {/* Author Details & Share */}
      <div className={`flex items-center justify-between py-6 border-y mb-12 ${isDark ? 'border-white/5' : 'border-zinc-200'}`}>
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold ${
            isDark ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-700'
          }`}>
            <User size={18} />
          </div>
          <div>
            <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>{post.author}</h4>
            <p className="text-xs opacity-50">Publisher & Contributor</p>
          </div>
        </div>

        <button
          onClick={handleShare}
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-all relative ${
            isDark 
              ? 'border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white' 
              : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
          }`}
        >
          <Share2 size={13} />
          <span>{copied ? 'Link Copied!' : 'Share'}</span>
        </button>
      </div>

      {/* Article Content */}
      <div 
        className="prose dark:prose-invert max-w-none text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Controlled Ad Placement Banner (Only on this content-rich screen) */}
      <div className={`mt-16 pt-8 border-t ${isDark ? 'border-white/5' : 'border-zinc-200'}`}>
        <p className="text-center text-[10px] uppercase font-bold tracking-widest opacity-35 mb-2">Advertisement</p>
        <AdBanner adSlot="9364237744" className="mt-2" />
      </div>

      {/* Bottom Newsletter/CTA Widget */}
      <div className={`mt-16 p-8 rounded-3xl border glass-panel shadow-xl text-center relative overflow-hidden ${
        isDark ? 'border-white/[0.05] bg-zinc-950/45' : 'border-zinc-250 bg-white'
      }`}>
        <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>Want more premium components?</h3>
        <p className="text-sm opacity-70 mb-6 max-w-lg mx-auto">
          Explore our interactive collections for React Native and Flutter or check out our high-fidelity libraries on GitHub.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/components"
            className={`rounded-full px-6 py-2.5 text-xs font-black shadow transition duration-200 hover:-translate-y-0.5 ${
              isDark ? 'bg-white text-zinc-950 hover:bg-zinc-200' : 'bg-zinc-900 text-white hover:bg-zinc-800'
            }`}
          >
            Explore React Native Components
          </Link>
          <Link
            to="/flutter/components"
            className={`rounded-full border px-6 py-2.5 text-xs font-black transition duration-200 hover:-translate-y-0.5 ${
              isDark ? 'border-zinc-800 text-zinc-300 hover:bg-zinc-900' : 'border-zinc-200 text-zinc-650 hover:bg-zinc-50'
            }`}
          >
            Explore Flutter Components
          </Link>
        </div>
      </div>

    </article>
  );
}
