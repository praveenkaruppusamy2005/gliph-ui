export interface BlogPost {
  id: string;
  title: string;
  category: 'Animations' | 'Performance' | 'Styling';
  readTime: string;
  date: string;
  author: string;
  summary: string;
  content: string; // HTML or structured content
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'react-native-gesture-pickers',
    title: 'Mastering React Native Gestures and Animations: Building Custom Pickers',
    category: 'Animations',
    readTime: '6 min read',
    date: 'May 25, 2026',
    author: 'Gliph Labs Tech Team',
    summary: 'Learn how to combine React Native Gesture Handler and Reanimated 3 to create fluid, haptic-snapping custom rulers and value selectors.',
    content: `
      <p class="text-lg leading-relaxed mb-6 font-medium">
        Standard mobile form elements are functional, but they often fail to capture the premium, tactile feel of physical hardware dials and scrollwheels. In this guide, we will step through how to build a high-fidelity scroll picker using React Native Gesture Handler and React Native Reanimated.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-white">The Limitation of Default ScrollViews</h2>
      <p class="mb-4">
        Using a standard React Native <code>ScrollView</code> with snap settings is the easiest way to make a picker. However, it suffers from several limitations:
      </p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Inconsistent Snap Points:</strong> Standard snapping relies on layout events which might fire out of order during fast scrolls.</li>
        <li><strong>Lack of Tactile Snell:</strong> You cannot trigger haptic feedbacks at exactly the moment a number crosses the active indicator.</li>
        <li><strong>Poor Inertial Control:</strong> Standard scroll decay values do not replicate the weight of a physical ruler.</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-white">Step 1: Setting Up the Gesture State</h2>
      <p class="mb-4">
        To build our custom picker, we start by wrapping the ruler component with a <code>GestureDetector</code>. This allows us to track horizontal or vertical drag gestures directly. Instead of utilizing state variables (which trigger React re-renders and introduce lag), we store coordinates in Reanimated Shared Values.
      </p>
      <pre class="p-4 rounded-xl bg-zinc-950 font-mono text-sm overflow-x-auto mb-6 text-pink-400">
const translationX = useSharedValue(0);
const contextX = useSharedValue(0);

const gesture = Gesture.Pan()
  .onStart(() => {
    contextX.value = translationX.value;
  })
  .onUpdate((event) => {
    translationX.value = contextX.value + event.translationX;
  });
      </pre>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-white">Step 2: Implementing Spring Snaps & Decay</h2>
      <p class="mb-4">
        When the user releases their finger, we want the picker to coast naturally and then snap precisely to the nearest division. Reanimated's <code>withDecay</code> computes the inertia based on velocity, and when the scroll slows down below a certain threshold, we transition to a spring snap using <code>withSpring</code>.
      </p>
      <p class="mb-4">
        This dual-stage physics engine is what gives Gliph UI's scroll picker its satisfying, weight-based rotation:
      </p>
      <pre class="p-4 rounded-xl bg-zinc-950 font-mono text-sm overflow-x-auto mb-6 text-pink-400">
.onEnd((event) => {
  translationX.value = withDecay({
    velocity: event.velocityX,
    clamp: [MIN_SCROLL, MAX_SCROLL],
  }, () => {
    // Snapping callback
    const nearestValue = Math.round(translationX.value / STEP_WIDTH) * STEP_WIDTH;
    translationX.value = withSpring(nearestValue, { damping: 15 });
  });
});
      </pre>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-white">Step 3: Triggering Soft Haptic Feeds</h2>
      <p class="mb-4">
        A premium user experience is incomplete without micro-interactions. By running a listener on the shared value using <code>useAnimatedReaction</code>, we can trigger a selection haptic engine callback whenever the translation index changes integer thresholds.
      </p>
      <p class="mb-6">
        By combining these three elements—shared coordinates, spring-decay physics, and runtime haptic feedback—you can build pickers that feel like a physical dial, elevating your mobile application from basic to premium.
      </p>
    `
  },
  {
    id: 'flutter-animation-performance',
    title: 'Flutter Widget Performance Optimization: Best Practices for Smooth Animations',
    category: 'Performance',
    readTime: '5 min read',
    date: 'May 20, 2026',
    author: 'Gliph Labs Tech Team',
    summary: 'Deep dive into optimization techniques for Flutter widgets. How to bypass unnecessary rebuilds and maintain 60/120 FPS animations.',
    content: `
      <p class="text-lg leading-relaxed mb-6 font-medium">
        Flutter allows developers to write complex custom layouts and animations rapidly. However, if not configured properly, custom painters and controllers can saturate the UI thread, causing dropped frames (jank). Let's look at how to optimize Flutter widget paint methods.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-white">The Three Pillars of Flutter Rendering</h2>
      <p class="mb-4">
        Understanding Flutter's pipeline is the key to optimizing it. When an animation runs, Flutter goes through:
      </p>
      <ol class="list-decimal pl-6 mb-6 space-y-2">
        <li><strong>Animate Phase:</strong> Animation values update over time.</li>
        <li><strong>Layout Phase:</strong> Dimensions and positions are calculated downwards.</li>
        <li><strong>Paint Phase:</strong> Pixels are drawn onto layers, which are then composited on the GPU.</li>
      </ol>
      <p class="mb-4">
        If a minor change (like a ticking clock hand) triggers a full widget layout phase, you are wasting valuable CPU cycles recalculating the size of components that never changed.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-white">Technique 1: Isolate Painter Layouts using RepaintBoundary</h2>
      <p class="mb-4">
        By wrapping your custom animations in a <code>RepaintBoundary</code>, you instruct Flutter to create a separate display layer for that subtree. This prevents repaint operations on the animated widget from propagating to other static components on the page (like headers or navigation sidebars).
      </p>
      <pre class="p-4 rounded-xl bg-zinc-950 font-mono text-sm overflow-x-auto mb-6 text-pink-400">
Widget build(BuildContext context) {
  return RepaintBoundary(
    child: CustomPaint(
      painter: WheelPainter(animationValue),
      size: Size.infinite,
    ),
  );
}
      </pre>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-white">Technique 2: Use AnimatedBuilder Correctly</h2>
      <p class="mb-4">
        A common anti-pattern is placing the static widget tree inside the <code>AnimatedBuilder</code> build function. This causes the entire subtree to rebuild on every frame. Instead, pass the static subtree as the <code>child</code> parameter of the <code>AnimatedBuilder</code> and reference it in the builder function.
      </p>
      <pre class="p-4 rounded-xl bg-zinc-950 font-mono text-sm overflow-x-auto mb-6 text-pink-400">
AnimatedBuilder(
  animation: _controller,
  child: StaticContentCard(), // Built once
  builder: (context, child) {
    return Transform.rotate(
      angle: _controller.value * 2.0 * Math.pi,
      child: child, // Rotates the card without rebuilding it
    );
  },
)
      </pre>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-white">Technique 3: Cache Path and Paint Configurations</h2>
      <p class="mb-4">
        Inside a <code>CustomPainter</code>, the <code>paint</code> method is executed on every single frame. Allocating <code>Paint</code> objects or instantiating complex <code>Path</code> algorithms here triggers garbage collection overhead. Pre-configure paints in your constructor or cache paths so that the paint thread only has to execute draws, not mathematics.
      </p>
      <p class="mb-6">
        Applying these techniques keeps your GPU threads light and allows complex pickers and dials to run at a lock-solid 120Hz on modern mobile displays.
      </p>
    `
  },
  {
    id: 'glassmorphism-mobile-ui',
    title: 'Building Glassmorphic User Interfaces in Mobile Applications',
    category: 'Styling',
    readTime: '6 min read',
    date: 'May 15, 2026',
    author: 'Gliph Labs Design Lead',
    summary: 'Explore how to style premium frosted-glass interfaces across React Native and Flutter with consistent styling and performance.',
    content: `
      <p class="text-lg leading-relaxed mb-6 font-medium">
        Glassmorphism is a popular design trend characterized by translucent panels, thin glowing borders, and realistic frosted-glass blur effects. Let's analyze how to implement this trend efficiently in mobile apps.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-white">The Anatomy of Premium Glassmorphism</h2>
      <p class="mb-4">
        To create a realistic frosted glass pane, you need four key design treatments:
      </p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Translucency:</strong> A semi-transparent background color (usually white or light gray with an opacity of 3% to 15%).</li>
        <li><strong>Multi-layered Blur:</strong> Behind-the-panel backdrop filter blur of 10px to 25px.</li>
        <li><strong>Subtle Border Highlight:</strong> A thin, high-contrast border simulating glass thickness (e.g. 1px solid with 10% opacity).</li>
        <li><strong>Dynamic Gradients:</strong> Colorful glowing spheres rotating or moving slowly behind the panel to emphasize the blur.</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-white">Implementation in React Native</h2>
      <p class="mb-4">
        Pure CSS in React Native doesn't support backdrop blurs natively. To achieve this, we must wrap our glass panels with components that compile to native views (like <code>BlurView</code> from Expo or Community Blur).
      </p>
      <pre class="p-4 rounded-xl bg-zinc-950 font-mono text-sm overflow-x-auto mb-6 text-pink-400">
import { BlurView } from 'expo-blur';

export function GlassCard() {
  return (
    &lt;BlurView intensity={20} tint="dark" style={styles.card}&gt;
      &lt;Text style={styles.text}&gt;Frosted Panel&lt;/Text&gt;
    &lt;/BlurView&gt;
  );
}
      </pre>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-white">Implementation in Flutter</h2>
      <p class="mb-4">
        Flutter handles frosted glass beautifully in the core framework using the <code>BackdropFilter</code> widget. By combining it with a <code>ClipRRect</code>, we can constrain the blur precisely to the card shape.
      </p>
      <pre class="p-4 rounded-xl bg-zinc-950 font-mono text-sm overflow-x-auto mb-6 text-pink-400">
ClipRRect(
  borderRadius: BorderRadius.circular(20),
  child: BackdropFilter(
    filter: ImageFilter.blur(sigmaX: 15, sigmaY: 15),
    child: Container(
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.05),
        border: Border.all(color: Colors.white.withOpacity(0.1)),
      ),
      child: Center(child: Text("Glassmorphic Widget")),
    ),
  ),
)
      </pre>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-white">Performance Concerns</h2>
      <p class="mb-4">
        Blurring pixels is a GPU-intensive process because it requires running box-filters or Gaussian-filters on every screen refresh. To prevent your app from stuttering:
      </p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Avoid overlapping blurs:</strong> Do not place a glassmorphic card on top of another glassmorphic card.</li>
        <li><strong>Add performance fallbacks:</strong> Detect older or lower-spec devices and fall back to solid background colors without blur filters.</li>
        <li><strong>Limit layout sizes:</strong> Keep blur panels localized rather than blurring full scroll views.</li>
      </ul>
      <p class="mb-6">
        When designed carefully, glassmorphism creates interfaces that feel tactile and deep, reinforcing the hierarchical layering of your mobile app design.
      </p>
    `
  }
];
