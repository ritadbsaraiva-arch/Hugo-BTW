import { Shield, Lock, Key, Fingerprint, Activity, Database, Globe } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

interface LoginViewProps {
  onLogin: () => void;
}

export const LoginView = ({ onLogin }: LoginViewProps) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background overflow-hidden">
      {/* Left Side - Branding & Stats */}
      <div className="lg:w-1/2 relative p-12 flex flex-col justify-between kinetic-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-primary flex items-center justify-center">
              <Shield className="text-white w-8 h-8" />
            </div>
            <span className="text-3xl font-headline font-black tracking-tighter text-white uppercase">KINETIC_MONOLITH</span>
          </div>
          
          <div className="space-y-6 max-w-xl">
            <h1 className="text-7xl font-headline font-black tracking-tighter text-white leading-[0.9] uppercase">
              INDUSTRIAL <br />
              <span className="text-primary">BLOCKCHAIN</span> <br />
              INTEGRITY
            </h1>
            <p className="text-white/40 font-body text-lg tracking-wide uppercase">
              Protocolo de custódia imutável para ativos de alta performance e logística crítica.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-8">
          {[
            { icon: Activity, label: 'System Status', value: 'OPTIMAL' },
            { icon: Database, label: 'Nodes Online', value: '12,042' },
            { icon: Globe, label: 'Global Reach', value: '184 COUNTRIES' },
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <stat.icon className="text-primary w-6 h-6" />
              <p className="text-[10px] font-headline font-bold text-white/40 tracking-widest uppercase">{stat.label}</p>
              <p className="text-sm font-headline font-bold text-white uppercase">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Decorative HUD elements */}
        <div className="absolute top-0 right-0 w-64 h-64 border-t border-r border-white/5 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-primary/20 pointer-events-none"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="lg:w-1/2 bg-surface-low flex items-center justify-center p-8 relative">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[radial-gradient(#D32F2F_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>

        <Card variant="high" className="w-full max-w-md p-10 border-t-4 border-primary shadow-2xl relative z-10">
          <div className="mb-10">
            <h2 className="text-2xl font-headline font-black text-white tracking-tight uppercase mb-2">Acesso Restrito</h2>
            <p className="text-white/40 text-xs tracking-widest uppercase">Insira suas credenciais de operador de nível 4</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="space-y-2">
              <label className="text-[10px] font-headline font-bold text-white/40 tracking-widest uppercase">Operator ID</label>
              <div className="flex items-center bg-surface-container border-b-2 border-outline-variant/30 focus-within:border-primary transition-all p-3 gap-3">
                <Shield className="text-white/20 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="OP_XXXX_XXXX" 
                  className="bg-transparent border-none text-sm font-headline tracking-widest focus:ring-0 text-white p-0 placeholder:text-white/10 uppercase w-full"
                  defaultValue="OP_CORE_01"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-headline font-bold text-white/40 tracking-widest uppercase">Security Key</label>
              <div className="flex items-center bg-surface-container border-b-2 border-outline-variant/30 focus-within:border-primary transition-all p-3 gap-3">
                <Key className="text-white/20 w-4 h-4" />
                <input 
                  type="password" 
                  placeholder="••••••••••••" 
                  className="bg-transparent border-none text-sm font-headline tracking-widest focus:ring-0 text-white p-0 placeholder:text-white/10 uppercase w-full"
                  defaultValue="password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="w-4 h-4 border border-outline-variant/50 flex items-center justify-center group-hover:border-primary transition-colors">
                  <div className="w-2 h-2 bg-primary"></div>
                </div>
                <span className="text-[10px] font-headline font-bold text-white/60 tracking-widest uppercase">2FA Biometric</span>
              </label>
              <a href="#" className="text-[10px] font-headline font-bold text-primary tracking-widest uppercase hover:underline">Recuperar Acesso</a>
            </div>

            <Button variant="signal" size="xl" className="w-full mt-4 group">
              <Lock className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              AUTENTICAR NO LEDGER
            </Button>

            <div className="pt-6 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-px w-8 bg-white/10"></div>
                <span className="text-[9px] font-mono text-white/20 uppercase">Ou use hardware key</span>
                <div className="h-px w-8 bg-white/10"></div>
              </div>
              <button type="button" className="p-4 bg-surface-container border border-white/5 hover:border-primary/50 transition-all active:scale-95">
                <Fingerprint className="w-8 h-8 text-white/40" />
              </button>
            </div>
          </form>
        </Card>

        <div className="absolute bottom-8 text-[10px] font-mono text-white/20 tracking-widest uppercase">
          KINETIC_MONOLITH v2.4.0 // ENCRYPTION: AES-256-GCM
        </div>
      </div>
    </div>
  );
};
