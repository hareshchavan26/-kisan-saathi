import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with detailed schemes...');

  await prisma.searchLog.deleteMany();
  await prisma.eligibilityRule.deleteMany();
  await prisma.document.deleteMany();
  await prisma.applicationStep.deleteMany();
  await prisma.scheme.deleteMany();

  const schemesData = [
    {
      nameEn: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
      nameHi: "पीएम-किसान (प्रधानमंत्री किसान सम्मान निधि)",
      descriptionEn: "A central sector scheme to provide income support to all landholding farmers' families in the country. This guarantees a direct income of ₹6,000 annually.",
      descriptionHi: "देश में सभी भूमिधारी किसान परिवारों को आय सहायता प्रदान करने के लिए एक केंद्रीय क्षेत्र की योजना। यह प्रतिवर्ष ₹6,000 की प्रत्यक्ष आय की गारंटी देता है।",
      ministryEn: "Ministry of Agriculture & Farmers Welfare",
      ministryHi: "कृषि एवं किसान कल्याण मंत्रालय",
      benefitEn: "Income support of ₹6,000/- per year in 3 equal installments.",
      benefitHi: "प्रति वर्ष ₹6,000/- की आय सहायता 3 समान किस्तों में।",
      benefitAmount: "6000",
      applicationUrl: "https://pmkisan.gov.in/",
      isActive: true,
      rules: [
        { field: "landSize", operator: "lte", value: "4.94" },
        { field: "annualIncome", operator: "lte", value: "200000" },
        { field: "landOwnership", operator: "equals", value: "\"Owned\"" }
      ],
      documents: [
        { nameEn: "Aadhaar Card", nameHi: "आधार कार्ड", isRequired: true },
        { nameEn: "Land Records (Khasra/Khatauni)", nameHi: "भूमि रिकॉर्ड (खसरा/खतौनी)", isRequired: true },
        { nameEn: "Bank Passbook", nameHi: "बैंक पासबुक", isRequired: true },
        { nameEn: "Mobile Number", nameHi: "मोबाइल नंबर", isRequired: true }
      ],
      steps: [
        { stepNumber: 1, titleEn: "Visit Official Portal", titleHi: "आधिकारिक पोर्टल पर जाएं", descEn: "Go to pmkisan.gov.in and locate the 'Farmers Corner' on the homepage.", descHi: "pmkisan.gov.in पर जाएं और होमपेज पर 'फार्मर्स कॉर्नर' खोजें।" },
        { stepNumber: 2, titleEn: "New Farmer Registration", titleHi: "नया किसान पंजीकरण", descEn: "Click on 'New Farmer Registration', enter your Aadhaar number, and select your state.", descHi: "'न्यू फार्मर रजिस्ट्रेशन' पर क्लिक करें, अपना आधार नंबर डालें और राज्य चुनें।" },
        { stepNumber: 3, titleEn: "Fill Application Form", titleHi: "आवेदन पत्र भरें", descEn: "Enter personal details, bank account info, and upload land holding documents.", descHi: "व्यक्तिगत विवरण, बैंक खाता जानकारी दर्ज करें और भूमि संबंधी दस्तावेज़ अपलोड करें।" },
        { stepNumber: 4, titleEn: "Submit and Track", titleHi: "जमा करें और ट्रैक करें", descEn: "Submit the form and save the reference number to track your application status later.", descHi: "फॉर्म जमा करें और बाद में अपने आवेदन की स्थिति को ट्रैक करने के लिए संदर्भ संख्या सहेजें।" }
      ]
    },
    {
      nameEn: "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
      nameHi: "पीएमएफबीवाई (प्रधानमंत्री फसल बीमा योजना)",
      descriptionEn: "To provide insurance coverage and financial support to the farmers in the event of failure of any of the notified crop due to natural calamities.",
      descriptionHi: "प्राकृतिक आपदाओं के कारण किसी भी अधिसूचित फसल के खराब होने की स्थिति में किसानों को बीमा कवरेज और वित्तीय सहायता प्रदान करना।",
      ministryEn: "Ministry of Agriculture & Farmers Welfare",
      ministryHi: "कृषि एवं किसान कल्याण मंत्रालय",
      benefitEn: "Crop insurance cover, premium 2% for kharif, 1.5% for rabi.",
      benefitHi: "फसल बीमा कवर, खरीफ के लिए प्रीमियम 2%, रबी के लिए 1.5%।",
      benefitAmount: "Variable",
      applicationUrl: "https://pmfby.gov.in/",
      isActive: true,
      rules: [
        { field: "state", operator: "any", value: "[]" }
      ],
      documents: [
        { nameEn: "Aadhaar Card", nameHi: "आधार कार्ड", isRequired: true },
        { nameEn: "Land Records or Lease Agreement", nameHi: "भूमि रिकॉर्ड या पट्टा समझौता", isRequired: true },
        { nameEn: "Bank Account", nameHi: "बैंक खाता", isRequired: true },
        { nameEn: "Sowing Certificate", nameHi: "बुवाई प्रमाण पत्र", isRequired: true }
      ],
      steps: [
        { stepNumber: 1, titleEn: "Prepare Documents", titleHi: "दस्तावेज़ तैयार करें", descEn: "Gather your bank passbook, sowing certificate, and Aadhaar card.", descHi: "अपनी बैंक पासबुक, बुवाई प्रमाण पत्र और आधार कार्ड इकट्ठा करें।" },
        { stepNumber: 2, titleEn: "Visit CSC or Bank", titleHi: "सीएससी या बैंक पर जाएं", descEn: "Visit your nearest Common Service Center (CSC) or local bank branch.", descHi: "अपने नजदीकी सामान्य सेवा केंद्र (सीएससी) या स्थानीय बैंक शाखा में जाएं।" },
        { stepNumber: 3, titleEn: "Pay Premium", titleHi: "प्रीमियम का भुगतान करें", descEn: "Pay the minimal percentage of premium (e.g., 2% for Kharif) to secure your crop.", descHi: "अपनी फसल को सुरक्षित करने के लिए प्रीमियम का न्यूनतम प्रतिशत (जैसे, खरीफ के लिए 2%) भुगतान करें।" }
      ]
    },
    {
      nameEn: "Kisan Credit Card (KCC)",
      nameHi: "किसान क्रेडिट कार्ड (केसीसी)",
      descriptionEn: "To provide adequate and timely credit support from the banking system to the farmers for their cultivation and other needs.",
      descriptionHi: "किसानों को उनकी खेती और अन्य जरूरतों के लिए बैंकिंग प्रणाली से पर्याप्त और समय पर ऋण सहायता प्रदान करना।",
      ministryEn: "Ministry of Finance & Agriculture Sector",
      ministryHi: "वित्त और कृषि क्षेत्र मंत्रालय",
      benefitEn: "Credit up to ₹3 lakh at 4% interest rate.",
      benefitHi: "4% ब्याज दर पर ₹3 लाख तक का ऋण।",
      benefitAmount: "300000",
      applicationUrl: "https://sbi.co.in/web/agri-rural/agriculture-banking/crop-loan/kisan-credit-card-kcc",
      isActive: true,
      rules: [
        { field: "state", operator: "any", value: "[]" }
      ],
      documents: [
        { nameEn: "Aadhaar Card", nameHi: "आधार कार्ड", isRequired: true },
        { nameEn: "PAN Card", nameHi: "पैन कार्ड", isRequired: true },
        { nameEn: "Land Records", nameHi: "भूमि रिकॉर्ड", isRequired: true },
        { nameEn: "2 Passport Photos", nameHi: "2 पासपोर्ट फोटो", isRequired: true },
        { nameEn: "Bank Statement", nameHi: "बैंक स्टेटमेंट", isRequired: true }
      ],
      steps: [
        { stepNumber: 1, titleEn: "Download Application", titleHi: "आवेदन डाउनलोड करें", descEn: "Go to pmkisan.gov.in and download the KCC application form from the portal.", descHi: "pmkisan.gov.in पर जाएं और पोर्टल से केसीसी आवेदन पत्र डाउनलोड करें।" },
        { stepNumber: 2, titleEn: "Fill with Cultivation Info", titleHi: "खेती की जानकारी भरें", descEn: "Fill out your land and crop details required by the bank.", descHi: "बैंक द्वारा आवश्यक अपनी भूमि और फसल विवरण भरें।" },
        { stepNumber: 3, titleEn: "Submit at Bank Branch", titleHi: "बैंक शाखा में जमा करें", descEn: "Submit the filled form with photographs to the bank where your PM-KISAN account exists.", descHi: "भरे हुए फॉर्म को तस्वीरों के साथ उस बैंक में जमा करें जहां आपका पीएम-किसान खाता मौजूद है।" }
      ]
    },
    {
      nameEn: "PMKSY (Pradhan Mantri Krishi Sinchayee Yojana)",
      nameHi: "पीएमकेएसवाई (प्रधानमंत्री कृषि सिंचाई योजना)",
      descriptionEn: "Focuses on 'Per Drop More Crop' by promoting micro-irrigation systems to improve water utility efficiency.",
      descriptionHi: "जल उपयोगिता दक्षता में सुधार के लिए सूक्ष्म-सिंचाई प्रणालियों को बढ़ावा देकर 'प्रति बूंद अधिक फसल' पर ध्यान केंद्रित करता है।",
      ministryEn: "Ministry of Agriculture & Farmers Welfare",
      ministryHi: "कृषि एवं किसान कल्याण मंत्रालय",
      benefitEn: "55% subsidy on micro-irrigation equipment.",
      benefitHi: "सूक्ष्म-सिंचाई उपकरणों पर 55% सब्सिडी।",
      benefitAmount: "Subsidy",
      applicationUrl: "https://pmksy.gov.in/",
      isActive: true,
      rules: [
        { field: "landOwnership", operator: "equals", value: "\"Owned\"" }
      ],
      documents: [
        { nameEn: "Aadhaar", nameHi: "आधार", isRequired: true },
        { nameEn: "Land records", nameHi: "भूमि रिकॉर्ड", isRequired: true },
        { nameEn: "Bank account", nameHi: "बैंक खाता", isRequired: true },
        { nameEn: "Quotation from equipment supplier", nameHi: "उपकरण आपूर्तिकर्ता से कोटेशन", isRequired: true }
      ],
      steps: [
        { stepNumber: 1, titleEn: "Contact Local Horticulture Office", titleHi: "स्थानीय बागवानी कार्यालय से संपर्क करें", descEn: "Visit the District Horticulture or Agriculture Office with your land records.", descHi: "अपने भूमि रिकॉर्ड के साथ जिला बागवानी या कृषि कार्यालय जाएँ।" },
        { stepNumber: 2, titleEn: "Get Dealer Quotations", titleHi: "डीलर कोटेशन प्राप्त करें", descEn: "Get quotations from registered micro-irrigation equipment dealers in your state.", descHi: "अपने राज्य में पंजीकृत सूक्ष्म-सिंचाई उपकरण डीलरों से कोटेशन प्राप्त करें।" },
        { stepNumber: 3, titleEn: "Apply Online via state portal", titleHi: "राज्य पोर्टल के माध्यम से ऑनलाइन आवेदन करें", descEn: "Use the state-specific agricultural portal to upload documents and quotas.", descHi: "दस्तावेजों और कोटा को अपलोड करने के लिए राज्य-विशिष्ट कृषि पोर्टल का उपयोग करें।" },
        { stepNumber: 4, titleEn: "Field Verification", titleHi: "फील्ड सत्यापन", descEn: "An official will verify your farm to approve the equipment setup.", descHi: "उपकरण सेटअप को मंजूरी देने के लिए एक अधिकारी आपके खेत का सत्यापन करेगा।" }
      ]
    },
    {
      nameEn: "Soil Health Card Scheme",
      nameHi: "मृदा स्वास्थ्य कार्ड योजना",
      descriptionEn: "Provides information to farmers on nutrient status of their soil along with recommendation on appropriate dosage of nutrients.",
      descriptionHi: "किसानों को उनकी मिट्टी की पोषक स्थिति के साथ-साथ पोषक तत्वों की उचित खुराक की सिफारिश के बारे में जानकारी प्रदान करता है।",
      ministryEn: "Ministry of Agriculture & Farmers Welfare",
      ministryHi: "कृषि एवं किसान कल्याण मंत्रालय",
      benefitEn: "Free soil testing + crop-wise fertilizer recommendations.",
      benefitHi: "मुफ्त मिट्टी परीक्षण + फसल-वार उर्वरक सिफारिशें।",
      benefitAmount: "Free",
      applicationUrl: "https://soilhealth.dac.gov.in/",
      isActive: true,
      rules: [
        { field: "state", operator: "any", value: "[]" }
      ],
      documents: [
        { nameEn: "Aadhaar", nameHi: "आधार", isRequired: true },
        { nameEn: "Land records or farmer registration", nameHi: "भूमि रिकॉर्ड या किसान पंजीकरण", isRequired: true }
      ],
      steps: [
        { stepNumber: 1, titleEn: "Go to Portal or CSC", titleHi: "पोर्टल या सीएससी पर जाएं", descEn: "Register on soilhealth.dac.gov.in or visit a CSC.", descHi: "soilhealth.dac.gov.in पर पंजीकरण करें या सीएससी पर जाएं।" },
        { stepNumber: 2, titleEn: "Submit Soil Sample", titleHi: "मिट्टी का नमूना जमा करें", descEn: "Hand over a 500g soil sample from your farm to the testing authority.", descHi: "परीक्षण अधिकारी को अपने खेत से 500 ग्राम मिट्टी का नमूना सौंपें।" },
        { stepNumber: 3, titleEn: "Download Card", titleHi: "कार्ड डाउनलोड करें", descEn: "Once tested, log in with mobile number to print your personalized Soil Health Card.", descHi: "परीक्षण के बाद, अपना व्यक्तिगत मृदा स्वास्थ्य कार्ड प्रिंट करने के लिए मोबाइल नंबर से लॉग इन करें।" }
      ]
    },
    {
      nameEn: "PKVY (Paramparagat Krishi Vikas Yojana)",
      nameHi: "पीकेवीवाई (परंपरागत कृषि विकास योजना)",
      descriptionEn: "Promotes organic farming through cluster approach, emphasizing natural ecological balance.",
      descriptionHi: "प्राकृतिक पारिस्थितिक संतुलन पर जोर देते हुए क्लस्टर दृष्टिकोण के माध्यम से जैविक खेती को बढ़ावा देता है।",
      ministryEn: "Ministry of Agriculture & Farmers Welfare",
      ministryHi: "कृषि एवं किसान कल्याण मंत्रालय",
      benefitEn: "₹50,000 per hectare over 3 years for organic farming.",
      benefitHi: "जैविक खेती के लिए 3 वर्षों में ₹50,000 प्रति हेक्टेयर।",
      benefitAmount: "50000",
      applicationUrl: "https://pgsindia-ncof.gov.in/",
      isActive: true,
      rules: [
        { field: "state", operator: "any", value: "[]" }
      ],
      documents: [
        { nameEn: "Aadhaar", nameHi: "आधार", isRequired: true },
        { nameEn: "Land records", nameHi: "भूमि रिकॉर्ड", isRequired: true },
        { nameEn: "Soil health card", nameHi: "मृदा स्वास्थ्य कार्ड", isRequired: true },
        { nameEn: "Bank account", nameHi: "बैंक खाता", isRequired: true }
      ],
      steps: [
        { stepNumber: 1, titleEn: "Form a Cluster", titleHi: "एक क्लस्टर बनाएँ", descEn: "Form a group of at least 50 farmers controlling at least 50 acres in total.", descHi: "कुल मिलाकर कम से कम 50 एकड़ को नियंत्रित करने वाले कम से कम 50 किसानों का एक समूह बनाएँ।" },
        { stepNumber: 2, titleEn: "Register on PGS portal", titleHi: "पीजीएस पोर्टल पर रजिस्टर करें", descEn: "Register the cluster with local agricultural extension offices and on PGS India portal.", descHi: "स्थानीय कृषि विस्तार कार्यालयों और पीजीएस इंडिया पोर्टल पर क्लस्टर को पंजीकृत करें।" },
        { stepNumber: 3, titleEn: "Adopt Organic Practices", titleHi: "जैविक पद्धतियों को अपनाएं", descEn: "Begin eliminating chemicals and transition to organic manure usage.", descHi: "रसायनों को हटाना शुरू करें और जैविक खाद के उपयोग की ओर बढ़ें।" }
      ]
    },
    {
      nameEn: "e-NAM (National Agriculture Market)",
      nameHi: "ई-नाम (राष्ट्रीय कृषि बाजार)",
      descriptionEn: "A pan-India electronic trading portal which networks the existing APMC mandis to create a unified national market.",
      descriptionHi: "एक अखिल भारतीय इलेक्ट्रॉनिक ट्रेडिंग पोर्टल जो एकीकृत राष्ट्रीय बाजार बनाने के लिए मौजूदा एपीएमसी मंडियों को नेटवर्क करता है।",
      ministryEn: "Ministry of Agriculture & Farmers Welfare",
      ministryHi: "कृषि एवं किसान कल्याण मंत्रालय",
      benefitEn: "Access to 1000+ mandis online, better price discovery.",
      benefitHi: "ऑनलाइन 1000+ मंडियों तक पहुंच, बेहतर मूल्य खोज।",
      benefitAmount: "Market Price",
      applicationUrl: "https://enam.gov.in/",
      isActive: true,
      rules: [
        { field: "state", operator: "any", value: "[]" }
      ],
      documents: [
        { nameEn: "Aadhaar", nameHi: "आधार", isRequired: true },
        { nameEn: "Bank account", nameHi: "बैंक खाता", isRequired: true },
        { nameEn: "Mobile number", nameHi: "मोबाइल नंबर", isRequired: true }
      ],
      steps: [
        { stepNumber: 1, titleEn: "Register via Website or App", titleHi: "वेबसाइट या ऐप के माध्यम से रजिस्टर करें", descEn: "Download e-NAM app or go to enam.gov.in and click on 'Farmer Registration'.", descHi: "ई-नाम ऐप डाउनलोड करें या enam.gov.in पर जाएं और 'किसान पंजीकरण' पर क्लिक करें।" },
        { stepNumber: 2, titleEn: "Upload Bank Details", titleHi: "बैंक विवरण अपलोड करें", descEn: "Provide valid bank account details to enable prompt direct money transfers.", descHi: "त्वरित सीधे धन हस्तांतरण को सक्षम करने के लिए वैध बैंक खाता विवरण प्रदान करें।" },
        { stepNumber: 3, titleEn: "Submit Produce Details", titleHi: "उपज का विवरण जमा करें", descEn: "List your harvest on the app to bid directly with merchants across India.", descHi: "पूरे भारत के व्यापारियों के साथ सीधे बोली लगाने के लिए ऐप पर अपनी फसल सूचीबद्ध करें।" }
      ]
    },
    {
      nameEn: "PM KUSUM (Solar Pump Scheme)",
      nameHi: "पीएम कुसुम (सोलर पंप योजना)",
      descriptionEn: "For setting up grid-connected solar power plants on barren lands and installing stand-alone solar agriculture pumps.",
      descriptionHi: "बंजर भूमि पर ग्रिड से जुड़े सौर ऊर्जा संयंत्र स्थापित करने और स्टैंड-अलोन सौर कृषि पंप स्थापित करने के लिए।",
      ministryEn: "Ministry of New and Renewable Energy",
      ministryHi: "नवीन और नवीकरणीय ऊर्जा मंत्रालय",
      benefitEn: "60% subsidy on solar irrigation pumps.",
      benefitHi: "सौर कृषि पंपों पर 60% सब्सिडी।",
      benefitAmount: "Subsidy",
      applicationUrl: "https://pmkusum.mnre.gov.in/",
      isActive: true,
      rules: [
        { field: "landSize", operator: "gte", value: "0.988" },
        { field: "landOwnership", operator: "equals", value: "\"Owned\"" }
      ],
      documents: [
        { nameEn: "Aadhaar", nameHi: "आधार", isRequired: true },
        { nameEn: "Land records", nameHi: "भूमि रिकॉर्ड", isRequired: true },
        { nameEn: "Electricity bill", nameHi: "बिजली का बिल", isRequired: true },
        { nameEn: "Bank account", nameHi: "बैंक खाता", isRequired: true }
      ],
      steps: [
        { stepNumber: 1, titleEn: "Verify Eligibility on Portal", titleHi: "पोर्टल पर पात्रता सत्यापित करें", descEn: "Check application openings at the National or State PM-KUSUM portal.", descHi: "राष्ट्रीय या राज्य पीएम-कुसुम पोर्टल पर आवेदन के खुलने की जाँच करें।" },
        { stepNumber: 2, titleEn: "Apply with DISCOM", titleHi: "डिस्कॉम के साथ आवेदन करें", descEn: "Apply online and pay the 10% farmer's contribution to your DISCOM limit.", descHi: "ऑनलाइन आवेदन करें और अपनी डिस्कॉम सीमा में 10% किसान योगदान का भुगतान करें।" },
        { stepNumber: 3, titleEn: "Installation", titleHi: "स्थापना", descEn: "The government and vendors will oversee the setup of the solar pump.", descHi: "सरकार और विक्रेता सौर पंप की स्थापना की देखरेख करेंगे।" }
      ]
    },
    {
      nameEn: "National Mission for Sustainable Agriculture (NMSA)",
      nameHi: "सतत कृषि के लिए राष्ट्रीय मिशन (NMSA)",
      descriptionEn: "To make agriculture more productive, sustainable, remunerative and climate resilient.",
      descriptionHi: "कृषि को अधिक उत्पादक, टिकाऊ, लाभकारी और जलवायु अनुकूल बनाने के लिए।",
      ministryEn: "Ministry of Agriculture & Farmers Welfare",
      ministryHi: "कृषि एवं किसान कल्याण मंत्रालय",
      benefitEn: "₹6,000 per hectare for soil conservation practices.",
      benefitHi: "मृदा संरक्षण प्रथाओं के लिए ₹6,000 प्रति हेक्टेयर।",
      benefitAmount: "6000",
      applicationUrl: "https://nmsa.dac.gov.in/",
      isActive: true,
      rules: [
        { field: "annualIncome", operator: "lte", value: "300000" }
      ],
      documents: [
        { nameEn: "Aadhaar", nameHi: "आधार", isRequired: true },
        { nameEn: "Land records", nameHi: "भूमि रिकॉर्ड", isRequired: true },
        { nameEn: "Soil health card", nameHi: "मृदा स्वास्थ्य कार्ड", isRequired: true },
        { nameEn: "Bank account", nameHi: "बैंक खाता", isRequired: true }
      ],
      steps: [
        { stepNumber: 1, titleEn: "Contact Dept of Agriculture", titleHi: "कृषि विभाग से संपर्क करें", descEn: "Approach District Agriculture Officer mapping to your tehsil.", descHi: "अपनी तहसील के जिला कृषि अधिकारी से संपर्क करें।" },
        { stepNumber: 2, titleEn: "Draft a farming proposal", titleHi: "कृषि प्रस्ताव तैयार करें", descEn: "Demonstrate integrated farming planning and secure official approval.", descHi: "एकीकृत कृषि योजना का प्रदर्शन करें और आधिकारिक अनुमोदन प्राप्त करें।" },
        { stepNumber: 3, titleEn: "Claim Subsidies", titleHi: "सब्सिडी का दावा करें", descEn: "Submit bills to retrieve funds linked directly to your seeded bank account.", descHi: "अपने लिंक किए गए बैंक खाते में धन प्राप्त करने के लिए बिल जमा करें।" }
      ]
    },
    {
      nameEn: "Agri Infrastructure Fund (AIF)",
      nameHi: "कृषि अवसंरचना कोष (AIF)",
      descriptionEn: "Medium - long term debt financing facility for investment in viable projects for post-harvest management Infrastructure.",
      descriptionHi: "फसल कटाई के बाद प्रबंधन अवसंरचना के लिए व्यवहार्य परियोजनाओं में निवेश के लिए मध्यम - दीर्घकालिक ऋण वित्तपोषण सुविधा।",
      ministryEn: "Ministry of Agriculture & Farmers Welfare",
      ministryHi: "कृषि एवं किसान कल्याण मंत्रालय",
      benefitEn: "Loan up to ₹2 crore at 3% interest subsidy for storage/processing.",
      benefitHi: "भंडारण/प्रसंस्करण के लिए 3% ब्याज सब्सिडी पर ₹2 करोड़ तक का ऋण।",
      benefitAmount: "20000000",
      applicationUrl: "https://agriinfra.dac.gov.in/",
      isActive: true,
      rules: [
        { field: "state", operator: "any", value: "[]" }
      ],
      documents: [
        { nameEn: "Aadhaar", nameHi: "आधार", isRequired: true },
        { nameEn: "PAN", nameHi: "पैन", isRequired: true },
        { nameEn: "Land records", nameHi: "भूमि रिकॉर्ड", isRequired: true },
        { nameEn: "Project report", nameHi: "परियोजना रिपोर्ट", isRequired: true },
        { nameEn: "Bank statement", nameHi: "बैंक स्टेटमेंट", isRequired: true }
      ],
      steps: [
        { stepNumber: 1, titleEn: "Create Detailed Project Report", titleHi: "विस्तृत परियोजना रिपोर्ट बनाएं", descEn: "Formulate a DPR identifying the cost of the processing/storage units.", descHi: "प्रसंस्करण/भंडारण इकाइयों की लागत की पहचान करते हुए एक विस्तृत परियोजना रिपोर्ट तैयार करें।" },
        { stepNumber: 2, titleEn: "Upload Project Report", titleHi: "परियोजना रिपोर्ट अपलोड करें", descEn: "Register on AIF portal and upload your DPR.", descHi: "एआईएफ पोर्टल पर पंजीकरण करें और अपनी डीपीआर अपलोड करें।" },
        { stepNumber: 3, titleEn: "Apply With Eligible Lenders", titleHi: "पात्र उधारदाताओं के साथ आवेदन करें", descEn: "Banks will review your DPR and issue the loan along with the 3% interest subvention.", descHi: "बैंक आपकी डीपीआर की समीक्षा करेंगे और 3% ब्याज छूट के साथ ऋण जारी करेंगे।" }
      ]
    }
  ];

  for (const item of schemesData) {
    await prisma.scheme.create({
      data: {
        nameEn: item.nameEn,
        nameHi: item.nameHi,
        descriptionEn: item.descriptionEn,
        descriptionHi: item.descriptionHi,
        ministryEn: item.ministryEn,
        ministryHi: item.ministryHi,
        benefitEn: item.benefitEn,
        benefitHi: item.benefitHi,
        benefitAmount: item.benefitAmount,
        applicationUrl: item.applicationUrl,
        isActive: item.isActive,
        eligibilityRules: {
          create: item.rules
        },
        documents: {
          create: item.documents
        },
        applicationSteps: {
          create: item.steps
        }
      }
    });
  }

  console.log('Seeding complete. Inserted 10 schemes with detailed steps.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
