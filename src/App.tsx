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
            className={`text-sm font-semibold transition hover:text-blue-500 cursor-pointer ${isDark ? 'text-white/70' : 'text-black/60'}`}
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


type Category = 'time' | 'weight' | 'value' | 'date' | 'scale' | 'calendar';

const CATEGORY_CONTENT = {
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
        theme={{
          activeColor: '#000000',
          indicatorColor: '#000000',
          textColor: '#000000'
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
      usage: `import 'package:gliph_ui/gliph_ui.dart';\n\nScalePicker(\n  value: 88.0,\n  min: 40.0,\n  max: 200.0,\n  unit: 'cm',\n  theme: const ScalePickerTheme(\n    textColor: Colors.black,\n    indicatorColor: Colors.black,\n  ),\n  onChange: (val) => print(val),\n)`,
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
  const [time, setTime] = useState({ hour: 7, minute: 30, ampm: 'am' });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
      <TimeScrollPicker
        value={time}
        onChange={setTime}
        limits={{
          is12Hour: true,
          minuteStep: 1,
          hourMin: 0,
          hourMax: 23
        }}
        theme={{
          activeTextColor: '#ffffff',
          inactiveTextColor: 'rgba(255,255,255,0.2)',
          accentColor: '#ffffff',
          separatorColor: '#ffffff'
        }}
        layout={{
          itemHeight: 72,
          visibleRows: 3,
          fontSize: 44
        }}
        motion={{
          decelerationRate: 0.992
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
      usage: `import 'package:flutter/material.dart';\nimport 'package:gliph_ui/gliph_ui.dart';\n\nclass ExampleApp extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return TimeScrollPicker(\n      theme: const ScrollPickerTheme(\n        activeTextColor: Colors.white,\n        inactiveTextColor: Colors.white24,\n        accentColor: Colors.blueAccent,\n        separatorColor: Colors.blueAccent,\n      ),\n      layout: const ScrollPickerLayout(\n        itemHeight: 72,\n        visibleRows: 3,\n        fontSize: 44,\n      ),\n      motion: const ScrollPickerMotion(\n        decelerationRate: 0.992,\n      ),\n      limits: const TimeScrollPickerLimits(\n        is12Hour: true,\n        minuteStep: 1,\n        hourMin: 1,\n        hourMax: 12,\n      ),\n      onChange: (TimeValue val) {\n        print('Selected: \${val.hour}:\${val.minute} \${val.ampm}');\n      },\n    );\n  }\n}`,
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
  const [weight, setWeight] = useState({ whole: 70, decimal: 5, unit: 'kg' });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
      <WeightScrollPicker
        value={weight}
        onChange={setWeight}
        limits={{
          wholeMin: 40,
          wholeMax: 200,
          units: ['kg', 'lbs'],
          decimalValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        }}
        theme={{
          activeTextColor: '#ffffff',
          inactiveTextColor: 'rgba(255,255,255,0.14)'
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
      usage: `import 'package:flutter/material.dart';\nimport 'package:gliph_ui/gliph_ui.dart';\n\nclass ExampleApp extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return WeightScrollPicker(\n      theme: const ScrollPickerTheme(\n        activeTextColor: Colors.white,\n        inactiveTextColor: Colors.white24,\n      ),\n      limits: const WeightScrollPickerLimits(\n        wholeMin: 40,\n        wholeMax: 150,\n        units: ['kg', 'lbs'],\n        decimalMin: 0,\n        decimalMax: 9,\n      ),\n      onChange: (WeightValue val) => print(val.whole),\n    );\n  }\n}`,
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
        layout={{
          itemHeight: 72,
          visibleRows: 3
        }}
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
      usage: `import 'package:gliph_ui/gliph_ui.dart';\n\nValueScrollPicker<String>(\n  items: [\n    ScrollPickerItem(label: 'A', value: 'a'),\n    ScrollPickerItem(label: 'B', value: 'b'),\n  ],\n  theme: const ScrollPickerTheme(\n    activeTextColor: Colors.white,\n    inactiveTextColor: Colors.white24,\n  ),\n  layout: const ScrollPickerLayout(\n    itemHeight: 72,\n    visibleRows: 3,\n  ),\n  onChange: (val) => print(val),\n)`,
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
      usage: `import 'package:gliph_ui/gliph_ui.dart';\n\nDateScrollPicker(\n  limits: const DateScrollPickerLimits(\n    yearMin: 1990,\n    yearMax: 2030,\n  ),\n  theme: const ScrollPickerTheme(\n    activeTextColor: Colors.white,\n    inactiveTextColor: Colors.white24,\n  ),\n  onChange: (val) => print(val.year),\n)`,
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
  const [date, setDate] = useState({
    year: 2025,
    month: 5,
    day: 9,
  });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <CalendarPicker
        value={date}
        onChange={setDate}
        theme={{
          accent: '#38BDF8',
          surface: '#111827',
        }}
        showTodayButton
        enableYearDropdown
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
      usage: `import 'package:gliph_ui/gliph_ui.dart';

CalendarPicker(
  value: CalendarDate(year: 2025, month: 5, day: 9),
  onChange: (date) => setState(() => _date = date),
  width: 320,
  height: 400,
  showTodayButton: true,
  showOutsideDays: true,
  enableYearDropdown: true,
  theme: const CalendarPickerTheme(
    accent: Color(0xFF38BDF8),
    onAccent: Color(0xFF082F49),
    surface: Color(0xFF111827),
    surfaceSoft: Color(0xFF1F2937),
    text: Color(0xFFF9FAFB),
    mutedText: Color(0xFFCBD5E1),
    faintText: Color(0xFF64748B),
    border: Color(0xFF334155),
  ),
)`,
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
  const [rnLoading, setRnLoading] = useState(true);
  const [flutterLoading, setFlutterLoading] = useState(true);

  const rnGif = data.reactNative?.previewGif || (category !== 'calendar' && category !== 'scale' ? data.previewGif : null);
  const flutterGif = data.flutter?.previewGif || (category !== 'calendar' && category !== 'scale' ? data.previewGif : null);
  const hasSeparatePreviews = data.reactNative?.previewGif && data.flutter?.previewGif;

  useEffect(() => {
    setRnLoading(true);
    setFlutterLoading(true);
    const timer = setTimeout(() => {
      setRnLoading(false);
      setFlutterLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [category]);

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

        <div className="flex flex-col items-center gap-12 lg:gap-20">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 w-full">
            {/* React Native Preview */}
            {(rnGif || hasSeparatePreviews) && (
              <div className="flex flex-col items-center w-full max-w-[320px]">
                <div className={`mb-6 flex items-center gap-2 px-3 py-1 rounded-full border ${isDark ? 'border-[#61dafb]/20 bg-[#61dafb]/5 text-[#61dafb]' : 'border-[#61dafb]/30 bg-[#61dafb]/5 text-[#0891b2]'}`}>
                  <Code2 size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">React Native</span>
                </div>

                <div className={`relative w-full aspect-[9/19.5] rounded-[3rem] border-[12px] bg-black shadow-2xl flex items-center justify-center overflow-hidden ${isDark ? 'border-[#1a1a1a] shadow-white/5' : 'border-zinc-800 shadow-black/20'}`}>
                  <div className="absolute top-0 inset-x-0 flex justify-center z-20 pt-3">
                    <div className="h-6 w-24 rounded-full bg-[#1a1a1a]"></div>
                  </div>

                  {rnLoading && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0a0a0a] rounded-[2.2rem] gap-4">
                      <div className="relative w-10 h-10">
                        <div className="absolute inset-0 rounded-full border-[3px] border-white/10"></div>
                        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#61dafb] animate-spin"></div>
                      </div>
                    </div>
                  )}

                  {rnGif ? (
                    <img
                      src={rnGif}
                      alt="React Native Preview"
                      className={`absolute inset-0 h-full w-full object-cover rounded-[2.2rem] transition-opacity duration-700 ${rnLoading ? 'opacity-0' : 'opacity-100'}`}
                      onLoad={() => setRnLoading(false)}
                    />
                  ) : (
                    <div className="text-white/20 text-xs font-medium text-center px-8">Preview not available</div>
                  )}
                </div>
              </div>
            )}

            {/* Flutter Preview */}
            {(flutterGif || hasSeparatePreviews) && (
              <div className="flex flex-col items-center w-full max-w-[320px]">
                <div className={`mb-6 flex items-center gap-2 px-3 py-1 rounded-full border ${isDark ? 'border-[#38bdf8]/20 bg-[#38bdf8]/5 text-[#38bdf8]' : 'border-[#38bdf8]/30 bg-[#38bdf8]/5 text-[#0369a1]'}`}>
                  <Smartphone size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Flutter</span>
                </div>

                <div className={`relative w-full aspect-[9/19.5] rounded-[3rem] border-[12px] bg-black shadow-2xl flex items-center justify-center overflow-hidden ${isDark ? 'border-[#1a1a1a] shadow-white/5' : 'border-zinc-800 shadow-black/20'}`}>
                  <div className="absolute top-0 inset-x-0 flex justify-center z-20 pt-3">
                    <div className="h-6 w-24 rounded-full bg-[#1a1a1a]"></div>
                  </div>

                  {flutterLoading && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0a0a0a] rounded-[2.2rem] gap-4">
                      <div className="relative w-10 h-10">
                        <div className="absolute inset-0 rounded-full border-[3px] border-white/10"></div>
                        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#38bdf8] animate-spin"></div>
                      </div>
                    </div>
                  )}

                  {flutterGif ? (
                    <img
                      src={flutterGif}
                      alt="Flutter Preview"
                      className={`absolute inset-0 h-full w-full object-cover rounded-[2.2rem] transition-opacity duration-700 ${flutterLoading ? 'opacity-0' : 'opacity-100'}`}
                      onLoad={() => setFlutterLoading(false)}
                    />
                  ) : (
                    <div className="text-white/20 text-xs font-medium text-center px-8 flex flex-col items-center gap-3">
                      <Smartphone size={32} className="opacity-20" />
                      Flutter Preview Coming Soon
                    </div>
                  )}
                </div>
              </div>
            )}
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
                  src={`https://snack.expo.dev/embedded?dependencies=gliph-ui@1.2.1&name=${encodeURIComponent(data.title)}&platform=android&theme=dark&code=${encodeURIComponent(platformData.usage)}`}
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
    { id: 'scale', title: 'Scale Picker', icon: <Ruler size={16} />, group: 'Scale' },
    { id: 'time', title: 'Time Picker', icon: <Clock size={16} />, group: 'Scroll' },
    { id: 'date', title: 'Date Picker', icon: <Calendar size={16} />, group: 'Scroll' },
    { id: 'weight', title: 'Weight Picker', icon: <Scale size={16} />, group: 'Scroll' },
    { id: 'value', title: 'Value Picker', icon: <ListFilter size={16} />, group: 'Scroll' },
    { id: 'calendar', title: 'Calendar Picker', icon: <Calendar size={16} />, group: 'Calendar' },
  ];

  const scaleComponents = allComponents.filter(c => c.group === 'Scale');
  const scrollComponents = allComponents.filter(c => c.group === 'Scroll');
  const calendarComponents = allComponents.filter(c => c.group === 'Calendar');

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
