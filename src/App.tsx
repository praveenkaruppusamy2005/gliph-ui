import React, { useState } from 'react';
import { Clock, Scale, ListFilter, ChevronLeft, Terminal, MonitorSmartphone, Code2, PlaySquare, Calendar } from 'lucide-react';

function Header() {
  return (
    <header className="flex h-24 items-center justify-between">
      <a className="flex items-center gap-3 text-2xl font-bold" href="/">
        Gliph UI
        <span className="rounded-full bg-white/75 px-2.5 py-0.5 text-xs font-semibold text-black">
          Beta
        </span>
      </a>

      <nav className="hidden items-center gap-10 text-sm font-semibold text-white/85 md:flex">
        <a className="transition hover:text-white" href="/components">
          Components
        </a>
        <a className="transition hover:text-white" href="/pricing">
          Pricing
        </a>
      </nav>

      <a
        className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-black shadow-[0_16px_38px_rgba(255,255,255,0.12)] transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-200"
        href="/components"
      >
        Get Started
      </a>
    </header>
  );
}

function HomePage() {
  return (
    <section className="flex min-h-[calc(100vh-6rem)] items-center py-8 lg:py-0">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-bold leading-[1.08] text-white sm:text-6xl lg:text-7xl">
          Supercharge your
          <span className="block text-zinc-300">React Native</span>
          development
        </h1>

        <p className="mt-8 max-w-2xl text-lg font-medium leading-8 text-white/58">
          Ready-to-use React Native components crafted for clean mobile
          interfaces. Copy, customize, and ship polished screens faster.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            className="rounded-xl bg-white px-6 py-3.5 text-center text-base font-bold text-black shadow-[0_18px_44px_rgba(255,255,255,0.1)] transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-200"
            href="/components"
          >
            Browse Components
          </a>
        </div>
      </div>
    </section>
  );
}

type Category = 'time' | 'weight' | 'value' | 'date';

function CategoryDetails({ category, onBack }: { category: Category, onBack: () => void }) {
  const content = {
    time: {
      title: 'Time Picker',
      description: 'A 12-hour or 24-hour time selector with smooth momentum scrolling.',
      previewGif: 'https://www.dropbox.com/scl/fi/hs4nqtoggmg0wa36ezf4g/SVID_20260508_125930_1.gif?rlkey=gzg001e5qun2hbmqf5fg6y8mj&st=etfyjqc3&dl=1',
      usage: `import React, { useState } from 'react';\nimport { View } from 'react-native';\nimport { TimeScrollPicker } from 'gliph-ui';\n\nexport default function App() {\n  const [time, setTime] = useState({ hour: 7, minute: 30, ampm: 'am' });\n\n  return (\n    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000' }}>\n      <TimeScrollPicker\n        value={time}\n        onChange={setTime}\n        limits={{ is12Hour: true }}\n        theme={{\n          activeTextColor: '#ffffff',\n          inactiveTextColor: 'rgba(255,255,255,0.2)'\n        }}\n      />\n    </View>\n  );\n}`,
      props: [
        { name: 'value', type: 'TimeValue', default: 'undefined', desc: 'The controlled state object containing { hour, minute, ampm }.' },
        { name: 'onChange', type: '(val: TimeValue) => void', default: 'undefined', desc: 'Callback fired when the user snaps to a new time. Do NOT use this to update state on every frame.' },
        { name: 'limits.is12Hour', type: 'boolean', default: 'false', desc: 'When true, enables 12-hour AM/PM format. Hours are strictly clamped between 1-12.' },
        { name: 'limits.minuteStep', type: 'number', default: '1', desc: 'The interval for the minutes column (e.g., 1, 5, 15). Useful for rounding to nearest 5 minutes.' },
        { name: 'theme.activeTextColor', type: 'string', default: '"#ffffff"', desc: 'Color of the currently selected (center) item.' },
        { name: 'theme.inactiveTextColor', type: 'string', default: '"rgba(255,255,255,0.14)"', desc: 'Color of the unselected items. We recommend using rgba() with a low alpha channel.' },
        { name: 'theme.separatorColor', type: 'string', default: '"rgba(255,255,255,0.72)"', desc: 'Color of the static separator (the colon ":" between hours and minutes).' },
        { name: 'layout.visibleRows', type: 'number', default: '3', desc: 'Number of rows visible at once. Must be an odd number (3, 5, 7) for symmetry.' },
        { name: 'layout.itemHeight', type: 'number', default: '72', desc: 'Height of each individual row in pixels.' },
        { name: 'layout.fontSize', type: 'number', default: '44', desc: 'Font size of the picker text.' },
      ]
    },
    weight: {
      title: 'Weight Picker',
      description: 'A dedicated numeric picker for weights, including whole numbers, decimals, and units.',
      previewGif: "https://www.dropbox.com/scl/fi/b6iq20hqdv91hdtyayexi/SVID_20260508_131439_1.gif?rlkey=0h1fp00rtrxotbjqxvgqsrkim&st=nj32h4zb&dl=1",
      usage: `import React, { useState } from 'react';\nimport { View } from 'react-native';\nimport { WeightScrollPicker } from 'gliph-ui';\n\nexport default function App() {\n  const [weight, setWeight] = useState({ whole: 70, decimal: 5, unit: 'kg' });\n\n  return (\n    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000' }}>\n      <WeightScrollPicker\n        value={weight}\n        onChange={setWeight}\n        limits={{ \n          wholeMin: 40,\n          wholeMax: 120,\n          decimalValues: [0, 5],\n          units: ['kg', 'lbs']\n        }}\n      />\n    </View>\n  );\n}`,
      props: [
        { name: 'value', type: 'WeightValue', default: 'undefined', desc: 'The controlled state object containing { whole, decimal, unit }.' },
        { name: 'onChange', type: '(val: WeightValue) => void', default: 'undefined', desc: 'Callback fired when the user snaps to a new weight.' },
        { name: 'limits.wholeMin', type: 'number', default: '30', desc: 'The absolute minimum whole number selectable in the first column.' },
        { name: 'limits.wholeMax', type: 'number', default: '180', desc: 'The absolute maximum whole number selectable in the first column.' },
        { name: 'limits.decimalValues', type: 'number[]', default: '[0, 2, 5, 7]', desc: 'The exact discrete decimal values allowed in the middle column.' },
        { name: 'limits.units', type: 'string[]', default: '["kg", "lb"]', desc: 'The exact string units allowed in the last column.' },
        { name: 'theme.activeTextColor', type: 'string', default: '"#ffffff"', desc: 'Color of the currently selected (center) item.' },
        { name: 'theme.inactiveTextColor', type: 'string', default: '"rgba(255,255,255,0.14)"', desc: 'Color of the unselected items.' },
        { name: 'theme.separatorColor', type: 'string', default: '"rgba(255,255,255,0.72)"', desc: 'Color of the static separator (the dot "." between whole and decimal).' },
      ]
    },
    value: {
      title: 'Generic Value Picker',
      description: 'The core primitive. Feed it any array of items to create a fully customized, 120hz momentum-scrolling picker.',
      previewGif: "https://www.dropbox.com/scl/fi/sgprz1zdibw2uie1ktc0n/SVID_20260508_132953_1-1.gif?rlkey=33g2lt9mk1e9cgck5h5zenjoc&st=o6sqvllk&dl=1",
      usage: `import React, { useState } from 'react';\nimport { View } from 'react-native';\nimport { ValueScrollPicker } from 'gliph-ui';\n\nexport default function App() {\n  const [fruit, setFruit] = useState('apple');\n\n  return (\n    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000' }}>\n      <ValueScrollPicker\n        value={fruit}\n        onChange={setFruit}\n        items={[\n          { label: 'Apple', value: 'apple' },\n          { label: 'Banana', value: 'banana' },\n          { label: 'Orange', value: 'orange' },\n        ]}\n        theme={{\n          activeTextColor: '#ffffff',\n        }}\n      />\n    </View>\n  );\n}`,
      props: [
        { name: 'items', type: 'ScrollPickerItem[]', default: '[]', desc: 'Crucial: An array of objects matching { label: string, value: string | number }.' },
        { name: 'value', type: 'string | number', default: 'undefined', desc: 'The currently selected primitive value. Must match a value inside the items array.' },
        { name: 'onChange', type: '(val: string | number) => void', default: 'undefined', desc: 'Callback fired on final selection.' },
        { name: 'width', type: 'number', default: '96', desc: 'Optional fixed width in pixels for the column.' },
        { name: 'theme.activeTextColor', type: 'string', default: '"#ffffff"', desc: 'Color of the currently selected (center) item.' },
        { name: 'theme.inactiveTextColor', type: 'string', default: '"rgba(255,255,255,0.14)"', desc: 'Color of the unselected items.' },
      ]
    },
    date: {
      title: 'Date Picker',
      description: 'A fully robust date selector that automatically calculates leap years and month lengths dynamically.',
      previewGif: "https://www.dropbox.com/scl/fi/pi4c6rbd6urk66wgetzed/SVID_20260508_134712_1.gif?rlkey=2ngcbm6kupts4bzrvpng9uile&st=v540tqlz&dl=1",
      usage: `import React, { useState } from 'react';\nimport { View } from 'react-native';\nimport { DateScrollPicker } from 'gliph-ui';\n\nexport default function App() {\n  const [date, setDate] = useState({ year: 2024, month: 2, day: 29 });\n\n  return (\n    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000' }}>\n      <DateScrollPicker\n        value={date}\n        onChange={setDate}\n        limits={{ minYear: 2000, maxYear: 2050 }}\n        theme={{\n          activeTextColor: '#ffffff',\n        }}\n      />\n    </View>\n  );\n}`,
      props: [
        { name: 'value', type: 'DateValue', default: 'undefined', desc: 'The controlled state object { year, month, day }. Automatically defaults to today if omitted.' },
        { name: 'onChange', type: '(val: DateValue) => void', default: 'undefined', desc: 'Callback fired when the user snaps to a new date.' },
        { name: 'limits.minYear', type: 'number', default: '1900', desc: 'The absolute minimum year selectable.' },
        { name: 'limits.maxYear', type: 'number', default: '2100', desc: 'The absolute maximum year selectable.' },
        { name: 'width', type: 'number | { month, day, year }', default: 'undefined', desc: 'Optional fixed width in pixels. Pass a single number to apply to all columns, or an object to set individual widths.' },
        { name: 'theme.activeTextColor', type: 'string', default: '"#ffffff"', desc: 'Color of the currently selected (center) item.' },
        { name: 'theme.inactiveTextColor', type: 'string', default: '"rgba(255,255,255,0.14)"', desc: 'Color of the unselected items.' },
      ]
    }
  };

  const data = content[category];

  // Dynamically build the Expo Snack URL so it automatically imports gliph-ui and renders the code
  const snackUrl = `https://snack.expo.dev/embedded?dependencies=gliph-ui@1.1.1&name=${encodeURIComponent(data.title)}&platform=android&theme=dark&code=${encodeURIComponent(data.usage)}`;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={onBack}
        className="group flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70 transition-all hover:bg-white/10 hover:text-white mb-8"
      >
        <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        Back to categories
      </button>

      <h2 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl tracking-tight">
        {data.title}
      </h2>
      <p className="mt-5 text-lg leading-8 text-white/60 max-w-2xl">
        {data.description}
      </p>

      {/* Previews Grid */}
      <div className="mt-16 border-t border-white/10 pt-16">
        <div className="mb-8 flex items-center gap-3">
          <PlaySquare className="text-[#38bdf8]" size={28} />
          <h3 className="text-2xl font-bold text-white">Live Previews</h3>
        </div>

        <div className="flex flex-col items-center gap-16">

          {/* Top: iPhone Video Placeholder */}
          <div className="flex flex-col items-center w-full max-w-md">
            <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-white/40">
              Video Demonstration
            </p>

            {/* Pure CSS iPhone Wrapper */}
            <div className="relative w-[300px] aspect-[9/19] rounded-[3rem] border-[12px] border-[#1a1a1a] bg-black shadow-[0_0_0_2px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden">

              {/* Dynamic Island / Notch */}
              <div className="absolute top-0 inset-x-0 flex justify-center z-20 pt-3">
                <div className="h-6 w-24 rounded-full bg-[#1a1a1a]"></div>
              </div>

              {/* Dynamic Placeholder or Real GIF */}
              {data.previewGif ? (
                <img
                  src={data.previewGif}
                  alt={`${data.title} Preview`}
                  className="absolute inset-0 h-full w-full object-cover rounded-[2.2rem]"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black flex flex-col items-center justify-center p-8 text-center border border-white/5 rounded-[2.2rem]">
                  <div className="mb-4 rounded-full bg-white/5 p-4">
                    <MonitorSmartphone size={32} className="text-white/20" />
                  </div>
                  <p className="text-sm font-medium text-white/40 leading-relaxed">
                    Video preview placeholder.<br />
                    <span className="text-xs text-white/20 mt-2 block">Drop your .mp4 or .gif here later.</span>
                  </p>
                </div>
              )}

            </div>
          </div>

          {/* Bottom: Expo Snack Emulator */}
          <div className="flex flex-col w-full pt-8 border-t border-white/10">
            <div className="mb-6 flex items-center gap-3">
              <PlaySquare className="text-[#38bdf8]" size={28} />
              <h3 className="text-xl font-bold text-white">Live Playground</h3>
            </div>
            <p className="mb-6 text-base text-white/60">
              For the truest native experience, click <strong>"My Device"</strong> inside the emulator below and scan the QR code with the Expo Go app. This lets you feel the 120hz momentum scrolling on your actual physical phone.
            </p>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
              <iframe
                src={snackUrl}
                style={{ width: '100%', height: '650px', border: 0 }}
                title="Gliph UI Scroll Picker Expo Preview"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Installation */}
      <div className="mt-20 border-t border-white/10 pt-16">
        <div className="mb-6 flex items-center gap-3">
          <Terminal className="text-[#4ade80]" size={28} />
          <h3 className="text-2xl font-bold text-white">Installation</h3>
        </div>
        <p className="mb-4 text-white/60 text-base">Install the package directly into your React Native project via NPM or Yarn:</p>
        <div className="relative rounded-2xl border border-white/10 bg-[#0d0d0d] p-6 shadow-2xl">
          <pre className="text-[15px] font-mono text-[#c9d1d9]">
            <code>npm install gliph-ui</code>
          </pre>
          <div className="absolute right-4 top-4 rounded bg-white/5 px-2 py-1 text-xs text-white/40">npm</div>
        </div>
      </div>

      {/* Usage */}
      <div className="mt-20 border-t border-white/10 pt-16">
        <div className="mb-6 flex items-center gap-3">
          <Code2 className="text-[#f5d0a9]" size={28} />
          <h3 className="text-2xl font-bold text-white">Usage</h3>
        </div>
        <p className="mb-4 text-white/60 text-base">Copy and paste this into your project to get started instantly:</p>
        <div className="relative rounded-2xl border border-white/10 bg-[#0d0d0d] p-6 shadow-2xl">
          <pre className="overflow-x-auto text-[15px] leading-relaxed text-[#c9d1d9] font-mono whitespace-pre-wrap">
            <code>{data.usage}</code>
          </pre>
        </div>
      </div>

      {/* Props Reference */}
      <div className="mt-20 border-t border-white/10 pt-16">
        <h3 className="mb-8 text-2xl font-bold text-white">Props</h3>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl">
          <table className="w-full text-left text-sm text-white/80">
            <thead className="border-b border-white/10 bg-white/[0.02]">
              <tr>
                <th className="px-6 py-4 font-medium text-white/60">Property</th>
                <th className="px-6 py-4 font-medium text-white/60">Type</th>
                <th className="px-6 py-4 font-medium text-white/60">Default</th>
                <th className="px-6 py-4 font-medium text-white/60">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {data.props.map((prop) => (
                <tr key={prop.name} className="hover:bg-white/[0.02] transition">
                  <td className="px-6 py-4"><span className="rounded bg-white/10 px-2 py-1 font-mono text-xs text-white">{prop.name}</span></td>
                  <td className="px-6 py-4 font-mono text-xs text-[#38bdf8]">{prop.type}</td>
                  <td className="px-6 py-4 font-mono text-xs text-white/50">{prop.default}</td>
                  <td className="px-6 py-4 leading-relaxed text-white/70">{prop.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ComponentsPage() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const categories: { id: Category, title: string, icon: React.ReactNode }[] = [
    { id: 'time', title: 'Time Picker', icon: <Clock size={28} className="mb-3 text-black transition-transform" /> },
    { id: 'date', title: 'Date Picker', icon: <Calendar size={28} className="mb-3 text-black transition-transform" /> },
    { id: 'weight', title: 'Weight Picker', icon: <Scale size={28} className="mb-3 text-black transition-transform" /> },
    { id: 'value', title: 'Value Picker', icon: <ListFilter size={28} className="mb-3 text-black transition-transform" /> },
  ];

  return (
    <section className="grid flex-1 py-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16">
      <aside className="border-white/10 lg:min-h-[calc(100vh-8.5rem)] lg:border-r">
        <h1 className="mb-5 text-base font-bold text-white/52">Components</h1>
        <nav className="flex flex-col items-start gap-5 pb-10">
          <button
            onClick={() => setActiveCategory(null)}
            className="text-base font-bold text-white transition hover:text-zinc-300 text-left"
          >
            Scroll Picker
          </button>
        </nav>
      </aside>

      <div className="hidden w-full max-w-5xl pt-10 lg:block pb-32">
        {activeCategory === null ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#f5d0a9]">
              React Native
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl mb-12">
              Scroll Picker
            </h2>

            {/* White Category Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex flex-col items-center justify-center rounded-2xl bg-white p-5 text-black shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(255,255,255,0.2)] group"
                >
                  <div className="transition-transform duration-300 ease-out group-hover:scale-110">
                    {cat.icon}
                  </div>
                  <span className="text-base font-bold tracking-tight text-black">{cat.title}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <CategoryDetails category={activeCategory} onBack={() => setActiveCategory(null)} />
        )}
      </div>
    </section>
  );
}

function App() {
  const path = window.location.pathname;
  const page = path.startsWith("/components") ? <ComponentsPage /> : <HomePage />;

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_8%,_rgba(255,255,255,0.07),_transparent_28%),linear-gradient(180deg,_#050505_0%,_#000000_48%,_#030303_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1520px] flex-col px-5 sm:px-8 lg:px-20">
        <Header />
        {page}
      </div>
    </main>
  );
}

export default App;
