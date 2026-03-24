import { useState } from 'react';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { TrackingView } from './views/TrackingView';
import { ExplorerView } from './views/ExplorerView';
import { OperatorsView } from './views/OperatorsView';
import { SecurityView } from './views/SecurityView';
import { LoginView } from './views/LoginView';
import { AnimatePresence, motion } from 'motion/react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('tracking');

  if (!isLoggedIn) {
    return <LoginView onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderView = () => {
    switch (activeTab) {
      case 'tracking':
        return <TrackingView />;
      case 'explorer':
        return <ExplorerView />;
      case 'operators':
        return <OperatorsView />;
      case 'security':
        return <SecurityView />;
      case 'dashboard':
        return (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-160px)] space-y-6">
            <h1 className="text-6xl font-headline font-black text-white uppercase tracking-tighter">DASHBOARD_CORE</h1>
            <p className="text-white/40 tracking-[0.5em] uppercase">Módulo em fase de sincronização...</p>
            <div className="w-64 h-1 bg-surface-container overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-160px)]">
            <h1 className="text-4xl font-headline font-black text-white uppercase">MÓDULO INDISPONÍVEL</h1>
            <p className="text-white/40 mt-4 uppercase">Acesso negado ou não implementado.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-white">
      <TopBar />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="pl-64 pt-16 min-h-screen">
        <div className="p-10 max-w-[1600px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Global HUD elements */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-none">
        <div className="bg-surface-high/80 backdrop-blur px-3 py-1 border-r-2 border-primary">
          <span className="text-[9px] font-mono text-white/60 uppercase tracking-widest">LATENCY: 12ms</span>
        </div>
        <div className="bg-surface-high/80 backdrop-blur px-3 py-1 border-r-2 border-tertiary">
          <span className="text-[9px] font-mono text-white/60 uppercase tracking-widest">ENCRYPTION: ACTIVE</span>
        </div>
      </div>
    </div>
  );
}

export default App;
