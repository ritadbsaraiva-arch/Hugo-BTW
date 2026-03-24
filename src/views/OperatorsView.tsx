import { Users, UserPlus, Building, ShieldAlert, Lock, MoreVertical, User } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { MOCK_OPERATORS } from '../constants';
import { cn } from '../lib/utils';

export const OperatorsView = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <p className="text-primary font-headline text-sm font-bold tracking-[0.3em] mb-2 uppercase">Core_Management</p>
          <h1 className="text-6xl font-headline font-black tracking-tighter text-white uppercase">OPERATOR_LOGISTICS</h1>
        </div>
        <div className="flex gap-4">
          <div className="bg-surface-container p-4 flex flex-col items-end">
            <span className="text-[10px] text-white/40 font-headline tracking-widest uppercase">TOTAL_ACTIVE</span>
            <span className="text-3xl font-headline font-bold text-tertiary">1,284</span>
          </div>
          <div className="bg-surface-container p-4 flex flex-col items-end border-l-4 border-primary">
            <span className="text-[10px] text-white/40 font-headline tracking-widest uppercase">PENDING_AUTH</span>
            <span className="text-3xl font-headline font-bold text-primary">02</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Ledger */}
        <Card variant="low" className="col-span-12 lg:col-span-8 p-0 flex flex-col">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h2 className="font-headline text-lg font-bold tracking-tight uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-primary animate-pulse"></span>
              Live Operator Ledger
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">FILTER_ALL</Button>
              <Button variant="outline" size="sm">EXPORT_CSV</Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container text-[10px] font-headline tracking-widest text-white/40 uppercase">
                  <th className="px-6 py-4 font-medium">Identity / Node</th>
                  <th className="px-6 py-4 font-medium">Enterprise</th>
                  <th className="px-6 py-4 font-medium">Permissions</th>
                  <th className="px-6 py-4 font-medium">Last Activity</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {MOCK_OPERATORS.map((op, i) => (
                  <tr key={i} className="hover:bg-surface-high transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-surface-highest flex items-center justify-center">
                          <Users className={cn("w-5 h-5", op.status === 'restricted' ? 'text-primary' : 'text-tertiary')} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white uppercase">{op.name}</p>
                          <p className="text-[10px] text-white/40 font-mono uppercase">{op.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-white/70 uppercase">{op.enterprise}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-1 text-[9px] font-bold tracking-widest uppercase",
                        op.permission === 'SYS_ARCHITECT' ? 'bg-primary text-white' : 'bg-tertiary/20 text-tertiary'
                      )}>
                        {op.permission}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[10px] font-mono text-white/40 uppercase">{op.lastActivity}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-white/20 group-hover:text-primary transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Audit and Map */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card border="left" borderColor="tertiary" className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline font-bold text-sm tracking-widest uppercase">Real-Time Audit</h3>
              <span className="text-[10px] font-mono text-tertiary uppercase">SYNCED</span>
            </div>
            <div className="space-y-6">
              {[
                { time: '14:22:01', text: 'OP_BRAVO_9 Authorized Contract Deployment #8221', hash: 'f5d8e9...a2b1', color: 'bg-primary' },
                { time: '14:15:33', text: 'Enterprise GLOBAL_RELAY_INC updated permissions for OP_DELTA_X', color: 'bg-white/20' },
                { time: '14:02:11', text: 'Node Integrity Check Passed for all 1,284 Operators', color: 'bg-tertiary' },
              ].map((audit, i) => (
                <div key={i} className="relative pl-6 border-l border-white/10 space-y-1">
                  <div className={cn("absolute -left-[5px] top-0 w-2 h-2 rounded-full", audit.color)}></div>
                  <p className="text-[10px] font-mono text-white/40 uppercase">{audit.time}</p>
                  <p className="text-xs font-bold uppercase tracking-tight">{audit.text}</p>
                  {audit.hash && <p className="text-[9px] text-white/40 font-mono truncate uppercase">HASH: {audit.hash}</p>}
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-8 py-3 text-[10px]">
              VIEW FULL HISTORY LOG
            </Button>
          </Card>

          <Card variant="high" className="h-64 group">
            <div className="absolute inset-0 grayscale opacity-40">
              <img 
                src="https://picsum.photos/seed/network/600/400?grayscale" 
                alt="Network" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent z-10"></div>
            <div className="relative z-20 p-6 flex flex-col h-full justify-between">
              <h4 className="font-headline font-bold text-xs tracking-widest uppercase">Global Enterprise Reach</h4>
              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-[10px] font-headline text-white/60 uppercase">NODE_UPTIME</span>
                  <span className="text-lg font-headline font-bold text-tertiary">99.98%</span>
                </div>
                <div className="w-full h-1 bg-surface-low">
                  <div className="w-[99.98%] h-full bg-tertiary"></div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: UserPlus, title: 'Register New Operator', desc: 'Initialize blockchain identity credentials.', color: 'primary' },
            { icon: Building, title: 'Manage Enterprise Units', desc: 'Modify corporate hierarchical access.', color: 'tertiary' },
            { icon: ShieldAlert, title: 'System Permissions', desc: 'Define global level-gate protocols.', color: 'white' },
            { icon: Lock, title: 'Emergency Lockdown', desc: 'Revoke all active operator tokens immediately.', color: 'signal' },
          ].map((action, i) => (
            <button 
              key={i}
              className={cn(
                "p-6 flex flex-col gap-4 border-b-2 transition-all text-left group",
                action.color === 'signal' ? "signal-gradient border-none" : "bg-surface-low border-transparent hover:border-primary"
              )}
            >
              <action.icon className={cn("w-8 h-8", action.color === 'signal' ? 'text-white' : `text-${action.color}`)} />
              <div>
                <p className={cn("font-headline font-bold text-sm uppercase", action.color === 'signal' ? 'text-white' : 'text-white')}>{action.title}</p>
                <p className={cn("text-[10px] font-body uppercase", action.color === 'signal' ? 'text-white/80' : 'text-white/40')}>{action.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Profile Preview */}
      <Card className="p-8 border border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-surface-highest border border-outline-variant/30 flex items-center justify-center">
              <Users className="w-12 h-12 text-white/20" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-headline font-black uppercase leading-tight">OP_ALPHA_001</h3>
              <p className="text-[10px] font-mono text-tertiary bg-tertiary/10 px-2 py-1 inline-block uppercase">Verified_Master_Node</p>
              <div className="flex gap-4 pt-2">
                <div>
                  <p className="text-[8px] text-white/40 font-headline uppercase">Access_Score</p>
                  <p className="text-sm font-headline font-bold uppercase">98/100</p>
                </div>
                <div>
                  <p className="text-[8px] text-white/40 font-headline uppercase">Joined</p>
                  <p className="text-sm font-headline font-bold uppercase">Jan_22</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-headline text-white/40 tracking-[0.2em] uppercase">Permission_Matrix</p>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-body uppercase">
                <span>Write_Ledger</span>
                <span className="text-tertiary">Enabled</span>
              </div>
              <div className="w-full h-[2px] bg-white/5 relative">
                <div className="absolute left-0 h-full bg-tertiary w-full"></div>
              </div>
              <div className="flex justify-between text-[10px] font-body pt-2 uppercase">
                <span>Modify_Nodes</span>
                <span className="text-primary">Restricted</span>
              </div>
              <div className="w-full h-[2px] bg-white/5 relative">
                <div className="absolute left-0 h-full bg-primary w-1/3"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="bg-surface-low p-4">
              <p className="text-[9px] font-mono text-white/40 uppercase mb-2">Public_Key_Registry</p>
              <p className="text-[10px] font-mono text-white/70 break-all uppercase">ed25519:6f8a2b5c9e1d7f4a0b3c2d1e5f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1</p>
            </div>
            <div className="flex gap-3 mt-4">
              <Button variant="secondary" className="flex-1 py-2 text-[10px]">Audit_Profile</Button>
              <Button variant="outline" className="flex-1 py-2 border-primary text-primary hover:bg-primary hover:text-white text-[10px]">Revoke_Keys</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
