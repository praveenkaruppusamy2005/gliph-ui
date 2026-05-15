import React, { useState, useEffect } from 'react';
import { Clock, Scale, ListFilter, ChevronLeft, Terminal, Code2, PlaySquare, Play, Calendar, Smartphone, Copy, Check, Settings, Layout, Zap, Sun, Moon, Ruler, Sparkles, Headphones, Radio, Volume2, Disc3 } from 'lucide-react';

type Platform = 'react-native' | 'flutter';
type Theme = 'light' | 'dark';

function CodeBlock({ code, language, theme }: { code: string, language: string, theme: Theme }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isDark = theme === 'dark';

  return (
    <div className={`relative group rounded-2xl border ${isDark ? 'border-white/10 bg-[#0d0d0d]' : 'border-black/10 bg-zinc-50'} p-6 shadow-2xl transition hover:border-blue-500/30`}>
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
      <pre className={`overflow-x-auto text-[14px] leading-relaxed whitespace-pre-wrap selection:bg-[#38bdf8]/30 ${isDark ? 'text-[#c9d1d9]' : 'text-zinc-800'}`} style={{ fontFamily: '"Fira Code", "JetBrains Mono", monospace' }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Header({ platform, navigate, theme, toggleTheme }: { platform: Platform, navigate: (path: string) => void, theme: Theme, toggleTheme: () => void }) {
  const isRN = platform === 'react-native';
  const basePath = isRN ? '' : '/flutter';
  const componentsPath = isRN ? '/components' : '/flutter/components';
  const isDark = theme === 'dark';

  return (
    <>
      <header className="flex h-24 items-center justify-between">
        <a
          className={`flex items-center gap-3 text-2xl font-bold cursor-pointer ${isDark ? 'text-white' : 'text-black'}`}
          onClick={(e) => { e.preventDefault(); navigate(basePath || '/'); }}
          href={basePath || '/'}
        >
          Gliph UI
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${isDark ? 'bg-white/75 text-black' : 'bg-black/75 text-white'}`}>
            Beta
          </span>
        </a>

        <nav className={`hidden items-center gap-10 text-sm font-semibold md:flex ${isDark ? 'text-white/85' : 'text-black/70'}`}>
          <a
            className="transition hover:text-blue-500 cursor-pointer"
            onClick={(e) => { e.preventDefault(); navigate(componentsPath); }}
            href={componentsPath}
          >
            Components
          </a>
          {isRN && (
            <a
              className="transition hover:text-blue-500 cursor-pointer"
              onClick={(e) => { e.preventDefault(); navigate('/musicplayer'); }}
              href="/musicplayer"
            >
              Music Player
            </a>
          )}
          <a className="transition hover:text-blue-500" href="/pricing">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-3 sm:gap-6">
          <button
            onClick={toggleTheme}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${isDark ? 'border-white/10 bg-white/5 text-white hover:bg-white/15' : 'border-black/10 bg-black/5 text-black hover:bg-black/10'}`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <a
            className={`hidden sm:flex text-sm font-semibold transition hover:text-blue-500 cursor-pointer ${isDark ? 'text-white/70' : 'text-black/60'}`}
            onClick={(e) => { e.preventDefault(); navigate(isRN ? '/flutter' : '/'); }}
            href={isRN ? "/flutter" : "/"}
          >
            {isRN ? "Are you a Flutter developer?" : "Switch to React Native"}
          </a>

          <a
            className={`rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold shadow-xl transition duration-200 hover:-translate-y-0.5 cursor-pointer ${isDark ? 'bg-white text-black hover:bg-zinc-200 shadow-white/5' : 'bg-black text-white hover:bg-zinc-800 shadow-black/5'}`}
            onClick={(e) => { e.preventDefault(); navigate(componentsPath); }}
            href={componentsPath}
          >
            Get Started
          </a>
        </div>
      </header>

      {/* Mobile Only Platform Switcher */}
      <div className="sm:hidden mb-6">
        <button
          onClick={() => navigate(isRN ? '/flutter' : '/')}
          className={`w-full py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${isDark ? 'border-white/10 bg-white/5 text-white/70 active:bg-white/10' : 'border-black/10 bg-black/5 text-black/70 active:bg-black/10'}`}
        >
          {isRN ? <Smartphone size={14} className="text-[#38bdf8]" /> : <Code2 size={14} className="text-[#61dafb]" />}
          {isRN ? "Are you a Flutter developer?" : "Switch to React Native"}
        </button>
      </div>
    </>
  );
}

function HomePage({ platform, navigate, theme }: { platform: Platform, navigate: (path: string) => void, theme: Theme }) {
  const isRN = platform === 'react-native';
  const isDark = theme === 'dark';

  return (
    <section className="flex flex-col min-h-[calc(100vh-6rem)] justify-center py-8 lg:py-0">
      <div className="max-w-3xl">
        <h1 className={`text-5xl font-bold leading-[1.08] sm:text-6xl lg:text-7xl ${isDark ? 'text-white' : 'text-black'}`}>
          Supercharge your
          <span className={`block ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{isRN ? 'React Native' : 'Flutter'}</span>
          development
        </h1>

        <p className={`mt-8 max-w-2xl text-lg font-medium leading-8 ${isDark ? 'text-white/60' : 'text-black/60'}`}>
          Ready-to-use {isRN ? 'React Native' : 'Flutter'} components crafted for clean mobile
          interfaces. Copy, customize, and ship polished screens faster.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button
            onClick={() => navigate(isRN ? '/components' : '/flutter/components')}
            className={`rounded-xl px-6 py-3.5 text-center text-base font-bold shadow-2xl transition duration-200 hover:-translate-y-0.5 ${isDark ? 'bg-white text-black hover:bg-zinc-200 shadow-white/5' : 'bg-black text-white hover:bg-zinc-800 shadow-black/5'}`}
          >
            Browse {isRN ? 'RN' : 'Flutter'} Components
          </button>
        </div>
      </div>
    </section>
  );
}


type Category = 'time' | 'weight' | 'value' | 'date' | 'scale' | 'calendar' | 'navbar' | 'music-player';

interface PickerProp {
  name: string;
  type: string;
  default: string;
  desc: string;
}

interface PlatformData {
  previewGif?: string;
  usage: string;
  usageJs?: string;
  props: PickerProp[];
}

interface Variant {
  name: string;
  reactNativePreview?: string;
  flutterPreview?: string;
  previewGif?: string;
  reactNativeUsage?: string;
  reactNativeUsageJs?: string;
  flutterUsage?: string;
  usage: string; // fallback
}

interface CategoryData {
  title: string;
  description: string;
  previewGif?: string;
  reactNative: PlatformData;
  flutter: PlatformData;
  variants?: Variant[];
}

const CATEGORY_CONTENT: Record<Category, CategoryData> = {
  navbar: {
    title: 'Navbar',
    description: 'A premium, animated glassmorphism navbar with spring physics and custom icon support.',
    reactNative: {
      previewGif: 'https://www.dropbox.com/scl/fi/jtgtmlmuzhcrce569ml8a/SVID_20260510_170411_1.gif?rlkey=al5h4its78i3q2cun7xjfkdj0&st=o9e36gp1&dl=1',
      usage: `import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Navbar } from 'gliph-ui';
import { Home, Search, User, Plus } from 'lucide-react-native';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <View style={styles.container}>
      <Navbar
        variant="floating"
        tabs={[
          { 
            id: 'home', 
            label: 'Home', 
            icon: (c, s) => <Home color={c} size={s} />,
            activeIcon: (c, s) => <Home color={c} size={s} strokeWidth={3} />
          },
          { id: 'search', label: 'Search', icon: (c, s) => <Search color={c} size={s} /> },
          { id: 'profile', label: 'Profile', icon: (c, s) => <User color={c} size={s} /> }
        ]}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id)}
        actionButton={{
          icon: (c, s) => <Plus color="#fff" size={s} />,
          onPress: () => console.log('Action Pressed'),
          color: '#6366f1'
        }}
        activeScale={1.3}
        iconSize={22}
        height={70}
        bottom={30}
        theme={{
          background: 'rgba(18, 18, 24, 0.85)',
          activeColor: '#6366f1',
          indicatorColor: 'rgba(99, 102, 241, 0.15)',
          borderColor: 'rgba(255, 255, 255, 0.1)'
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' }
});`,
      usageJs: `import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Navbar } from 'gliph-ui';
import { Home, Search, User, Plus } from 'lucide-react-native';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <View style={styles.container}>
      <Navbar
        variant="floating"
        tabs={[
          { id: 'home', label: 'Home', icon: (c, s) => <Home color={c} size={s} /> },
          { id: 'search', label: 'Search', icon: (c, s) => <Search color={c} size={s} /> },
          { id: 'profile', label: 'Profile', icon: (c, s) => <User color={c} size={s} /> }
        ]}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id)}
        actionButton={{
          icon: (c, s) => <Plus color="#fff" size={s} />,
          onPress: () => console.log('Action Pressed'),
          color: '#6366f1'
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' }
});`,
      props: [
        { name: 'variant', type: "'floating' | 'classic' | 'minimal' | 'ios'", default: "'floating'", desc: 'The visual style of the navbar.' },
        { name: 'tabs', type: 'NavbarTab[]', default: 'required', desc: 'Array of tab configurations. See Tab Props below.' },
        { name: 'activeTab', type: 'string', default: 'required', desc: 'ID of the currently selected tab.' },
        { name: 'onTabChange', type: '(id: string) => void', default: 'required', desc: 'Callback function triggered on tab press.' },
        { name: 'actionButton', type: 'ActionButtonProps', default: 'undefined', desc: 'Optional center action button configuration { icon, onPress, color }.' },
        { name: 'width', type: 'number | string', default: 'SCREEN_WIDTH - 40', desc: 'Total width of the navbar container.' },
        { name: 'height', type: 'number', default: '70', desc: 'Height of the navbar container.' },
        { name: 'bottom', type: 'number', default: '30', desc: 'Vertical offset from the bottom of the screen.' },
        { name: 'borderRadius', type: 'number', default: '35', desc: 'Corner radius of the navbar.' },
        { name: 'padding', type: 'number', default: '5', desc: 'Horizontal padding inside the container.' },
        { name: 'showIndicator', type: 'boolean', default: 'true', desc: 'Whether to show the animated active indicator pill.' },
        { name: 'indicatorHeight', type: 'number', default: '50', desc: 'Height of the active indicator pill.' },
        { name: 'indicatorBorderRadius', type: 'number', default: '25', desc: 'Corner radius of the indicator pill.' },
        { name: 'iconSize', type: 'number', default: '24', desc: 'Base size for tab icons.' },
        { name: 'activeScale', type: 'number', default: '1.25', desc: 'Scaling factor for the active tab icon.' }
      ]
    },
    variants: [
      {
        name: 'Floating',
        reactNativePreview: 'https://www.dropbox.com/scl/fi/4itsw2gk2jbro5urcpfmv/SVID_20260510_175553_1.gif?rlkey=zzz269muydo8udcpgxuaoy2tf&st=hzf5acaa&dl=1',
        flutterPreview: 'https://www.dropbox.com/scl/fi/yttjp5wexsyz5utnqg3g3/SVID_20260510_221611_2.mp4?rlkey=1ux0ay9ysxp8fkwghriyqkqny&st=wrpv81ew&dl=1',
        reactNativeUsage: `import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Navbar } from 'gliph-ui';
import { Home, Search, User, Plus } from 'lucide-react-native';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <View style={styles.container}>
      <Navbar
        variant="floating"
        tabs={[
          { id: 'home', label: 'Home', icon: (c, s) => <Home color={c} size={s} /> },
          { id: 'search', label: 'Search', icon: (c, s) => <Search color={c} size={s} /> },
          { id: 'profile', label: 'Profile', icon: (c, s) => <User color={c} size={s} /> }
        ]}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id)}
        
        /**
         * Optional: Floating action button configuration.
         */
        actionButton={{
          icon: (c, s) => <Plus color="#fff" size={s} />,
          onPress: () => console.log('Action Pressed'),
          color: '#6366f1'
        }}

        /**
         * Visual fine-tuning
         */
        activeScale={1.3}  // Scale factor for active icon
        iconSize={22}      // Size of icons in pixels
        height={70}        // Navbar height
        bottom={30}        // Offset from screen bottom

        /**
         * Theme customization
         */
        theme={{
          background: 'rgba(18, 18, 24, 0.85)',
          activeColor: '#6366f1',
          indicatorColor: 'rgba(99, 102, 241, 0.15)',
          borderColor: 'rgba(255, 255, 255, 0.1)'
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' }
});`,
        flutterUsage: `import 'package:flutter/material.dart';
import 'package:gliph_ui/gliph_ui.dart';

void main() => runApp(const MyApp());

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  String _activeTab = 'home';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.black,
        bottomNavigationBar: Navbar(
          variant: NavbarVariant.floating,
          activeTab: _activeTab,
          onTabChange: (id) => setState(() => _activeTab = id),
          tabs: [
            NavbarTab(
              id: 'home',
              label: 'Home',
              icon: (c, s) => Icon(Icons.home_outlined, color: c, size: s),
              activeIcon: (c, s) => Icon(Icons.home, color: c, size: s),
            ),
            NavbarTab(
              id: 'search',
              label: 'Search',
              icon: (c, s) => Icon(Icons.search, color: c, size: s),
            ),
            NavbarTab(
              id: 'profile',
              label: 'Profile',
              icon: (c, s) => Icon(Icons.person_outline, color: c, size: s),
            ),
          ],
          actionButton: ActionButtonObj(
            icon: (c, s) => Icon(Icons.add, color: Colors.white, size: s),
            onPress: () => print('Action Pressed'),
            color: const Color(0xFF6366F1),
          ),
        ),
      ),
    );
  }`,
        usage: `// ... Same as basic usage with variant="floating"`
      },
      {
        name: 'Classic',
        reactNativePreview: 'https://www.dropbox.com/scl/fi/p5rfxpwd6nukl60uz68z7/SVID_20260510_175614_1.mp4?rlkey=6wwnt6wja6v8oje3x1ot4g94r&st=pi7e1wfs&dl=1',
        flutterPreview: 'https://www.dropbox.com/scl/fi/mhrx3jd8imyqkyeylfoib/SVID_20260510_221703_1.mp4?rlkey=jcog8hhbyochnl5lec37wac05&st=zauzyI0n&dl=1',
        reactNativeUsage: `import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Navbar } from 'gliph-ui';
import { Home, Search, User, Plus } from 'lucide-react-native';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <View style={styles.container}>
      <Navbar
        variant="classic"
        tabs={[
          { id: 'home', label: 'Home', icon: (c, s) => <Home color={c} size={s} /> },
          { id: 'search', label: 'Search', icon: (c, s) => <Search color={c} size={s} /> },
          { id: 'profile', label: 'Profile', icon: (c, s) => <User color={c} size={s} /> }
        ]}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' }
});`,
        flutterUsage: `import 'package:flutter/material.dart';
import 'package:gliph_ui/gliph_ui.gov';

void main() => runApp(const MyApp());

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  String _activeTab = 'home';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.black,
        bottomNavigationBar: Navbar(
          variant: NavbarVariant.classic,
          activeTab: _activeTab,
          onTabChange: (id) => setState(() => _activeTab = id),
          
          /**
           * Visual customization.
           */
          height: 70.0,
          iconSize: 24.0,

          /**
           * Theme customization.
           */
          theme: const NavbarTheme(
            background: Color(0xFF0A0A0A),
            activeColor: Color(0xFF6366F1),
            inactiveColor: Color(0xFF4B5563),
          ),
          tabs: [
            NavbarTab(
              id: 'home',
              label: 'Home',
              icon: (c, s) => Icon(Icons.home_outlined, color: c, size: s),
            ),
            NavbarTab(
              id: 'search',
              label: 'Search',
              icon: (c, s) => Icon(Icons.search, color: c, size: s),
            ),
            NavbarTab(
              id: 'profile',
              label: 'Profile',
              icon: (c, s) => Icon(Icons.person_outline, color: c, size: s),
            ),
          ],
        ),
      ),
    );
  }`,
        usage: `// ... Same as basic usage with variant="classic"`
      },
      {
        name: 'Minimal',
        reactNativePreview: 'https://www.dropbox.com/scl/fi/swztrtal3ao8zhv8x50tc/SVID_20260510_175630_1.mp4?rlkey=3omvdiea8nixxdg60urc94tfe&st=87unlzl7&dl=1',
        flutterPreview: 'https://www.dropbox.com/scl/fi/pf5fd0kuqwdi1dac8cyxc/SVID_20260510_221859_1.mp4?rlkey=nip0gurj6q6x4d3qxyoha1y6o&st=ki8pjalg&dl=1',
        reactNativeUsage: `import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Navbar } from 'gliph-ui';
import { Home, Search, User, Plus } from 'lucide-react-native';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <View style={styles.container}>
      <Navbar
        variant="minimal"
        tabs={[
          { id: 'home', label: 'Home', icon: (c, s) => <Home color={c} size={s} /> },
          { id: 'search', label: 'Search', icon: (c, s) => <Search color={c} size={s} /> },
          { id: 'profile', label: 'Profile', icon: (c, s) => <User color={c} size={s} /> }
        ]}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id)}

        /**
         * Visual fine-tuning
         */
        height={60}        // Reduced height for minimal look
        iconSize={22}      // Slightly smaller icons
        
        /**
         * In minimal variant, the background is transparent by default.
         * You can still customize active/inactive colors.
         */
        theme={{
          activeColor: '#f43f5e',
          inactiveColor: '#94a3b8',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' }
});`,
        flutterUsage: `import 'package:flutter/material.dart';
import 'package:gliph_ui/gliph_ui.dart';

void main() => runApp(const MyApp());

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  String _activeTab = 'home';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.black,
        bottomNavigationBar: Navbar(
          variant: NavbarVariant.minimal,
          activeTab: _activeTab,
          onTabChange: (id) => setState(() => _activeTab = id),
          
          /**
           * Visual customization.
           */
          height: 60.0,
          iconSize: 22.0,

          /**
           * Theme customization.
           */
          theme: const NavbarTheme(
            activeColor: Color(0xFFF43F5E),
            inactiveColor: Color(0xFF94A3B8),
          ),
          tabs: [
            NavbarTab(
              id: 'home',
              label: 'Home',
              icon: (c, s) => Icon(Icons.home_outlined, color: c, size: s),
            ),
            NavbarTab(
              id: 'search',
              label: 'Search',
              icon: (c, s) => Icon(Icons.search, color: c, size: s),
            ),
            NavbarTab(
              id: 'profile',
              label: 'Profile',
              icon: (c, s) => Icon(Icons.person_outline, color: c, size: s),
            ),
          ],
        ),
      ),
    );
  }`,
        usage: `// ... Same as basic usage with variant="minimal"`
      },
      {
        name: 'IOS',
        reactNativePreview: 'https://www.dropbox.com/scl/fi/2bx3b0gfbrrod6xwd5cdq/SVID_20260510_175648_1.mp4?rlkey=31v8wz8hir01sgmj32ydiox7t&st=67pt0s3g&dl=1',
        flutterPreview: 'https://www.dropbox.com/scl/fi/xb5k2wbd5457f74qmbef2/SVID_20260510_221935_1.mp4?rlkey=l221u8t3nods46x2uekqppfk8&st=au5vdnsg&dl=1',
        reactNativeUsage: `import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Navbar } from 'gliph-ui';
import { Home, Search, User, Plus } from 'lucide-react-native';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <View style={styles.container}>
      <Navbar
        variant="ios"
        tabs={[
          { id: 'home', label: 'Home', icon: (c, s) => <Home color={c} size={s} /> },
          { id: 'search', label: 'Search', icon: (c, s) => <Search color={c} size={s} /> },
          { id: 'profile', label: 'Profile', icon: (c, s) => <User color={c} size={s} /> }
        ]}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id)}

        /**
         * Visual fine-tuning
         */
        height={65}
        iconSize={24}
        
        /**
         * Theme customization
         */
        theme={{
          background: 'rgba(255, 255, 255, 0.9)',
          activeColor: '#007aff', // iOS Blue
          inactiveColor: '#8e8e93',
          indicatorColor: '#007aff', // iOS bottom indicator line
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' }
});`,
        flutterUsage: `import 'package:flutter/material.dart';
import 'package:gliph_ui/gliph_ui.dart';

void main() => runApp(const MyApp());

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  String _activeTab = 'home';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.black,
        bottomNavigationBar: Navbar(
          variant: NavbarVariant.ios,
          activeTab: _activeTab,
          onTabChange: (id) => setState(() => _activeTab = id),
          
          /**
           * Visual customization.
           */
          height: 65.0,
          iconSize: 24.0,

          /**
           * Theme customization.
           */
          theme: const NavbarTheme(
            background: Color(0xE6FFFFFF),
            activeColor: Color(0xFF007AFF),
            inactiveColor: Color(0xFF8E8E93),
            indicatorColor: Color(0xFF007AFF),
          ),
          tabs: [
            NavbarTab(
              id: 'home',
              label: 'Home',
              icon: (c, s) => Icon(Icons.home_outlined, color: c, size: s),
            ),
            NavbarTab(
              id: 'search',
              label: 'Search',
              icon: (c, s) => Icon(Icons.search, color: c, size: s),
            ),
            NavbarTab(
              id: 'profile',
              label: 'Profile',
              icon: (c, s) => Icon(Icons.person_outline, color: c, size: s),
            ),
          ],
        ),
      ),
    );
  }`,
        usage: `// ... Same as basic usage with variant="ios"`
      }
    ],
    flutter: {
      previewGif: 'https://www.dropbox.com/scl/fi/yttjp5wexsyz5utnqg3g3/SVID_20260510_221611_2.mp4?rlkey=1ux0ay9ysxp8fkwghriyqkqny&st=wrpv81ew&dl=1',
      usage: `import 'package:flutter/material.dart';
import 'package:gliph_ui/gliph_ui.dart';

void main() => runApp(const MyApp());

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  String _activeTab = 'home';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.black,
        // The Gliph UI Navbar
        bottomNavigationBar: Navbar(
          /**
           * visual style of the bar.
           * Options: NavbarVariant.floating, NavbarVariant.classic, NavbarVariant.minimal, NavbarVariant.ios
           */
          variant: NavbarVariant.floating,

          /**
           * Active tab selection.
           */
          activeTab: _activeTab,

          /**
           * Tab change callback.
           */
          onTabChange: (id) => setState(() => _activeTab = id),

          /**
           * List of NavbarTab objects.
           */
          tabs: [
            NavbarTab(
              id: 'home',
              label: 'Home',
              icon: (c, s) => Icon(Icons.home_outlined, color: c, size: s),
              activeIcon: (c, s) => Icon(Icons.home, color: c, size: s),
            ),
            NavbarTab(
              id: 'search',
              label: 'Search',
              icon: (c, s) => Icon(Icons.search, color: c, size: s),
            ),
            NavbarTab(
              id: 'profile',
              label: 'Profile',
              icon: (c, s) => Icon(Icons.person_outline, color: c, size: s),
            ),
          ],

          /**
           * Optional: Floating Action Button in the middle.
           */
          actionButton: ActionButtonObj(
            icon: (c, s) => Icon(Icons.add, color: Colors.white, size: s),
            onPress: () => print('Action Pressed'),
            color: const Color(0xFF6366F1),
          ),

          /**
           * Theme and Layout
           */
          activeScale: 1.3,
          iconSize: 22,
          height: 70,
          bottom: 30,
          theme: const NavbarTheme(
            background: Color.fromRGBO(18, 18, 24, 0.85),
            activeColor: Color(0xFF6366F1),
            indicatorColor: Color.fromRGBO(99, 102, 241, 0.15),
          ),
        ),
      ),
    );
  }`,
      props: [
        { name: 'variant', type: 'NavbarVariant', default: 'floating', desc: 'The visual style: floating, classic, minimal, ios.' },
        { name: 'tabs', type: 'List<NavbarTab>', default: 'required', desc: 'List of tab configurations.' },
        { name: 'activeTab', type: 'String', default: 'required', desc: 'ID of the selected tab.' },
        { name: 'onTabChange', type: 'Function(String)', default: 'required', desc: 'Callback when a tab is pressed.' },
        { name: 'actionButton', type: 'ActionButtonObj', default: 'null', desc: 'Optional center action button.' },
        { name: 'theme', type: 'NavbarTheme', default: 'default', desc: 'Theme colors and aesthetics.' },
        { name: 'height', type: 'double', default: '70', desc: 'Total height of the navbar.' },
        { name: 'bottom', type: 'double', default: '30', desc: 'Vertical offset from the bottom.' }
      ]
    }
  },
  scale: {
    title: 'Scale Picker',
    description: 'A horizontal ruler-style picker for height, weight, and other linear measurements.',
    reactNative: {
      previewGif: 'https://www.dropbox.com/scl/fi/cevifhhaubqobza5ft1pw/SVID_20260508_222010_1.gif?rlkey=950pp5hlbaqol46bbkohrrp8h&st=hu4gpr3r&dl=1',
      usage: `import React, { useState } from 'react';
import { View } from 'react-native';
import { ScalePicker } from 'gliph-ui';

export default function App() {
  const [value, setValue] = useState(88);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScalePicker
        value={value}
        onChange={setValue}
        min={40}
        max={200}
        step={1}
        subdivisions={10}
        unit="cm"

        /**
         * Visual fine-tuning
         */
        height={140}        // Component height
        tickWidth={10}      // Density of ticks
        showLabels={true}    // Toggle number labels
        fractionDigits={1}  // Decimal precision

        /**
         * Theme customization
         */
        theme={{
          activeColor: '#6366f1',
          inactiveColor: 'rgba(99, 102, 241, 0.2)',
          indicatorColor: '#6366f1',
          textColor: '#ffffff',
          labelColor: 'rgba(255, 255, 255, 0.4)',
          fontFamily: 'System'
        }}
      />
    </View>
  );
}`,
      props: [
        { name: 'value', type: 'number', default: 'required', desc: 'Current controlled value shown on the ruler.' },
        { name: 'onChange', type: '(val: number) => void', default: 'required', desc: 'Fires on every scroll update with the snapped value.' },
        { name: 'min', type: 'number', default: 'required', desc: 'Minimum allowed value on the ruler.' },
        { name: 'max', type: 'number', default: 'required', desc: 'Maximum allowed value on the ruler.' },
        { name: 'step', type: 'number', default: '1', desc: 'Major tick interval (distance between labeled numbers).' },
        { name: 'subdivisions', type: 'number', default: '10', desc: 'Number of minor ticks between each major step.' },
        { name: 'unit', type: 'string', default: '"cm"', desc: 'Unit label shown next to the value readout.' },
        { name: 'tickWidth', type: 'number', default: '10', desc: 'Width of each tick in pixels — controls density of the ruler.' },
        { name: 'height', type: 'number', default: '140', desc: 'Total height of the ScalePicker component.' },
        { name: 'showLabels', type: 'boolean', default: 'true', desc: 'Show or hide the numeric labels above major ticks.' },
        { name: 'fractionDigits', type: 'number', default: '1', desc: 'Number of decimal places shown in the value readout.' },
        { name: 'theme.activeColor', type: 'string', default: '#000000', desc: 'Color of the major ticks.' },
        { name: 'theme.inactiveColor', type: 'string', default: 'rgba(0,0,0,0.2)', desc: 'Color of minor (subdivision) ticks.' },
        { name: 'theme.textColor', type: 'string', default: '#000000', desc: 'Color of the numeric value readout.' },
        { name: 'theme.indicatorColor', type: 'string', default: '#000000', desc: 'Color of the center indicator line.' },
        { name: 'theme.subdivisionColor', type: 'string', default: 'rgba(0,0,0,0.2)', desc: 'Color of the small subdivision ticks (alias of inactiveColor).' },
        { name: 'theme.labelColor', type: 'string', default: 'rgba(0,0,0,0.4)', desc: 'Color of the tick number labels.' },
        { name: 'theme.fontFamily', type: 'string', default: 'System', desc: 'Font family for the value readout and tick labels.' },
      ]
    },
    flutter: {
      previewGif: 'https://www.dropbox.com/scl/fi/xoiawxojcd31ai29frr26/SVID_20260508_220213_1.gif?rlkey=rhgmopbi22o69yvhvtezxjk6e&st=t4y8zqva&dl=1',
      usage: `import 'package:flutter/material.dart';
import 'package:gliph_ui/gliph_ui.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData.dark(),
      home: const PickerShowcase(),
    );
  }
}

class PickerShowcase extends StatefulWidget {
  const PickerShowcase({super.key});

  @override
  State<PickerShowcase> createState() => _PickerShowcaseState();
}

class _PickerShowcaseState extends State<PickerShowcase> {
  double _value = 88.0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Center(
        child: ScalePicker(
          value: _value,
          min: 40.0,
          max: 200.0,
          unit: 'cm',
          
          /**
           * Visual customization.
           */
          step: 1.0,
          subdivisions: 10,
          height: 140.0,
          tickWidth: 10.0,
          fractionDigits: 1,

          /**
           * Theme customization.
           */
          theme: const ScalePickerTheme(
            textColor: Colors.white,
            activeColor: Colors.white,
            indicatorColor: Color(0xFF6366F1),
            labelColor: Colors.white24,
          ),
          onChange: (val) => setState(() => _value = val),
        ),
      ),
    );
  }
}`,
      props: [
        { name: 'value', type: 'double', default: 'required', desc: 'Current controlled value.' },
        { name: 'onChange', type: 'ValueChanged<double>?', default: 'null', desc: 'Fires on scroll with snapped value.' },
        { name: 'min', type: 'double', default: 'required', desc: 'Minimum ruler boundary.' },
        { name: 'max', type: 'double', default: 'required', desc: 'Maximum ruler boundary.' },
        { name: 'unit', type: 'String', default: '"cm"', desc: 'Unit label displayed next to the readout.' },
        { name: 'step', type: 'double', default: '1.0', desc: 'Major tick interval.' },
        { name: 'subdivisions', type: 'int', default: '10', desc: 'Minor ticks between each major step.' },
        { name: 'tickWidth', type: 'double', default: '10.0', desc: 'Width of each tick in logical pixels.' },
        { name: 'height', type: 'double', default: '140.0', desc: 'Height of the widget.' },
        { name: 'showLabels', type: 'bool', default: 'true', desc: 'Show numeric labels above major ticks.' },
        { name: 'fractionDigits', type: 'int', default: '1', desc: 'Decimal places in the value readout.' },
        { name: 'theme.activeColor', type: 'Color', default: 'Colors.black', desc: 'Color of major ticks.' },
        { name: 'theme.inactiveColor', type: 'Color', default: 'Colors.black26', desc: 'Color of minor ticks.' },
        { name: 'theme.textColor', type: 'Color', default: 'Colors.black', desc: 'Color of the value readout.' },
        { name: 'theme.indicatorColor', type: 'Color', default: 'Colors.black', desc: 'Color of the center indicator line.' },
        { name: 'theme.subdivisionColor', type: 'Color', default: 'Colors.black26', desc: 'Color of the subdivision ticks.' },
        { name: 'theme.labelColor', type: 'Color', default: 'Colors.black45', desc: 'Color of tick number labels.' },
        { name: 'theme.fontFamily', type: 'String?', default: 'null', desc: 'Font family for readout and labels.' },
      ]
    }
  },
  time: {
    title: 'Time Picker',
    description: 'A 12-hour or 24-hour time selector with smooth momentum scrolling.',
    previewGif: 'https://www.dropbox.com/scl/fi/hs4nqtoggmg0wa36ezf4g/SVID_20260508_125930_1.gif?rlkey=gzg001e5qun2hbmqf5fg6y8mj&st=etfyjqc3&dl=1',
    reactNative: {
      usage: `import React, { useState } from 'react';
import { View } from 'react-native';
import { TimeScrollPicker } from 'gliph-ui';

export default function App() {
  const [time, setTime] = useState({ hour: 10, minute: 30 });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
      <TimeScrollPicker
        value={time}
        onChange={setTime}
        limits={{
          is12Hour: true,
          minuteStep: 5
        }}
        theme={{
          activeTextColor: '#ffffff',
          inactiveTextColor: 'rgba(255,255,255,0.14)'
        }}
      />
    </View>
  );
}`,
      usageJs: `import React, { useState } from 'react';
import { View } from 'react-native';
import { TimeScrollPicker } from 'gliph-ui';

export default function App() {
  const [time, setTime] = useState({ hour: 10, minute: 30 });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
      <TimeScrollPicker
        value={time}
        onChange={setTime}
        limits={{
          is12Hour: true,
          minuteStep: 5
        }}
      />
    </View>
  );
}`,
      props: [
        { name: 'value', type: 'TimeValue', default: 'undefined', desc: 'Controlled state { hour, minute, ampm? }.' },
        { name: 'defaultValue', type: 'TimeValue', default: '{hour:7, minute:30}', desc: 'Initial uncontrolled selection.' },
        { name: 'onChange', type: '(val: TimeValue) => void', default: 'undefined', desc: 'Callback fired when selection snaps.' },
        { name: 'style', type: 'ViewStyle', default: 'undefined', desc: 'Style overrides for the root container.' },
        { name: 'limits.is12Hour', type: 'boolean', default: 'false', desc: 'Show AM/PM column and constrain hours 1–12.' },
        { name: 'limits.hourMin', type: 'number', default: '0 (1 in 12h)', desc: 'Minimum selectable hour.' },
        { name: 'limits.hourMax', type: 'number', default: '23 (12 in 12h)', desc: 'Maximum selectable hour.' },
        { name: 'limits.minuteMin', type: 'number', default: '0', desc: 'Minimum selectable minute.' },
        { name: 'limits.minuteMax', type: 'number', default: '59', desc: 'Maximum selectable minute.' },
        { name: 'limits.minuteStep', type: 'number', default: '1', desc: 'Interval between minute items (e.g. 5 = 0,5,10…).' },
        { name: 'theme.activeTextColor', type: 'string', default: '#ffffff', desc: 'Color of the centered (selected) item text.' },
        { name: 'theme.inactiveTextColor', type: 'string', default: 'rgba(255,255,255,0.14)', desc: 'Color of non-centered item text.' },
        { name: 'theme.accentColor', type: 'string', default: 'rgba(255,255,255,0.72)', desc: 'Color of the separator colon character.' },
        { name: 'theme.separatorColor', type: 'string', default: 'rgba(255,255,255,0.72)', desc: 'Color of the ":" between hour and minute columns.' },
        { name: 'theme.fontFamily', type: 'string', default: '""', desc: 'Custom font family applied to all picker text.' },
        { name: 'layout.itemHeight', type: 'number', default: '72', desc: 'Height of each row item in pixels.' },
        { name: 'layout.visibleRows', type: 'number', default: '3', desc: 'Number of items visible at once.' },
        { name: 'layout.fontSize', type: 'number', default: '44', desc: 'Font size for picker item labels.' },
        { name: 'motion.decelerationRate', type: 'number', default: '0.992', desc: 'How quickly scroll momentum slows (higher = slower stop).' },
        { name: 'motion.scrollEventThrottle', type: 'number', default: '8', desc: 'Frequency of scroll events in ms.' },
      ]
    },
    flutter: {
      usage: `import 'package:flutter/material.dart';
import 'package:gliph_ui/gliph_ui.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData.dark(),
      home: const PickerShowcase(),
    );
  }
}

class PickerShowcase extends StatefulWidget {
  const PickerShowcase({super.key});

  @override
  State<PickerShowcase> createState() => _PickerShowcaseState();
}

class _PickerShowcaseState extends State<PickerShowcase> {
  TimeValue _time = TimeValue(hour: 7, minute: 30, ampm: 'am');

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Center(
        child: TimeScrollPicker(
          value: _time,

          /**
           * Configuration for time range and steps.
           */
          limits: const TimeScrollPickerLimits(
            is12Hour: true,
            minuteStep: 5,
            hourMin: 1,
            hourMax: 12,
          ),

          /**
           * Visual layout adjustment.
           */
          layout: const ScrollPickerLayout(
            itemHeight: 70.0,
            fontSize: 40.0,
          ),

          /**
           * Theme overrides.
           */
          theme: const ScrollPickerTheme(
            activeTextColor: Colors.white,
            inactiveTextColor: Colors.white24,
            separatorColor: Color(0xFF6366F1),
          ),
          onChange: (val) => setState(() => _time = val),
        ),
      ),
    );
  }
}`,
      props: [
        { name: 'value', type: 'TimeValue?', default: 'null', desc: 'Controlled selection { hour, minute, ampm }.' },
        { name: 'defaultValue', type: 'TimeValue?', default: '7:30', desc: 'Initial uncontrolled value.' },
        { name: 'onChange', type: 'ValueChanged<TimeValue>?', default: 'null', desc: 'Fires when selection snaps.' },
        { name: 'limits.is12Hour', type: 'bool', default: 'false', desc: 'Show AM/PM column; constrains hours 1–12.' },
        { name: 'limits.hourMin', type: 'int', default: '0 (1 in 12h)', desc: 'Minimum hour.' },
        { name: 'limits.hourMax', type: 'int', default: '23 (12 in 12h)', desc: 'Maximum hour.' },
        { name: 'limits.minuteMin', type: 'int', default: '0', desc: 'Minimum minute.' },
        { name: 'limits.minuteMax', type: 'int', default: '59', desc: 'Maximum minute.' },
        { name: 'limits.minuteStep', type: 'int', default: '1', desc: 'Interval between minute options.' },
        { name: 'theme.activeTextColor', type: 'Color', default: 'Colors.white', desc: 'Color of the centered item.' },
        { name: 'theme.inactiveTextColor', type: 'Color', default: 'Colors.white24', desc: 'Color of non-centered items.' },
        { name: 'theme.accentColor', type: 'Color', default: 'Colors.white', desc: 'Accent/highlight color.' },
        { name: 'theme.separatorColor', type: 'Color', default: 'Colors.white', desc: 'Color of the ":" separator.' },
        { name: 'theme.fontFamily', type: 'String?', default: 'null', desc: 'Font family for all picker text.' },
        { name: 'layout.itemHeight', type: 'double', default: '72', desc: 'Height of each row.' },
        { name: 'layout.visibleRows', type: 'int', default: '3', desc: 'Rows visible simultaneously.' },
        { name: 'layout.fontSize', type: 'double', default: '44', desc: 'Font size for labels.' },
        { name: 'motion.decelerationRate', type: 'double', default: '0.992', desc: 'Scroll deceleration speed.' },
      ]
    }
  },
  weight: {
    title: 'Weight Picker',
    description: 'A dedicated numeric picker for weights, including whole numbers, decimals, and units.',
    previewGif: "https://www.dropbox.com/scl/fi/b6iq20hqdv91hdtyayexi/SVID_20260508_131439_1.gif?rlkey=0h1fp00rtrxotbjqxvgqsrkim&st=nj32h4zb&dl=1",
    reactNative: {
      usage: `import React, { useState } from 'react';
import { View } from 'react-native';
import { WeightScrollPicker } from 'gliph-ui';

export default function App() {
  const [weight, setWeight] = useState(72.5);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
      <WeightScrollPicker
        value={weight}
        onChange={setWeight}
        limits={{
          min: 30,
          max: 150
        }}
        theme={{
          activeTextColor: '#ffffff',
          inactiveTextColor: 'rgba(255,255,255,0.14)'
        }}
      />
    </View>
  );
}`,
      usageJs: `import React, { useState } from 'react';
import { View } from 'react-native';
import { WeightScrollPicker } from 'gliph-ui';

export default function App() {
  const [weight, setWeight] = useState(72.5);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
      <WeightScrollPicker
        value={weight}
        onChange={setWeight}
        limits={{
          min: 30,
          max: 150
        }}
      />
    </View>
  );
}`,
      props: [
        { name: 'value', type: 'WeightValue', default: 'undefined', desc: 'Controlled state { whole, decimal, unit }.' },
        { name: 'defaultValue', type: 'WeightValue', default: '{whole:72, decimal:5, unit:"kg"}', desc: 'Initial uncontrolled value.' },
        { name: 'onChange', type: '(val: WeightValue) => void', default: 'undefined', desc: 'Fires when any column snaps.' },
        { name: 'style', type: 'ViewStyle', default: 'undefined', desc: 'Style overrides for the root container.' },
        { name: 'limits.wholeMin', type: 'number', default: '30', desc: 'Minimum whole-number value.' },
        { name: 'limits.wholeMax', type: 'number', default: '180', desc: 'Maximum whole-number value.' },
        { name: 'limits.decimalValues', type: 'number[]', default: '[0,2,5,7]', desc: 'Allowed decimal options shown in the decimal column.' },
        { name: 'limits.units', type: 'string[]', default: '["kg","lb"]', desc: 'Unit options shown in the unit column.' },
        { name: 'theme.activeTextColor', type: 'string', default: '#ffffff', desc: 'Color of the centered (selected) item.' },
        { name: 'theme.inactiveTextColor', type: 'string', default: 'rgba(255,255,255,0.14)', desc: 'Color of non-centered items.' },
        { name: 'theme.accentColor', type: 'string', default: 'rgba(255,255,255,0.72)', desc: 'Accent highlight color.' },
        { name: 'theme.separatorColor', type: 'string', default: 'rgba(255,255,255,0.72)', desc: 'Color of the "." decimal separator.' },
        { name: 'theme.fontFamily', type: 'string', default: '""', desc: 'Font family for all picker text.' },
        { name: 'layout.itemHeight', type: 'number', default: '72', desc: 'Height of each row in pixels.' },
        { name: 'layout.visibleRows', type: 'number', default: '3', desc: 'Number of rows visible at once.' },
        { name: 'layout.fontSize', type: 'number', default: '44', desc: 'Font size of picker labels.' },
        { name: 'motion.decelerationRate', type: 'number', default: '0.992', desc: 'Scroll deceleration speed.' },
        { name: 'motion.scrollEventThrottle', type: 'number', default: '8', desc: 'Scroll event frequency in ms.' },
      ]
    },
    flutter: {
      usage: `import 'package:flutter/material.dart';
import 'package:gliph_ui/gliph_ui.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData.dark(),
      home: const PickerShowcase(),
    );
  }
}

class PickerShowcase extends StatefulWidget {
  const PickerShowcase({super.key});

  @override
  State<PickerShowcase> createState() => _PickerShowcaseState();
}

class _PickerShowcaseState extends State<PickerShowcase> {
  WeightValue _weight = WeightValue(whole: 70, decimal: 5, unit: 'kg');

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Center(
        child: WeightScrollPicker(
          value: _weight,

          /**
           * Configuration for range and units.
           */
          limits: const WeightScrollPickerLimits(
            wholeMin: 40,
            wholeMax: 200,
            units: ['kg', 'lbs'],
            decimalValues: [0, 2, 5, 7],
          ),

          /**
           * Visual layout customization.
           */
          layout: const ScrollPickerLayout(
            itemHeight: 65.0,
            visibleRows: 3,
            fontSize: 44.0,
          ),

          /**
           * Theme customization.
           */
          theme: const ScrollPickerTheme(
            activeTextColor: Colors.white,
            inactiveTextColor: Colors.white12,
            separatorColor: Color(0xFF10B981),
            accentColor: Color(0xFF10B981),
          ),
          onChange: (val) => setState(() => _weight = val),
        ),
      ),
    );
  }`,
      props: [
        { name: 'value', type: 'WeightValue?', default: 'null', desc: 'Controlled state { whole, decimal, unit }.' },
        { name: 'defaultValue', type: 'WeightValue?', default: '{whole:72, decimal:5, unit:"kg"}', desc: 'Initial uncontrolled value.' },
        { name: 'onChange', type: 'ValueChanged<WeightValue>?', default: 'null', desc: 'Fires when a column snaps.' },
        { name: 'limits.wholeMin', type: 'int', default: '30', desc: 'Minimum whole number.' },
        { name: 'limits.wholeMax', type: 'int', default: '180', desc: 'Maximum whole number.' },
        { name: 'limits.decimalMin', type: 'int', default: '0', desc: 'Minimum decimal digit.' },
        { name: 'limits.decimalMax', type: 'int', default: '9', desc: 'Maximum decimal digit.' },
        { name: 'limits.units', type: 'List<String>', default: '["kg"]', desc: 'Available unit options.' },
        { name: 'theme.activeTextColor', type: 'Color', default: 'Colors.white', desc: 'Color of the centered item.' },
        { name: 'theme.inactiveTextColor', type: 'Color', default: 'Colors.white24', desc: 'Color of non-centered items.' },
        { name: 'theme.accentColor', type: 'Color', default: 'Colors.white', desc: 'Accent highlight color.' },
        { name: 'theme.separatorColor', type: 'Color', default: 'Colors.white', desc: 'Color of the decimal separator.' },
        { name: 'theme.fontFamily', type: 'String?', default: 'null', desc: 'Font family for all text.' },
        { name: 'layout.itemHeight', type: 'double', default: '72', desc: 'Row height.' },
        { name: 'layout.visibleRows', type: 'int', default: '3', desc: 'Visible rows at once.' },
        { name: 'layout.fontSize', type: 'double', default: '44', desc: 'Label font size.' },
        { name: 'motion.decelerationRate', type: 'double', default: '0.992', desc: 'Scroll deceleration speed.' },
      ]
    }
  },
  value: {
    title: 'Value Picker',
    description: 'Simple momentum-scrolling picker for any list of items.',
    previewGif: "https://www.dropbox.com/scl/fi/sgprz1zdibw2uie1ktc0n/SVID_20260508_132953_1-1.gif?rlkey=33g2lt9mk1e9cgck5h5zenjoc&st=o6sqvllk&dl=1",
    reactNative: {
      usage: `import React, { useState } from 'react';
import { View } from 'react-native';
import { ValueScrollPicker } from 'gliph-ui';

export default function App() {
  const [val, setVal] = useState('medium');

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
      <ValueScrollPicker
        items={[
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' }
        ]}
        value={val}
        onChange={setVal}
        theme={{
          activeTextColor: '#ffffff',
          inactiveTextColor: 'rgba(255,255,255,0.14)'
        }}
      />
    </View>
  );
}`,
      usageJs: `import React, { useState } from 'react';
import { View } from 'react-native';
import { ValueScrollPicker } from 'gliph-ui';

export default function App() {
  const [val, setVal] = useState('medium');

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
      <ValueScrollPicker
        items={[
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' }
        ]}
        value={val}
        onChange={setVal}
      />
    </View>
  );
}`,
      props: [
        { name: 'items', type: 'ScrollPickerItem<T>[]', default: 'required', desc: 'Array of { label, value } objects to display.' },
        { name: 'value', type: 'T', default: 'undefined', desc: 'Currently selected value (controlled).' },
        { name: 'defaultValue', type: 'T', default: 'items[0]', desc: 'Initial uncontrolled selection.' },
        { name: 'onChange', type: '(val: T) => void', default: 'undefined', desc: 'Fires when the user stops scrolling.' },
        { name: 'width', type: 'number', default: '96', desc: 'Width of the column in pixels.' },
        { name: 'style', type: 'ViewStyle', default: 'undefined', desc: 'Style overrides for the root container.' },
        { name: 'theme.activeTextColor', type: 'string', default: '#ffffff', desc: 'Color of the centered (selected) item.' },
        { name: 'theme.inactiveTextColor', type: 'string', default: 'rgba(255,255,255,0.14)', desc: 'Color of non-centered items.' },
        { name: 'theme.accentColor', type: 'string', default: 'rgba(255,255,255,0.72)', desc: 'Accent highlight color.' },
        { name: 'theme.fontFamily', type: 'string', default: '""', desc: 'Font family for picker labels.' },
        { name: 'layout.itemHeight', type: 'number', default: '72', desc: 'Height of each row.' },
        { name: 'layout.visibleRows', type: 'number', default: '3', desc: 'Rows visible at once.' },
        { name: 'layout.fontSize', type: 'number', default: '44', desc: 'Font size of labels.' },
        { name: 'motion.decelerationRate', type: 'number', default: '0.992', desc: 'Scroll deceleration speed.' },
        { name: 'motion.scrollEventThrottle', type: 'number', default: '8', desc: 'Scroll event frequency in ms.' },
      ]
    },
    flutter: {
      usage: `import 'package:flutter/material.dart';
import 'package:gliph_ui/gliph_ui.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData.dark(),
      home: const PickerShowcase(),
    );
  }
}

class PickerShowcase extends StatefulWidget {
  const PickerShowcase({super.key});

  @override
  State<PickerShowcase> createState() => _PickerShowcaseState();
}

class _PickerShowcaseState extends State<PickerShowcase> {
  String _selection = 'pro';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Center(
        child: ValueScrollPicker<String>(
          value: _selection,
          items: [
            ScrollPickerItem(label: 'Basic', value: 'basic'),
            ScrollPickerItem(label: 'Pro', value: 'pro'),
            ScrollPickerItem(label: 'Enterprise', value: 'enterprise'),
          ],

          /**
           * Visual layout adjustment.
           */
          width: 120.0,
          layout: const ScrollPickerLayout(
            itemHeight: 70.0,
            visibleRows: 3,
            fontSize: 40.0,
          ),

          /**
           * Theme customization.
           */
          theme: const ScrollPickerTheme(
            activeTextColor: Colors.white,
            inactiveTextColor: Colors.white24,
            accentColor: Color(0xFF6366F1),
          ),
          onChange: (val) => setState(() => _selection = val),
        ),
      ),
    );
  }
}`,
      props: [
        { name: 'items', type: 'List<ScrollPickerItem<T>>', default: 'required', desc: 'Items to display in the picker column.' },
        { name: 'value', type: 'T?', default: 'null', desc: 'Currently selected value (controlled).' },
        { name: 'defaultValue', type: 'T?', default: 'items[0]', desc: 'Initial uncontrolled value.' },
        { name: 'onChange', type: 'ValueChanged<T>?', default: 'null', desc: 'Fires when selection changes.' },
        { name: 'width', type: 'double?', default: 'null', desc: 'Column width override.' },
        { name: 'theme.activeTextColor', type: 'Color', default: 'Colors.white', desc: 'Color of the selected item.' },
        { name: 'theme.inactiveTextColor', type: 'Color', default: 'Colors.white24', desc: 'Color of non-selected items.' },
        { name: 'theme.accentColor', type: 'Color', default: 'Colors.white', desc: 'Accent highlight color.' },
        { name: 'theme.fontFamily', type: 'String?', default: 'null', desc: 'Font family for labels.' },
        { name: 'layout.itemHeight', type: 'double', default: '72', desc: 'Row height.' },
        { name: 'layout.visibleRows', type: 'int', default: '3', desc: 'Rows visible at once.' },
        { name: 'layout.fontSize', type: 'double', default: '44', desc: 'Label font size.' },
        { name: 'motion.decelerationRate', type: 'double', default: '0.992', desc: 'Scroll deceleration speed.' },
      ]
    }
  },
  date: {
    title: 'Date Picker',
    description: 'Dynamic date selector with leap-year awareness.',
    previewGif: "https://www.dropbox.com/scl/fi/pi4c6rbd6urk66wgetzed/SVID_20260508_134712_1.gif?rlkey=2ngcbm6kupts4bzrvpng9uile&st=v540tqlz&dl=1",
    reactNative: {
      usage: `import React, { useState } from 'react';
import { View } from 'react-native';
import { DateScrollPicker } from 'gliph-ui';

export default function App() {
  const [date, setDate] = useState({ year: 2025, month: 5, day: 9 });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
      <DateScrollPicker
        value={date}
        onChange={setDate}
        limits={{
          yearMin: 1990,
          yearMax: 2030
        }}
        theme={{
          activeTextColor: '#ffffff',
          inactiveTextColor: 'rgba(255,255,255,0.14)'
        }}
      />
    </View>
  );
}`,
      usageJs: `import React, { useState } from 'react';
import { View } from 'react-native';
import { DateScrollPicker } from 'gliph-ui';

export default function App() {
  const [date, setDate] = useState({ year: 2025, month: 5, day: 9 });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
      <DateScrollPicker
        value={date}
        onChange={setDate}
        limits={{
          yearMin: 1990,
          yearMax: 2030
        }}
      />
    </View>
  );
}`,
      props: [
        { name: 'value', type: 'DateValue', default: 'today', desc: 'Controlled selection { year, month, day }.' },
        { name: 'defaultValue', type: 'DateValue', default: 'today', desc: 'Initial uncontrolled value.' },
        { name: 'onChange', type: '(val: DateValue) => void', default: 'undefined', desc: 'Fires when any column snaps.' },
        { name: 'style', type: 'ViewStyle', default: 'undefined', desc: 'Style overrides for the root container.' },
        { name: 'limits.yearMin', type: 'number', default: '1900', desc: 'Minimum selectable year.' },
        { name: 'limits.yearMax', type: 'number', default: '2100', desc: 'Maximum selectable year.' },
        { name: 'theme.activeTextColor', type: 'string', default: '#ffffff', desc: 'Color of the centered (selected) item.' },
        { name: 'theme.inactiveTextColor', type: 'string', default: 'rgba(255,255,255,0.14)', desc: 'Color of non-centered items.' },
        { name: 'theme.accentColor', type: 'string', default: 'rgba(255,255,255,0.72)', desc: 'Accent highlight color.' },
        { name: 'theme.separatorColor', type: 'string', default: 'rgba(255,255,255,0.72)', desc: 'Color of column separator character.' },
        { name: 'theme.fontFamily', type: 'string', default: '""', desc: 'Font family for all picker text.' },
        { name: 'layout.itemHeight', type: 'number', default: '72', desc: 'Height of each row in pixels.' },
        { name: 'layout.visibleRows', type: 'number', default: '3', desc: 'Rows visible at once.' },
        { name: 'layout.fontSize', type: 'number', default: '44', desc: 'Font size of picker labels.' },
        { name: 'motion.decelerationRate', type: 'number', default: '0.992', desc: 'Scroll deceleration speed.' },
        { name: 'motion.scrollEventThrottle', type: 'number', default: '8', desc: 'Scroll event frequency in ms.' },
      ]
    },
    flutter: {
      usage: `import 'package:flutter/material.dart';
import 'package:gliph_ui/gliph_ui.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData.dark(),
      home: const PickerShowcase(),
    );
  }
}

class PickerShowcase extends StatefulWidget {
  const PickerShowcase({super.key});

  @override
  State<PickerShowcase> createState() => _PickerShowcaseState();
}

class _PickerShowcaseState extends State<PickerShowcase> {
  DateValue _date = DateValue(year: 2025, month: 5, day: 9);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Center(
        child: DateScrollPicker(
          value: _date,

          /**
           * Optional: Selectable range constraints.
           */
          limits: const DateScrollPickerLimits(
            yearMin: 1990,
            yearMax: 2030,
          ),

          /**
           * Visual layout customization.
           */
          layout: const ScrollPickerLayout(
            itemHeight: 72.0,
            visibleRows: 3,
            fontSize: 44.0,
          ),

          /**
           * Theme customization.
           */
          theme: const ScrollPickerTheme(
            activeTextColor: Colors.white,
            inactiveTextColor: Colors.white24,
            separatorColor: Color(0xFFF43F5E),
          ),
          onChange: (val) => setState(() => _date = val),
        ),
      ),
    );
  }
}`,
      props: [
        { name: 'value', type: 'DateValue?', default: 'today', desc: 'Controlled selection { year, month, day }.' },
        { name: 'defaultValue', type: 'DateValue?', default: 'today', desc: 'Initial uncontrolled value.' },
        { name: 'onChange', type: 'ValueChanged<DateValue>?', default: 'null', desc: 'Fires when a column snaps.' },
        { name: 'limits.yearMin', type: 'int', default: '1900', desc: 'Minimum selectable year.' },
        { name: 'limits.yearMax', type: 'int', default: '2100', desc: 'Maximum selectable year.' },
        { name: 'theme.activeTextColor', type: 'Color', default: 'Colors.white', desc: 'Color of the centered item.' },
        { name: 'theme.inactiveTextColor', type: 'Color', default: 'Colors.white24', desc: 'Color of non-centered items.' },
        { name: 'theme.accentColor', type: 'Color', default: 'Colors.white', desc: 'Accent highlight color.' },
        { name: 'theme.separatorColor', type: 'Color', default: 'Colors.white', desc: 'Column separator color.' },
        { name: 'theme.fontFamily', type: 'String?', default: 'null', desc: 'Font family for all picker text.' },
        { name: 'layout.itemHeight', type: 'double', default: '72', desc: 'Row height.' },
        { name: 'layout.visibleRows', type: 'int', default: '3', desc: 'Rows visible at once.' },
        { name: 'layout.fontSize', type: 'double', default: '44', desc: 'Label font size.' },
        { name: 'motion.decelerationRate', type: 'double', default: '0.992', desc: 'Scroll deceleration speed.' },
      ]
    }
  },

  calendar: {
    title: 'Calendar Picker',
    description: 'A full-featured monthly calendar with animated day selection, year dropdown, and min/max date constraints.',
    reactNative: {
      previewGif: 'https://www.dropbox.com/scl/fi/awi0fk291sgrtyu49ez0j/SVID_20260509_093240_1.gif?rlkey=qxd0mlunj9n1rb5z4rcail8sv&st=ce8k0sfa&dl=1',
      usage: `import React, { useState } from 'react';
import { View } from 'react-native';
import { CalendarPicker } from 'gliph-ui';

export default function App() {
  const [date, setDate] = useState({ year: 2025, month: 5, day: 9 });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
      <CalendarPicker
        value={date}
        onChange={setDate}
        showTodayButton={true}
        enableYearDropdown={true}
        theme={{
          accent: '#38BDF8',
          surface: '#111827',
          text: '#F9FAFB'
        }}
      />
    </View>
  );
}`,
      usageJs: `import React, { useState } from 'react';
import { View } from 'react-native';
import { CalendarPicker } from 'gliph-ui';

export default function App() {
  const [date, setDate] = useState({ year: 2025, month: 5, day: 9 });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
      <CalendarPicker
        value={date}
        onChange={setDate}
        showTodayButton={true}
        enableYearDropdown={true}
      />
    </View>
  );
}`,
      props: [
        { name: 'value', type: 'CalendarDate', default: 'today', desc: 'Controlled selection { year, month, day }.' },
        { name: 'onChange', type: '(val: CalendarDate) => void', default: 'undefined', desc: 'Fires when a day is tapped.' },
        { name: 'minDate', type: 'CalendarDate', default: 'undefined', desc: 'Earliest selectable date — earlier days are disabled.' },
        { name: 'maxDate', type: 'CalendarDate', default: 'undefined', desc: 'Latest selectable date — later days are disabled.' },
        { name: 'yearRange', type: '{ start: number, end: number }', default: '±60 years', desc: 'Overrides the range of years shown in the year dropdown.' },
        { name: 'showOutsideDays', type: 'boolean', default: 'true', desc: 'Show greyed-out days from the previous/next month.' },
        { name: 'showTodayButton', type: 'boolean', default: 'true', desc: "Show a 'Today' shortcut button to jump to the current date." },
        { name: 'enableYearDropdown', type: 'boolean', default: 'true', desc: 'Allow tapping the year badge to open a scrollable year picker.' },
        { name: 'width', type: 'ViewStyle[\'width\']', default: 'undefined', desc: 'Override the width of the calendar container.' },
        { name: 'height', type: 'ViewStyle[\'height\']', default: 'undefined', desc: 'Override the height of the calendar container.' },
        { name: 'maxWidth', type: 'ViewStyle[\'maxWidth\']', default: '390', desc: 'Maximum width. Defaults to 390 when width is unset.' },
        { name: 'style', type: 'ViewStyle', default: 'undefined', desc: 'Additional style overrides applied to the root container.' },
        { name: 'theme.accent', type: 'string', default: '#38BDF8', desc: 'Highlight color for the selected day circle and today dot.' },
        { name: 'theme.onAccent', type: 'string', default: '#082F49', desc: 'Text color rendered on top of the accent (selected day number).' },
        { name: 'theme.surface', type: 'string', default: '#111827', desc: 'Background color of the entire calendar card.' },
        { name: 'theme.surfaceSoft', type: 'string', default: '#1F2937', desc: 'Background for the year dropdown panel and icon buttons.' },
        { name: 'theme.text', type: 'string', default: '#F9FAFB', desc: 'Primary text color for day numbers and year button.' },
        { name: 'theme.mutedText', type: 'string', default: '#CBD5E1', desc: 'Color for the month title.' },
        { name: 'theme.faintText', type: 'string', default: '#64748B', desc: 'Color for weekday labels and out-of-month days.' },
        { name: 'theme.disabledText', type: 'string', default: '#475569', desc: 'Color applied to days that are disabled by minDate/maxDate.' },
        { name: 'theme.border', type: 'string', default: '#334155', desc: 'Border color for the card, buttons, and year dropdown.' },
        { name: 'theme.pressed', type: 'string', default: '#263244', desc: 'Background tint shown on press (reserved for future use).' },
      ]
    },
    flutter: {
      previewGif: 'https://www.dropbox.com/scl/fi/0fu21vlqhvze8xgy65p7i/SVID_20260509_104006_1.gif?rlkey=bis04b2arr84x3laeactp8ila&st=iip6zn5v&dl=1',
      usage: `import 'package:flutter/material.dart';
import 'package:gliph_ui/gliph_ui.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData.dark(),
      home: const PickerShowcase(),
    );
  }
}

class PickerShowcase extends StatefulWidget {
  const PickerShowcase({super.key});

  @override
  State<PickerShowcase> createState() => _PickerShowcaseState();
}

class _PickerShowcaseState extends State<PickerShowcase> {
  CalendarDate _date = CalendarDate(year: 2025, month: 5, day: 9);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Center(
        child: CalendarPicker(
          value: _date,
          onChange: (date) => setState(() => _date = date),

          /**
           * Range and Navigation
           */
          minDate: CalendarDate(year: 2020, month: 1, day: 1),
          maxDate: CalendarDate(year: 2030, month: 12, day: 31),
          yearRange: CalendarYearRange(start: 2000, end: 2050),
          
          /**
           * Feature Toggles
           */
          showTodayButton: true,
          enableYearDropdown: true,
          showOutsideDays: true,

          /**
           * Layout
           */
          maxWidth: 390.0,

          /**
           * Theme customization
           */
          theme: const CalendarPickerTheme(
            accent: Color(0xFF38BDF8),
            onAccent: Color(0xFF082F49),
            surface: Color(0xFF111827),
            surfaceSoft: Color(0xFF1F2937),
            text: Color(0xFFF9FAFB),
            mutedText: Color(0xFFCBD5E1),
            faintText: Color(0xFF64748B),
            disabledText: Color(0xFF475569),
            border: Color(0xFF334155),
          ),
        ),
      ),
    );
  }
}`,
      props: [
        { name: 'value', type: 'CalendarDate?', default: 'today', desc: 'Controlled selection (year, month, day).' },
        { name: 'onChange', type: 'ValueChanged<CalendarDate>?', default: 'null', desc: 'Fires when a day is tapped.' },
        { name: 'minDate', type: 'CalendarDate?', default: 'null', desc: 'Earliest selectable date — earlier days are disabled.' },
        { name: 'maxDate', type: 'CalendarDate?', default: 'null', desc: 'Latest selectable date — later days are disabled.' },
        { name: 'yearRange', type: 'CalendarYearRange?', default: '±60 years', desc: 'Overrides the range of years in the year dropdown.' },
        { name: 'showOutsideDays', type: 'bool', default: 'true', desc: 'Show greyed-out days from adjacent months.' },
        { name: 'showTodayButton', type: 'bool', default: 'true', desc: "Show a 'Today' shortcut button." },
        { name: 'enableYearDropdown', type: 'bool', default: 'true', desc: 'Allow tapping the year to open a picker.' },
        { name: 'width', type: 'double?', default: 'null', desc: 'Override the width of the calendar container.' },
        { name: 'height', type: 'double?', default: 'null', desc: 'Override the height of the calendar container.' },
        { name: 'maxWidth', type: 'double?', default: '390', desc: 'Maximum width. Defaults to 390 when width is unset.' },
        { name: 'theme.accent', type: 'Color', default: 'Color(0xFF38BDF8)', desc: 'Highlight color for selected day circle and today dot.' },
        { name: 'theme.onAccent', type: 'Color', default: 'Color(0xFF082F49)', desc: 'Text color on top of the accent (selected day number).' },
        { name: 'theme.surface', type: 'Color', default: 'Color(0xFF111827)', desc: 'Background color of the entire calendar card.' },
        { name: 'theme.surfaceSoft', type: 'Color', default: 'Color(0xFF1F2937)', desc: 'Background for the year dropdown and icon buttons.' },
        { name: 'theme.text', type: 'Color', default: 'Color(0xFFF9FAFB)', desc: 'Primary text color for day numbers.' },
        { name: 'theme.mutedText', type: 'Color', default: 'Color(0xFFCBD5E1)', desc: 'Color for the month title.' },
        { name: 'theme.faintText', type: 'Color', default: 'Color(0xFF64748B)', desc: 'Color for weekday labels and out-of-month days.' },
        { name: 'theme.disabledText', type: 'Color', default: 'Color(0xFF475569)', desc: 'Color for days disabled by minDate/maxDate.' },
        { name: 'theme.border', type: 'Color', default: 'Color(0xFF334155)', desc: 'Border color for the card and year dropdown.' },
        { name: 'theme.pressed', type: 'Color', default: 'Color(0xFF263244)', desc: 'Background tint shown on press.' },
      ]
    }
  },
  'music-player': {
    title: 'React Native Gliph Player',
    description: 'A cinematic React Native audio player with background playback, lock-screen controls, mini-player mode, glass UI, animated transitions, and production-ready customization.',
    reactNative: {
      previewGif: 'https://www.dropbox.com/scl/fi/placeholder-music-player.gif?rlkey=placeholder&st=placeholder&dl=1',
      usage: `import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import TrackPlayer, { 
  Capability, 
  AppKilledPlaybackBehavior 
} from 'react-native-track-player';
import { GliphPlayer } from 'react-native-gliph-player';

const tracks = [
  {
    id: 'leo-badass',
    url: 'https://dl.dropboxusercontent.com/scl/fi/odjabq0j82svow4znyn4b/Badass-Leo-320-Kbps.mp3?rlkey=4yidwu60qtowjst8t6q2txs0u&st=drn5lwb9&dl=1',
    title: 'Badass (Leo)',
    artist: 'Anirudh Ravichander',
    album: 'Leo',
    artwork: 'https://c.saavncdn.com/415/Leo-Original-Motion-Picture-Soundtrack-English-2023-20231019170311-500x500.jpg',
  }
];

export default function App() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    const setup = async () => {
      try {
        /**
         * Initialize the native audio engine.
         * Configuration for ultra-fast buffering.
         */
        await TrackPlayer.setupPlayer({
          waitForBuffer: false,
          minBuffer: 15 * 1000,
          maxBuffer: 60 * 1000,
          playBuffer: 1500,
        });

        await TrackPlayer.updateOptions({
          android: {
            appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
            alwaysPauseOnInterruption: true,
          },
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.SeekTo,
          ],
          compactCapabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
          ],
        });

        await TrackPlayer.add(tracks);
        await TrackPlayer.play();
        setIsPlayerReady(true);
      } catch (e) {
        console.log('[TrackPlayer] Setup Error:', e);
      }
    };

    setup();
  }, []);

  if (!isPlayerReady) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <StatusBar barStyle="light-content" translucent />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GliphPlayer 
        tracks={tracks} 
        initialTrackId="leo-badass"
        uiConfig={{
          accentColor: '#1DB954',
          titleFontSize: 28,
          artistFontSize: 20,
          artworkPadding: 50,
          showMiniPlayer: true,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080812' }
});`,
      usageJs: `import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import TrackPlayer, { 
  Capability, 
  AppKilledPlaybackBehavior 
} from 'react-native-track-player';
import { GliphPlayer } from 'react-native-gliph-player';

const tracks = [
  {
    id: 'leo-badass',
    url: 'https://dl.dropboxusercontent.com/scl/fi/odjabq0j82svow4znyn4b/Badass-Leo-320-Kbps.mp3?rlkey=4yidwu60qtowjst8t6q2txs0u&st=drn5lwb9&dl=1',
    title: 'Badass (Leo)',
    artist: 'Anirudh Ravichander',
    album: 'Leo',
    artwork: 'https://c.saavncdn.com/415/Leo-Original-Motion-Picture-Soundtrack-English-2023-20231019170311-500x500.jpg',
  }
];

export default function App() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    const setup = async () => {
      try {
        await TrackPlayer.setupPlayer({
          waitForBuffer: false,
          playBuffer: 1500,
        });

        await TrackPlayer.updateOptions({
          android: {
            appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
          },
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.SeekTo,
          ],
        });

        await TrackPlayer.add(tracks);
        await TrackPlayer.play();
        setIsPlayerReady(true);
      } catch (e) {
        console.log('[TrackPlayer] Error:', e);
      }
    };

    setup();
  }, []);

  if (!isPlayerReady) return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      <GliphPlayer 
        tracks={tracks} 
        uiConfig={{
          accentColor: '#1DB954',
          titleFontSize: 28,
          artistFontSize: 20,
          artworkPadding: 50,
          showMiniPlayer: true,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080812' }
});`,
      props: [
        { name: 'tracks', type: 'MusicPlayerTrack[]', default: 'required', desc: 'Array of track objects with id, url, title, artist, album, and artwork.' },
        { name: 'initialTrackId', type: 'string', default: 'tracks[0].id', desc: 'ID of the track to start with.' },
        { name: 'uiConfig.accentColor', type: 'string', default: '#1DB954', desc: 'Theme color for sliders, active icons, and device status.' },
        { name: 'uiConfig.titleColor', type: 'string', default: '#ffffff', desc: 'Text color for the song title.' },
        { name: 'uiConfig.artistColor', type: 'string', default: '#e5e5e5', desc: 'Text color for the artist name.' },
        { name: 'uiConfig.timeColor', type: 'string', default: '#b3b3b3', desc: 'Text color for the progress timers.' },
        { name: 'uiConfig.fontFamily', type: 'string', default: 'System Default', desc: 'The font family applied to all text elements.' },
        { name: 'uiConfig.artworkPadding', type: 'number', default: '48', desc: 'Controls the size of the artwork (higher value = smaller image).' },
        { name: 'uiConfig.titleFontSize', type: 'number', default: '32', desc: 'Font size for the song title.' },
        { name: 'uiConfig.artistFontSize', type: 'number', default: '20', desc: 'Font size for the artist name.' },
        { name: 'uiConfig.marqueeSpeed', type: 'number', default: '30', desc: 'Scrolling speed of the title and artist text.' },
        { name: 'uiConfig.showMiniPlayer', type: 'boolean', default: 'true', desc: 'Enable or disable the floating mini-player bar.' },
        { name: 'onBack', type: '() => void', default: 'undefined', desc: 'Callback triggered when the back arrow is pressed.' },
        { name: 'onTrackChange', type: '(track: MusicPlayerTrack) => void', default: 'undefined', desc: 'Callback triggered when the track changes.' }
      ]
    },
    flutter: {
      usage: `// Music Player is coming soon to Flutter. Stay tuned!`,
      props: []
    }
  }
};

const COMMON_PROPS = {
  theme: [
    { name: 'activeTextColor', type: 'Color / string', default: '#FFFFFF', desc: 'Color of the item at the center of the picker.' },
    { name: 'inactiveTextColor', type: 'Color / string', default: 'rgba(255,255,255,0.14)', desc: 'Color of items that are not centered.' },
    { name: 'accentColor', type: 'Color / string', default: 'rgba(255,255,255,0.72)', desc: 'Color used for highlighting or separators.' },
    { name: 'separatorColor', type: 'Color / string', default: 'rgba(255,255,255,0.72)', desc: 'Color of the vertical column separators.' },
    { name: 'fontFamily', type: 'string', default: 'null', desc: 'Custom font family for all picker text.' },
  ],
  layout: [
    { name: 'itemHeight', type: 'number', default: '72', desc: 'Height of each row in the picker.' },
    { name: 'visibleRows', type: 'number', default: '3', desc: 'Number of rows visible at once.' },
    { name: 'fontSize', type: 'number', default: '44', desc: 'Base font size for picker items.' },
  ],
  motion: [
    { name: 'decelerationRate', type: 'number', default: '0.992', desc: 'Controls how fast the scroll momentum slows down.' },
  ]
};

const PLAYER_DOC_LINKS = [
  {
    title: 'React Native Gliph Player',
    desc: 'Install the player, connect react-native-track-player, and render the full-screen music experience.',
    icon: <Headphones size={18} />
  },
  {
    title: 'Floating Mini Player',
    desc: 'Use the compact floating player for music apps, audio previews, podcasts, radio, and queue playback.',
    icon: <Radio size={18} />
  },
  {
    title: 'Background Audio Controls',
    desc: 'Configure lock-screen actions, headset events, Bluetooth output detection, and Android notifications.',
    icon: <Volume2 size={18} />
  },
  {
    title: 'Themes and Artwork',
    desc: 'Customize accent colors, artwork sizing, typography, marquee text, and mini-player visibility.',
    icon: <Disc3 size={18} />
  }
];

function MusicPlayerHeroPhone({ isDark }: { isDark: boolean }) {
  return (
    <div className={`relative mx-auto w-[290px] aspect-[9/19] rounded-[3rem] border-[12px] overflow-hidden shadow-2xl ${isDark ? 'border-[#18181b] bg-[#070711] shadow-emerald-500/10' : 'border-zinc-900 bg-[#070711] shadow-black/25'}`}>
      <div className="absolute top-0 inset-x-0 z-30 flex justify-center pt-3">
        <div className="h-6 w-24 rounded-full bg-black/70" />
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

function MusicPlayerDocsPage({ navigate, theme }: { navigate: (path: string) => void, theme: Theme }) {
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
        <MusicPlayerHeroPhone isDark={isDark} />
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

function CategoryDetails({ category, platform, onBack, theme }: { category: Category, platform: Platform, onBack: () => void, theme: Theme }) {
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
                        ? 'Drag the ruler left and right to pick a value — run it live on your device via Expo Go.'
                        : 'Test the 120hz momentum scrolling in the browser, or scan the QR code to run it on your device.'}
                  </p>
                  <div className={`overflow-hidden rounded-2xl border shadow-2xl ${isDark ? 'border-white/10 bg-[#0a0a0a]' : 'border-black/10 bg-white'}`}>
                    <iframe
                      src={`https://snack.expo.dev/embedded?dependencies=gliph-ui@1.2.6,react-native-svg,lucide-react-native&name=${encodeURIComponent(data.title)}&platform=android&theme=dark&code=${encodeURIComponent(rnLanguage === 'jsx' ? (platformData.usageJs || platformData.usage || '') : (platformData.usage || ''))}`}
                      style={{ width: '100%', height: '650px', border: 0 }}
                      title="Gliph UI Expo Preview"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Unified Usage Code Section */}
      <div key={`${category}-${activeVariantIndex}-usage`} className={`mt-24 border-t pt-20 animate-in fade-in slide-in-from-bottom-4 duration-700 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <div className="flex flex-col gap-10 max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${isDark ? 'bg-white/5 text-[#4ade80]' : 'bg-black/5 text-[#22c55e]'}`}>
                <Terminal size={24} />
              </div>
              <h3 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>Usage Code</h3>
              <p className={`text-sm font-medium ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                Import and implement the {data.title} in your project.
              </p>
            </div>

            {platform === 'react-native' && (
              <div className={`flex gap-1 p-1 rounded-xl border ${isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
                <button
                  onClick={() => setRnLanguage('tsx')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${rnLanguage === 'tsx' ? (isDark ? 'bg-white text-black shadow-lg' : 'bg-black text-white shadow-lg') : (isDark ? 'text-white/40 hover:text-white/60' : 'text-black/40 hover:text-black/60')}`}
                >
                  TypeScript
                </button>
                <button
                  onClick={() => setRnLanguage('jsx')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${rnLanguage === 'jsx' ? (isDark ? 'bg-white text-black shadow-lg' : 'bg-black text-white shadow-lg') : (isDark ? 'text-white/40 hover:text-white/60' : 'text-black/40 hover:text-black/60')}`}
                >
                  JavaScript (JSX)
                </button>
              </div>
            )}
          </div>
          <CodeBlock
            code={getCode()}
            language={platform === 'react-native' ? rnLanguage : 'dart'}
            theme={theme}
          />
        </div>
      </div>


      {/* Installation */}
      <div className={`mt-20 border-t pt-16 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <div className="mb-6 flex items-center gap-3">
          <Terminal className="text-[#4ade80]" size={28} />
          <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>Installation</h3>
        </div>

        {platform === 'react-native' && (
          <div className="space-y-6">
            {category !== 'music-player' && (
              <div className={`p-6 rounded-2xl border transition-all ${isDark ? 'border-amber-500/20 bg-amber-500/5' : 'border-amber-500/15 bg-amber-500/5'}`}>
                <p className={`text-sm font-bold flex items-center gap-3 ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                  <Zap size={18} /> Essential Prerequisite
                </p>
                <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                  Most Gliph UI components use <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-amber-500/10">react-native-svg</code> for high-performance iconography.
                </p>
                <div className="mt-4">
                  <CodeBlock code="npm install react-native-svg" language="bash" theme={theme} />
                </div>
              </div>
            )}

            {category === 'music-player' && (
              <div className="space-y-6">
                <div className={`p-8 rounded-3xl border-2 transition-all shadow-2xl ${isDark ? 'border-[#38bdf8]/30 bg-[#38bdf8]/5 shadow-[#38bdf8]/5' : 'border-[#38bdf8]/20 bg-[#38bdf8]/5 shadow-[#38bdf8]/10'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <p className={`text-base font-black flex items-center gap-3 uppercase tracking-tighter ${isDark ? 'text-[#38bdf8]' : 'text-[#0ea5e9]'}`}>
                      <Sparkles size={22} className="animate-pulse" /> Automated Magic Setup
                    </p>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${isDark ? 'bg-[#38bdf8]/20 text-[#38bdf8]' : 'bg-[#38bdf8]/10 text-[#0ea5e9]'}`}>Best Experience</span>
                  </div>
                  <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-white/70' : 'text-black/70'}`}>
                    Create a file named <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-[#38bdf8]/10">gliph-setup.js</code> in your project root, paste the code below, and run <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-[#38bdf8]/10">node gliph-setup.js</code>.
                  </p>

                  <div className="mb-6">
                    <CodeBlock
                      code={`const fs = require('fs');\nconst path = require('path');\nconst { execSync } = require('child_process');\n\nconsole.log('Gliph Player setup...');\n\n// 1. Install Dependencies\nexecSync('npm install react-native-gliph-player react-native-track-player react-native-fs lucide-react-native @react-native-community/slider', { stdio: 'inherit' });\n\n// 2. Create service.js\nconst serviceCode = \`import TrackPlayer, { Event } from 'react-native-track-player';\\n\\nmodule.exports = async function() {\\n    TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());\\n    TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());\\n    TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.destroy());\\n    TrackPlayer.addEventListener(Event.RemoteNext, () => TrackPlayer.skipToNext());\\n    TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.skipToPrevious());\\n};\`;\nfs.writeFileSync('service.js', serviceCode);\n\n// 3. Android Configuration (Automatic Path Detection)\nconst manifestPath = './android/app/src/main/AndroidManifest.xml';\nif (fs.existsSync(manifestPath)) {\n  const manifest = fs.readFileSync(manifestPath, 'utf8');\n  const pkg = manifest.match(/package="([^"]+)"/)[1];\n  const targetDir = \`./android/app/src/main/java/\${pkg.replace(/\\./g, '/')}\`;\n  fs.mkdirSync(targetDir, { recursive: true });\n  fs.writeFileSync(path.join(targetDir, 'DeviceInfoModule.kt'), \`package \${pkg}\\n\\nimport android.content.Context\\nimport android.media.AudioDeviceInfo\\nimport android.media.AudioManager\\nimport com.facebook.react.bridge.ReactApplicationContext\\nimport com.facebook.react.bridge.ReactContextBaseJavaModule\\nimport com.facebook.react.bridge.ReactMethod\\nimport com.facebook.react.bridge.Promise\\n\\nclass DeviceInfoModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {\\n    override fun getName(): String = "DeviceInfo"\\n\\n    @ReactMethod\\n    fun getDeviceType(promise: Promise) {\\n        val audioManager = reactApplicationContext.getSystemService(Context.AUDIO_SERVICE) as AudioManager\\n        val devices = audioManager.getDevices(AudioManager.GET_DEVICES_OUTPUTS)\\n        for (device in devices) {\\n            if (device.type == AudioDeviceInfo.TYPE_BLUETOOTH_A2DP || device.type == AudioDeviceInfo.TYPE_BLUETOOTH_SCO) {\\n                promise.resolve("bluetooth"); return\\n            }\\n            if (device.type == AudioDeviceInfo.TYPE_WIRED_HEADSET || device.type == AudioDeviceInfo.TYPE_WIRED_HEADPHONES) {\\n                promise.resolve("headset"); return\\n            }\\n        }\\n        promise.resolve("speaker")\\n    }\\n}\`);\n  console.log('Android module configured');\n}\n\nconsole.log('Setup finished. Register the service in index.js and rebuild.');`}
                      language="javascript"
                      theme={theme}
                    />
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {['Auto-Install', 'Service Generation', 'Android Pathing', 'HW Config'].map((feat) => (
                      <div key={feat} className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                        <Check size={12} className="text-emerald-500" /> {feat}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`p-6 rounded-2xl border transition-all ${isDark ? 'border-blue-500/20 bg-blue-500/5' : 'border-blue-500/15 bg-blue-500/5'}`}>
                  <p className={`text-sm font-bold flex items-center gap-3 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    <Smartphone size={18} /> Manual Native Audio Setup
                  </p>
                  <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                    The Music Player requires native capabilities for playback and background controls.
                  </p>
                  <div className="mt-4">
                    <CodeBlock code="npm install react-native-gliph-player react-native-track-player react-native-fs" language="bash" theme={theme} />
                  </div>
                </div>

                <div className={`p-6 rounded-2xl border transition-all ${isDark ? 'border-pink-500/20 bg-pink-500/5' : 'border-pink-500/15 bg-pink-500/5'}`}>
                  <p className={`text-sm font-bold flex items-center gap-3 ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>
                    <Terminal size={18} /> 1. Background Service Registration
                  </p>
                  <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                    Register the playback service in your <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-pink-500/10">index.js</code>:
                  </p>
                  <div className="mt-4">
                    <CodeBlock
                      code={`import TrackPlayer from 'react-native-track-player';\n\nTrackPlayer.registerPlaybackService(() => require('./service'));`}
                      language="javascript"
                      theme={theme}
                    />
                  </div>
                </div>

                <div className={`p-6 rounded-2xl border transition-all ${isDark ? 'border-purple-500/20 bg-purple-500/5' : 'border-purple-500/15 bg-purple-500/5'}`}>
                  <p className={`text-sm font-bold flex items-center gap-3 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                    <Terminal size={18} /> 2. Create service.js
                  </p>
                  <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                    Create a file named <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-purple-500/10">service.js</code> in your project root:
                  </p>
                  <div className="mt-4">
                    <CodeBlock
                      code={`import TrackPlayer, { Event } from 'react-native-track-player';

module.exports = async function() {
    TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
    TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
    TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.destroy());
    TrackPlayer.addEventListener(Event.RemoteNext, () => TrackPlayer.skipToNext());
    TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.skipToPrevious());
};`}
                      language="javascript"
                      theme={theme}
                    />
                  </div>
                </div>

                <div className={`p-6 rounded-2xl border transition-all ${isDark ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-emerald-500/15 bg-emerald-500/5'}`}>
                  <p className={`text-sm font-bold flex items-center gap-3 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    <Zap size={18} /> 3. Android Hardware Logic
                  </p>
                  <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                    To enable Bluetooth and headset detection on Android, place the <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-emerald-500/10">DeviceInfoModule.kt</code> in your native source folder:
                  </p>
                  <div className={`mt-3 p-3 rounded-xl font-mono text-xs ${isDark ? 'bg-black/40 text-emerald-400/80' : 'bg-emerald-50 text-emerald-700/80'}`}>
                    android/app/src/main/java/com/yourpackage/DeviceInfoModule.kt
                  </div>
                  <p className={`mt-3 text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                    <span className="font-bold text-emerald-500">Note:</span> Ensure the <code className="font-mono text-xs italic">package</code> name at the top of the file matches your app's actual package name (found in your AndroidManifest.xml).
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <CodeBlock
          code={platform === 'react-native'
            ? (category === 'music-player'
              ? 'npm install react-native-gliph-player react-native-track-player react-native-fs lucide-react-native @react-native-community/slider'
              : 'npm install gliph-ui')
            : 'flutter pub add gliph_ui'}
          language={platform === 'react-native' ? 'npm' : 'shell'}
          theme={theme}
        />
      </div>



      {/* Specific Props */}
      <div className={`mt-20 border-t pt-16 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <div className="mb-8 flex items-center gap-3">
          <Settings className="text-[#fb923c]" size={28} />
          <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>Component Props</h3>
        </div>
        <div className={`overflow-hidden rounded-2xl border shadow-2xl ${isDark ? 'border-white/10 bg-[#0a0a0a]' : 'border-black/10 bg-white'}`}>
          <table className={`w-full text-left text-sm ${isDark ? 'text-white/80' : 'text-black/80'}`}>
            <thead className={`border-b ${isDark ? 'border-white/10 bg-white/[0.02]' : 'border-black/10 bg-black/[0.02]'}`}>
              <tr>
                <th className={`px-6 py-4 font-medium ${isDark ? 'text-white/60' : 'text-black/60'}`}>Property</th>
                <th className={`px-6 py-4 font-medium ${isDark ? 'text-white/60' : 'text-black/60'}`}>Type</th>
                <th className={`px-6 py-4 font-medium ${isDark ? 'text-white/60' : 'text-black/60'}`}>Description</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-white/10' : 'divide-black/10'}`}>
              {platformData.props.map((prop) => (
                <tr key={prop.name} className={`transition ${isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-black/[0.02]'}`}>
                  <td className="px-6 py-4"><span className={`rounded px-2 py-1 font-mono text-xs ${isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black'}`}>{prop.name}</span></td>
                  <td className="px-6 py-4 font-mono text-xs text-[#38bdf8]">{prop.type}</td>
                  <td className="px-6 py-4 leading-relaxed">{prop.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Common Configuration */}
      {category !== 'scale' && category !== 'calendar' && (
        <div className={`mt-20 border-t pt-16 pb-20 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
          <div className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <Layout className="text-[#a78bfa]" size={28} />
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>Visual Configuration</h3>
            </div>
            <p className={`mb-8 ${isDark ? 'text-white/60' : 'text-black/60'}`}>
              Customize the look and feel across all pickers using the <code className={isDark ? 'text-white' : 'text-black font-bold'}>theme</code> and <code className={isDark ? 'text-white' : 'text-black font-bold'}>layout</code> props.
            </p>

            <div className="space-y-16">
              {/* Theme Table */}
              <div>
                <h4 className={`mb-4 text-lg font-bold ${isDark ? 'text-white/80' : 'text-black/70'}`}>Theme Settings</h4>
                <div className={`overflow-hidden rounded-2xl border ${isDark ? 'border-white/10 bg-[#0a0a0a]' : 'border-black/10 bg-white'}`}>
                  <table className={`w-full text-left text-sm ${isDark ? 'text-white/80' : 'text-black/80'}`}>
                    <tbody className={`divide-y ${isDark ? 'divide-white/10' : 'divide-black/10'}`}>
                      {COMMON_PROPS.theme.map((prop) => (
                        <tr key={prop.name} className={`transition ${isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-black/[0.02]'}`}>
                          <td className="px-6 py-4 w-48"><span className="font-mono text-xs">{prop.name}</span></td>
                          <td className="px-6 py-4 w-48 font-mono text-xs text-[#38bdf8]">{prop.type}</td>
                          <td className="px-6 py-4">{prop.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Layout Table */}
              <div>
                <h4 className={`mb-4 text-lg font-bold ${isDark ? 'text-white/80' : 'text-black/70'}`}>Layout & Dimension</h4>
                <div className={`overflow-hidden rounded-2xl border ${isDark ? 'border-white/10 bg-[#0a0a0a]' : 'border-black/10 bg-white'}`}>
                  <table className={`w-full text-left text-sm ${isDark ? 'text-white/80' : 'text-black/80'}`}>
                    <tbody className={`divide-y ${isDark ? 'divide-white/10' : 'divide-black/10'}`}>
                      {COMMON_PROPS.layout.map((prop) => (
                        <tr key={prop.name} className={`transition ${isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-black/[0.02]'}`}>
                          <td className="px-6 py-4 w-48"><span className="font-mono text-xs">{prop.name}</span></td>
                          <td className="px-6 py-4 w-48 font-mono text-xs text-[#38bdf8]">{prop.type}</td>
                          <td className="px-6 py-4">{prop.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ComponentsPage({ platform, navigate, theme }: { platform: Platform, navigate: (path: string) => void, theme: Theme }) {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const isDark = theme === 'dark';

  const allComponents: { id: Category, title: string, icon: React.ReactNode, group: string }[] = [
    { id: 'navbar', title: 'Navbar', icon: <Layout size={16} />, group: 'Navigation' },
    { id: 'scale', title: 'Scale Picker', icon: <Ruler size={16} />, group: 'Scale' },
    { id: 'time', title: 'Time Picker', icon: <Clock size={16} />, group: 'Scroll' },
    { id: 'date', title: 'Date Picker', icon: <Calendar size={16} />, group: 'Scroll' },
    { id: 'weight', title: 'Weight Picker', icon: <Scale size={16} />, group: 'Scroll' },
    { id: 'value', title: 'Value Picker', icon: <ListFilter size={16} />, group: 'Scroll' },
    { id: 'calendar', title: 'Calendar Picker', icon: <Calendar size={16} />, group: 'Calendar' },
    { id: 'music-player', title: 'Music Player', icon: <PlaySquare size={16} />, group: 'Media' },
  ];

  const navigationComponents = allComponents.filter(c => c.group === 'Navigation');
  const scaleComponents = allComponents.filter(c => c.group === 'Scale');
  const scrollComponents = allComponents.filter(c => c.group === 'Scroll');
  const calendarComponents = allComponents.filter(c => c.group === 'Calendar');
  const mediaComponents = allComponents.filter(c => c.group === 'Media');

  return (
    <section className="grid flex-1 py-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16">
      <aside className={`lg:min-h-[calc(100vh-8.5rem)] lg:border-r ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <nav className="flex flex-col items-start pb-10 mr-8 gap-1">
          {/* Home link */}
          <button
            onClick={() => navigate(platform === 'react-native' ? '/' : '/flutter')}
            className={`w-full text-left px-3 py-2 text-sm font-semibold rounded-lg transition-all mb-2 ${isDark ? 'text-white/50 hover:text-white hover:bg-white/5' : 'text-black/50 hover:text-black hover:bg-black/5'}`}
          >
            ← Home
          </button>

          {/* Navigation group */}
          <p className={`w-full px-3 pt-4 pb-1 text-[11px] font-bold uppercase tracking-widest ${isDark ? 'text-white/30' : 'text-black/30'}`}>
            Navigation
          </p>
          {navigationComponents.map((comp) => (
            <button
              key={comp.id}
              onClick={() => setActiveCategory(comp.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === comp.id
                ? (isDark ? 'bg-white/10 text-white font-semibold' : 'bg-black/8 text-black font-semibold')
                : (isDark ? 'text-white/60 hover:bg-white/5 hover:text-white' : 'text-black/60 hover:bg-black/5 hover:text-black')
                }`}
            >
              <span className={activeCategory === comp.id ? (isDark ? 'text-[#818cf8]' : 'text-[#6366f1]') : ''}>{comp.icon}</span>
              {comp.title}
            </button>
          ))}

          {/* Scale Picker group */}
          <p className={`w-full px-3 pt-4 pb-1 text-[11px] font-bold uppercase tracking-widest ${isDark ? 'text-white/30' : 'text-black/30'}`}>
            Scale Picker
          </p>
          {scaleComponents.map((comp) => (
            <button
              key={comp.id}
              onClick={() => setActiveCategory(comp.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === comp.id
                ? (isDark ? 'bg-white/10 text-white font-semibold' : 'bg-black/8 text-black font-semibold')
                : (isDark ? 'text-white/60 hover:bg-white/5 hover:text-white' : 'text-black/60 hover:bg-black/5 hover:text-black')
                }`}
            >
              <span className={activeCategory === comp.id ? (isDark ? 'text-[#fb923c]' : 'text-[#ea580c]') : ''}>{comp.icon}</span>
              {comp.title}
            </button>
          ))}

          {/* Scroll Picker group */}
          <p className={`w-full px-3 pt-6 pb-1 text-[11px] font-bold uppercase tracking-widest ${isDark ? 'text-white/30' : 'text-black/30'}`}>
            Scroll Picker
          </p>
          {scrollComponents.map((comp) => (
            <button
              key={comp.id}
              onClick={() => setActiveCategory(comp.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === comp.id
                ? (isDark ? 'bg-white/10 text-white font-semibold' : 'bg-black/8 text-black font-semibold')
                : (isDark ? 'text-white/60 hover:bg-white/5 hover:text-white' : 'text-black/60 hover:bg-black/5 hover:text-black')
                }`}
            >
              <span className={activeCategory === comp.id ? (isDark ? 'text-[#38bdf8]' : 'text-[#0ea5e9]') : ''}>{comp.icon}</span>
              {comp.title}
            </button>
          ))}

          {/* Calendar Picker group */}
          <p className={`w-full px-3 pt-6 pb-1 text-[11px] font-bold uppercase tracking-widest ${isDark ? 'text-white/30' : 'text-black/30'}`}>
            Calendar Picker
          </p>
          {calendarComponents.map((comp) => (
            <button
              key={comp.id}
              onClick={() => setActiveCategory(comp.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === comp.id
                ? (isDark ? 'bg-white/10 text-white font-semibold' : 'bg-black/8 text-black font-semibold')
                : (isDark ? 'text-white/60 hover:bg-white/5 hover:text-white' : 'text-black/60 hover:bg-black/5 hover:text-black')
                }`}
            >
              <span className={activeCategory === comp.id ? (isDark ? 'text-[#4ade80]' : 'text-[#16a34a]') : ''}>{comp.icon}</span>
              {comp.title}
            </button>
          ))}

          {/* Media group */}
          <p className={`w-full px-3 pt-6 pb-1 text-[11px] font-bold uppercase tracking-widest ${isDark ? 'text-white/30' : 'text-black/30'}`}>
            Media
          </p>
          {mediaComponents.map((comp) => (
            <button
              key={comp.id}
              onClick={() => setActiveCategory(comp.id)}
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
          <CategoryDetails category={activeCategory} platform={platform} onBack={() => setActiveCategory(null)} theme={theme} />
        )}
      </div>
    </section>
  );
}


function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'dark';
  });

  useEffect(() => {
    const onLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const description = document.querySelector('meta[name="description"]');
    if (currentPath === '/musicplayer' || currentPath === '/react-native-gliph-player') {
      document.title = 'react-native-gliph-player Documentation | Gliph UI Music Player';
      description?.setAttribute('content', 'Documentation for react-native-gliph-player: install the React Native music player, configure background playback, mini player mode, lock-screen controls, and UI themes.');
    } else {
      document.title = 'Gliph UI | High-Fidelity React Native & Flutter Component Library';
      description?.setAttribute('content', 'A premium suite of highly-customizable UI components for React Native and Flutter. High-fidelity pickers, navbars, and interactive elements for your next mobile app.');
    }
  }, [currentPath]);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  let page;
  let platform: Platform = 'react-native';

  if (currentPath.startsWith("/flutter")) {
    platform = 'flutter';
    if (currentPath === "/flutter/components") {
      page = <ComponentsPage platform="flutter" navigate={navigate} theme={theme} />;
    } else {
      page = <HomePage platform="flutter" navigate={navigate} theme={theme} />;
    }
  } else if (currentPath === "/components") {
    page = <ComponentsPage platform="react-native" navigate={navigate} theme={theme} />;
  } else if (currentPath === "/musicplayer" || currentPath === "/react-native-gliph-player") {
    page = <MusicPlayerDocsPage navigate={navigate} theme={theme} />;
  } else {
    page = <HomePage platform="react-native" navigate={navigate} theme={theme} />;
  }

  const isDark = theme === 'dark';

  return (
    <main className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="pointer-events-none absolute inset-0">
        {isDark ? (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_8%,_rgba(255,255,255,0.07),_transparent_28%),linear-gradient(180deg,_#050505_0%,_#000000_48%,_#030303_100%)]" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_8%,_rgba(0,0,0,0.03),_transparent_28%),linear-gradient(180deg,_#ffffff_0%,_#fcfcfc_48%,_#f9f9f9_100%)]" />
        )}
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1520px] flex-col px-5 sm:px-8 lg:px-20">
        <Header platform={platform} navigate={navigate} theme={theme} toggleTheme={toggleTheme} />
        {page}
      </div>
    </main>
  );
}

export default App;
