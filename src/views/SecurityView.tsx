import React, { useState, useEffect } from 'react';
import { ShieldCheck, UserPlus, Trash2, Edit2, Shield, User, Lock, MoreVertical, Search, Filter } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface UserData {
  id: string;
  operator_id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'OPERATOR';
  status: 'ACTIVE' | 'SUSPENDED';
  last_login: string;
}

export const SecurityView = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<Partial<UserData>>({
    name: '',
    email: '',
    role: 'OPERATOR',
    status: 'ACTIVE',
  });

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    fetchUsers();
    
    // Subscribe to real-time changes
    const subscription = supabase
      .channel('public:users')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, () => {
        fetchUsers();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isSupabaseConfigured()) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-headline font-black tracking-tighter text-white uppercase mb-2">
              SECURITY_<span className="text-primary">CORE</span>
            </h1>
            <p className="text-white/40 font-body text-sm tracking-widest uppercase">
              Administração de Utilizadores e Protocolos de Acesso
            </p>
          </div>
        </div>
        <Card variant="high" className="p-12 text-center border-t-4 border-primary">
          <Shield className="w-16 h-16 text-primary/40 mx-auto mb-6" />
          <h2 className="text-2xl font-headline font-black text-white uppercase mb-4">Configuração Necessária</h2>
          <p className="text-white/60 max-w-md mx-auto mb-8 uppercase tracking-widest text-xs leading-relaxed">
            O sistema de gestão de utilizadores requer uma ligação ao Supabase. 
            Por favor, configure as variáveis de ambiente <code className="text-primary">VITE_SUPABASE_URL</code> e <code className="text-primary">VITE_SUPABASE_ANON_KEY</code> nas definições do projeto.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-highest text-[10px] font-bold text-white/40 tracking-widest uppercase">
            <Lock className="w-3 h-3" />
            Acesso Restrito até Configuração
          </div>
        </Card>
      </div>
    );
  }

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        const { error } = await supabase
          .from('users')
          .update({
            name: formData.name,
            email: formData.email,
            role: formData.role,
            status: formData.status,
          })
          .eq('id', editingUser.id);
        
        if (error) throw error;
      } else {
        const operatorId = `OP_CORE_${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
        const { error } = await supabase
          .from('users')
          .insert([{
            operator_id: operatorId,
            name: formData.name,
            email: formData.email,
            role: formData.role,
            status: formData.status,
          }]);
        
        if (error) throw error;
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Erro ao guardar utilizador. Verifique as permissões.');
    }
  };

  const confirmDelete = async () => {
    if (deleteConfirmId) {
      try {
        const { error } = await supabase
          .from('users')
          .delete()
          .eq('id', deleteConfirmId);
        
        if (error) throw error;
        setDeleteConfirmId(null);
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Erro ao eliminar utilizador.');
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-headline font-black tracking-tighter text-white uppercase mb-2">
            SECURITY_<span className="text-primary">CORE</span>
          </h1>
          <p className="text-white/40 font-body text-sm tracking-widest uppercase">
            Administração de Utilizadores e Protocolos de Acesso
          </p>
        </div>
        <Button variant="signal" size="lg" onClick={() => handleOpenModal()}>
          <UserPlus className="w-5 h-5 mr-2" />
          ADICIONAR OPERADOR
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Utilizadores', value: users.length, icon: User, color: 'text-white' },
          { label: 'Administradores', value: users.filter(u => u.role === 'ADMIN').length, icon: Shield, color: 'text-primary' },
          { label: 'Sessões Ativas', value: '12', icon: Lock, color: 'text-tertiary' },
          { label: 'Alertas Segurança', value: '0', icon: ShieldCheck, color: 'text-green-500' },
        ].map((stat, i) => (
          <div key={i}>
            <Card variant="low" className="p-6 flex items-center gap-4">
              <div className={`p-3 bg-surface-highest ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/40 tracking-widest uppercase">{stat.label}</p>
                <p className="text-2xl font-headline font-black text-white">{stat.value}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <Card variant="low" className="overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-surface-container/30">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="text" 
                placeholder="PROCURAR OPERADOR..." 
                className="w-full bg-surface-highest border-none text-xs font-headline tracking-widest focus:ring-1 focus:ring-primary text-white pl-10 py-2 uppercase"
              />
            </div>
            <button className="p-2 bg-surface-highest text-white/40 hover:text-white transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-2">
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Filtrar por:</span>
            <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">Todos</button>
            <button className="text-[10px] font-bold text-white/40 uppercase tracking-widest hover:underline">Admin</button>
            <button className="text-[10px] font-bold text-white/40 uppercase tracking-widest hover:underline">Ativos</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-highest/50">
                <th className="px-6 py-4 text-[10px] font-bold text-white/40 tracking-widest uppercase">ID_OPERADOR</th>
                <th className="px-6 py-4 text-[10px] font-bold text-white/40 tracking-widest uppercase">NOME / EMAIL</th>
                <th className="px-6 py-4 text-[10px] font-bold text-white/40 tracking-widest uppercase">NÍVEL_ACESSO</th>
                <th className="px-6 py-4 text-[10px] font-bold text-white/40 tracking-widest uppercase">STATUS</th>
                <th className="px-6 py-4 text-[10px] font-bold text-white/40 tracking-widest uppercase">ÚLTIMO_LOGIN</th>
                <th className="px-6 py-4 text-[10px] font-bold text-white/40 tracking-widest uppercase text-right">AÇÕES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono text-primary font-bold">{user.operator_id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-headline font-bold text-white uppercase">{user.name}</span>
                      <span className="text-[10px] text-white/40 font-mono">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold tracking-widest uppercase ${user.role === 'ADMIN' ? 'bg-primary/20 text-primary' : 'bg-surface-highest text-white/60'}`}>
                      {user.role === 'ADMIN' ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                      {user.role}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'ACTIVE' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`}></div>
                      <span className={`text-[10px] font-bold tracking-widest uppercase ${user.status === 'ACTIVE' ? 'text-green-500' : 'text-red-500'}`}>
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-mono text-white/40 uppercase">
                        {user.last_login ? new Date(user.last_login).toLocaleString() : 'NEVER'}
                      </span>
                  </td>
                  <td className="px-6 py-4 text-right">
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
                      <button className="p-2 bg-surface-highest text-white/60 hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-background/90 backdrop-blur-md">
          <Card variant="high" className="w-full max-w-sm p-8 border-t-4 border-red-600 shadow-2xl animate-in zoom-in duration-300">
            <div className="mb-6 text-center">
              <div className="w-16 h-16 bg-red-600/20 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-headline font-black text-white tracking-tight uppercase mb-2">
                REMOVER OPERADOR?
              </h2>
              <p className="text-white/40 text-[10px] tracking-widest uppercase">Esta ação é irreversível e revogará todos os privilégios de acesso.</p>
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

      {/* User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <Card variant="high" className="w-full max-w-md p-8 border-t-4 border-primary shadow-2xl animate-in zoom-in duration-300">
            <div className="mb-8">
              <h2 className="text-2xl font-headline font-black text-white tracking-tight uppercase mb-2">
                {editingUser ? 'EDITAR OPERADOR' : 'NOVO OPERADOR'}
              </h2>
              <p className="text-white/40 text-[10px] tracking-widest uppercase">Configuração de credenciais e nível de acesso</p>
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
                  placeholder="EX: JOÃO SILVA"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-headline font-bold text-white/40 tracking-widest uppercase">Email Corporativo</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-surface-container border-b-2 border-outline-variant/30 focus:border-primary transition-all p-3 text-sm font-headline tracking-widest text-white focus:ring-0"
                  placeholder="EX: SILVA.J@KINETIC.IO"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-headline font-bold text-white/40 tracking-widest uppercase">Nível de Acesso</label>
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
                  <label className="text-[10px] font-headline font-bold text-white/40 tracking-widest uppercase">Status Inicial</label>
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
                <Button type="button" variant="glass" className="flex-1" onClick={handleCloseModal}>
                  CANCELAR
                </Button>
                <Button type="submit" variant="signal" className="flex-1">
                  {editingUser ? 'GUARDAR ALTERAÇÕES' : 'CONFIRMAR REGISTO'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};
