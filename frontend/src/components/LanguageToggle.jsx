import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'hi' ? 'en' : 'hi';
    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="px-4 py-2 bg-secondary text-white rounded-md font-bold focus:outline-none min-h-[48px] min-w-[48px] flex items-center justify-center transition hover:bg-amber-600"
    >
      {i18n.language === 'hi' ? 'EN' : 'हिं'}
    </button>
  );
}
