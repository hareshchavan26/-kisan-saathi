import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Search, FileText } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="text-center py-16 px-6 bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600 rounded-3xl border border-green-200 shadow-2xl mt-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight drop-shadow-md">
          {t('home.title')}
        </h1>
        <p className="text-xl md:text-2xl text-green-50 max-w-2xl mx-auto mb-10 font-medium drop-shadow">
          {t('home.subtitle')}
        </p>
        <button 
          onClick={() => navigate('/wizard')}
          className="bg-white text-green-700 text-xl font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 min-h-[56px] flex items-center justify-center mx-auto gap-3 ring-4 ring-green-400 ring-opacity-50"
        >
          {t('home.cta')}
          <ArrowRight className="w-7 h-7" />
        </button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center">
          <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-amber-500 mb-3">{t('home.stat1Title')}</div>
          <div className="text-gray-600 font-bold text-lg">{t('home.stat1Desc')}</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center">
          <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 mb-3">{t('home.stat2Title')}</div>
          <div className="text-gray-600 font-bold text-lg">{t('home.stat2Desc')}</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center">
          <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-green-600 mb-3">{t('home.stat3Title')}</div>
          <div className="text-gray-600 font-bold text-lg">{t('home.stat3Desc')}</div>
        </div>
      </section>

      <section className="py-12 bg-white/50 backdrop-blur-md rounded-3xl border shadow-sm">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-gray-800">{t('home.howItWorks')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-8">
          <div className="flex flex-col items-center text-center gap-4 group">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <FileText className="w-10 h-10"/>
            </div>
            <h3 className="font-bold text-xl text-gray-800">{t('home.step1')}</h3>
          </div>
          <div className="flex flex-col items-center text-center gap-4 group">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-yellow-100 text-amber-600 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <Search className="w-10 h-10"/>
            </div>
            <h3 className="font-bold text-xl text-gray-800">{t('home.step2')}</h3>
          </div>
          <div className="flex flex-col items-center text-center gap-4 group">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 text-green-600 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <CheckCircle2 className="w-10 h-10"/>
            </div>
            <h3 className="font-bold text-xl text-gray-800">{t('home.step3')}</h3>
          </div>
        </div>
      </section>
    </div>
  );
}
