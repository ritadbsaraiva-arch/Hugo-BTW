import { LayoutDashboard, History, Database, Users, ShieldCheck, Rocket, Settings, LogOut, Shield } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './Button';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tracking', label: 'Tracking', icon: History },
    { id: 'explorer', label: 'Explorer', icon: Database },
    { id: 'operators', label: 'Operators', icon: Users },
    { id: 'security', label: 'Security', icon: ShieldCheck },
  ];

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-surface-low flex flex-col py-4 z-40 border-r border-white/5">
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3 p-3 bg-surface-container border-l-4 border-primary">
          <div className="w-10 h-10 bg-primary flex items-center justify-center">
            <Shield className="text-white w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-white tracking-widest">NODE_01</div>
            <div className="text-[10px] text-primary tracking-tighter uppercase">Verified Status</div>
          </div>
        </div>
      </div>

      <nav className="flex-grow">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full px-6 py-4 flex items-center gap-3 transition-all duration-200 ease-in-out font-headline text-sm font-medium tracking-tight text-left",
              activeTab === item.id 
                ? "bg-primary text-white border-l-4 border-white" 
                : "text-white/50 hover:text-white hover:bg-surface-container"
            )}
          >
            <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-white" : "text-white/50")} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-6 mb-6">
        <Button variant="signal" className="w-full py-3 text-xs" onClick={() => console.log('Deploying...')}>
          <Rocket className="w-4 h-4 mr-2" />
          DEPLOY CONTRACT
        </Button>
      </div>

      <div className="mt-auto border-t border-white/5 pt-4">
        <button className="w-full px-6 py-3 flex items-center gap-3 text-white/50 hover:text-white hover:bg-surface-container transition-all text-left text-sm font-headline">
          <Settings className="w-5 h-5" />
          Settings
        </button>
        <button className="w-full px-6 py-3 flex items-center gap-3 text-white/50 hover:text-white hover:bg-surface-container transition-all text-left text-sm font-headline">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};
