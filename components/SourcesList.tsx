import React from 'react';
import { GroundingSource } from '../types';

interface SourcesListProps {
  sources: GroundingSource[];
}

export const SourcesList: React.FC<SourcesListProps> = ({ sources }) => {
  if (sources.length === 0) return null;

  return (
    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-inner">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-white rounded-full shadow-sm border border-slate-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h4 className="text-base font-bold text-slate-800 uppercase tracking-wide">
          Sources Verified by AI
        </h4>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map((source, idx) => (
          <a
            key={idx}
            href={source.uri}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 rounded-xl bg-white hover:bg-white hover:shadow-md hover:translate-y-[-2px] hover:border-indigo-100 transition-all duration-300 border border-slate-100 group"
          >
            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors mr-3">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
               </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-700 truncate group-hover:text-indigo-600 transition-colors">
                {source.title}
              </p>
              <p className="text-xs text-slate-400 truncate mt-0.5">
                {new URL(source.uri).hostname.replace('www.', '')}
              </p>
            </div>
            <div className="ml-2 text-slate-300 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};