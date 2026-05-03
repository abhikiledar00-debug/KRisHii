import React from "react";
import { Check } from "lucide-react";

interface LanguageOnboardingProps {
  onLanguageSelect: (
    lang: "en" | "hi" | "kn" | "mr"
  ) => void;
}

const languages: {
  code: "en" | "hi" | "kn" | "mr";
  name: string;
  native: string;
  flag: string;
}[] = [
  {
    code: "en",
    name: "English",
    native: "English",
    flag: "🇬🇧",
  },
  {
    code: "hi",
    name: "Hindi",
    native: "हिंदी",
    flag: "🇮🇳",
  },
  {
    code: "kn",
    name: "Kannada",
    native: "ಕನ್ನಡ",
    flag: "🇮🇳",
  },
  {
    code: "mr",
    name: "Marathi",
    native: "मराठी",
    flag: "🇮🇳",
  },
];

export function LanguageOnboarding({
  onLanguageSelect,
}: LanguageOnboardingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-600 to-green-800 p-6 flex flex-col">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-12">
          <div className="size-24 bg-white rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-5xl">🌾</span>
          </div>

          <h1 className="text-3xl text-white mb-3">
            Welcome to KrishiConnect
          </h1>

          <p className="text-green-100">
            अपनी भाषा चुनें / Choose Your Language
          </p>
        </div>

        <div className="space-y-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onLanguageSelect(lang.code)}
              className="w-full bg-white rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl transition-all hover:scale-105"
            >
              <span className="text-4xl">{lang.flag}</span>

              <div className="flex-1 text-left">
                <div className="text-2xl mb-1">
                  {lang.native}
                </div>

                <div className="text-sm text-gray-500">
                  {lang.name}
                </div>
              </div>

              <div className="size-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <Check className="size-5 text-transparent" />
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-green-100 text-sm mt-8">
          You can change this later in settings
        </p>
      </div>
    </div>
  );
}