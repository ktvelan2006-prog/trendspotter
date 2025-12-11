import React, { useState } from 'react';
import { NewsItem } from '../types';

interface NewsCardProps {
  item: NewsItem;
}

export const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 120; // Maximum characters to show before truncating

  const shouldTruncate = item.articleBody.length > maxLength;
  const displayText = isExpanded || !shouldTruncate 
    ? item.articleBody 
    : item.articleBody.slice(0, maxLength) + '...';

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-slate-100 flex flex-col h-full">
      {/* Header / Tags */}
      <div className="px-6 pt-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {item.tags.map((tag, idx) => (
            <span 
              key={idx} 
              className="px-2 py-1 text-xs font-semibold tracking-wide text-indigo-600 bg-indigo-50 rounded-full uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2">
          {item.headline}
        </h3>
      </div>

      {/* Body */}
      <div className="px-6 pb-4 flex-grow">
        <p className="text-slate-600 text-sm leading-relaxed">
          {displayText}
        </p>
        
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-wide transition-colors focus:outline-none"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </div>

      {/* Application Remark Section */}
      <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 mt-auto">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              AI
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              TrendSpotter Remark
            </p>
            <p className="text-sm font-medium text-slate-800 italic">
              "{item.appRemark}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
