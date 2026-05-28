import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useWizardStore from '../store/useWizardStore';
import SchemeCard from '../components/SchemeCard';
import { exportToPdf } from '../utils/pdfExport';
import { shareOnWhatsApp } from '../utils/whatsappShare';
import { Share2, Download, RotateCcw } from 'lucide-react';

export default function Results() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { matchedSchemes, resetWizard } = useWizardStore();

  const handleStartOver = () => {
    resetWizard();
    navigate('/');
  };

  const handleShareAll = () => {
    const isHindi = i18n.language === 'hi';
    const text = isHindi ? 'नमस्ते! किसान साथी ने मुझे इन योजनाओं के लिए पात्र पाया है:\n' : 'Hello! Kisan Saathi found me eligible for these schemes:\n';
    
    const schemeList = matchedSchemes.map((s, i) => {
      const name = isHindi ? s.nameHi : s.nameEn;
      const benefit = isHindi ? s.benefitHi : s.benefitEn;
      return `${i + 1}. ${name} - ${benefit}`;
    }).join('\n');

    const footer = isHindi ? '\n\nअपनी पात्रता जांचें: https://kisan-saathi.vercel.app' : '\n\nCheck your eligibility: https://kisan-saathi.vercel.app';
    
    shareOnWhatsApp(text + schemeList + footer);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12" id="results-report">
      <div className="bg-primary text-white p-8 rounded-3xl mb-8 text-center shadow-md">
        <h1 className="text-3xl font-bold mb-2">
          {matchedSchemes.length > 0 ? t('results.title', { count: matchedSchemes.length }) : t('results.noResults')}
        </h1>
      </div>

      {matchedSchemes.length > 0 && (
        <>
          <div className="flex flex-wrap gap-4 mb-8 justify-center no-print">
            <button 
              onClick={handleShareAll}
              className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold rounded-xl shadow hover:bg-[#128C7E] transition min-h-[48px]"
            >
              <Share2 className="w-5 h-5"/> {t('results.shareAll')}
            </button>
            <button 
              onClick={() => exportToPdf('results-report')}
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl shadow-sm hover:bg-gray-50 transition min-h-[48px]"
            >
              <Download className="w-5 h-5"/> {t('results.downloadPdf')}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matchedSchemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        </>
      )}

      <div className="mt-12 text-center no-print border-t pt-8">
        <button 
          onClick={handleStartOver}
          className="flex items-center gap-2 mx-auto px-6 py-3 text-gray-600 font-bold hover:text-primary transition min-h-[48px]"
        >
          <RotateCcw className="w-5 h-5"/> {t('results.startOver')}
        </button>
      </div>
    </div>
  );
}
