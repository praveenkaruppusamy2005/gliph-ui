export type Platform = 'react-native' | 'flutter';
export type Theme = 'light' | 'dark';
export type Category = 'time' | 'weight' | 'value' | 'date' | 'scale' | 'calendar' | 'navbar' | 'music-player';

export interface PickerProp {
  name: string;
  type: string;
  default: string;
  desc: string;
}

export interface PlatformData {
  previewGif?: string;
  usage: string;
  usageJs?: string;
  props: PickerProp[];
}

export interface Variant {
  name: string;
  reactNativePreview?: string;
  flutterPreview?: string;
  previewGif?: string;
  reactNativeUsage?: string;
  reactNativeUsageJs?: string;
  flutterUsage?: string;
  usage: string; // fallback
}

export interface CategoryData {
  title: string;
  description: string;
  previewGif?: string;
  reactNative: PlatformData;
  flutter: PlatformData;
  variants?: Variant[];
}
