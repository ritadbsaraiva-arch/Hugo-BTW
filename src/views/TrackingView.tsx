import { Thermometer, Gauge, Factory, Truck, Fuel, Verified, Shield, History, Download, Share2, Network } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const data = [
  { value: 20 }, { value: 25 }, { value: 22 }, { value: 30 }, 
  { value: 28 }, { value: 35 }, { value: 32 }, { value: 40 },
  { value: 38 }, { value: 45 }, { value: 42 }, { value: 50 }
];

export const TrackingView = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-headline font-black tracking-tighter text-white uppercase mb-2">
            Lote_ID: <span className="text-primary">BR-PETRO-299X</span>
          </h1>
          <p className="text-white/40 font-body text-sm tracking-widest uppercase">
            Rastreamento de Ativos em Tempo Real // Refinaria Duque de Caxias
          </p>
        </div>
        <div className="text-right">
          <div className="inline-block bg-primary text-white px-4 py-1 font-headline font-bold text-xs mb-2 uppercase">
            STATUS: EM TRÂNSITO
          </div>
          <div className="text-white/40 font-headline text-xs uppercase">
            ÚLTIMA ATUALIZAÇÃO: 14:22:09 UTC
          </div>
        </div>
      </div>

      {/* Map and Telemetry */}
      <div className="grid grid-cols-12 gap-8">
        <Card variant="low" className="col-span-12 lg:col-span-8 h-[500px] group">
          <div className="absolute inset-0 grayscale opacity-60 mix-blend-overlay">
            <img 
              src="https://picsum.photos/seed/map/1200/800?grayscale" 
              alt="Map" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* HUD Overlay */}
          <div className="absolute inset-0 pointer-events-none border-[16px] border-surface-low"></div>
          
          {/* Floating HUD Labels */}
          <div className="absolute top-10 left-10 glass-hud p-4 border-l-4 border-primary">
            <div className="text-[10px] text-primary font-bold tracking-widest mb-1 uppercase">ORIGEM</div>
            <div className="text-sm font-headline font-bold text-white uppercase">REFINARIA REDUC-01</div>
            <div className="text-[10px] text-white/40 font-mono mt-1 uppercase">LAT: -22.7161 / LON: -43.2798</div>
          </div>
          
          <div className="absolute bottom-10 right-10 glass-hud p-4 border-r-4 border-tertiary">
            <div className="text-[10px] text-tertiary font-bold tracking-widest mb-1 uppercase">DESTINO</div>
            <div className="text-sm font-headline font-bold text-white uppercase">HUB DISTRIBUIÇÃO ZONA SUL</div>
            <div className="text-[10px] text-white/40 font-mono mt-1 uppercase">ETA: 04H 22M</div>
          </div>

          {/* Animated Route Simulation */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path 
              d="M 200 400 L 400 300 L 600 350 L 800 200" 
              fill="none" 
              stroke="#D32F2F" 
              strokeDasharray="10 5" 
              strokeWidth="3"
              className="animate-[dash_20s_linear_infinite]"
            />
            <circle cx="200" cy="400" r="6" fill="#D32F2F" />
            <circle cx="800" cy="200" r="8" fill="#D32F2F" className="animate-pulse" />
          </svg>
        </Card>

        <div className="grid col-span-12 lg:col-span-4 grid-rows-2 gap-8">
          <Card border="left" borderColor="primary" className="p-6">
            <div className="flex justify-between items-start mb-6">
              <Thermometer className="text-primary w-6 h-6" />
              <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">Telemetry_01</span>
            </div>
            <div className="text-4xl font-headline font-black text-white mb-1">24.5°C</div>
            <div className="text-[10px] text-white/40 tracking-widest uppercase mb-4">Temperatura Interna Tanque</div>
            <div className="w-full h-12 bg-surface-low relative overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <Area type="monotone" dataKey="value" stroke="#D32F2F" fill="#D32F2F" fillOpacity={0.2} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card border="left" borderColor="tertiary" className="p-6">
            <div className="flex justify-between items-start mb-6">
              <Gauge className="text-tertiary w-6 h-6" />
              <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">Telemetry_02</span>
            </div>
            <div className="text-4xl font-headline font-black text-white mb-1">62.8 <span className="text-lg">km/h</span></div>
            <div className="text-[10px] text-white/40 tracking-widest uppercase mb-4">Velocidade Vetorial Média</div>
            <div className="grid grid-cols-5 gap-1">
              <div className="h-2 bg-primary"></div>
              <div className="h-2 bg-primary"></div>
              <div className="h-2 bg-primary"></div>
              <div className="h-2 bg-surface-highest"></div>
              <div className="h-2 bg-surface-highest"></div>
            </div>
          </Card>
        </div>
      </div>

      {/* Timeline */}
      <Card variant="low" className="p-10">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-grow bg-outline-variant/30"></div>
          <h2 className="text-2xl font-headline font-black text-white tracking-widest uppercase">Linha Temporal da Cadeia</h2>
          <div className="h-px flex-grow bg-outline-variant/30"></div>
        </div>

        <div className="relative space-y-16">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-outline-variant/30"></div>
          
          {/* Step 1 */}
          <div className="relative flex gap-12">
            <div className="z-10 w-16 h-16 flex items-center justify-center bg-primary text-white shrink-0">
              <Factory className="w-8 h-8" />
            </div>
            <div className="flex-grow pt-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-headline font-bold text-white uppercase tracking-tight">Produção e Refino</h3>
                <span className="bg-white/10 text-white/60 px-3 py-1 text-[10px] font-bold tracking-widest uppercase">FINALIZADO 08/10 06:45</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-4">
                  <div className="text-[10px] uppercase tracking-widest text-primary mb-1">Qualidade</div>
                  <div className="text-white font-medium">99.2% Pureza (S10)</div>
                </Card>
                <Card className="p-4">
                  <div className="text-[10px] uppercase tracking-widest text-primary mb-1">Operador</div>
                  <div className="text-white font-medium">UNIT_REDUC_44</div>
                </Card>
                <Card className="p-4">
                  <div className="text-[10px] uppercase tracking-widest text-primary mb-1">Hash Bloco</div>
                  <div className="text-[10px] font-mono break-all text-white/40">0x8a2f...11ce</div>
                </Card>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative flex gap-12">
            <div className="z-10 w-16 h-16 flex items-center justify-center bg-white text-primary shrink-0 outline outline-4 outline-primary/20">
              <Truck className="w-8 h-8 animate-pulse" />
            </div>
            <div className="flex-grow pt-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-headline font-bold text-white uppercase tracking-tight">Logística Rodoviária</h3>
                <span className="bg-primary text-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase">ATIVO EM TRÂNSITO</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="high" border="left" className="p-4">
                  <div className="text-[10px] uppercase tracking-widest text-primary mb-1">Frota</div>
                  <div className="text-white font-medium">VOLVO FH-540 [KNT-8822]</div>
                </Card>
                <Card variant="high" border="left" className="p-4">
                  <div className="text-[10px] uppercase tracking-widest text-primary mb-1">Trajeto</div>
                  <div className="text-white font-medium">BR-040 KM 114 (NORTE)</div>
                </Card>
                <Card variant="high" border="left" className="p-4">
                  <div className="text-[10px] uppercase tracking-widest text-primary mb-1">Volume</div>
                  <div className="text-white font-medium">45,000 Litros</div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Bottom Section */}
      <div className="grid grid-cols-12 gap-8">
        <Card className="col-span-12 lg:col-span-4 p-8">
          <h3 className="text-sm font-headline font-black text-white tracking-widest uppercase mb-6 flex items-center gap-2">
            <Verified className="text-tertiary w-4 h-4" /> Log de Integridade
          </h3>
          <div className="space-y-4 font-body text-[11px] uppercase tracking-wider text-white/60">
            {[
              { label: 'Lacre Eletrônico L-44', value: 'INTACTO', color: 'text-primary' },
              { label: 'Pressão Atmosférica', value: 'ESTÁVEL', color: 'text-white' },
              { label: 'GPS Anti-Jamming', value: 'ONLINE', color: 'text-primary' },
              { label: 'Assinatura Digital', value: 'VERIFICADA', color: 'text-white' },
              { label: 'Peso Bruto Total', value: '52.4t', color: 'text-white' },
            ].map((item, i) => (
              <div key={i} className="flex justify-between border-b border-outline-variant/30 pb-2">
                <span>{item.label}</span>
                <span className={item.color}>{item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-8 signal-gradient p-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="text-xs font-bold text-white/70 tracking-widest uppercase mb-1">Relatório Consolidado</div>
            <div className="text-2xl font-headline font-black text-white uppercase">Cadeia de Custódia 100% Auditável</div>
          </div>
          <div className="flex gap-4">
            <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Download className="w-4 h-4 mr-2" /> BAIXAR MANIFESTO PDF
            </Button>
            <Button variant="secondary" className="bg-surface-low text-white">
              <Share2 className="w-4 h-4 mr-2" /> COMPARTILHAR ACESSO
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
