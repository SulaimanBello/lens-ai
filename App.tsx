import React, { useState } from 'react';
import { Layout, Zap, AlertCircle } from 'lucide-react';
import InputSection from './components/InputSection';
import ResultDisplay from './components/ResultDisplay';
import { generateSummary } from './services/gemini';
import { SummaryResult, LoadingState } from './types';

const App: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoadingState(LoadingState.LOADING);
    setError(null);
    setResult(null);

    try {
      const data = await generateSummary(query);
      setResult(data);
      setLoadingState(LoadingState.SUCCESS);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while generating the summary.');
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg to-[#0B1120] text-gray-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-gray-800/60 bg-dark-bg/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary-500 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-primary-500/20">
              <Layout className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Lens AI
              </h1>
              <p className="text-xs text-primary-400 font-medium tracking-wide">WEB INTELLIGENCE</p>
            </div>
          </div>
          <a 
            href="https://ai.google.dev/" 
            target="_blank" 
            rel="noopener"
            className="hidden sm:flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>Powered by Gemini 3.0</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center">
        
        <div className="text-center mb-12 max-w-2xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
            Summarize the web <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">
              in seconds.
            </span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Enter a URL or topic to get a comprehensive, AI-generated summary with trusted sources. Powered by Google Search Grounding.
          </p>
        </div>

        <InputSection onSearch={handleSearch} isLoading={loadingState === LoadingState.LOADING} />

        {/* Loading State */}
        {loadingState === LoadingState.LOADING && (
          <div className="w-full max-w-4xl mt-8 animate-pulse">
            <div className="h-64 bg-dark-card/50 rounded-2xl border border-gray-800 mb-6 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                <p className="text-primary-300 font-medium animate-pulse">Analyzing content and verifying sources...</p>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {loadingState === LoadingState.ERROR && error && (
          <div className="w-full max-w-3xl mt-8 p-6 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-1">Analysis Failed</h3>
              <p className="text-red-300/80">{error}</p>
            </div>
          </div>
        )}

        {/* Success State */}
        {loadingState === LoadingState.SUCCESS && result && (
          <ResultDisplay data={result} />
        )}
        
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/60 bg-dark-bg/50 py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Lens AI. Built with Gemini API & React.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;