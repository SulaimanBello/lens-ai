import React, { useState } from 'react';
import { Search, ArrowRight, Link as LinkIcon, Sparkles } from 'lucide-react';

interface InputSectionProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSearch(input.trim());
    }
  };

  const handleExampleClick = (url: string) => {
    setInput(url);
    if (!isLoading) {
      onSearch(url);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-12 animate-fade-in-up">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <LinkIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary-400 transition-colors" />
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a website URL (e.g., https://www.dreamlaunch.studio/)"
          className="w-full pl-12 pr-32 py-4 bg-dark-card border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all shadow-lg"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="absolute right-2 top-2 bottom-2 bg-primary-600 hover:bg-primary-500 text-white px-6 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Analyze <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <span className="text-gray-400 text-sm flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Try an example:
        </span>
        <button 
          onClick={() => handleExampleClick('https://www.dreamlaunch.studio/')}
          className="text-xs bg-dark-card border border-gray-700 hover:border-primary-500/50 hover:text-primary-300 text-gray-300 px-3 py-1.5 rounded-full transition-all"
        >
          dreamlaunch.studio
        </button>
        <button 
          onClick={() => handleExampleClick('https://react.dev/')}
          className="text-xs bg-dark-card border border-gray-700 hover:border-primary-500/50 hover:text-primary-300 text-gray-300 px-3 py-1.5 rounded-full transition-all"
        >
          react.dev
        </button>
      </div>
    </div>
  );
};

export default InputSection;