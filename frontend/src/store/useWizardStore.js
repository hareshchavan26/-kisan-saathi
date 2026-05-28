import { create } from 'zustand';

const useWizardStore = create((set) => ({
  step: 1,
  answers: {
    state: '',
    cropType: '',
    landSize: '',
    annualIncome: '',
    landOwnership: ''
  },
  matchedSchemes: [],
  setAnswer: (field, value) => set((state) => ({ answers: { ...state.answers, [field]: value } })),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
  setMatchedSchemes: (schemes) => set({ matchedSchemes: schemes }),
  resetWizard: () => set({ 
    step: 1, 
    answers: { state: '', cropType: '', landSize: '', annualIncome: '', landOwnership: '' },
    matchedSchemes: []
  })
}));

export default useWizardStore;
