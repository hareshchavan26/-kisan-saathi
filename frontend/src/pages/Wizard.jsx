import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useWizardStore from '../store/useWizardStore';
import { checkEligibility } from '../api/eligibility';
import { Loader2 } from 'lucide-react';

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar", "Chandigarh", "Dadra and Nagar Haveli", "Delhi",
  "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const CROPS = ["Wheat", "Rice", "Sugarcane", "Cotton", "Pulses", "Vegetables", "Fruits", "Other"];

const INCOMES = [
  { label: "< 50,000", value: 40000 },
  { label: "50,000 - 1,00,000", value: 75000 },
  { label: "1,00,000 - 2,00,000", value: 150000 },
  { label: "2,00,000 - 5,00,000", value: 300000 },
  { label: "> 5,00,000", value: 600000 }
];

export default function Wizard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { step, answers, setAnswer, nextStep, prevStep, setMatchedSchemes } = useWizardStore();
  const [loading, setLoading] = useState(false);

  const isStepValid = () => {
    switch (step) {
      case 1: return !!answers.state;
      case 2: return !!answers.cropType;
      case 3: return !!answers.landSize;
      case 4: return !!answers.annualIncome;
      case 5: return !!answers.landOwnership;
      default: return false;
    }
  };

  const handleNext = async () => {
    if (step < 5) {
      nextStep();
    } else {
      setLoading(true);
      try {
        const payload = {
          state: answers.state,
          cropType: answers.cropType,
          landSize: parseFloat(answers.landSize),
          annualIncome: parseFloat(answers.annualIncome),
          landOwnership: answers.landOwnership
        };
        const res = await checkEligibility(payload);
        setMatchedSchemes(res.data);
        navigate('/results');
      } catch (err) {
        console.error(err);
        alert(t('error'));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-lg border animate-in fade-in zoom-in-95 duration-300">
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
          <span>Step {step} of 5</span>
          <span>{step * 20}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-primary h-2.5 rounded-full transition-all duration-500" style={{ width: `${step * 20}%` }}></div>
        </div>
      </div>

      <div className="min-h-[300px]">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{t('wizard.step1Title')}</h2>
            <select 
              className="w-full p-4 border rounded-xl bg-gray-50 text-lg min-h-[56px] focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              value={answers.state}
              onChange={(e) => setAnswer('state', e.target.value)}
            >
              <option value="">-- Select State --</option>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{t('wizard.step2Title')}</h2>
            <div className="grid grid-cols-2 gap-3">
              {CROPS.map(c => (
                <button
                  key={c}
                  onClick={() => setAnswer('cropType', c)}
                  className={`p-4 rounded-xl border text-lg font-medium transition min-h-[56px] ${answers.cropType === c ? 'bg-primary text-white border-primary' : 'bg-gray-50 hover:bg-green-50'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{t('wizard.step3Title')}</h2>
            <input 
              type="number"
              step="0.1"
              min="0.1"
              max="50"
              className="w-full p-4 border rounded-xl bg-gray-50 text-lg min-h-[56px] focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="e.g. 2.5"
              value={answers.landSize}
              onChange={(e) => setAnswer('landSize', e.target.value)}
            />
            <p className="text-gray-500">1 Hectare ≈ 2.47 Acres</p>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{t('wizard.step4Title')}</h2>
            <div className="grid grid-cols-1 gap-3">
              {INCOMES.map(inc => (
                <button
                  key={inc.value}
                  onClick={() => setAnswer('annualIncome', inc.value.toString())}
                  className={`p-4 rounded-xl border text-lg font-medium transition text-left min-h-[56px] ${answers.annualIncome === inc.value.toString() ? 'bg-primary text-white border-primary' : 'bg-gray-50 hover:bg-green-50'}`}
                >
                  {inc.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{t('wizard.step5Title')}</h2>
            <div className="grid grid-cols-1 gap-3">
              {['Owned', 'Leased', 'Sharecropping'].map(o => (
                <button
                  key={o}
                  onClick={() => setAnswer('landOwnership', o)}
                  className={`p-4 rounded-xl border text-lg font-medium transition text-left min-h-[56px] ${answers.landOwnership === o ? 'bg-primary text-white border-primary' : 'bg-gray-50 hover:bg-green-50'}`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-10 pt-6 border-t">
        <button 
          onClick={step === 1 ? () => navigate('/') : prevStep}
          className="px-6 py-3 rounded-xl border font-bold text-gray-700 hover:bg-gray-100 min-h-[48px] transition"
        >
          {t('wizard.back')}
        </button>
        <button 
          onClick={handleNext}
          disabled={!isStepValid() || loading}
          className={`flex items-center justify-center px-8 py-3 rounded-xl font-bold min-h-[48px] transition ${(!isStepValid() || loading) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary text-white hover:bg-green-700 shadow-md flex-1 ml-4'}`}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (step === 5 ? t('wizard.finish') : t('wizard.next'))}
        </button>
      </div>
    </div>
  );
}
