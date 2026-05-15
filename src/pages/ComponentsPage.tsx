import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Clock, Scale, ListFilter, Calendar, Headphones } from 'lucide-react';
import type { Platform, Theme, Category } from '../types';
import { CATEGORY_IDS } from '../data/categories';
import { CategoryDetails } from '../components/CategoryDetails';

const SIDEBAR_COMPONENTS = [
  { id: 'navbar', title: 'Navbar', icon: <ListFilter size={18} /> },
  { id: 'scale', title: 'Scale Picker', icon: <Scale size={18} /> },
  { id: 'time', title: 'Time Picker', icon: <Clock size={18} /> },
  { id: 'date', title: 'Date Picker', icon: <Calendar size={18} /> },
  { id: 'weight', title: 'Weight Picker', icon: <Scale size={18} className="rotate-90" /> },
  { id: 'value', title: 'Value Picker', icon: <ListFilter size={18} className="rotate-90" /> },
  { id: 'calendar', title: 'Calendar Picker', icon: <Calendar size={18} /> },
  { id: 'music-player', title: 'Gliph Player', icon: <Headphones size={18} /> },
];

export function ComponentsPage({ platform, theme }: { platform: Platform, theme: Theme }) {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: Category }>();
  const [activeCategory, setActiveCategory] = useState<Category | null>(categoryId || null);
  const isDark = theme === 'dark';

  const componentsBasePath = platform === 'react-native' ? '/components' : '/flutter/components';

  useEffect(() => {
    setActiveCategory(categoryId || null);
  }, [categoryId]);

  const openCategory = (id: Category) => {
    navigate(`${componentsBasePath}/${id}`);
  };

  return (
    <section className="flex flex-col lg:flex-row gap-12 lg:gap-20">
      <aside className="w-full lg:w-64 lg:shrink-0 pt-10">
        <div className="mb-8 px-3">
          <h3 className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-white/30' : 'text-black/30'}`}>
            Pickers & Inputs
          </h3>
        </div>
        <nav className="flex flex-col gap-1">
          {SIDEBAR_COMPONENTS.map((comp) => (
            <button
              key={comp.id}
              onClick={() => openCategory(comp.id as Category)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === comp.id
                ? (isDark ? 'bg-white/10 text-white font-semibold' : 'bg-black/8 text-black font-semibold')
                : (isDark ? 'text-white/60 hover:bg-white/5 hover:text-white' : 'text-black/60 hover:bg-black/5 hover:text-black')
                }`}
            >
              <span className={activeCategory === comp.id ? (isDark ? 'text-[#f472b6]' : 'text-[#db2777]') : ''}>{comp.icon}</span>
              {comp.title}
            </button>
          ))}
        </nav>
      </aside>

      <div className="w-full max-w-5xl pt-10 pb-32">
        {activeCategory === null ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-start justify-center min-h-[60vh]">
            <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Components</h2>
            <p className={`text-lg max-w-lg ${isDark ? 'text-white/50' : 'text-black/50'}`}>
              Select a component from the sidebar to view its documentation, usage examples, and props.
            </p>
          </div>
        ) : (
          <CategoryDetails 
            category={activeCategory} 
            platform={platform} 
            onBack={() => navigate(componentsBasePath)} 
            theme={theme} 
          />
        )}
      </div>
    </section>
  );
}
