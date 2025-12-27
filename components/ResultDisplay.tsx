import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ExternalLink, Quote, Globe } from 'lucide-react';
import { SummaryResult } from '../types';

interface ResultDisplayProps {
  data: SummaryResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ data }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      
      {/* Main Content Card */}
      <div className="bg-dark-card border border-gray-700/50 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary-600/10 blur-3xl rounded-full pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-6 border-b border-gray-700/50 pb-4">
          <div className="p-2 bg-primary-500/10 rounded-lg">
            <Quote className="w-5 h-5 text-primary-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Analysis Summary</h2>
        </div>

        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h3 className="text-2xl font-bold text-white mb-4 mt-6" {...props} />,
              h2: ({node, ...props}) => <h4 className="text-xl font-bold text-white mb-3 mt-5" {...props} />,
              h3: ({node, ...props}) => <h5 className="text-lg font-bold text-primary-200 mb-2 mt-4" {...props} />,
              strong: ({node, ...props}) => <span className="font-bold text-primary-100" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2 mb-4" {...props} />,
              li: ({node, ...props}) => <li className="text-gray-300" {...props} />,
              p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
            }}
          >
            {data.text}
          </ReactMarkdown>
        </div>
      </div>

      {/* Sources Card */}
      {data.sources.length > 0 && (
        <div className="bg-dark-card border border-gray-700/50 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Globe className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Sources & References</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.sources.map((source, index) => (
              <a
                key={index}
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-gray-600 transition-all group"
              >
                <div className="bg-gray-700 p-1.5 rounded-lg group-hover:bg-gray-600 transition-colors">
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-200 truncate group-hover:text-primary-300 transition-colors">
                    {source.title}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {source.uri}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;