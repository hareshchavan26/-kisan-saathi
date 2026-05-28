import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function SchemeCard({ scheme }) {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const isHindi = i18n.language === 'hi';
  const name = isHindi ? scheme.nameHi : scheme.nameEn;
  const ministry = isHindi ? scheme.ministryHi : scheme.ministryEn;
  const benefit = isHindi ? scheme.benefitHi : scheme.benefitEn;

  return (
    <div className="bg-white/90 backdrop-blur-lg border border-gray-100 rounded-3xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 group cursor-pointer" onClick={() => navigate(`/scheme/${scheme.id}`)}>
      <div className="flex justify-between items-start mb-4 gap-3">
        <h3 className="font-bold text-2xl leading-tight text-gray-900 group-hover:text-primary transition-colors">{name}</h3>
        {scheme.matchScore !== undefined && (
          <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm">
            {scheme.matchScore}% {t('scheme.match')}
          </span>
        )}
      </div>
      
      <div className="text-sm border-b pb-3 text-secondary font-bold uppercase tracking-widest bg-clip-text mb-4">{ministry}</div>
      
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-4 mb-6 flex-grow relative overflow-hidden transition-all group-hover:from-green-100 group-hover:to-emerald-100">
        <p className="text-gray-800 font-bold text-lg z-10 relative">{benefit}</p>
      </div>

      <div className="mt-auto">
        <button 
          onClick={(e) => { e.stopPropagation(); navigate(`/scheme/${scheme.id}`); }}
          className="w-full bg-gray-50 border-2 border-gray-200 text-gray-800 font-bold py-4 rounded-xl group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 min-h-[48px] shadow-sm group-hover:shadow-md"
        >
          {t('scheme.viewDetails')}
        </button>
      </div>
    </div>
  );
}
