
import React, { useState } from 'react';
import { MetricsDashboard } from './components/MetricsDashboard';
import { PhishingSimulator } from './components/PhishingSimulator';
import { CodeBlock } from './components/CodeBlock';
import { PYTHON_CODE_SNIPPETS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'simulator' | 'code' | 'metrics'>('overview');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">CyberGuard ML</h1>
              <p className="text-[10px] text-emerald-500 font-mono uppercase tracking-widest">Phishing Detection Hub</p>
            </div>
          </div>

          <nav className="hidden md:flex bg-slate-900 rounded-lg p-1 border border-slate-800">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'simulator', label: 'Simulator' },
              { id: 'metrics', label: 'Analytics' },
              { id: 'code', label: 'Source Code' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === tab.id 
                    ? 'bg-slate-800 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'overview' && (
          <div className="space-y-12 animate-fadeIn">
            <section className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-extrabold text-white mb-6">
                Fighting Phishing with <span className="text-emerald-500">Machine Learning</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Phishing remains the #1 entry point for cyber attacks. Traditional signature-based detection 
                fails against new, unique URLs. Our ML-driven approach extracts structural and semantic 
                patterns from URLs to identify threats before they can cause damage.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: 'Feature Engineering', 
                  desc: 'Converting raw URLs into mathematical vectors using dots, length, special characters, and TLD analysis.',
                  icon: '⚙️'
                },
                { 
                  title: 'Proactive Defense', 
                  desc: 'Detecting zero-day phishing sites that have not yet been blacklisted by search engines.',
                  icon: '🛡️'
                },
                { 
                  title: 'Automated Response', 
                  desc: 'Integrating models into mail gateways and DNS filters for real-time traffic sanitization.',
                  icon: '⚡'
                }
              ].map((card, idx) => (
                <div key={idx} className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl hover:border-emerald-500/50 transition-colors group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{card.icon}</div>
                  <h3 className="text-xl font-bold text-slate-100 mb-3">{card.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>

            <section className="bg-emerald-600/10 border border-emerald-500/20 p-8 rounded-2xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-emerald-400 mb-4">Cybersecurity Relevance</h3>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    In a modern SOC (Security Operations Center), automation is key. Machine learning models 
                    reduce the "Time to Detect" (TTD) from hours to milliseconds. By training on massive datasets 
                    (e.g., PhishTank, OpenPhish), we teach algorithms the subtle indicators of deceit that 
                    human analysts might overlook.
                  </p>
                  <button 
                    onClick={() => setActiveTab('simulator')}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                  >
                    Try the Simulator
                  </button>
                </div>
                <div className="w-full md:w-1/3 bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-2xl">
                  <div className="text-xs font-mono text-emerald-500/70 mb-2 uppercase tracking-tighter">Live Traffic Snippet</div>
                  <div className="space-y-2 font-mono text-[10px] text-slate-500">
                    <div>[INFO] Packet intercepted: 192.168.1.45</div>
                    <div>[ML] Extracting features from: bit.ly/secure-login-34...</div>
                    <div className="text-red-400">[WARN] High phishing score detected (0.982)</div>
                    <div className="text-emerald-400">[ACTION] Request dropped. Firewall updated.</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'simulator' && <PhishingSimulator />}

        {activeTab === 'metrics' && <MetricsDashboard />}

        {activeTab === 'code' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div className="prose prose-invert max-w-none mb-12">
              <h2 className="text-2xl font-bold text-white">Python Implementation Guide</h2>
              <p className="text-slate-400">
                A professional-grade implementation requires a clear pipeline: Load, Clean, Extract, Train, and Serve.
                Below are the core modules used to build the detection system.
              </p>
            </div>
            
            <CodeBlock title="step_1_load_data.py" code={PYTHON_CODE_SNIPPETS.data_loading} />
            <CodeBlock title="step_2_extraction.py" code={PYTHON_CODE_SNIPPETS.feature_extraction} />
            <CodeBlock title="step_3_train_models.py" code={PYTHON_CODE_SNIPPETS.model_training} />
            <CodeBlock title="step_4_realtime_api.py" code={PYTHON_CODE_SNIPPETS.flask_app} />
            
            <div className="p-6 bg-slate-900 rounded-xl border border-slate-700">
              <h4 className="font-bold text-slate-200 mb-2">Model Deployment Notes:</h4>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-2">
                <li>Always normalize feature scales for models like Logistic Regression.</li>
                <li>Use <code className="text-emerald-500">RandomForest</code> for non-linear relationships and feature robustness.</li>
                <li>Implement a fallback mechanism (Blacklist/Whitelist) alongside ML predictions.</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Nav */}
      <div className="md:hidden sticky bottom-0 bg-slate-950 border-t border-slate-800 p-2 grid grid-cols-4 gap-1">
        {[
          { id: 'overview', icon: '🏠' },
          { id: 'simulator', icon: '🔍' },
          { id: 'metrics', icon: '📊' },
          { id: 'code', icon: '💻' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3 rounded-lg flex flex-col items-center justify-center transition-all ${
              activeTab === tab.id ? 'bg-slate-900 text-white' : 'text-slate-500'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
          </button>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 px-4 text-center">
        <p className="text-slate-600 text-sm">
          &copy; {new Date().getFullYear()} CyberGuard ML. Professional Cybersecurity Toolkit.
        </p>
      </footer>
    </div>
  );
};

export default App;
