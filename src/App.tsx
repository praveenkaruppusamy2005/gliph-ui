import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import type { Theme } from './types';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { ComponentsPage } from './pages/ComponentsPage';
import { MusicPlayerDocsPage } from './pages/MusicPlayerDocsPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { AboutPage } from './pages/AboutPage';
import { Footer } from './components/Footer';
import { BLOG_POSTS } from './data/blog';

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
    } else if (currentPath === '/blog') {
      document.title = "Gliph UI Blog - Mobile Development & Optimization Guides";
      description?.setAttribute('content', 'Guides, tutorials, and deep-dives into mobile styling, Flutter painting, and React Native animations.');
    } else if (currentPath.startsWith('/blog/')) {
      const postId = currentPath.split('/blog/')[2] || currentPath.split('/blog/')[1];
      const post = BLOG_POSTS.find(p => p.id === postId);
      if (post) {
        document.title = `${post.title} - Gliph UI Blog`;
        description?.setAttribute('content', post.summary);
      }
    } else if (currentPath === '/privacy-policy') {
      document.title = "Privacy Policy - Gliph UI";
      description?.setAttribute('content', 'Privacy Policy for Gliph UI open-source mobile components library.');
    } else if (currentPath === '/terms-of-service') {
      document.title = "Terms of Service - Gliph UI";
      description?.setAttribute('content', 'Terms of Service for using Gliph UI open-source code and components.');
    } else if (currentPath === '/about') {
      document.title = "About Us & Contact - Gliph UI";
      description?.setAttribute('content', 'Learn about Gliph UI component vision and contact our development team.');
    } else {
      document.title = "Gliph UI - Beautiful React Native & Flutter Components";
      description?.setAttribute('content', 'The open-source library for premium mobile UI. Animated pickers, cinematic players, and glassmorphism components.');
    }
    
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [currentPath]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <div className={`min-h-screen transition-colors duration-500 relative overflow-hidden ${theme === 'dark' ? 'text-white bg-[#0a0a0a]' : 'text-slate-900 bg-slate-50'}`}>
      
      <Header theme={theme} toggleTheme={toggleTheme} />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            <Route path="/musicplayer" element={<MusicPlayerDocsPage theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="/react-native-gliph-player" element={<MusicPlayerDocsPage theme={theme} toggleTheme={toggleTheme} />} />
            
            {/* Blog & Resources */}
            <Route path="/blog" element={<BlogPage theme={theme} />} />
            <Route path="/blog/:postId" element={<BlogPostPage theme={theme} />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage theme={theme} />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage theme={theme} />} />
            <Route path="/about" element={<AboutPage theme={theme} />} />

            {/* Fallback */}
            <Route path="*" element={<HomePage platform="react-native" theme={theme} />} />
          </Routes>
        </main>
      </div>

      <Footer theme={theme} />
      <Analytics />
    </div>
  );
}
