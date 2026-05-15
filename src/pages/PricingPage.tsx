import React from 'react';
import { Check } from 'lucide-react';
import type { Theme } from '../types';

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for side projects and personal apps.',
    features: ['Access to all basic components', 'React Native & Flutter support', 'Community support', 'Open source (MIT)'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$49',
    description: 'Advanced components for professional developers.',
    features: ['Everything in Free', 'Premium Animated Navbars', 'Cinematic Music Player UI', 'Advanced Picker variants', 'Priority Support'],
    cta: 'Coming Soon',
    popular: true,
  },
];

export function PricingPage({ theme }: { theme: Theme }) {
  const isDark = theme === 'dark';

  return (
    <section className="py-20 flex flex-col items-center">
      <div className="text-center max-w-2xl mb-16">
        <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Simple, Transparent Pricing</h1>
        <p className={`text-lg ${isDark ? 'text-white/60' : 'text-black/60'}`}>
          Start for free and upgrade as you grow. Our premium components help you ship faster with world-class UI.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        {PLANS.map((plan) => (
          <div 
            key={plan.name}
            className={`relative p-8 rounded-3xl border transition-all ${plan.popular ? (isDark ? 'border-blue-500 bg-blue-500/5' : 'border-blue-500 bg-blue-50') : (isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5')}`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                Most Popular
              </span>
            )}
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>{plan.price}</span>
              <span className={`text-sm ${isDark ? 'text-white/40' : 'text-black/40'}`}>/ one-time</span>
            </div>
            <p className={`text-sm mb-8 ${isDark ? 'text-white/60' : 'text-black/60'}`}>{plan.description}</p>
            
            <ul className="space-y-4 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black'}`}>
                    <Check size={12} />
                  </div>
                  <span className={`text-sm ${isDark ? 'text-white/70' : 'text-black/70'}`}>{feature}</span>
                </li>
              ))}
            </ul>

            <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.popular ? 'bg-blue-500 text-white hover:bg-blue-600' : (isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800')}`}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
