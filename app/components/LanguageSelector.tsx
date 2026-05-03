import React from "react";
import { Languages } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: 'en' | 'hi' | 'kn' | 'mr';
  onLanguageChange: (lang: 'en' | 'hi' | 'kn' | 'mr') => void;
}

const languages: {
  code: 'en' | 'hi' | 'kn' | 'mr';
  name: string;
  native: string;
}[] = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
];

export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-sm">
      <Languages className="size-5 text-green-600" />
      <select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value as 'en' | 'hi' | 'kn' | 'mr')}
        className="bg-transparent border-none outline-none font-medium text-sm"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.native}
          </option>
        ))}
      </select>
    </div>
  );
}
