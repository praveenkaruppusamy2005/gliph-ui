import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import type { Theme } from './types';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { ComponentsPage } from './pages/ComponentsPage';
import { MusicPlayerDocsPage } from './pages/MusicPlayerDocsPage';
import { PricingPage } from './pages/PricingPage';

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'dark';
  });

  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Handle SEO Meta Tags and Titles
  useEffect(() => {
    const description = document.querySelector('meta[name="description"]');
    
    if (currentPath === '/musicplayer' || currentPath === '/react-native-gliph-player') {
      document.title = "React Native Gliph Player - Cinematic Audio UI Kit";
      description?.setAttribute('content', 'Cinematic React Native audio player with background playback, lock-screen controls, mini-player, and animated transitions.');
    } else if (currentPath.startsWith('/components')) {
      document.title = "Gliph UI - Premium React Native & Flutter Components";
      description?.setAttribute('content', 'Beautifully crafted, animated mobile components for React Native and Flutter. Scale pickers, date selectors, navbars and more.');
    } else if (currentPath.startsWith('/flutter')) {
      document.title = "Gliph UI - Premium Flutter Components";
      description?.setAttribute('content', 'Premium Flutter components with smooth animations and glassmorphism design. Copy-paste ready for your next app.');
    } else {
      document.title = "Gliph UI - Beautiful React Native & Flutter Components";
      description?.setAttribute('content', 'The open-source library for premium mobile UI. Animated pickers, cinematic players, and glassmorphism components.');
    }
    
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [currentPath]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-white text-black'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Header theme={theme} toggleTheme={toggleTheme} />
        
        <main>
          <Routes>
            {/* React Native Routes */}
            <Route path="/" element={<HomePage platform="react-native" theme={theme} />} />
            <Route path="/components" element={<ComponentsPage platform="react-native" theme={theme} />} />
            <Route path="/components/:categoryId" element={<ComponentsPage platform="react-native" theme={theme} />} />
            
            {/* Flutter Routes */}
            <Route path="/flutter" element={<HomePage platform="flutter" theme={theme} />} />
            <Route path="/flutter/components" element={<ComponentsPage platform="flutter" theme={theme} />} />
            <Route path="/flutter/components/:categoryId" element={<ComponentsPage platform="flutter" theme={theme} />} />
            
            {/* Shared Pages */}
            <Route path="/musicplayer" element={<MusicPlayerDocsPage theme={theme} />} />
            <Route path="/react-native-gliph-player" element={<MusicPlayerDocsPage theme={theme} />} />
            <Route path="/pricing" element={<PricingPage theme={theme} />} />
            
            {/* Fallback */}
            <Route path="*" element={<HomePage platform="react-native" theme={theme} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
