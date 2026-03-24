import React, { useState } from 'react';
import { Database, Grid, Lock, Verified, Shield, History, UserPlus, Trash2, Edit2, User, Search, Filter, ShieldCheck } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { MOCK_BLOCKS, MOCK_TRANSACTIONS } from '../constants';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'OPERATOR';
  status: 'ACTIVE' | 'SUSPENDED';
}

const INITIAL_USERS: UserData[] = [
  { id: 'DB_ADMIN_01', name: 'Rita Saraiva', email: 'ritadbsaraiva@gmail.com', role: 'ADMIN', status: 'ACTIVE' },
  { id: 'DB_OP_02', name: 'Marcus Viana', email: 'viana.m@kinetic.io', role: 'OPERATOR', status: 'ACTIVE' },
];

export const ExplorerView = () => {
  const [viewMode, setViewMode] = useState<'explorer' | 'admin'>('explorer');
  const [users, setUsers] = useState<UserData[]>(INITIAL_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<Partial<UserData>>({
    name: '',
    email: '',
    role: 'OPERATOR',
    status: 'ACTIVE',
  });

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleOpenModal = (user?: UserData) => {
    if (user) {
      setEditingUser(user);
      setFormData(user);
    } else {
      setEditingUser(null);
      setFormData({ name: '', email: '', role: 'OPERATOR', status: 'ACTIVE' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } as UserData : u));
    } else {
      const newUser: UserData = {
        id: `DB_USER_${(users.length + 1).toString().padStart(2, '0')}`,
        name: formData.name || '',
        email: formData.email || '',
        role: formData.role as 'ADMIN' | 'OPERATOR',
        status: formData.status as 'ACTIVE' | 'SUSPENDED',
      };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (deleteConfirmId) {
      setUsers(users.filter(u => u.id !== deleteConfirmId));
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Header Stats & Toggle */}
      <header>
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="font-headline text-5xl font-black tracking-tighter text-white mb-2 uppercase">
              {viewMode === 'explorer' ? 'EXPLORER_LIVE' : 'DATABASE_ADMIN'}
            </h1>
            <p className="font-body text-white/40 text-sm tracking-[0.2em] uppercase">
              {viewMode === 'explorer' 
                ? 'Monitoramento de integridade imutável em tempo real' 
                : 'Gestão de permissões e utilizadores da base de dados'}
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setViewMode('explorer')}
              className={`px-6 py-2 font-headline font-bold text-xs uppercase tracking-widest transition-all ${viewMode === 'explorer' ? 'bg-primary text-white' : 'bg-surface-highest text-white/40 hover:text-white'}`}
            >
              Network Stats
            </button>
            <button 
              onClick={() => setViewMode('admin')}
              className={`px-6 py-2 font-headline font-bold text-xs uppercase tracking-widest transition-all ${viewMode === 'admin' ? 'bg-primary text-white' : 'bg-surface-highest text-white/40 hover:text-white'}`}
            >
              User Admin
            </button>
          </div>
        </div>
        
        {viewMode === 'explorer' ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Último Bloco', value: '#8,492,103', border: true },
              { label: 'TPS (Média 24h)', value: '1,240', sub: 'TX/S' },
              { label: 'Lotes de Combustível', value: '412,809' },
              { label: 'Nós Ativos', value: '12,042' },
            ].map((stat, i) => (
              <div key={i}>
                <Card variant="low" className={stat.border ? "p-6 flex flex-col justify-between h-32 border-b-2 border-primary" : "p-6 flex flex-col justify-between h-32"}>
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{stat.label}</span>
                  <div className="font-headline text-2xl text-white">
                    {stat.value} {stat.sub && <span className="text-sm text-tertiary">{stat.sub}</span>}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Admins', value: users.filter(u => u.role === 'ADMIN').length, icon: Shield },
              { label: 'Operadores', value: users.filter(u => u.role === 'OPERATOR').length, icon: User },
              { label: 'Contas Ativas', value: users.filter(u => u.status === 'ACTIVE').length, icon: Verified },
              { label: 'Contas Suspensas', value: users.filter(u => u.status === 'SUSPENDED').length, icon: Lock },
            ].map((stat, i) => (
              <div key={i}>
                <Card variant="low" className="p-6 flex items-center gap-4 h-32">
                  <div className="p-3 bg-surface-highest text-primary">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{stat.label}</span>
                    <div className="font-headline text-2xl text-white">{stat.value}</div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </header>

      {viewMode === 'explorer' ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Recent Blocks */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-headline text-xl font-bold tracking-tight text-white flex items-center gap-2 uppercase">
                  <Grid className="text-primary w-5 h-5" /> BLOCOS RECENTES
                </h2>
                <span className="text-[10px] font-bold text-primary animate-pulse uppercase">LIVE</span>
              </div>
              
              <div className="space-y-4">
                {MOCK_BLOCKS.map((block, i) => (
                  <div key={i}>
                    <Card className="p-5 transition-all hover:bg-surface-high group cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                        <div className="bg-surface-highest px-3 py-1 text-xs font-headline font-bold text-white tracking-widest uppercase">{block.number}</div>
                        <span className="text-[10px] text-white/40 font-mono uppercase">{block.time}</span>
                      </div>
                      <div className="flex flex-col gap-1 mb-4">
                        <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Validador</span>
                        <span className="text-xs text-tertiary font-mono truncate">{block.validator}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-bold text-white/60 uppercase">
                        <span>{block.transactions} TRANSAÇÕES</span>
                        <span className="text-primary group-hover:translate-x-1 transition-transform">DETALHES →</span>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Batch Tracking & Transactions */}
            <div className="lg:col-span-8 space-y-8">
              <Card variant="low" border="left" className="p-8">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-4 max-w-md">
                    <div className="flex items-center gap-2">
                      <span className="bg-tertiary/20 text-tertiary text-[10px] font-black px-2 py-0.5 tracking-tighter uppercase">EM TRÂNSITO</span>
                      <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Lote ID: FUEL-992-K</span>
                    </div>
                    <h3 className="font-headline text-3xl font-black text-white leading-tight uppercase">RASTREAMENTO DE LOTE DE COMBUSTÍVEL</h3>
                    <p className="text-sm text-white/60">Verificação criptográfica de origem e integridade química via Smart Contract ID: <span className="text-tertiary font-mono">SC_002931</span></p>
                    <div className="flex gap-4 pt-4">
                      <div className="text-center bg-surface p-3 min-w-[80px]">
                        <div className="text-[10px] text-white/40 mb-1 uppercase">QUALIDADE</div>
                        <div className="text-primary font-headline font-bold uppercase">A++</div>
                      </div>
                      <div className="text-center bg-surface p-3 min-w-[80px]">
                        <div className="text-[10px] text-white/40 mb-1 uppercase">VOLUME</div>
                        <div className="text-white font-headline font-bold uppercase">45.2K L</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-grow bg-surface-container relative overflow-hidden h-48 md:h-auto border border-white/5">
                    <img 
                      src="https://picsum.photos/seed/industrial/600/400?grayscale" 
                      alt="Industrial" 
                      className="w-full h-full object-cover opacity-30 grayscale mix-blend-overlay"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                        <span className="text-[10px] font-bold text-white tracking-widest uppercase">LOCALIZAÇÃO ATUAL: HUB_CENTRAL_04</span>
                      </div>
                      <div className="w-full h-1 bg-white/10">
                        <div className="h-full bg-primary w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <section className="space-y-6">
                <h2 className="font-headline text-xl font-bold tracking-tight text-white flex items-center gap-2 uppercase">
                  <History className="text-primary w-5 h-5" /> TRANSAÇÕES IMUTÁVEIS
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-surface-high">
                      <tr>
                        <th className="px-4 py-3 text-[10px] font-bold text-white/40 uppercase tracking-widest">TX Hash</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-white/40 uppercase tracking-widest">Origem / Destino</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-white/40 uppercase tracking-widest">Valor</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-white/40 uppercase tracking-widest">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {MOCK_TRANSACTIONS.map((tx, i) => (
                        <tr key={i} className="hover:bg-surface-container transition-colors">
                          <td className="px-4 py-5">
                            <div className="flex items-center gap-2">
                              <Lock className="w-3 h-3 text-tertiary" />
                              <span className="text-xs font-mono text-tertiary uppercase">{tx.hash}</span>
                            </div>
                          </td>
                          <td className="px-4 py-5">
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] text-white/60 uppercase">{tx.origin}</span>
                              <span className="text-[10px] text-white/60 uppercase">→ {tx.destination}</span>
                            </div>
                          </td>
                          <td className="px-4 py-5">
                            <span className="text-xs font-bold text-white tracking-tighter uppercase">{tx.value}</span>
                          </td>
                          <td className="px-4 py-5">
                            <span className="bg-primary/10 text-primary border border-primary/30 text-[9px] px-2 py-0.5 font-black uppercase">
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>

          {/* Integrity Indicators */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Verified, title: 'Sha-256 Validated', desc: 'Criptografia de ponta a ponta garantindo que nenhum registro foi alterado desde sua gênese.' },
              { icon: Shield, title: 'Protocolo Zero Trust', desc: 'Cada transação requer validação de múltiplos nós independentes para persistência no ledger.' },
              { icon: History, title: 'Proof of Origin', desc: 'Histórico completo de cada lote de combustível, desde a extração até o consumidor final.' },
            ].map((item, i) => (
              <div key={i}>
                <Card className="p-6 border-t-2 border-white/5 flex gap-4">
                  <div className="text-primary">
                    <item.icon className="w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-white uppercase text-sm mb-2">{item.title}</h4>
                    <p className="text-[11px] text-white/40 leading-relaxed">{item.desc}</p>
                  </div>
                </Card>
              </div>
            ))}
          </section>
        </>
      ) : (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="text" 
                  placeholder="PROCURAR UTILIZADOR..." 
                  className="w-full bg-surface-low border border-white/5 text-xs font-headline tracking-widest focus:ring-1 focus:ring-primary text-white pl-10 py-3 uppercase"
                />
              </div>
              <Button variant="glass" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
            <Button variant="signal" onClick={() => handleOpenModal()}>
              <UserPlus className="w-4 h-4 mr-2" />
              NOVO UTILIZADOR
            </Button>
          </div>

          <Card variant="low" className="overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-surface-high">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">ID</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">Nome / Email</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">Nível de Acesso</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-white/40 uppercase tracking-widest text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-surface-container transition-colors group">
                    <td className="px-6 py-5">
                      <span className="text-xs font-mono text-primary font-bold">{user.id}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-headline font-bold text-white uppercase">{user.name}</span>
                        <span className="text-[10px] text-white/40 font-mono">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold tracking-widest uppercase ${user.role === 'ADMIN' ? 'bg-primary/20 text-primary' : 'bg-surface-highest text-white/60'}`}>
                        {user.role === 'ADMIN' ? <ShieldCheck className="w-3 h-3" /> : <User className="w-3 h-3" />}
                        {user.role}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'ACTIVE' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`}></div>
                        <span className={`text-[10px] font-bold tracking-widest uppercase ${user.status === 'ACTIVE' ? 'text-green-500' : 'text-red-500'}`}>
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpenModal(user)}
                          className="p-2 bg-surface-highest text-white/60 hover:text-primary transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setDeleteConfirmId(user.id)}
                          className="p-2 bg-surface-highest text-white/60 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-background/90 backdrop-blur-md">
          <Card variant="high" className="w-full max-w-sm p-8 border-t-4 border-red-600 shadow-2xl animate-in zoom-in duration-300">
            <div className="mb-6 text-center">
              <div className="w-16 h-16 bg-red-600/20 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-headline font-black text-white tracking-tight uppercase mb-2">
                REMOVER UTILIZADOR?
              </h2>
              <p className="text-white/40 text-[10px] tracking-widest uppercase">Esta ação irá revogar permanentemente o acesso deste operador ao ledger.</p>
            </div>
            <div className="flex gap-4">
              <Button variant="glass" className="flex-1" onClick={() => setDeleteConfirmId(null)}>
                CANCELAR
              </Button>
              <Button variant="signal" className="flex-1 bg-red-600 hover:bg-red-700 border-red-600" onClick={confirmDelete}>
                CONFIRMAR
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Admin Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <Card variant="high" className="w-full max-w-md p-8 border-t-4 border-primary shadow-2xl animate-in zoom-in duration-300">
            <div className="mb-8">
              <h2 className="text-2xl font-headline font-black text-white tracking-tight uppercase mb-2">
                {editingUser ? 'EDITAR UTILIZADOR' : 'NOVO UTILIZADOR'}
              </h2>
              <p className="text-white/40 text-[10px] tracking-widest uppercase">Configuração de acesso ao sistema de base de dados</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-headline font-bold text-white/40 tracking-widest uppercase">Nome Completo</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-surface-container border-b-2 border-outline-variant/30 focus:border-primary transition-all p-3 text-sm font-headline tracking-widest text-white focus:ring-0 uppercase"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-headline font-bold text-white/40 tracking-widest uppercase">Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-surface-container border-b-2 border-outline-variant/30 focus:border-primary transition-all p-3 text-sm font-headline tracking-widest text-white focus:ring-0"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-headline font-bold text-white/40 tracking-widest uppercase">Nível</label>
                  <select 
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as 'ADMIN' | 'OPERATOR' })}
                    className="w-full bg-surface-container border-b-2 border-outline-variant/30 focus:border-primary transition-all p-3 text-sm font-headline tracking-widest text-white focus:ring-0 appearance-none uppercase"
                  >
                    <option value="OPERATOR">OPERATOR</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-headline font-bold text-white/40 tracking-widest uppercase">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'ACTIVE' | 'SUSPENDED' })}
                    className="w-full bg-surface-container border-b-2 border-outline-variant/30 focus:border-primary transition-all p-3 text-sm font-headline tracking-widest text-white focus:ring-0 appearance-none uppercase"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" variant="glass" className="flex-1" onClick={() => setIsModalOpen(false)}>
                  CANCELAR
                </Button>
                <Button type="submit" variant="signal" className="flex-1">
                  {editingUser ? 'GUARDAR' : 'CRIAR'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};
