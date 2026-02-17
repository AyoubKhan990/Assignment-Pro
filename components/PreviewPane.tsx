
import React, { useEffect, useRef, useState } from 'react';
import { AssignmentData, TemplateType } from '../types';

interface Props {
  data: AssignmentData;
  template: TemplateType;
}

const EmersonLogo: React.FC<{ data: AssignmentData; size?: number; className?: string }> = ({ data, size = 120, className = "" }) => {
  const logoUrl = data.customLogo || "https://upload.wikimedia.org/wikipedia/en/3/3a/Emerson_University_Multan_Logo.png";
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <img 
        src={logoUrl} 
        alt="University Logo"
        style={{ width: size, height: 'auto' }}
        className="drop-shadow-sm"
        crossOrigin="anonymous"
      />
      {!data.customLogo && (
        <div className="mt-3 text-blue-900 font-serif font-bold tracking-widest text-[10px] uppercase text-center">
          Excellence • Innovation • Integrity
        </div>
      )}
    </div>
  );
};

const FormalTemplate: React.FC<{ data: AssignmentData }> = ({ data }) => (
  <div className="h-full w-full p-16 border-[20px] border-double border-blue-900 flex flex-col items-center justify-between font-serif bg-white text-blue-900">
    <div className="text-center w-full">
      {data.showLogo && <EmersonLogo data={data} size={140} className="mb-6" />}
      <h3 className="text-3xl font-bold uppercase tracking-[0.2em] leading-tight max-w-lg mx-auto border-b-2 border-blue-900 pb-4">
        {data.university}
      </h3>
      
      <div className="mt-16">
        <p className="text-xl italic font-medium mb-4 text-slate-500">An Assignment on</p>
        <h1 className="text-5xl font-bold leading-[1.1] px-4 underline decoration-sky-600/20 underline-offset-[12px]">
          {data.topic}
        </h1>
      </div>
    </div>

    <div className="w-full max-w-xl grid grid-cols-2 gap-12 text-left mt-8">
      <div className="space-y-4">
        <h5 className="font-bold border-b border-sky-700 pb-1 uppercase tracking-widest text-xs text-sky-700">Submitted By</h5>
        <div className="space-y-1">
          <p className="font-black text-xl leading-tight text-blue-900">{data.name}</p>
          <div className="text-sm space-y-0.5 text-slate-700">
            <p><span className="font-bold text-blue-900">Roll No:</span> {data.rollNo}</p>
            <p><span className="font-bold text-blue-900">Program:</span> {data.program}</p>
            <p><span className="font-bold text-blue-900">Semester:</span> {data.semester}</p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h5 className="font-bold border-b border-sky-700 pb-1 uppercase tracking-widest text-xs text-sky-700">Submitted To</h5>
        <div className="space-y-1">
          <p className="font-black text-xl leading-tight text-blue-900">{data.professor}</p>
          <div className="text-sm space-y-0.5 text-slate-700">
            <p className="italic">Professor & Head</p>
            <p><span className="font-bold text-blue-900">Department:</span> {data.subject}</p>
          </div>
        </div>
      </div>
    </div>

    <div className="text-center w-2/3 border-t border-blue-900/30 pt-8 mt-8">
      <p className="uppercase tracking-[0.4em] text-[10px] font-bold text-sky-700">Date of Submission</p>
      <p className="text-2xl font-bold mt-1">{data.submissionDate}</p>
    </div>
  </div>
);

const ModernTemplate: React.FC<{ data: AssignmentData }> = ({ data }) => (
  <div className="h-full w-full flex bg-blue-900 text-white overflow-hidden font-sans">
    <div className="w-20 bg-blue-950 flex flex-col items-center py-12 gap-8 shrink-0">
      {data.showLogo && <div className="p-2 bg-white rounded-xl shadow-lg rotate-[-5deg]"><EmersonLogo data={data} size={50} /></div>}
    </div>
    <div className="flex-1 p-16 flex flex-col justify-between bg-white text-blue-900 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-50 -mr-48 -mt-48 rounded-full mix-blend-multiply opacity-50"></div>
      
      <div>
        <p className="text-sky-700 font-black tracking-[0.3em] uppercase mb-4 text-xs">{data.university}</p>
        <div className="w-24 h-2 bg-sky-600 mb-12 rounded-full"></div>
        <h1 className="text-6xl font-black leading-none mb-6 uppercase tracking-tight text-blue-900 drop-shadow-sm">
          {data.topic}
        </h1>
        <p className="text-2xl font-light text-slate-500 tracking-tight">{data.subject}</p>
      </div>

      <div className="space-y-10 relative z-10">
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <p className="text-[10px] font-black text-sky-700 uppercase mb-2 tracking-widest">Candidate</p>
            <p className="text-xl font-black mb-1 text-blue-900">{data.name}</p>
            <div className="text-slate-500 text-sm font-medium space-y-0.5">
               <p>Reg ID: {data.rollNo}</p>
               <p>{data.program} | {data.semester}</p>
            </div>
          </div>
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <p className="text-[10px] font-black text-sky-700 uppercase mb-2 tracking-widest">Supervisor</p>
            <p className="text-xl font-black mb-1 text-blue-900">{data.professor}</p>
            <p className="text-slate-500 text-sm font-medium">Professor of AI & Information Technology</p>
          </div>
        </div>
        
        <div className="pt-8 border-t-2 border-slate-100 flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-widest">Submission Deadline</p>
            <p className="text-xl font-black text-sky-700">{data.submissionDate}</p>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-blue-100 flex items-center justify-center">
             <div className="w-6 h-6 bg-blue-900 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AcademicTemplate: React.FC<{ data: AssignmentData }> = ({ data }) => (
  <div className="h-full w-full p-16 bg-[#fafafa] flex flex-col items-center justify-start text-center font-serif relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-2 bg-blue-900"></div>
    <div className="absolute bottom-0 left-0 w-full h-2 bg-sky-600"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] scale-[2.5] pointer-events-none grayscale">
       {data.showLogo && <img src={data.customLogo || "https://upload.wikimedia.org/wikipedia/en/3/3a/Emerson_University_Multan_Logo.png"} alt="" crossOrigin="anonymous" />}
    </div>

    <div className="mb-12 z-10">
      {data.showLogo && <EmersonLogo data={data} size={150} className="mb-8 drop-shadow-xl" />}
      <h2 className="text-3xl font-bold text-blue-900 tracking-tight uppercase max-w-lg">
        {data.university}
      </h2>
      <div className="flex items-center justify-center gap-4 mt-3">
        <div className="h-px bg-slate-300 w-10"></div>
        <p className="text-[10px] text-sky-700 tracking-[0.4em] uppercase font-bold">Faculty of Computer Science & IT</p>
        <div className="h-px bg-slate-300 w-10"></div>
      </div>
    </div>

    <div className="flex-1 flex flex-col justify-center items-center max-w-2xl z-10">
      <p className="text-xs font-bold text-sky-700 tracking-widest uppercase mb-4 bg-white px-5 py-1.5 rounded-full border border-slate-200 shadow-sm">Academic Project Submission</p>
      <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-[1.1]">
        {data.topic}
      </h1>
      <p className="text-xl font-medium text-blue-900 uppercase tracking-[0.15em] italic border-b-2 border-blue-900/20 pb-3 px-8">
        Subject: {data.subject}
      </p>
    </div>

    <div className="w-full mt-auto bg-white p-10 rounded-[32px] shadow-sm border border-slate-100 ring-4 ring-slate-50 z-10">
      <div className="grid grid-cols-2 gap-10 text-center">
        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-black text-sky-700 uppercase tracking-[0.15em] mb-2">Prepared By</p>
            <p className="text-xl font-bold text-slate-800 underline decoration-blue-100 underline-offset-4">{data.name}</p>
            <div className="mt-1.5 text-xs text-slate-500 font-medium">
              <p>Roll No: {data.rollNo}</p>
              <p>{data.program} ({data.semester} Semester)</p>
            </div>
          </div>
        </div>
        <div className="space-y-3 border-l border-slate-100">
          <div>
            <p className="text-[10px] font-black text-sky-700 uppercase tracking-[0.15em] mb-2">Supervised By</p>
            <p className="text-xl font-bold text-slate-800">{data.professor}</p>
            <p className="text-xs text-slate-500 font-medium mt-1">Associate Professor, BSIT</p>
            <div className="mt-3 inline-block bg-blue-900 text-white text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-blue-200">
              {data.submissionDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MinimalistTemplate: React.FC<{ data: AssignmentData }> = ({ data }) => (
  <div className="h-full w-full p-20 bg-white flex flex-col justify-between font-sans selection:bg-blue-900 selection:text-white">
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-sky-700">Official Submission</p>
        <p className="text-base font-bold text-blue-900">{data.university}</p>
      </div>
      {data.showLogo && <div className="grayscale opacity-50 hover:grayscale-0 transition-all"><EmersonLogo data={data} size={40} /></div>}
    </div>

    <div className="max-w-3xl">
      <h1 className="text-[72px] font-black tracking-tighter leading-[0.85] mb-8 text-black">
        {data.topic}
      </h1>
      <div className="w-32 h-3 bg-blue-900"></div>
    </div>

    <div className="flex justify-between items-end">
      <div className="space-y-6 max-w-sm">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-black leading-none">{data.subject}</h2>
          <div className="h-px w-full bg-slate-100"></div>
        </div>
        
        <div className="space-y-2 text-xs font-medium">
          <div className="grid grid-cols-2 gap-4">
            <span className="text-sky-700 uppercase tracking-widest text-[9px] font-bold">Presenter</span>
            <span className="text-black">{data.name} (Roll #{data.rollNo})</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <span className="text-sky-700 uppercase tracking-widest text-[9px] font-bold">Degree</span>
            <span className="text-black">{data.program} • {data.semester}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <span className="text-sky-700 uppercase tracking-widest text-[9px] font-bold">Supervisor</span>
            <span className="text-black">{data.professor}</span>
          </div>
        </div>
      </div>
      
      <div className="text-right">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-sky-700 mb-1">Issue Date</p>
        <p className="text-lg font-black text-blue-900">{data.submissionDate}</p>
      </div>
    </div>
  </div>
);

const PreviewPane: React.FC<Props> = ({ data, template }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.clientWidth;
        // Standard width we designed for is 800px
        const newScale = Math.min(parentWidth / 800, 1.2); // Cap at 1.2 for large screens
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full no-print-transform-wrapper preview-scaler" ref={containerRef}>
        <div 
          style={{ 
            transform: `scale(${scale})`, 
            transformOrigin: 'top center',
            height: `${1131 * scale}px` // Maintain visual space based on scaled document
          }}
          className="transition-transform duration-300 ease-out"
        >
          <div 
            id="assignment-preview"
            className="a4-document overflow-hidden"
          >
            {template === 'formal' && <FormalTemplate data={data} />}
            {template === 'modern' && <ModernTemplate data={data} />}
            {template === 'academic' && <AcademicTemplate data={data} />}
            {template === 'minimalist' && <MinimalistTemplate data={data} />}
          </div>
        </div>
      </div>
      <p className="mt-4 text-slate-400 text-xs font-medium no-print flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        Live A4 Preview (Scaled to fit your screen)
      </p>
    </div>
  );
};

export default PreviewPane;
