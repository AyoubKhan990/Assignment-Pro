
import React from 'react';
import { AssignmentData } from '../types';

interface Props {
  data: AssignmentData;
  onChange: (data: AssignmentData) => void;
}

const InputForm: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      onChange({ ...data, [name]: checked });
    } else {
      onChange({ ...data, [name]: value });
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, customLogo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    onChange({ ...data, customLogo: undefined });
  };

  const inputClasses = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 transition-all placeholder:text-slate-300";
  const labelClasses = "block text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1.5 mt-4 ml-1";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
      <div className="md:col-span-2">
        <label className={labelClasses}>University Institution</label>
        <input type="text" name="university" value={data.university} onChange={handleChange} className={inputClasses} placeholder="Enter University Name" />
      </div>

      <div className="md:col-span-2">
        <label className={labelClasses}>University Logo / Emblem</label>
        <div className="flex gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-200 border-dashed">
          <div className="relative group">
            {data.customLogo ? (
              <div className="relative">
                <img src={data.customLogo} alt="Logo" className="w-16 h-16 object-contain bg-white rounded-lg border border-slate-200 p-1" />
                <button 
                  onClick={removeLogo}
                  className="absolute -top-2 -right-2 bg-slate-800 text-white rounded-full p-1 shadow-md hover:bg-slate-900 transition-colors"
                  title="Remove Logo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              </div>
            ) : (
              <div className="w-16 h-16 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
              </div>
            )}
          </div>
          <div className="flex-1">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleLogoUpload} 
              id="logo-upload" 
              className="hidden"
            />
            <label 
              htmlFor="logo-upload" 
              className="inline-block px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-all"
            >
              {data.customLogo ? 'Change Logo' : 'Upload Your Version'}
            </label>
            <p className="text-[10px] text-slate-400 mt-1">Recommended: PNG or JPG with white background</p>
          </div>
        </div>
      </div>

      <div className="md:col-span-2">
        <label className={labelClasses}>Assignment Topic / Title</label>
        <textarea name="topic" value={data.topic} onChange={handleChange} className={`${inputClasses} resize-none h-24`} placeholder="What is this assignment about?" />
      </div>

      <div>
        <label className={labelClasses}>Your Name</label>
        <input type="text" name="name" value={data.name} onChange={handleChange} className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses}>Roll Number</label>
        <input type="text" name="rollNo" value={data.rollNo} onChange={handleChange} className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses}>Subject / Course</label>
        <input type="text" name="subject" value={data.subject} onChange={handleChange} className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses}>Supervising Professor</label>
        <input type="text" name="professor" value={data.professor} onChange={handleChange} className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses}>Degree Program</label>
        <input type="text" name="program" value={data.program} onChange={handleChange} className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses}>Current Semester</label>
        <input type="text" name="semester" value={data.semester} onChange={handleChange} className={inputClasses} />
      </div>

      <div className="md:col-span-2">
        <label className={labelClasses}>Submission Deadline</label>
        <input type="text" name="submissionDate" value={data.submissionDate} onChange={handleChange} className={inputClasses} />
      </div>

      <div className="md:col-span-2 mt-6 flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <input 
          type="checkbox" 
          id="showLogo" 
          name="showLogo" 
          checked={data.showLogo} 
          onChange={handleChange}
          className="w-5 h-5 rounded-md border-slate-300 text-blue-900 focus:ring-blue-900"
        />
        <label htmlFor="showLogo" className="text-sm font-semibold text-slate-700 cursor-pointer select-none">
          Display Logo on Title Page
        </label>
      </div>
    </div>
  );
};

export default InputForm;
