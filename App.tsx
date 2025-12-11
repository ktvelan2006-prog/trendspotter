import React, { useState, useEffect } from 'react';
import { fetchTrendingNews } from './services/geminiService';
import { SearchState } from './types';
import { NewsCard } from './components/NewsCard';
import { SourcesList } from './components/SourcesList';

const App: React.FC = () => {
  const [topic, setTopic] = useState('Trending Technology');
  const [searchInput, setSearchInput] = useState('');
  const [state, setState] = useState<SearchState>({
    isLoading: false,
    error: null,
    data: null,
  });

  const handleFetch = async (queryTopic: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const result = await fetchTrendingNews(queryTopic);
      setState({ isLoading: false, error: null, data: result });
    } catch (err) {
      setState({ 
        isLoading: false, 
        error: "Oops! The AI got a bit confused searching for that. Try again?", 
        data: null 
      });
    }
  };

  useEffect(() => {
    handleFetch(topic);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setTopic(searchInput);
    handleFetch(searchInput);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      {/* Casual Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
                  T
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-800 hidden sm:block">
                  Trend<span className="text-indigo-600">Spotter</span>
                </span>
              </div>
              
              {/* "Tagged" App Name with Source Indicator */}
              <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-wide">Google Search Sources</span>
              </div>
            </div>

            <div className="hidden md:block">
               <span className="text-sm text-slate-500 font-medium">Your daily dose of news + attitude.</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Search Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            What's buzzing in <span className="text-indigo-600 underline decoration-indigo-300 underline-offset-4 decoration-4">{topic}</span>?
          </h1>
          
          <form onSubmit={handleSearch} className="relative mt-8 group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              className="w-full pl-14 pr-36 py-5 rounded-full border-2 border-slate-200 bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none text-lg transition-all shadow-sm group-hover:shadow-md"
              placeholder="Search trending topics (e.g. 'SpaceX Launch', 'AI News')..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button 
              type="submit"
              disabled={state.isLoading}
              className="absolute right-2 top-2 bottom-2 bg-slate-900 hover:bg-indigo-600 text-white px-8 rounded-full font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg active:scale-95"
            >
              {state.isLoading ? 'Digging...' : 'Explore'}
            </button>
          </form>
        </div>

        {/* Loading State */}
        {state.isLoading && (
          <div className="py-24 text-center">
            <div className="inline-block relative">
              <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              </div>
            </div>
            <p className="text-slate-500 text-lg mt-6 font-medium animate-pulse">
              Scouring the web with Gemini...
            </p>
          </div>
        )}

        {/* Error State */}
        {state.error && (
          <div className="max-w-lg mx-auto bg-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded-r-xl shadow-sm mb-8 flex items-start gap-4">
             <div className="flex-shrink-0">
               <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
               </svg>
             </div>
             <div>
                <p className="font-bold text-lg mb-1">Hiccup detected!</p>
                <p>{state.error}</p>
             </div>
          </div>
        )}

        {/* Content */}
        {!state.isLoading && state.data && (
          <div className="animate-fade-in-up space-y-12">
            
            {/* Grid of Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {state.data.items.map((item, index) => (
                <NewsCard key={index} item={item} />
              ))}
            </div>

            {/* Empty State */}
            {state.data.items.length === 0 && (
               <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
                 <p className="text-slate-400 text-lg">No specific news found. Try a broader topic!</p>
               </div>
            )}

            {/* Sources Footer */}
            <SourcesList sources={state.data.sources} />
            
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-auto py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm font-medium">
            Powered by <span className="text-slate-900 font-bold">Google Gemini 2.5</span> • Grounded with Google Search
          </p>
        </div>
      </footer>
      
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;