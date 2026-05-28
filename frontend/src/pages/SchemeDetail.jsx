import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSchemeDetails } from '../api/eligibility';
import { exportToPdf } from '../utils/pdfExport';
import { shareOnWhatsApp } from '../utils/whatsappShare';
import { Loader2, Share2, Download, ExternalLink, ArrowLeft, CheckSquare, MapPin } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const STATIC_CSC = [
  { lat: 28.6014, lng: 76.9859, name: "Krishi Vigyan Kendra (KVK), Ujwa, New Delhi" },
  { lat: 26.8926, lng: 80.9701, name: "CSC Center - Block Development Office, Lucknow" },
  { lat: 18.5308, lng: 73.8471, name: "District Agriculture Office, Shivaji Nagar, Pune" },
  { lat: 13.0674, lng: 80.2376, name: "Farmer Help Center, Egmore, Chennai" },
  { lat: 23.2332, lng: 77.4343, name: "CSC - MP State Agro Industries, Bhopal" },
];

export default function SchemeDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [checkedDocs, setCheckedDocs] = useState({});

  useEffect(() => {
    async function fetchScheme() {
      try {
        const res = await getSchemeDetails(id);
        setScheme(res.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchScheme();
  }, [id]);

  useEffect(() => {
    let map;
    if (!loading && scheme && mapRef.current && !mapRef.current._leaflet_id) {
      map = L.map(mapRef.current).setView([22.5937, 78.9629], 4);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      STATIC_CSC.forEach(csc => {
        L.marker([csc.lat, csc.lng]).addTo(map).bindPopup(csc.name);
      });
    }
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [loading, scheme]);

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;
  }

  if (error || !scheme) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-600 mb-4">{t('error')}</h2>
        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-primary text-white rounded-lg">{t('retry')}</button>
      </div>
    );
  }

  const isHindi = i18n.language === 'hi';
  const name = isHindi ? scheme.nameHi : scheme.nameEn;
  const description = isHindi ? scheme.descriptionHi : scheme.descriptionEn;
  const ministry = isHindi ? scheme.ministryHi : scheme.ministryEn;
  const benefit = isHindi ? scheme.benefitHi : scheme.benefitEn;

  const toggleDoc = (docId) => {
    setCheckedDocs(prev => ({ ...prev, [docId]: !prev[docId] }));
  };

  const handleShare = () => {
    const text = isHindi ? `योजना विवरण: ${name}\nलाभ: ${benefit}\n` : `Scheme Details: ${name}\nBenefit: ${benefit}\n`;
    const url = `\nhttps://kisan-saathi.vercel.app/scheme/${scheme.id}`;
    shareOnWhatsApp(text + url);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6 font-medium">
        <ArrowLeft className="w-5 h-5"/> {t('wizard.back')}
      </button>

      <div id="scheme-report" className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border mb-8">
        <div className="text-sm text-primary font-bold tracking-wider uppercase mb-2">{ministry}</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">{name}</h1>
        
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8 shadow-inner">
          <h3 className="font-bold text-green-900 mb-2">{t('scheme.amount')}:</h3>
          <p className="text-xl md:text-2xl font-bold text-green-700">{benefit}</p>
        </div>

        <p className="text-lg text-gray-700 mb-10 leading-relaxed">{description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><CheckSquare className="text-primary"/> {t('scheme.documents')}</h3>
            <ul className="space-y-4">
              {scheme.documents.map(doc => (
                <li key={doc.id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition cursor-pointer" onClick={() => toggleDoc(doc.id)}>
                  <input 
                    type="checkbox" 
                    checked={!!checkedDocs[doc.id]} 
                    onChange={() => toggleDoc(doc.id)}
                    className="w-6 h-6 rounded text-primary focus:ring-primary mt-1"
                  />
                  <span className={`text-lg transition ${checkedDocs[doc.id] ? 'line-through text-gray-400' : 'text-gray-800 font-medium'}`}>
                    {isHindi ? doc.nameHi : doc.nameEn}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">{t('scheme.steps')}</h3>
            <ol className="space-y-6 relative border-l-2 border-green-200 ml-4">
              {scheme.applicationSteps.map((step, idx) => (
                <li key={step.id} className="pl-8 relative">
                  <div className="absolute w-8 h-8 bg-primary rounded-full text-white flex items-center justify-center font-bold -left-4 top-0 shadow-md">
                    {idx + 1}
                  </div>
                  <h4 className="font-bold text-xl mb-2">{isHindi ? step.titleHi : step.titleEn}</h4>
                  <p className="text-gray-600 text-lg">{isHindi ? step.descHi : step.descEn}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {scheme.applicationUrl && (
          <div className="text-center mt-12 mb-6 no-print">
            <a href={scheme.applicationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-green-700 hover:-translate-y-1 hover:shadow-lg transition">
              {t('scheme.applyOnline')} <ExternalLink className="w-5 h-5"/>
            </a>
          </div>
        )}
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border mb-8 no-print">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <MapPin className="text-secondary" /> Common Service Centers
        </h3>
        <p className="text-gray-600 mb-4">Find your nearest help center to apply offline.</p>
        <div ref={mapRef} className="w-full h-[400px] rounded-2xl border-2 border-gray-200 z-0"></div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center no-print">
        <button onClick={handleShare} className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold rounded-xl shadow hover:bg-[#128C7E] transition min-h-[48px]">
          <Share2 className="w-5 h-5"/> {t('scheme.share')}
        </button>
        <button onClick={() => exportToPdf('scheme-report', `scheme-${scheme.id}.pdf`)} className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl shadow-sm hover:bg-gray-50 transition min-h-[48px]">
          <Download className="w-5 h-5"/> Download PDF
        </button>
      </div>
    </div>
  );
}
