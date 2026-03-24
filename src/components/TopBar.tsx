import { Search, Bell, Network, UserCircle } from 'lucide-react';

export const TopBar = () => {
  return (
    <header className="fixed top-0 w-full z-50 h-16 bg-surface-low border-b border-white/5 flex justify-between items-center px-6">
      <div className="flex items-center gap-8">
        <span className="text-2xl font-bold text-primary tracking-widest font-headline uppercase tracking-tighter">
          KINETIC_MONOLITH
        </span>
        <div className="hidden md:flex items-center bg-surface-container px-4 py-1.5 gap-3 border-b-2 border-outline-variant/30 focus-within:border-primary transition-all">
          <Search className="text-white/40 w-4 h-4" />
          <input 
            type="text" 
            placeholder="TRACK_ID_7721..." 
            className="bg-transparent border-none text-xs font-headline tracking-widest focus:ring-0 text-white p-0 placeholder:text-white/20 uppercase w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-white/60 hover:bg-surface-high transition-colors active:scale-95">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 text-white/60 hover:bg-surface-high transition-colors active:scale-95">
          <Network className="w-5 h-5" />
        </button>
        <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
        <button className="flex items-center gap-2 p-1 hover:bg-surface-high transition-colors pr-3 active:scale-95">
          <UserCircle className="w-6 h-6 text-primary" />
          <span className="text-xs font-headline font-bold text-white uppercase tracking-wider">OP_CORE_01</span>
        </button>
      </div>
    </header>
  );
};
