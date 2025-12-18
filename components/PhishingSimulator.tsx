
import React, { useState } from 'react';
import { analyzeUrlWithAI } from '../geminiService';
import { MLPrediction, FeatureExtraction } from '../types';

export const PhishingSimulator: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<MLPrediction | null>(null);
  const [error, setError] = useState<string | null>(null);

  const performBasicExtraction = (input: string): FeatureExtraction => {
    return {
      url: input,
      length: input.length,
      dots: (input.match(/\./g) || []).length,
      hasAt: input.includes('@'),
      hasHyphen: input.includes('-'),
      hasDoubleSlash: input.lastIndexOf('//') > 7,
      isHttps: input.startsWith('https://'),
      isIpAddress: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}/.test(input.replace(/https?:\/\//, ''))
    };
  };

  const handleAnalyze = async () => {
    if (!url) return;
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const aiResult = await analyzeUrlWithAI(url);
      setResult(aiResult);
    } catch (err) {
      setError("Failed to analyze the URL. Please ensure your API key is valid.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const basicFeatures = url ? performBasicExtraction(url) : null;

  return (
    <div className="space-y-8">
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 shadow-xl">
        <h3 className="text-xl font-bold mb-4 text-slate-100 flex items-center gap-2">
          <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Real-time URL Threat Hunter
        </h3>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input 
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to inspect (e.g., http://security-update-bank.com/login)"
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-mono text-sm"
          />
          <button 
            onClick={handleAnalyze}
            disabled={isAnalyzing || !url}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold py-3 px-8 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Extracting...
              </span>
            ) : 'Analyze'}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm mb-6">
            {error}
          </div>
        )}

        {basicFeatures && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn">
            {[
              { label: 'Length', value: basicFeatures.length, icon: '📏' },
              { label: 'Dots', value: basicFeatures.dots, icon: '•' },
              { label: 'HTTPS', value: basicFeatures.isHttps ? 'Valid' : 'Insecure', color: basicFeatures.isHttps ? 'text-emerald-400' : 'text-red-400' },
              { label: 'IP Mode', value: basicFeatures.isIpAddress ? 'Yes' : 'No', color: basicFeatures.isIpAddress ? 'text-red-400' : 'text-slate-400' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div className="text-xs text-slate-500 uppercase font-semibold mb-1">{stat.label}</div>
                <div className={`text-lg font-bold ${stat.color || 'text-slate-200'}`}>
                  {stat.icon && <span className="mr-2">{stat.icon}</span>}
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {result && (
        <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl animate-slideUp">
          <div className={`px-6 py-4 flex items-center justify-between ${result.isPhishing ? 'bg-red-900/40 border-b border-red-500/50' : 'bg-emerald-900/40 border-b border-emerald-500/50'}`}>
            <h4 className="font-bold text-lg flex items-center gap-2">
              {result.isPhishing ? (
                <><span className="text-red-400">⚠️ THREAT DETECTED</span></>
              ) : (
                <><span className="text-emerald-400">✅ URL SEEMS SAFE</span></>
              )}
            </h4>
            <div className="text-sm font-medium">Confidence: {(result.confidence * 100).toFixed(1)}%</div>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <h5 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Detection Reasoning</h5>
              <p className="text-slate-200 leading-relaxed">{result.reasoning}</p>
            </div>
            <div>
              <h5 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Extracted Indicators</h5>
              <div className="flex flex-wrap gap-2">
                {result.features.map((f, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs border border-slate-700">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
