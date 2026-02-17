
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 no-print">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-900 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold italic">
            A
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-900 to-indigo-800 bg-clip-text text-transparent">
            AssignmentPro
          </span>
        </div>
        <div className="hidden sm:flex gap-6 text-slate-500 font-medium">
          <a href="#" className="hover:text-blue-900">Templates</a>
          <a href="#" className="hover:text-blue-900">Guides</a>
          <a href="#" className="hover:text-blue-900">About</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
