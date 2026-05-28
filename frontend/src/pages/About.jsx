import React from 'react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-sm border animate-in fade-in zoom-in-95 mt-10">
      <h1 className="text-4xl font-bold mb-6">About Kisan Saathi</h1>
      <p className="text-xl text-gray-700 leading-relaxed mb-6">
        Kisan Saathi is a digital initiative aimed at simplifying the discovery and access to government agricultural schemes for Indian farmers. By assessing 5 straightforward criteria, it seamlessly aligns farmers with the schemes they are eligible for.
      </p>
      <h2 className="text-2xl font-bold mb-4 border-b pb-2">Our Mission</h2>
      <p className="text-lg text-gray-600 leading-relaxed mb-6">
        Our ambition is to guarantee that every marginal farmer receives their rightful advantage through government subsidies, loans, and resources, without digital barriers or misinformation.
      </p>
      <div className="bg-primary text-white p-6 rounded-2xl shadow-inner mt-8">
        <h3 className="text-xl font-bold mb-2">Smart India Hackathon Project</h3>
        <p>This progressive web app is built with focus on low-bandwidth areas (2G networks), multi-lingual support, and intuitive UI to serve as a reliable platform for agricultural empowerment.</p>
      </div>
    </div>
  );
}
