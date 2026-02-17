
import React, { useState } from 'react';
import { AssignmentData, TemplateType } from './types';
import Header from './components/Header';
import InputForm from './components/InputForm';
import PreviewPane from './components/PreviewPane';
import { GoogleGenAI } from '@google/genai';

// Declare html2pdf for TypeScript
declare var html2pdf: any;

const App: React.FC = () => {
  const [data, setData] = useState<AssignmentData>({
    university: 'Emerson University, Multan',
    name: 'Muhammad Ayoub',
    rollNo: '01',
    subject: 'Artificial Intelligence',
    topic: 'Foundations of Modern AI: Neural Architectures & Ethics',
    submissionDate: '16 Feb 2026',
    program: 'BSIT',
    semester: '6th',
    professor: 'Dr. Shahzad Bhatti',
    showLogo: true,
    customLogo: undefined,
  });

  const [template, setTemplate] = useState<TemplateType>('academic');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePrint = async () => {
    const element = document.getElementById('assignment-preview');
    if (!element) return;

    setIsGenerating(true);
    
    // 1. Reset scroll to top (prevents offset/blank capture bugs)
    window.scrollTo(0, 0);

    const fileName = `Assignment_${data.name.replace(/\s+/g, '_')}_${data.subject.replace(/\s+/g, '_')}.pdf`;
    
    // 2. High-quality options
    const opt = {
      margin: 0,
      filename: fileName,
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true
      }
    };

    try {
      // Add a tiny delay to ensure everything is rendered
      await new Promise(r => setTimeout(r, 400));
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("Something went wrong during PDF generation. Try again or use the browser print menu (Ctrl+P).");
    } finally {
      setIsGenerating(false);
    }
  };

  const enhanceTitle = async () => {
    setIsEnhancing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I am writing an assignment for the subject "${data.subject}". 
        The current topic is "${data.topic}". 
        Please provide a more professional, academic, and catchy assignment title (one short line). 
        Only return the title, nothing else.`
      });
      
      const newTopic = response.text?.trim().replace(/^"|"$/g, '') || data.topic;
      setData(prev => ({ ...prev, topic: newTopic }));
    } catch (error) {
      console.error("Enhance failed", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 md:py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Left Side: Controls - Order 2 on mobile */}
        <div className="no-print space-y-8 order-2 lg:order-1">
          <section className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="p-2 bg-blue-900 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </div>
              Assignment Details
            </h2>
            <InputForm data={data} onChange={setData} />
            
            <div className="mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={enhanceTitle}
                disabled={isEnhancing}
                className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-900 rounded-2xl font-semibold hover:from-blue-100 hover:to-indigo-100 transition-all disabled:opacity-50 ring-1 ring-blue-100 ui-transition"
              >
                {isEnhancing ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-900 border-t-transparent" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                )}
                Refine Topic with AI
              </button>
            </div>
          </section>

          <section className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-slate-800">Template Gallery</h2>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {(['formal', 'modern', 'academic', 'minimalist'] as TemplateType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTemplate(t)}
                  className={`relative overflow-hidden px-3 py-5 md:py-6 rounded-2xl border-2 transition-all capitalize flex flex-col items-center gap-2 ui-transition ${
                    template === t 
                    ? 'border-blue-900 bg-blue-50 text-blue-900 ring-4 ring-blue-50' 
                    : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-bold text-base md:text-lg">{t}</span>
                  <div className={`w-8 h-1 rounded-full ${template === t ? 'bg-blue-900' : 'bg-slate-200'}`}></div>
                </button>
              ))}
            </div>
          </section>

          <div className="space-y-4">
            <button
              onClick={handlePrint}
              disabled={isGenerating}
              type="button"
              className="w-full bg-blue-900 text-white py-4 md:py-5 rounded-3xl font-bold shadow-2xl shadow-blue-900/20 hover:bg-blue-950 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 text-lg ui-transition disabled:opacity-75"
            >
              {isGenerating ? (
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              )}
              {isGenerating ? 'Generating PDF...' : 'Download PDF Now'}
            </button>
            <p className="text-center text-[10px] md:text-xs text-slate-500 bg-blue-50 py-3 rounded-xl px-4 ring-1 ring-blue-100">
              High-quality PDF will download to your device instantly.
            </p>
          </div>
        </div>

        {/* Right Side: Preview - Order 1 on mobile to see changes instantly */}
        <div className="flex justify-center items-start lg:sticky lg:top-24 order-1 lg:order-2">
          <PreviewPane data={data} template={template} />
        </div>
      </main>

      <footer className="no-print mt-12 py-8 md:py-12 bg-white border-t border-slate-100 text-center text-slate-400 text-sm">
        <p className="font-medium text-slate-500">Professional Assignment Suite for Emerson University</p>
        <p className="mt-2 text-blue-900/60">&copy; 2026 AssignmentPro • Muhammad Ayoub Edition</p>
      </footer>
    </div>
  );
};

export default App;
