import React, { useState, useEffect } from 'react';
import { Clock, Scale, ListFilter, ChevronLeft, Terminal, Code2, PlaySquare, Calendar, Smartphone, Copy, Check, Settings, Layout, Sun, Moon, Ruler } from 'lucide-react';

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
      <pre className={`overflow-x-auto text-[14px] leading-relaxed font-mono whitespace-pre-wrap selection:bg-[#38bdf8]/30 ${isDark ? 'text-[#c9d1d9]' : 'text-zinc-800'}`}>
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
        <a className="transition hover:text-blue-500" href="/pricing">
          Pricing
        </a>
      </nav>

      <div className="flex items-center gap-6">
        <button
          onClick={toggleTheme}
          className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${isDark ? 'border-white/10 bg-white/5 text-white hover:bg-white/15' : 'border-black/10 bg-black/5 text-black hover:bg-black/10'}`}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {isRN && (
          <a
            className={`hidden lg:block text-sm font-semibold transition hover:text-blue-500 cursor-pointer ${isDark ? 'text-white/70' : 'text-black/60'}`}
            onClick={(e) => { e.preventDefault(); navigate('/flutter'); }}
            href="/flutter"
          >
            Are you a Flutter developer?
          </a>
        )}

        <a
          className={`rounded-xl px-5 py-3 text-sm font-bold shadow-xl transition duration-200 hover:-translate-y-0.5 cursor-pointer ${isDark ? 'bg-white text-black hover:bg-zinc-200 shadow-white/5' : 'bg-black text-white hover:bg-zinc-800 shadow-black/5'}`}
          onClick={(e) => { e.preventDefault(); navigate(componentsPath); }}
          href={componentsPath}
        >
          Get Started
        </a>
      </div>
    </header>
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


type Category = 'time' | 'weight' | 'value' | 'date' | 'scale';

const CATEGORY_CONTENT = {
  scale: {
    title: 'Scale Picker',
    description: 'A horizontal ruler-style picker for height, weight, and other linear measurements.',
    reactNative: {
      previewGif: 'https://www.dropbox.com/scl/fi/cevifhhaubqobza5ft1pw/SVID_20260508_222010_1.gif?rlkey=950pp5hlbaqol46bbkohrrp8h&st=hu4gpr3r&dl=1',
      usage: `import React, { useState } from 'react';\nimport { ScalePicker } from 'gliph-ui';\n\nexport default function App() {\n  const [value, setValue] = useState(88);\n\n  return (\n    <ScalePicker\n      value={value}\n      onChange={setValue}\n      min={40}\n      max={200}\n      step={1}\n      subdivisions={10}\n      unit="cm"\n      theme={{\n        activeColor: '#000000',\n        indicatorColor: '#000000',\n        textColor: '#000000'\n      }}\n    />\n  );\n}`,
      props: [
        { name: 'value', type: 'number', default: 'undefined', desc: 'Current selection value.' },
        { name: 'onChange', type: '(val: number) => void', default: 'undefined', desc: 'Fires when selection changes.' },
        { name: 'min', type: 'number', default: '0', desc: 'Minimum allowed value.' },
        { name: 'max', type: 'number', default: '100', desc: 'Maximum allowed value.' },
        { name: 'step', type: 'number', default: '1', desc: 'Value increment step.' },
        { name: 'subdivisions', type: 'number', default: '10', desc: 'Number of ticks between each unit.' },
        { name: 'unit', type: 'string', default: '"cm"', desc: 'Measurement unit display label.' },
        { name: 'showLabels', type: 'boolean', default: 'true', desc: 'Toggle the visibility of numeric labels on the scale.' },
        { name: 'theme.subdivisionColor', type: 'string', default: 'rgba(0,0,0,0.2)', desc: 'Color of the small subdivision ticks.' },
        { name: 'theme.labelColor', type: 'string', default: 'rgba(0,0,0,0.4)', desc: 'Color of the numeric labels.' },
      ]
    },
    flutter: {
      previewGif: 'https://www.dropbox.com/scl/fi/xoiawxojcd31ai29frr26/SVID_20260508_220213_1.gif?rlkey=rhgmopbi22o69yvhvtezxjk6e&st=t4y8zqva&dl=1',
      usage: `import 'package:gliph_ui/gliph_ui.dart';\n\nScalePicker(\n  value: 88.0,\n  min: 40.0,\n  max: 200.0,\n  unit: 'cm',\n  theme: const ScalePickerTheme(\n    textColor: Colors.black,\n    indicatorColor: Colors.black,\n  ),\n  onChange: (val) => print(val),\n)`,
      props: [
        { name: 'value', type: 'double', default: '0.0', desc: 'Current selection value.' },
        { name: 'min', type: 'double', default: '0.0', desc: 'Minimum range boundary.' },
        { name: 'max', type: 'double', default: '100.0', desc: 'Maximum range boundary.' },
        { name: 'unit', type: 'String', default: '"cm"', desc: 'Label displayed next to value.' },
        { name: 'subdivisions', type: 'int', default: '10', desc: 'Number of small ticks between major units.' },
        { name: 'showLabels', type: 'bool', default: 'true', desc: 'Whether to show numbers on the scale.' },
        { name: 'theme.subdivisionColor', type: 'Color', default: 'Colors.black26', desc: 'Color of the minor tick marks.' },
        { name: 'theme.labelColor', type: 'Color', default: 'Colors.black45', desc: 'Color of the numeric labels.' },
        { name: 'theme', type: 'ScalePickerTheme', default: 'ScalePickerTheme()', desc: 'Customizes colors and fonts.' },
      ]
    }
  },
  time: {
    title: 'Time Picker',
    description: 'A 12-hour or 24-hour time selector with smooth momentum scrolling.',
    previewGif: 'https://www.dropbox.com/scl/fi/hs4nqtoggmg0wa36ezf4g/SVID_20260508_125930_1.gif?rlkey=gzg001e5qun2hbmqf5fg6y8mj&st=etfyjqc3&dl=1',
    reactNative: {
      usage: `import React, { useState } from 'react';\nimport { View } from 'react-native';\nimport { TimeScrollPicker } from 'gliph-ui';\n\nexport default function App() {\n  const [time, setTime] = useState({ hour: 7, minute: 30, ampm: 'am' });\n\n  return (\n    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000' }}>\n      <TimeScrollPicker\n        value={time}\n        onChange={setTime}\n        limits={{\n          is12Hour: true,\n          minuteStep: 1,\n          hourMin: 0,\n          hourMax: 23\n        }}\n        theme={{\n          activeTextColor: '#ffffff',\n          inactiveTextColor: 'rgba(255,255,255,0.2)',\n          accentColor: '#ffffff',\n          separatorColor: '#ffffff'\n        }}\n        layout={{\n          itemHeight: 72,\n          visibleRows: 3,\n          fontSize: 44\n        }}\n        motion={{\n          decelerationRate: 0.992\n        }}\n      />\n    </View>\n  );\n}`,
      props: [
        { name: 'value', type: 'TimeValue', default: 'undefined', desc: 'Controlled state { hour, minute, ampm }.' },
        { name: 'defaultValue', type: 'TimeValue', default: '{hour:7, minute:30}', desc: 'Initial selection for uncontrolled use.' },
        { name: 'onChange', type: '(val: TimeValue) => void', default: 'undefined', desc: 'Callback fired on selection snap.' },
        { name: 'limits.hourMin/Max', type: 'number', default: '0/23', desc: 'Constraint for hour range.' },
        { name: 'limits.minuteMin/Max', type: 'number', default: '0/59', desc: 'Constraint for minute range.' },
        { name: 'limits.minuteStep', type: 'number', default: '1', desc: 'Step between minute items.' },
        { name: 'limits.is12Hour', type: 'boolean', default: 'false', desc: 'Toggle AM/PM format.' },
      ]
    },
    flutter: {
      usage: `import 'package:flutter/material.dart';\nimport 'package:gliph_ui/gliph_ui.dart';\n\nclass ExampleApp extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return TimeScrollPicker(\n      theme: const ScrollPickerTheme(\n        activeTextColor: Colors.white,\n        inactiveTextColor: Colors.white24,\n        accentColor: Colors.blueAccent,\n        separatorColor: Colors.blueAccent,\n      ),\n      layout: const ScrollPickerLayout(\n        itemHeight: 72,\n        visibleRows: 3,\n        fontSize: 44,\n      ),\n      motion: const ScrollPickerMotion(\n        decelerationRate: 0.992,\n      ),\n      limits: const TimeScrollPickerLimits(\n        is12Hour: true,\n        minuteStep: 1,\n        hourMin: 1,\n        hourMax: 12,\n      ),\n      onChange: (TimeValue val) {\n        print('Selected: \${val.hour}:\${val.minute} \${val.ampm}');\n      },\n    );\n  }\n}`,
      props: [
        { name: 'value', type: 'TimeValue?', default: 'null', desc: 'Controlled selection state.' },
        { name: 'defaultValue', type: 'TimeValue', default: '7:30', desc: 'Initial selection.' },
        { name: 'onChange', type: 'ValueChanged<TimeValue>?', default: 'null', desc: 'Fires when selection changes.' },
        { name: 'limits.hourMin/Max', type: 'int', default: '0/23', desc: 'Hour constraints.' },
        { name: 'limits.minuteMin/Max', type: 'int', default: '0/59', desc: 'Minute constraints.' },
        { name: 'limits.minuteStep', type: 'int', default: '1', desc: 'Step between items.' },
        { name: 'limits.is12Hour', type: 'bool', default: 'false', desc: 'Enable AM/PM column.' },
      ]
    }
  },
  weight: {
    title: 'Weight Picker',
    description: 'A dedicated numeric picker for weights, including whole numbers, decimals, and units.',
    previewGif: "https://www.dropbox.com/scl/fi/b6iq20hqdv91hdtyayexi/SVID_20260508_131439_1.gif?rlkey=0h1fp00rtrxotbjqxvgqsrkim&st=nj32h4zb&dl=1",
    reactNative: {
      usage: `import React, { useState } from 'react';\nimport { View } from 'react-native';\nimport { WeightScrollPicker } from 'gliph-ui';\n\nexport default function App() {\n  const [weight, setWeight] = useState({ whole: 70, decimal: 5, unit: 'kg' });\n\n  return (\n    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000' }}>\n      <WeightScrollPicker\n        value={weight}\n        onChange={setWeight}\n        limits={{\n          wholeMin: 40,\n          wholeMax: 200,\n          units: ['kg', 'lbs'],\n          decimalValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\n        }}\n        theme={{\n          activeTextColor: '#ffffff',\n          inactiveTextColor: 'rgba(255,255,255,0.14)'\n        }}\n      />\n    </View>\n  );\n}`,
      props: [
        { name: 'value', type: 'WeightValue', default: 'undefined', desc: 'State { whole, decimal, unit }.' },
        { name: 'onChange', type: '(val: WeightValue) => void', default: 'undefined', desc: 'Fires on snap.' },
        { name: 'limits.wholeMin/Max', type: 'number', default: '0/500', desc: 'Whole number range.' },
        { name: 'limits.decimalValues', type: 'number[]', default: '[0..9]', desc: 'Allowed decimal values.' },
        { name: 'limits.units', type: 'string[]', default: "['kg', 'lbs']", desc: 'Unit selection options.' },
      ]
    },
    flutter: {
      usage: `import 'package:flutter/material.dart';\nimport 'package:gliph_ui/gliph_ui.dart';\n\nclass ExampleApp extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return WeightScrollPicker(\n      theme: const ScrollPickerTheme(\n        activeTextColor: Colors.white,\n        inactiveTextColor: Colors.white24,\n      ),\n      limits: const WeightScrollPickerLimits(\n        wholeMin: 40,\n        wholeMax: 150,\n        units: ['kg', 'lbs'],\n        decimalMin: 0,\n        decimalMax: 9,\n      ),\n      onChange: (WeightValue val) => print(val.whole),\n    );\n  }\n}`,
      props: [
        { name: 'value', type: 'WeightValue?', default: 'null', desc: 'Selection state.' },
        { name: 'onChange', type: 'ValueChanged<WeightValue>?', default: 'null', desc: 'Fires on selection change.' },
        { name: 'limits.wholeMin/Max', type: 'int', default: '0/500', desc: 'Whole number constraints.' },
        { name: 'limits.decimalMin/Max', type: 'int', default: '0/9', desc: 'Decimal constraints.' },
        { name: 'limits.units', type: 'List<String>', default: "['kg']", desc: 'Available units.' },
      ]
    }
  },
  value: {
    title: 'Value Picker',
    description: 'Simple momentum-scrolling picker for any list of items.',
    previewGif: "https://www.dropbox.com/scl/fi/sgprz1zdibw2uie1ktc0n/SVID_20260508_132953_1-1.gif?rlkey=33g2lt9mk1e9cgck5h5zenjoc&st=o6sqvllk&dl=1",
    reactNative: {
      usage: `import { ValueScrollPicker } from 'gliph-ui';\n\n<ValueScrollPicker\n  items={[\n    { label: 'Low', value: 'low' },\n    { label: 'Medium', value: 'medium' },\n    { label: 'High', value: 'high' }\n  ]}\n  value={val}\n  onChange={setVal}\n  theme={{\n    activeTextColor: '#ffffff',\n    inactiveTextColor: 'rgba(255,255,255,0.14)'\n  }}\n  layout={{\n    itemHeight: 72,\n    visibleRows: 3\n  }}\n/>`,
      props: [
        { name: 'items', type: 'ScrollPickerItem[]', default: '[]', desc: 'List of {label, value} pairs.' },
        { name: 'value', type: 'T', default: 'undefined', desc: 'Currently selected value.' },
        { name: 'onChange', type: '(val: T) => void', default: 'undefined', desc: 'Fires when user stops scrolling.' },
      ]
    },
    flutter: {
      usage: `import 'package:gliph_ui/gliph_ui.dart';\n\nValueScrollPicker<String>(\n  items: [\n    ScrollPickerItem(label: 'A', value: 'a'),\n    ScrollPickerItem(label: 'B', value: 'b'),\n  ],\n  theme: const ScrollPickerTheme(\n    activeTextColor: Colors.white,\n    inactiveTextColor: Colors.white24,\n  ),\n  layout: const ScrollPickerLayout(\n    itemHeight: 72,\n    visibleRows: 3,\n  ),\n  onChange: (val) => print(val),\n)`,
      props: [
        { name: 'items', type: 'List<ScrollPickerItem<T>>', default: '[]', desc: 'List of items to display.' },
        { name: 'value', type: 'T?', default: 'null', desc: 'Currently selected value.' },
        { name: 'onChange', type: 'ValueChanged<T>?', default: 'null', desc: 'Callback for selection changes.' },
      ]
    }
  },
  date: {
    title: 'Date Picker',
    description: 'Dynamic date selector with leap-year awareness.',
    previewGif: "https://www.dropbox.com/scl/fi/pi4c6rbd6urk66wgetzed/SVID_20260508_134712_1.gif?rlkey=2ngcbm6kupts4bzrvpng9uile&st=v540tqlz&dl=1",
    reactNative: {
      usage: `import { DateScrollPicker } from 'gliph-ui';\n\n<DateScrollPicker\n  value={date}\n  onChange={setDate}\n  limits={{\n    yearMin: 1990,\n    yearMax: 2030\n  }}\n  theme={{\n    activeTextColor: '#ffffff',\n    inactiveTextColor: 'rgba(255,255,255,0.14)'\n  }}\n/>`,
      props: [
        { name: 'value', type: 'DateValue', default: 'today', desc: 'Controlled selection {year, month, day}.' },
        { name: 'onChange', type: '(val: DateValue) => void', default: 'undefined', desc: 'Fires on snap.' },
        { name: 'limits.yearMin/Max', type: 'number', default: '1900/2100', desc: 'Year selection range.' },
      ]
    },
    flutter: {
      usage: `import 'package:gliph_ui/gliph_ui.dart';\n\nDateScrollPicker(\n  limits: const DateScrollPickerLimits(\n    yearMin: 1990,\n    yearMax: 2030,\n  ),\n  theme: const ScrollPickerTheme(\n    activeTextColor: Colors.white,\n    inactiveTextColor: Colors.white24,\n  ),\n  onChange: (val) => print(val.year),\n)`,
      props: [
        { name: 'value', type: 'DateValue?', default: 'today', desc: 'Current selection.' },
        { name: 'onChange', type: 'ValueChanged<DateValue>?', default: 'null', desc: 'Callback for date change.' },
        { name: 'limits.yearMin/Max', type: 'int', default: '1900/2100', desc: 'Year selection range.' },
      ]
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

function CategoryDetails({ category, platform, onBack, theme }: { category: Category, platform: Platform, onBack: () => void, theme: Theme }) {
  const data = CATEGORY_CONTENT[category];
  const platformData = platform === 'react-native' ? data.reactNative : data.flutter;
  const isDark = theme === 'dark';
  const [gifLoading, setGifLoading] = useState(true);

  // Reset loading when category or platform changes
  useEffect(() => {
    setGifLoading(true);
    const timer = setTimeout(() => setGifLoading(false), 900);
    return () => clearTimeout(timer);
  }, [category, platform]);

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
              Video Demonstration
            </p>

            <div className={`relative w-[300px] aspect-[9/19] rounded-[3rem] border-[12px] bg-black shadow-2xl flex items-center justify-center overflow-hidden ${isDark ? 'border-[#1a1a1a] shadow-white/5' : 'border-zinc-800 shadow-black/20'}`}>
              {/* Notch */}
              <div className="absolute top-0 inset-x-0 flex justify-center z-20 pt-3">
                <div className="h-6 w-24 rounded-full bg-[#1a1a1a]"></div>
              </div>

              {/* Loading overlay */}
              {gifLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0a0a0a] rounded-[2.2rem] gap-4">
                  {/* Spinner */}
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-[3px] border-white/10"></div>
                    <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-white animate-spin"></div>
                  </div>
                  <span className="text-white/40 text-xs font-medium tracking-widest uppercase">Loading</span>
                </div>
              )}

              <img
                key={`${category}-${platform}`}
                src={(platformData as { previewGif?: string }).previewGif || (data as { previewGif?: string }).previewGif || ''}
                alt={`${data.title} Preview`}
                className={`absolute inset-0 h-full w-full object-cover rounded-[2.2rem] transition-opacity duration-500 ${gifLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setGifLoading(false)}
              />
            </div>
          </div>


          {platform === 'react-native' && category !== 'scale' && (
            <div className={`flex flex-col w-full pt-8 border-t animate-in fade-in duration-500 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
              <div className="mb-6 flex items-center gap-3">
                <PlaySquare className="text-[#38bdf8]" size={28} />
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>Live Playground</h3>
              </div>
              <p className={`mb-6 text-base ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                Test the 120hz momentum scrolling in the browser, or scan the QR code to run it on your device.
              </p>
              <div className={`overflow-hidden rounded-2xl border shadow-2xl ${isDark ? 'border-white/10 bg-[#0a0a0a]' : 'border-black/10 bg-white'}`}>
                <iframe
                  src={`https://snack.expo.dev/embedded?dependencies=gliph-ui@1.1.1&name=${encodeURIComponent(data.title)}&platform=android&theme=dark&code=${encodeURIComponent(platformData.usage)}`}
                  style={{ width: '100%', height: '650px', border: 0 }}
                  title="Gliph UI Expo Preview"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Installation */}
      <div className={`mt-20 border-t pt-16 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <div className="mb-6 flex items-center gap-3">
          <Terminal className="text-[#4ade80]" size={28} />
          <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>Installation</h3>
        </div>
        <CodeBlock
          code={platform === 'react-native' ? 'npm install gliph-ui' : 'flutter pub add gliph_ui'}
          language={platform === 'react-native' ? 'npm' : 'shell'}
          theme={theme}
        />
      </div>

      {/* Usage */}
      <div className={`mt-20 border-t pt-16 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <div className="mb-6 flex items-center gap-3">
          <Code2 className="text-[#f5d0a9]" size={28} />
          <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>Usage</h3>
        </div>
        <CodeBlock code={platformData.usage} language={platform === 'react-native' ? 'tsx' : 'dart'} theme={theme} />
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
      {category !== 'scale' && (
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
    { id: 'scale', title: 'Scale Picker', icon: <Ruler size={16} />, group: 'Scale' },
    { id: 'time', title: 'Time Picker', icon: <Clock size={16} />, group: 'Scroll' },
    { id: 'date', title: 'Date Picker', icon: <Calendar size={16} />, group: 'Scroll' },
    { id: 'weight', title: 'Weight Picker', icon: <Scale size={16} />, group: 'Scroll' },
    { id: 'value', title: 'Value Picker', icon: <ListFilter size={16} />, group: 'Scroll' },
  ];

  const scaleComponents = allComponents.filter(c => c.group === 'Scale');
  const scrollComponents = allComponents.filter(c => c.group === 'Scroll');

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
