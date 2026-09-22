import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';

interface LanguageSwitcherProps {
  variant?: 'compact' | 'full';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: 'EN' },
    { code: 'bn', label: 'বাংলা', flag: 'বাং' },
    { code: 'ar', label: 'العربية', flag: 'عربي' },
  ];

  return (
    <div
      id="language-selector-3buttons"
      className={`inline-flex items-center p-1 rounded-xl bg-[#031528]/90 backdrop-blur-md border border-sky-500/25 shadow-md ${className}`}
      role="group"
      aria-label="Select Language"
    >
      <div className="hidden lg:flex items-center px-2 text-sky-400">
        <Globe className="w-3.5 h-3.5" />
      </div>

      <div className="flex items-center gap-1">
        {languages.map((lang) => {
          const isActive = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              id={`lang-btn-${lang.code}`}
              onClick={() => setLanguage(lang.code)}
              className={`relative px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer select-none flex items-center gap-1 ${
                isActive
                  ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(56,189,248,0.4)] scale-100'
                  : 'text-slate-300 hover:text-white hover:bg-sky-500/15'
              }`}
              title={`Switch language to ${lang.label}`}
              aria-pressed={isActive}
            >
              <span>{lang.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse ml-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
