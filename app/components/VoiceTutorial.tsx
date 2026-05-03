import React from "react";
import { X, Mic, Volume2 } from 'lucide-react';

interface VoiceTutorialProps {
  onClose: () => void;
}

export function VoiceTutorial({ onClose }: VoiceTutorialProps) {
  const examples = [
    {
      icon: '🌾',
      title: 'Add Produce',
      examples: [
        '"Add 50 kilograms tomatoes at 25 rupees"',
        '"मेरे पास 100 किलो प्याज है"',
      ],
    },
    {
      icon: '🔍',
      title: 'Search Products',
      examples: [
        '"Find onions near me"',
        '"Show cheap potatoes"',
        '"टमाटर दिखाओ"',
      ],
    },
    {
      icon: '📦',
      title: 'Check Orders',
      examples: [
        '"Show my orders"',
        '"Where is my delivery"',
        '"मेरे ऑर्डर कहाँ हैं"',
      ],
    },
    {
      icon: '💰',
      title: 'Wallet Actions',
      examples: [
        '"Check my balance"',
        '"Show wallet history"',
        '"पैसे जोड़ो"',
      ],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">🎤 Voice Commands</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="size-6" />
          </button>
        </div>

        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Mic className="size-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <div className="text-sm text-green-900 mb-2">
                Tap the microphone button at the bottom right corner anytime to speak
              </div>
              <div className="text-xs text-green-700">
                Available in: English, Hindi, Kannada, Marathi
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {examples.map((category, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-lg">{category.title}</h3>
              </div>
              <div className="space-y-2">
                {category.examples.map((example, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-white rounded-lg p-3">
                    <Volume2 className="size-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-700">{example}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-50 rounded-xl p-4">
          <div className="text-sm text-blue-900 mb-1">💡 Tip for Low Literacy Users</div>
          <div className="text-xs text-blue-700">
            You don't need to read or type anything. Just speak naturally in your language, and the app will understand and help you.
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-green-600 text-white rounded-xl py-4 text-lg mt-6 hover:bg-green-700 transition"
        >
          Got It!
        </button>
      </div>
    </div>
  );
}
