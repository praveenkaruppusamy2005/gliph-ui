import type { Category, CategoryData } from '../types';
import { Headphones, Radio, Volume2, Disc3 } from 'lucide-react';

export const CATEGORY_IDS: Category[] = ['navbar', 'scale', 'time', 'date', 'weight', 'value', 'calendar', 'music-player'];

export const CATEGORY_CONTENT: Record<Category, CategoryData> = {
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
      usage: `// ==========================================
// components/music-player.tsx
// ==========================================
import React, { useMemo, useState, useEffect, useRef } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Animated,
  Platform,
  NativeModules,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {
  ArrowLeft,
  ListMusic,
  Headphones,
  Smartphone,
  MoreHorizontal,
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react-native';
import GliphPlayer, {
  usePlaybackState,
  useProgress,
  State,
  Event,
  useTrackPlayerEvents,
  RepeatMode,
} from 'react-native-gliph-player';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export type MusicPlayerTrack = {
  id: string;
  url: string;
  title: string;
  artist: string;
  album: string;
  artwork: string;
};

export type MusicPlayerUIConfig = {
  accentColor?: string;
  titleColor?: string;
  artistColor?: string;
  timeColor?: string;
  fontFamily?: string;
  artworkPadding?: number;
  titleFontSize?: number;
  artistFontSize?: number;
  marqueeSpeed?: number;
  showMiniPlayer?: boolean;
};

export type MusicPlayerProps = {
  tracks: MusicPlayerTrack[];
  initialTrackId?: string;
  onBack?: () => void;
  onTrackChange?: (track: MusicPlayerTrack) => void;
  uiConfig?: MusicPlayerUIConfig;
};

const repeatModes = ['off', 'one', 'all'] as const;

function MarqueeText({ text, style, speed = 35, delay = 2000 }: { text: string; style: any, speed?: number, delay?: number }) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const gap = 40;

  useEffect(() => {
    let isMounted = true;

    const startAnimation = () => {
      if (!isMounted || textWidth <= containerWidth || containerWidth <= 0) return;

      animatedValue.setValue(0);
      const duration = (textWidth + gap) * speed;

      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(animatedValue, {
          toValue: -(textWidth + gap),
          duration: duration,
          easing: (t) => t,
          useNativeDriver: true,
        })
      ]).start(({ finished }) => {
        if (isMounted) {
          startAnimation();
        }
      });
    };

    if (textWidth > containerWidth && containerWidth > 0) {
      startAnimation();
    } else {
      animatedValue.setValue(0);
    }

    return () => {
      isMounted = false;
      animatedValue.stopAnimation();
    };
  }, [textWidth, containerWidth, text, speed, delay]);

  return (
    <View
      style={{ overflow: 'hidden', width: '100%' }}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <View style={{ position: 'absolute', opacity: 0, flexDirection: 'row', width: 10000 }}>
        <Text
          onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
          style={[style, { alignSelf: 'flex-start' }]}
          numberOfLines={1}
        >
          {text}
        </Text>
      </View>

      <Animated.View
        style={{
          flexDirection: 'row',
          transform: [{ translateX: animatedValue }],
          width: textWidth > containerWidth ? 5000 : '100%',
        }}
      >
        <Text numberOfLines={1} style={style}>
          {text}
        </Text>
        {textWidth > containerWidth && (
          <Text numberOfLines={1} style={[style, { marginLeft: gap }]}>
            {text}
          </Text>
        )}
      </Animated.View>
    </View>
  );
}

export function MusicPlayer({
  tracks,
  initialTrackId,
  onBack,
  onTrackChange,
  uiConfig = {},
}: MusicPlayerProps) {
  const {
    accentColor = '#1DB954',
    titleColor = '#ffffff',
    artistColor = '#e5e5e5',
    timeColor = '#b3b3b3',
    fontFamily = Platform.OS === 'ios' ? 'System' : 'normal',
    artworkPadding = 48,
    titleFontSize = 32,
    artistFontSize = 20,
    marqueeSpeed = 30,
    showMiniPlayer = true,
  } = uiConfig;

  const playbackState = usePlaybackState();
  const progress = useProgress(250);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<(typeof repeatModes)[number]>('all');
  const [isSliding, setIsSliding] = useState(false);
  const [slidingValue, setSlidingValue] = useState(0);

  const isPlaying = playbackState.state === State.Playing;
  const activeTrack = tracks[activeIndex] ?? tracks[0];

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
    if (event.type === Event.PlaybackActiveTrackChanged && event.track) {
      const index = tracks.findIndex(t => t.id === event.track?.id);
      if (index !== -1) {
        setActiveIndex(index);
      }
    }
  });

  useTrackPlayerEvents([Event.PlaybackQueueEnded], async (event) => {
    if (repeatMode === 'off') {
      await GliphPlayer.skip(0);
      await GliphPlayer.play();
    }
  });

  const [isMinimized, setIsMinimized] = useState(false);

  const togglePlayback = async () => {
    try {
      const state = await GliphPlayer.getPlaybackState();
      const currentPlaying = state.state === State.Playing;

      if (currentPlaying) {
        await GliphPlayer.pause();
      } else {
        await GliphPlayer.play();
      }
    } catch (error) {
      console.error('Toggle Playback Error:', error);
      if (isPlaying) {
        await GliphPlayer.pause();
      } else {
        await GliphPlayer.play();
      }
    }
  };

  const skipTrack = async (direction: 1 | -1) => {
    try {
      if (direction === 1) {
        await GliphPlayer.skipToNext();
      } else {
        await GliphPlayer.skipToPrevious();
      }
    } catch (e) {
      await GliphPlayer.skip(0);
      await GliphPlayer.play();
    }
  };

  const cycleRepeatMode = async () => {
    const current = repeatModes.indexOf(repeatMode);
    const nextMode = repeatModes[(current + 1) % repeatModes.length];
    setRepeatMode(nextMode);

    if (nextMode === 'off') {
      await GliphPlayer.setRepeatMode(RepeatMode.Off);
    } else if (nextMode === 'one') {
      await GliphPlayer.setRepeatMode(RepeatMode.Track);
    } else if (nextMode === 'all') {
      await GliphPlayer.setRepeatMode(RepeatMode.Queue);
    }
  };

  const toggleShuffle = async () => {
    const newShuffle = !isShuffle;
    setIsShuffle(newShuffle);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return \`\${mins}:\${secs.toString().padStart(2, '0')}\`;
  };

  const handleSlidingComplete = async (value: number) => {
    await GliphPlayer.seekTo(value);
    await GliphPlayer.play();
    setTimeout(() => {
      setIsSliding(false);
    }, 500);
  };

  const [activeOutputName, setActiveOutputName] = useState<string | null>(null);

  useEffect(() => {
    const updateOutput = async () => {
      try {
        if (NativeModules.DeviceInfoModule) {
          const name = await NativeModules.DeviceInfoModule.getActiveAudioDeviceName();
          setActiveOutputName(name);
        }
      } catch (e) {}
    };

    updateOutput();
    const interval = setInterval(updateOutput, 3000);
    return () => clearInterval(interval);
  }, []);

  const deviceName = useMemo(() => {
    if (activeOutputName) return activeOutputName;

    if (Platform.OS === 'android') {
      const brand = (Platform as any).constants?.Brand || (Platform as any).constants?.Manufacturer || '';
      const model = (Platform as any).constants?.Model || '';
      return \`\${brand} \${model}\`.trim() || "Praveen's Device";
    }
    return "Praveen's iPhone";
  }, [activeOutputName]);

  if (!activeTrack) return null;

  if (isMinimized && showMiniPlayer) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setIsMinimized(false)}
        style={styles.miniPlayer}
      >
        <Image source={{ uri: activeTrack.artwork }} style={styles.miniArtwork} />
        <View style={styles.miniInfo}>
          <Text numberOfLines={1} style={[styles.miniTitle, { color: titleColor, fontFamily }]}>{activeTrack.title}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {activeOutputName ? (
              <Headphones color={accentColor} size={12} style={{ marginRight: 4 }} />
            ) : (
              <Smartphone color={accentColor} size={12} style={{ marginRight: 4 }} />
            )}
            <Text numberOfLines={1} style={[styles.miniArtist, { color: artistColor, fontFamily }]}>{activeTrack.artist}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={togglePlayback} style={styles.miniPlayBtn}>
          {isPlaying ? <Pause color="#ffffff" size={24} fill="#ffffff" /> : <Play color="#ffffff" size={24} fill="#ffffff" />}
        </TouchableOpacity>

        <View style={styles.miniSliderContainer}>
          <View
            style={[
              styles.miniSliderFill,
              {
                width: \`\${(progress.position / (progress.duration || 1)) * 100}%\`,
                backgroundColor: accentColor
              }
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.background}>
        <Image source={{ uri: activeTrack.artwork }} blurRadius={45} style={styles.bgImage} />
        <View style={styles.bgOverlay} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setIsMinimized(true)}>
            <ArrowLeft color="#ffffff" size={24} />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
        </View>

        <View style={[styles.heroArtworkContainer, { paddingHorizontal: artworkPadding }]}>
          <View style={styles.artworkShadow}>
            <Image source={{ uri: activeTrack.artwork }} style={styles.artwork} />
          </View>
        </View>

        <View style={styles.songInfoRow}>
          <View style={styles.songTextContainer}>
            <MarqueeText
              text={activeTrack.title}
              style={[styles.songTitle, { color: titleColor, fontSize: titleFontSize, fontFamily }]}
              speed={marqueeSpeed}
              delay={2000}
            />
            <MarqueeText
              text={activeTrack.artist}
              style={[styles.songArtist, { color: artistColor, fontSize: artistFontSize, fontFamily }]}
              speed={marqueeSpeed + 10}
              delay={3000}
            />
          </View>
        </View>

        <View style={styles.progressSection}>
          <Slider
            style={styles.slider}
            value={isSliding ? slidingValue : progress.position}
            minimumValue={0}
            maximumValue={progress.duration || 1}
            thumbTintColor="#ffffff"
            minimumTrackTintColor={accentColor}
            maximumTrackTintColor="rgba(255,255,255,0.3)"
            onSlidingStart={() => setIsSliding(true)}
            onValueChange={(val) => setSlidingValue(val)}
            onSlidingComplete={handleSlidingComplete}
          />
          <View style={styles.timeLabels}>
            <Text style={[styles.timeText, { color: timeColor, fontFamily }]}>
              {formatTime(isSliding ? slidingValue : progress.position)}
            </Text>
            <Text style={[styles.timeText, { color: timeColor, fontFamily }]}>{formatTime(progress.duration)}</Text>
          </View>
        </View>

        <View style={styles.controlCenter}>
          <TouchableOpacity onPress={toggleShuffle}>
            <Shuffle color={isShuffle ? accentColor : '#ffffff'} size={24} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => skipTrack(-1)}>
            <SkipBack color="#ffffff" size={32} fill="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={togglePlayback} style={styles.playButton}>
            {isPlaying ? (
              <Pause color="#000000" size={32} fill="#000000" />
            ) : (
              <Play color="#000000" size={32} fill="#000000" style={{ marginLeft: 4 }} />
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => skipTrack(1)}>
            <SkipForward color="#ffffff" size={32} fill="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={cycleRepeatMode}>
            {repeatMode === 'one' ? (
              <Repeat1 color={accentColor} size={24} />
            ) : (
              <Repeat color={repeatMode === 'all' ? accentColor : '#ffffff'} size={24} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.deviceStatus}>
          {activeOutputName ? (
            <Headphones color={accentColor} size={16} style={{ marginRight: 8 }} />
          ) : (
            <Smartphone color={accentColor} size={16} style={{ marginRight: 8 }} />
          )}
          <Text style={[styles.deviceName, { color: accentColor }]}>{deviceName}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#121212' },
  background: { ...StyleSheet.absoluteFill },
  bgImage: { ...StyleSheet.absoluteFill, opacity: 0.45 },
  bgOverlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.1)' },
  scroll: { paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 60 },
  heroArtworkContainer: { alignItems: 'center', marginTop: 40, paddingHorizontal: 48 },
  artworkShadow: { width: '100%', aspectRatio: 1, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.5, shadowRadius: 30, elevation: 25 },
  artwork: { width: '100%', height: '100%', borderRadius: 8 },
  songInfoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 28, marginTop: 48 },
  songTextContainer: { flex: 1 },
  songTitle: { color: '#ffffff', fontSize: 24, fontWeight: '700', letterSpacing: -0.5 },
  songArtist: { color: '#e5e5e5', fontSize: 20, marginTop: 8, fontWeight: '700', letterSpacing: -0.2 },
  progressSection: { paddingHorizontal: 16, marginTop: 24 },
  slider: { width: '100%', height: 40 },
  timeLabels: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, marginTop: -4 },
  timeText: { color: '#b3b3b3', fontSize: 11, fontWeight: '500' },
  controlCenter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 32, marginTop: 20 },
  playButton: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' },
  miniPlayer: { position: 'absolute', bottom: 20, left: 10, right: 10, height: 64, backgroundColor: 'rgba(40, 40, 40, 0.95)', borderRadius: 8, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 },
  miniArtwork: { width: 48, height: 48, borderRadius: 4 },
  miniInfo: { flex: 1, marginLeft: 12 },
  miniTitle: { color: '#ffffff', fontSize: 14, fontWeight: 'bold' },
  miniArtist: { color: '#b3b3b3', fontSize: 12 },
  miniPlayBtn: { padding: 8 },
  miniSliderContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, backgroundColor: 'rgba(255,255,255,0.1)', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, overflow: 'hidden' },
  miniSliderFill: { height: '100%', backgroundColor: '#ffffff' },
  deviceStatus: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 28, marginTop: 32, marginBottom: 20 },
  deviceName: { color: '#1DB954', fontSize: 12, fontWeight: '600', letterSpacing: 0.5 },
});


// ==========================================
// App.tsx
// ==========================================
// Note: Assuming MusicPlayer is exported from './components/music-player'
import { StatusBar, LogBox, PermissionsAndroid, Modal } from 'react-native';

const tracks = [
  {
    id: 'leo-badass',
    url: 'https://dl.dropboxusercontent.com/scl/fi/odjabq0j82svow4znyn4b/Badass-Leo-320-Kbps.mp3?rlkey=4yidwu60qtowjst8t6q2txs0u&st=drn5lwb9&dl=1',
    title: 'Badass (Leo) - Leo Das is a Badass',
    artist: 'Anirudh Ravichander, Vishnu Edavan, Lokesh Kanagaraj',
    album: 'Leo',
    artwork: 'https://c.saavncdn.com/415/Leo-Original-Motion-Picture-Soundtrack-English-2023-20231019170311-500x500.jpg',
  },
  {
    id: 'aura-10-10',
    url: 'https://dl.dropboxusercontent.com/scl/fi/wr1aakslyq6nzzllcfmg0/Aura-10-10.mp3?rlkey=jmz4jcdl1mhzk8zbabjiu0j5m&st=xd8c3k50&dl=1',
    title: 'Aura 10/10 - Meesaya Murukku 2',
    artist: 'Hiphop Tamizha, Adhi, Jeeva, Santhosh Narayanan',
    album: 'Meesaya Murukku 2',
    artwork: 'https://c.saavncdn.com/290/Aura-10-10-From-Meesaya-Murukku-2-Tamil-2026-20260303073304-500x500.jpg',
  },
];

function App() {
  const [isPlayerReady, setIsPlayerReady] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const playbackState = usePlaybackState();

  useEffect(() => {
    const setup = async () => {
      try {
        console.log('[GliphPlayer] Starting setup...');

        if (Platform.OS === 'android' && (Platform.Version as number) >= 33) {
          await PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS' as any);
        }

        await GliphPlayer.setupPlayer({
          waitForBuffer: false,
          minBuffer: 15,
          maxBuffer: 60,
          playBuffer: 1.5,
          backBuffer: 15,
          progressUpdateEventInterval: 1.0,
          maxCacheSize: 500,
          android: {
            appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
          },
        });

        await GliphPlayer.updateOptions({
          progressUpdateEventInterval: 1.0,
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.SeekTo,
            Capability.Stop,
          ],
          compactCapabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
          ],
          notificationIcon: 'ic_launcher',
        });

        await GliphPlayer.add(tracks);
        await GliphPlayer.setVolume(1.0);
        await GliphPlayer.seekTo(0);
        await GliphPlayer.play();
        
        GliphPlayer.addEventListener(Event.PlaybackError, (err) => {
          setError(\`Playback Error: \${err.message}\`);
        });

        setIsPlayerReady(true);
      } catch (e: any) {
        setError(e.message || 'Unknown error during setup');
      }
    };

    setup();
  }, []);

  if (error) {
    return (
      <View style={[styles.root, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
        <Text style={{ color: '#ff4444', fontSize: 16, textAlign: 'center' }}>{\`Setup Error: \${error}\`}</Text>
        <TouchableOpacity 
          onPress={() => { setError(null); setIsPlayerReady(false); }}
          style={{ marginTop: 20, padding: 10, backgroundColor: '#333', borderRadius: 8 }}
        >
          <Text style={{ color: '#fff' }}>Retry Setup</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!isPlayerReady) {
    return (
      <View style={[styles.root, { justifyContent: 'center', alignItems: 'center' }]}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
        <Text style={{ color: '#fff' }}>Initializing Player...</Text>
        <Text style={{ color: '#555', marginTop: 10 }}>{\`State: \${playbackState?.state ?? 'initializing...'}\`}</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <MusicPlayer
        tracks={tracks}
        initialTrackId="leo-badass"
        uiConfig={{
          accentColor: '#1DB954',
          titleColor: '#ffffff',
          artistColor: '#b3b3b3',
          timeColor: '#ffffffff',
          fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'system',
          artworkPadding: 90,
          titleFontSize: 28,
          artistFontSize: 18,
          marqueeSpeed: 40,
        }}
      />
    </View>
  );
}

export default App;`,
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

export const COMMON_PROPS = {
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

export const PLAYER_DOC_LINKS = [
  {
    title: 'React Native Gliph Player',
    desc: 'Install the player, connect react-native-track-player, and render the full-screen music experience.',
    icon: <Headphones size={ 18} />
  },
{
  title: 'Floating Mini Player',
    desc: 'Use the compact floating player for music apps, audio previews, podcasts, radio, and queue playback.',
      icon: <Radio size={ 18 } />
},
{
  title: 'Background Audio Controls',
    desc: 'Configure lock-screen actions, headset events, Bluetooth output detection, and Android notifications.',
      icon: <Volume2 size={ 18 } />
},
{
  title: 'Themes and Artwork',
    desc: 'Customize accent colors, artwork sizing, typography, marquee text, and mini-player visibility.',
      icon: <Disc3 size={ 18 } />
}
];
