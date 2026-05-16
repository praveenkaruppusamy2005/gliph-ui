import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Menu,
  X,
  Search
} from 'lucide-react';
import type { Theme } from '../types';
import { CodeBlock } from '../components/CodeBlock';

type DocSection = 
  | 'Introduction' | 'Installation' | 'Full Implementation'
  | 'Complete Integration' | 'Controlling Playback' | 'Reactive State' | 'Background & Lock Screen'
  | 'New Architecture';

export function MusicPlayerDocsPage({ theme }: { theme: Theme }) {
  const navigate = useNavigate();
  const isDark = theme === 'dark';
  const [activeSection, setActiveSection] = useState<DocSection>('Introduction');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  const navGroups = [
    {
      title: 'Getting Started',
      items: ['Introduction', 'Installation', 'Full Implementation'] as DocSection[]
    },
    {
      title: 'Full Guide',
      items: ['Complete Integration', 'Controlling Playback', 'Reactive State', 'Background & Lock Screen'] as DocSection[]
    },
    {
      title: 'Advanced',
      items: ['New Architecture'] as DocSection[]
    }
  ];

  const Sidebar = () => (
    <div className={`h-full w-full lg:w-64 flex-shrink-0 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      <div className="sticky top-20 flex flex-col gap-8 pb-12 pt-8 lg:h-[calc(100vh-5rem)] lg:overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.title} className="flex flex-col gap-3">
            <h4 className={`text-sm font-bold uppercase tracking-widest px-6 ${isDark ? 'text-white/40' : 'text-black/40'}`}>
              {group.title}
            </h4>
            <div className="flex flex-col gap-1">
              {group.items.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item)}
                  className={`text-left px-6 py-2 text-sm font-medium transition-colors ${
                    activeSection === item
                      ? (isDark ? 'text-[#38bdf8] bg-[#38bdf8]/10 border-r-2 border-[#38bdf8]' : 'text-[#0284c7] bg-[#0284c7]/10 border-r-2 border-[#0284c7]')
                      : (isDark ? 'text-white/70 hover:text-white hover:bg-white/5' : 'text-black/70 hover:text-black hover:bg-black/5')
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const IntroContent = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
        react-native-gliph-player
      </h1>
      <p className={`text-xl leading-relaxed mb-12 ${isDark ? 'text-white/70' : 'text-black/70'}`}>
        A high-performance, New Architecture (JSI / TurboModules) compatible audio player for React Native. Built for developers who need absolute control over audio playback, background services, and system integration without fighting complex APIs.
      </p>

      <h2 className={`text-2xl font-bold mb-6 pt-6 border-t ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`}>
        🌟 Features
      </h2>
      <ul className={`space-y-4 mb-12 text-lg ${isDark ? 'text-white/80' : 'text-black/80'} list-disc pl-6`}>
        <li><strong>New Architecture Ready</strong>: Built from the ground up for TurboModules and JSI. No bridge latency.</li>
        <li><strong>Background Playback</strong>: Robust Android Foreground Service (Media3) and iOS AVAudioSession management.</li>
        <li><strong>Seamless Notification UI</strong>: Automatic integration with system media centers (Lock Screen, Control Center, Android Auto).</li>
        <li><strong>Zero-Lag Seeking</strong>: Optimized LoadControl for near-instantaneous seek-and-play response.</li>
        <li><strong>Drop-in React Hooks</strong>: Build UIs instantly with automatic re-rendering hooks.</li>
      </ul>

      <div className="flex gap-4 mt-12 pt-8 border-t border-white/10">
        <button
          onClick={() => setActiveSection('Installation')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-1 ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
        >
          Next: Installation <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );

  const InstallationContent = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <h1 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>📦 Installation</h1>
      
      <p className={`text-lg mb-8 ${isDark ? 'text-white/80' : 'text-black/80'}`}>
        Get started by installing the package via your preferred package manager.
      </p>

      <div className="mb-8">
        <CodeBlock 
          code={`npm install react-native-gliph-player\n# or\nyarn add react-native-gliph-player`} 
          language="bash" 
          theme={theme} 
        />
      </div>

      <h2 className={`text-2xl font-bold mb-6 pt-6 border-t ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`}>
        iOS Configuration
      </h2>
      <p className={`text-lg mb-4 ${isDark ? 'text-white/80' : 'text-black/80'}`}>
        Run <code className={isDark ? 'bg-white/10 px-1 rounded text-[#38bdf8]' : 'bg-black/5 px-1 rounded text-[#0284c7]'}>pod install</code> in your iOS directory. You must also enable audio background modes in your <code className={isDark ? 'bg-white/10 px-1 rounded text-[#38bdf8]' : 'bg-black/5 px-1 rounded text-[#0284c7]'}>Info.plist</code> so music keeps playing when the app is minimized:
      </p>
      <div className="mb-12">
        <CodeBlock 
          code={`<key>UIBackgroundModes</key>\n<array>\n  <string>audio</string>\n</array>`} 
          language="xml" 
          theme={theme} 
        />
      </div>

      <h2 className={`text-2xl font-bold mb-6 pt-6 border-t ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`}>
        Android Configuration
      </h2>
      <p className={`text-lg mb-4 ${isDark ? 'text-white/80' : 'text-black/80'}`}>
        Android handles most of this via autolinking. However, to show playback notifications (which is required for background play on Android 13+), you need the POST_NOTIFICATIONS permission.
      </p>
      <p className={`text-lg mb-4 ${isDark ? 'text-white/80' : 'text-black/80'}`}>
        If you are using a custom foreground service, ensure it is registered in your <code className="text-base">AndroidManifest.xml</code>:
      </p>
      <div className="mb-8">
        <CodeBlock 
          code={`<service\n  android:name="com.gliphplayer.GliphPlayerService"\n  android:exported="true"\n  android:foregroundServiceType="mediaPlayback"\n  android:stopWithTask="false">\n  <intent-filter>\n    <action android:name="androidx.media3.session.MediaLibraryService" />\n    <action android:name="android.media.browse.MediaBrowserService" />\n  </intent-filter>\n</service>`} 
          language="xml" 
          theme={theme} 
        />
      </div>

      <h3 className={`text-xl font-semibold mb-4 pt-4 ${isDark ? 'text-white/90' : 'text-black/90'}`}>
        Manual Kotlin Autolinking
      </h3>
      <p className={`text-lg mb-4 ${isDark ? 'text-white/80' : 'text-black/80'}`}>
        In case autolinking fails, manually register the package in your <code className={isDark ? 'bg-white/10 px-1 rounded text-[#38bdf8]' : 'bg-black/5 px-1 rounded text-[#0284c7]'}>MainApplication.kt</code>:
      </p>
      <div className="mb-8">
        <CodeBlock 
          code={`import com.gliphplayer.GliphPlayerPackage\n\noverride fun getPackages(): List<ReactPackage> = PackageList(this).packages.apply {\n    add(GliphPlayerPackage())\n}`} 
          language="kotlin" 
          theme={theme} 
        />
      </div>

      <div className="flex gap-4 mt-12 pt-8 border-t border-white/10">
        <button
          onClick={() => setActiveSection('Full Implementation')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-1 ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
        >
          Next: Full Implementation <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );

  const FullImplementationContent = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <h1 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>🚀 Full Implementation Example</h1>
      <p className={`text-lg mb-8 ${isDark ? 'text-white/80' : 'text-black/80'}`}>
        Want to skip straight to the code? Here is a complete, production-ready implementation containing both the main app setup (<code className="text-sm">App.tsx</code>) and the user interface (<code className="text-sm">MusicPlayer.tsx</code>).
      </p>

      <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>1. <code className="text-xl font-mono">App.tsx</code> (Main Entry)</h2>
      <div className="mb-12">
        <CodeBlock 
          code={`import React, { useEffect } from 'react';\nimport { View, Platform, PermissionsAndroid } from 'react-native';\nimport GliphPlayer, { Capability, AppKilledPlaybackBehavior } from 'react-native-gliph-player';\nimport { MusicPlayer } from './components/MusicPlayer';\n\nconst tracks = [\n  {\n    id: '1',\n    url: 'https://example.com/audio1.mp3',\n    title: 'Gliph Journey',\n    artist: 'Gliph Labs',\n    artwork: 'https://example.com/cover1.jpg',\n  },\n];\n\nexport default function App() {\n  useEffect(() => {\n    const setup = async () => {\n      // Android Notification Permission (API 33+)\n      if (Platform.OS === 'android' && Platform.Version >= 33) {\n        await PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS' as any);\n      }\n\n      await GliphPlayer.setupPlayer({\n        playBuffer: 0.5, // 0.5s buffer for zero-lag seeking\n        android: {\n          appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,\n        },\n      });\n\n      await GliphPlayer.updateOptions({\n        capabilities: [\n          Capability.Play, Capability.Pause,\n          Capability.SkipToNext, Capability.SkipToPrevious,\n          Capability.SeekTo,\n        ],\n      });\n\n      await GliphPlayer.add(tracks);\n    };\n\n    setup();\n  }, []);\n\n  return (\n    <View style={{ flex: 1, backgroundColor: '#121212' }}>\n      <MusicPlayer tracks={tracks} />\n    </View>\n  );\n}`} 
          language="tsx" 
          theme={theme} 
        />
      </div>

      <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>2. <code className="text-xl font-mono">MusicPlayer.tsx</code> (UI Component)</h2>
      <div className="mb-12">
        <CodeBlock 
          code={`import React, { useState } from 'react';\nimport { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';\nimport Slider from '@react-native-community/slider';\nimport GliphPlayer, { usePlaybackState, useProgress, useActiveTrack, State, RepeatMode } from 'react-native-gliph-player';\n\nexport const MusicPlayer = () => {\n  const { state } = usePlaybackState();\n  const { position, duration } = useProgress(500);\n  const track = useActiveTrack();\n  const [repeatMode, setRepeatMode] = useState('off');\n\n  const togglePlayback = async () => {\n    if (state === State.Playing) {\n      await GliphPlayer.pause();\n    } else {\n      await GliphPlayer.play();\n    }\n  };\n\n  const cycleRepeat = async () => {\n    const next = repeatMode === 'off' ? 'one' : repeatMode === 'one' ? 'all' : 'off';\n    setRepeatMode(next);\n    await GliphPlayer.setRepeatMode(\n      next === 'one' ? RepeatMode.Track : next === 'all' ? RepeatMode.Queue : RepeatMode.Off\n    );\n  };\n\n  return (\n    <View style={styles.container}>\n      <Image source={{ uri: track?.artwork }} style={styles.artwork} />\n      <Text style={styles.title}>{track?.title || 'No Track'}</Text>\n      \n      <Slider\n        style={{ width: '100%', height: 40 }}\n        value={position}\n        maximumValue={duration || 1}\n        onSlidingComplete={(val) => GliphPlayer.seekTo(val)}\n        minimumTrackTintColor="#1DB954"\n      />\n\n      <View style={styles.controls}>\n        <TouchableOpacity onPress={() => GliphPlayer.skipToPrevious()}>\n          <Text style={styles.btn}>Prev</Text>\n        </TouchableOpacity>\n        \n        <TouchableOpacity onPress={togglePlayback} style={styles.playBtn}>\n          <Text>{state === State.Playing ? 'PAUSE' : 'PLAY'}</Text>\n        </TouchableOpacity>\n\n        <TouchableOpacity onPress={() => GliphPlayer.skipToNext()}>\n          <Text style={styles.btn}>Next</Text>\n        </TouchableOpacity>\n      </View>\n\n      <TouchableOpacity onPress={cycleRepeat} style={{ marginTop: 20 }}>\n        <Text style={{ color: '#1DB954' }}>Repeat: {repeatMode.toUpperCase()}</Text>\n      </TouchableOpacity>\n    </View>\n  );\n};\n\nconst styles = StyleSheet.create({\n  container: { padding: 20, alignItems: 'center' },\n  artwork: { width: 300, height: 300, borderRadius: 10 },\n  title: { color: '#fff', fontSize: 24, marginVertical: 20 },\n  controls: { flexDirection: 'row', alignItems: 'center', gap: 40, marginTop: 20 },\n  playBtn: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center' },\n  btn: { color: '#fff', fontSize: 18 }\n});`} 
          language="tsx" 
          theme={theme} 
        />
      </div>

      <div className="flex gap-4 mt-12 pt-8 border-t border-white/10">
        <button
          onClick={() => setActiveSection('Complete Integration')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-1 ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
        >
          Next: Reading The Full Guide <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );

  const CompleteIntegrationContent = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <h1 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>Complete Integration</h1>
      <p className={`text-lg mb-8 ${isDark ? 'text-white/80' : 'text-black/80'}`}>
        Let's put the pieces together. Using <code className="text-sm">react-native-gliph-player</code> requires two steps: initializing the background service, and then actually rendering your UI.
      </p>

      <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Step 1: Setting up the Player</h2>
      <p className={`text-lg mb-4 ${isDark ? 'text-white/80' : 'text-black/80'}`}>
        You should initialize the player as soon as your app mounts (usually in <code className="text-sm">App.tsx</code>). You configure the buffer size, define what buttons show on the lock screen, and add your initial tracks.
      </p>
      <div className="mb-12">
        <CodeBlock 
          code={`import React, { useEffect } from 'react';\nimport { Platform, PermissionsAndroid } from 'react-native';\nimport GliphPlayer, { Capability, AppKilledPlaybackBehavior } from 'react-native-gliph-player';\n\nconst myTracks = [\n  {\n    id: '1',\n    url: 'https://example.com/audio.mp3',\n    title: 'Awesome Song',\n    artist: 'Gliph Labs',\n    artwork: 'https://example.com/cover.jpg', // Shows on lock screen\n  }\n];\n\nexport default function App() {\n  useEffect(() => {\n    const initializeAudio = async () => {\n      // 1. Request Android 13+ Notification Permission\n      if (Platform.OS === 'android' && Platform.Version >= 33) {\n        await PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS' as any);\n      }\n\n      // 2. Setup the engine\n      await GliphPlayer.setupPlayer({\n        playBuffer: 0.5, // 0.5s buffer for zero-lag seeking\n        android: {\n          // Keep playing even if user swipes app away\n          appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,\n        },\n      });\n\n      // 3. Define Lock Screen Controls\n      await GliphPlayer.updateOptions({\n        capabilities: [\n          Capability.Play, Capability.Pause,\n          Capability.SkipToNext, Capability.SkipToPrevious,\n          Capability.SeekTo,\n        ],\n      });\n\n      // 4. Add tracks to queue\n      await GliphPlayer.add(myTracks);\n    };\n\n    initializeAudio();\n  }, []);\n\n  return <YourMainUI />;\n}`} 
          language="tsx" 
          theme={theme} 
        />
      </div>
      
      <div className="flex gap-4 mt-12 pt-8 border-t border-white/10">
        <button
          onClick={() => setActiveSection('Controlling Playback')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-1 ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
        >
          Next: Controlling Playback <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );

  const ControllingPlaybackContent = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <h1 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>Controlling Playback</h1>
      <p className={`text-lg mb-8 ${isDark ? 'text-white/80' : 'text-black/80'}`}>
        Now that the player is initialized, you can control it from anywhere in your app using the <code className="text-sm">GliphPlayer</code> API.
      </p>

      <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Basic Controls</h2>
      <p className={`text-lg mb-4 ${isDark ? 'text-white/80' : 'text-black/80'}`}>
        Building play, pause, next, and previous buttons is straightforward. All commands are async promises.
      </p>
      <div className="mb-12">
        <CodeBlock 
          code={`import GliphPlayer from 'react-native-gliph-player';\nimport { TouchableOpacity, Text, View } from 'react-native';\n\nexport function PlayerControls() {\n  return (\n    <View style={{ flexDirection: 'row', gap: 20 }}>\n      <TouchableOpacity onPress={() => GliphPlayer.skipToPrevious()}>\n        <Text>Prev</Text>\n      </TouchableOpacity>\n\n      <TouchableOpacity onPress={() => GliphPlayer.play()}>\n        <Text>Play</Text>\n      </TouchableOpacity>\n\n      <TouchableOpacity onPress={() => GliphPlayer.pause()}>\n        <Text>Pause</Text>\n      </TouchableOpacity>\n\n      <TouchableOpacity onPress={() => GliphPlayer.skipToNext()}>\n        <Text>Next</Text>\n      </TouchableOpacity>\n    </View>\n  );\n}`} 
          language="tsx" 
          theme={theme} 
        />
      </div>

      <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Seeking and Jumping</h2>
      <p className={`text-lg mb-4 ${isDark ? 'text-white/80' : 'text-black/80'}`}>
        You can seek to a specific second, or jump forward/backward by an offset.
      </p>
      <div className="mb-12">
        <CodeBlock 
          code={`// Jump to exactly 1 minute in\n<TouchableOpacity onPress={() => GliphPlayer.seekTo(60)}>\n  <Text>Go to 1:00</Text>\n</TouchableOpacity>\n\n// Jump forward 15 seconds (great for podcasts)\n<TouchableOpacity onPress={() => GliphPlayer.seekBy(15)}>\n  <Text>+15s</Text>\n</TouchableOpacity>`} 
          language="tsx" 
          theme={theme} 
        />
      </div>

      <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Managing the Queue</h2>
      <p className={`text-lg mb-4 ${isDark ? 'text-white/80' : 'text-black/80'}`}>
        You can dynamically add, remove, or reorder tracks while the audio is playing.
      </p>
      <div className="mb-12">
        <CodeBlock 
          code={`// Add a track to the end of the queue\nawait GliphPlayer.add({\n  id: 'new-song',\n  url: 'https://example.com/new.mp3',\n  title: 'Just Added',\n  artist: 'User'\n});\n\n// Remove a specific track\nawait GliphPlayer.remove('track-1');\n\n// Stop playback and empty the queue entirely\nawait GliphPlayer.reset();`} 
          language="tsx" 
          theme={theme} 
        />
      </div>

      <div className="flex gap-4 mt-12 pt-8 border-t border-white/10">
        <button
          onClick={() => setActiveSection('Reactive State')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-1 ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
        >
          Next: Reactive State <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );

  const ReactiveStateContent = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <h1 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>Reactive State</h1>
      <p className={`text-lg mb-8 ${isDark ? 'text-white/80' : 'text-black/80'}`}>
        Instead of manually fetching state, Gliph Player ships with powerful React Hooks. These hooks automatically re-render your components whenever the audio state changes.
      </p>

      <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Building a Play/Pause Button</h2>
      <p className={`text-lg mb-4 ${isDark ? 'text-white/80' : 'text-black/80'}`}>
        The <code className="text-sm">useIsPlaying()</code> hook makes it incredibly easy to toggle a play/pause icon.
      </p>
      <div className="mb-12">
        <CodeBlock 
          code={`import GliphPlayer, { useIsPlaying } from 'react-native-gliph-player';\nimport { TouchableOpacity, Text } from 'react-native';\n\nexport function PlayPauseButton() {\n  const { playing } = useIsPlaying();\n\n  const toggle = async () => {\n    if (playing) {\n      await GliphPlayer.pause();\n    } else {\n      await GliphPlayer.play();\n    }\n  };\n\n  return (\n    <TouchableOpacity onPress={toggle} style={{ padding: 20, backgroundColor: '#333' }}>\n      <Text style={{ color: '#fff' }}>{playing ? 'PAUSE' : 'PLAY'}</Text>\n    </TouchableOpacity>\n  );\n}`} 
          language="tsx" 
          theme={theme} 
        />
      </div>

      <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Building a Progress Slider</h2>
      <p className={`text-lg mb-4 ${isDark ? 'text-white/80' : 'text-black/80'}`}>
        The <code className="text-sm">useProgress()</code> hook returns the current position and duration. It updates automatically so your slider moves smoothly in real-time.
      </p>
      <div className="mb-12">
        <CodeBlock 
          code={`import GliphPlayer, { useProgress } from 'react-native-gliph-player';\nimport Slider from '@react-native-community/slider';\n\nexport function ProgressBar() {\n  // Updates 2 times a second (500ms)\n  const { position, duration } = useProgress(500);\n\n  return (\n    <Slider\n      style={{ width: '100%', height: 40 }}\n      value={position}\n      maximumValue={duration || 1}\n      onSlidingComplete={(value) => GliphPlayer.seekTo(value)}\n      minimumTrackTintColor="#1DB954"\n      maximumTrackTintColor="#ffffff"\n    />\n  );\n}`} 
          language="tsx" 
          theme={theme} 
        />
      </div>

      <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Showing "Now Playing"</h2>
      <p className={`text-lg mb-4 ${isDark ? 'text-white/80' : 'text-black/80'}`}>
        The <code className="text-sm">useActiveTrack()</code> hook returns the data for the song currently playing. It changes automatically when a song skips.
      </p>
      <div className="mb-12">
        <CodeBlock 
          code={`import { useActiveTrack } from 'react-native-gliph-player';\nimport { View, Image, Text } from 'react-native';\n\nexport function NowPlaying() {\n  const track = useActiveTrack();\n\n  if (!track) return <Text>Nothing playing</Text>;\n\n  return (\n    <View style={{ alignItems: 'center' }}>\n      <Image source={{ uri: track.artwork }} style={{ width: 200, height: 200 }} />\n      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{track.title}</Text>\n      <Text style={{ fontSize: 18, color: 'gray' }}>{track.artist}</Text>\n    </View>\n  );\n}`} 
          language="tsx" 
          theme={theme} 
        />
      </div>

      <div className="flex gap-4 mt-12 pt-8 border-t border-white/10">
        <button
          onClick={() => setActiveSection('Background & Lock Screen')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-1 ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
        >
          Next: Background & Lock Screen <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );

  const BackgroundLockScreenContent = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <h1 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>Background & Lock Screen</h1>
      <p className={`text-lg mb-8 ${isDark ? 'text-white/80' : 'text-black/80'}`}>
        One of the biggest advantages of Gliph Player is that audio keeps playing when the app is minimized. The system lock screen and notification panel will show your track artwork and controls automatically.
      </p>

      <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Lock Screen Buttons</h2>
      <p className={`text-lg mb-4 ${isDark ? 'text-white/80' : 'text-black/80'}`}>
        The native OS provides the lock screen controls, but you need to tell Gliph Player how to respond when a user taps "Next" on their lock screen. If you don't listen for these events, the lock screen buttons won't do anything!
      </p>
      <p className={`text-lg mb-4 ${isDark ? 'text-white/80' : 'text-black/80'}`}>
        We provide a special hook <code className="text-sm">useTrackPlayerEvents</code> to capture these native remote events cleanly inside your components.
      </p>
      
      <div className="mb-12">
        <CodeBlock 
          code={`import { useTrackPlayerEvents, Event } from 'react-native-gliph-player';\nimport GliphPlayer from 'react-native-gliph-player';\n\nexport function PlaybackObserver() {\n  // Listen for native remote control events\n  useTrackPlayerEvents([\n    Event.RemotePlay, \n    Event.RemotePause, \n    Event.RemoteNext, \n    Event.RemotePrevious\n  ], (event) => {\n\n    if (event.type === Event.RemotePlay) {\n      GliphPlayer.play();\n    }\n    \n    if (event.type === Event.RemotePause) {\n      GliphPlayer.pause();\n    }\n    \n    if (event.type === Event.RemoteNext) {\n      GliphPlayer.skipToNext();\n    }\n    \n    if (event.type === Event.RemotePrevious) {\n      GliphPlayer.skipToPrevious();\n    }\n\n  });\n\n  // This component doesn't need to render anything visual\n  return null;\n}`} 
          language="tsx" 
          theme={theme} 
        />
      </div>

      <h2 className={`text-2xl font-bold mb-4 pt-6 border-t ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`}>Background Services (Advanced)</h2>
      <p className={`text-lg mb-4 ${isDark ? 'text-white/80' : 'text-black/80'}`}>
        If you want to handle events globally even when your React UI is completely unmounted, you can register listeners outside of the component tree (e.g. in your <code className="text-sm">index.js</code> file) using <code className="text-sm">GliphPlayer.addEventListener()</code>.
      </p>

      <div className="mb-12">
        <CodeBlock 
          code={`import GliphPlayer, { Event } from 'react-native-gliph-player';\n\n// In index.js or App.tsx (outside component)\nGliphPlayer.addEventListener(Event.RemotePlay, () => {\n  GliphPlayer.play();\n});\n\nGliphPlayer.addEventListener(Event.RemotePause, () => {\n  GliphPlayer.pause();\n});`} 
          language="tsx" 
          theme={theme} 
        />
      </div>

    </div>
  );

  const ArchitectureContent = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <h1 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>🏗️ New Architecture</h1>
      <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-white/80' : 'text-black/80'}`}>
        Gliph Player is built for the future. It is completely optimized for React Native 0.71+ and relies heavily on the New Architecture.
      </p>
      
      <h2 className={`text-2xl font-bold mb-4 pt-6 border-t ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`}>Synchronous JSI</h2>
      <p className={`text-lg leading-relaxed ${isDark ? 'text-white/80' : 'text-black/80'}`}>
        By utilizing Codegen and TurboModules, native calls bypass the asynchronous JSON bridge entirely. This means when you call <code className="text-sm">play()</code> or check the <code className="text-sm">state</code>, it executes instantaneously without micro-stutters.
      </p>
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      
      {/* Mobile Header / Search */}
      <div className={`lg:hidden flex items-center justify-between p-4 border-b sticky top-0 z-50 ${isDark ? 'border-white/10 bg-[#0a0a0a]/90 backdrop-blur' : 'border-black/10 bg-white/90 backdrop-blur'}`}>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`p-2 rounded-lg ${isDark ? 'text-white' : 'text-black'}`}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className={`font-bold ${isDark ? 'text-white' : 'text-black'}`}>Gliph Player Docs</span>
        <button className={`p-2 ${isDark ? 'text-white' : 'text-black'}`}>
          <Search size={20} />
        </button>
      </div>

      <div className="flex flex-1 relative">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block border-r border-white/10">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden flex">
            <div className={`w-3/4 max-w-sm h-full shadow-2xl animate-in slide-in-from-left duration-300 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
              <Sidebar />
            </div>
            <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          </div>
        )}

        {/* Main Content */}
        <main className={`flex-1 overflow-x-hidden p-6 lg:p-12 lg:pl-16 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
          {activeSection === 'Introduction' && <IntroContent />}
          {activeSection === 'Installation' && <InstallationContent />}
          {activeSection === 'Full Implementation' && <FullImplementationContent />}
          {activeSection === 'Complete Integration' && <CompleteIntegrationContent />}
          {activeSection === 'Controlling Playback' && <ControllingPlaybackContent />}
          {activeSection === 'Reactive State' && <ReactiveStateContent />}
          {activeSection === 'Background & Lock Screen' && <BackgroundLockScreenContent />}
          {activeSection === 'New Architecture' && <ArchitectureContent />}
        </main>
      </div>
    </div>
  );
}
