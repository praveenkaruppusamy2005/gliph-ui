import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blog';
import type { Theme } from '../types';
import { BookOpen, Clock, ChevronRight } from 'lucide-react';

export function BlogPage({ theme }: { theme: Theme }) {
  const navigate = useNavigate();
  const isDark = theme === 'dark';
  const [activeFilter, setActiveFilter] = useState<'All' | 'Animations' | 'Performance' | 'Styling'>('All');

  const filteredPosts = BLOG_POSTS.filter(post => 
    activeFilter === 'All' ? true : post.category === activeFilter
  );

  return (
    <div className={`py-16 md:py-24 max-w-6xl mx-auto px-4 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
      
      {/* Decorative Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <div className={`absolute top-20 right-10 w-96 h-96 rounded-full blur-[130px] opacity-25 transition-colors duration-1000 ${isDark ? 'bg-pink-500/10' : 'bg-pink-200/30'}`} />
        <div className={`absolute bottom-20 left-10 w-80 h-80 rounded-full blur-[140px] opacity-20 transition-colors duration-1000 ${isDark ? 'bg-violet-500/10' : 'bg-violet-200/20'}`} />
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
        <h1 className={`text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl ${isDark ? 'text-white' : 'text-zinc-900'}`}>
          The Gliph UI Blog
        </h1>
        <p className="mt-4 text-lg sm:text-xl opacity-75 font-medium">
          Guides, performance tuning, and technical deep-dives into React Native and Flutter mobile development.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {(['All', 'Animations', 'Performance', 'Styling'] as const).map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-2 text-xs font-bold transition-all border cursor-pointer ${
                activeFilter === filter
                  ? (isDark ? 'bg-white text-black border-white shadow-lg' : 'bg-zinc-900 text-white border-zinc-900 shadow-md')
                  : (isDark ? 'border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white bg-zinc-950/40' : 'border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 bg-white')
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => {
          const categoryColors = {
            Animations: isDark ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' : 'bg-pink-50 text-pink-700 border-pink-200',
            Performance: isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-700 border-blue-200',
            Styling: isDark ? 'bg-teal-500/10 text-teal-400 border-teal-500/20' : 'bg-teal-50 text-teal-700 border-teal-200'
          };

          return (
            <article 
              key={post.id}
              onClick={() => navigate(`/blog/${post.id}`)}
              className={`flex flex-col rounded-3xl border glass-panel p-6 shadow-xl cursor-pointer hover:-translate-y-1.5 transition-all duration-300 group ${
                isDark 
                  ? 'border-white/[0.05] bg-zinc-950/40 hover:border-white/[0.15] hover:bg-[#0c0c11]' 
                  : 'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-slate-50'
              }`}
            >
              {/* Header Meta */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${categoryColors[post.category]}`}>
                  {post.category}
                </span>
                <span className="text-[10px] opacity-40 font-bold">•</span>
                <div className="flex items-center gap-1 text-[10px] opacity-50 font-bold">
                  <Clock size={10} />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className={`text-xl font-bold tracking-tight mb-3 group-hover:text-pink-500 transition-colors leading-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                {post.title}
              </h3>

              {/* Summary */}
              <p className="text-sm opacity-70 mb-6 flex-1 leading-relaxed">
                {post.summary}
              </p>

              {/* Action Footer */}
              <div className={`flex items-center gap-1.5 text-xs font-bold pt-4 border-t mt-auto transition-colors ${
                isDark ? 'border-white/5 text-zinc-400 group-hover:text-white' : 'border-zinc-100 text-zinc-500 group-hover:text-zinc-900'
              }`}>
                <span>Read Full Guide</span>
                <ChevronRight size={13} className="transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          );
        })}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-20">
          <BookOpen className="mx-auto text-zinc-500 mb-4 opacity-40" size={44} />
          <h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>No articles found</h4>
          <p className="text-sm opacity-60">Check back later for new guides in this category.</p>
        </div>
      )}

    </div>
  );
}
