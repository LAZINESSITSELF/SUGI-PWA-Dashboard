import { useMemo, useState } from 'react';
import { Link, Navigate, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  AlertTriangle,
  Bell,
  ChevronRight,
  Download,
  Edit2,
  MessageCircle,
  Moon,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Sun,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { bottomNav, dashboardFeatures, operationFeatures } from './data/features';
import { alerts, cycles, dataRegistry, foodSecurityData, kpis, sales, users } from './data/mockData';
import { formatCurrency } from './lib/api';

function Card({ children, className = '' }) {
  return <section className={`soft-card animate-slide-up ${className}`}>{children}</section>;
}

function MetricCard({ item }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-muted/70">{item.label}</p>
          <p className="mt-2 text-2xl font-black tracking-tight text-foreground">{item.value}</p>
          <p className="mt-1 text-[11px] font-bold text-muted/70">{item.helper}</p>
        </div>
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-black text-primary">
          {item.trend}
        </span>
      </div>
    </Card>
  );
}

function formatValue(value) {
  if (value === null || value === undefined || value === '') return '-';
  if (typeof value === 'number') return value.toLocaleString('id-ID');
  return String(value);
}

function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between gap-4 px-1">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-primary/70">SUGI Mobile</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="mt-1 max-w-[18rem] text-xs font-bold leading-relaxed text-muted/70">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function MiniBarChart({ data, xKey, yKey, barKeys, colors = ['#10b981', '#0ea5e9'] }) {
  const keys = barKeys || [yKey];
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 4, left: -22, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey={xKey} tickLine={false} axisLine={false} fontSize={10} stroke="var(--color-muted)" />
          <YAxis tickLine={false} axisLine={false} fontSize={10} stroke="var(--color-muted)" />
          <Tooltip contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 16 }} />
          <Legend wrapperStyle={{ fontSize: 10, fontWeight: 800 }} />
          {keys.map((key, index) => (
            <Bar key={key} dataKey={key} fill={colors[index % colors.length]} radius={[8, 8, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function MiniAreaChart({ data, xKey, yKey, color = '#10b981' }) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
          <defs>
            <linearGradient id="area-primary" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.35} />
              <stop offset="95%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey={xKey} tickLine={false} axisLine={false} fontSize={10} stroke="var(--color-muted)" />
          <YAxis tickLine={false} axisLine={false} fontSize={10} stroke="var(--color-muted)" />
          <Tooltip contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 16 }} />
          <Area dataKey={yKey} type="monotone" stroke={color} strokeWidth={3} fill="url(#area-primary)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function MiniPieChart({ data, nameKey, dataKey }) {
  const colors = ['#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#f43f5e', '#14b8a6'];

  return (
    <div className="h-60 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey={dataKey} nameKey={nameKey} innerRadius={48} outerRadius={82} paddingAngle={4} stroke="none">
            {data.map((entry, index) => (
              <Cell key={entry[nameKey]} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 16 }} />
          <Legend wrapperStyle={{ fontSize: 10, fontWeight: 800 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function ChartCard({ title, subtitle, children }) {
  return (
    <Card className="p-5">
      <div className="mb-4">
        <h2 className="text-sm font-black uppercase tracking-wider">{title}</h2>
        {subtitle && <p className="mt-1 text-xs font-bold leading-relaxed text-muted/70">{subtitle}</p>}
      </div>
      {children}
    </Card>
  );
}

function MobileTable({ title, subtitle, columns, data, limit = 6, actions = false }) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    if (!query) return data;
    return data.filter((row) => Object.values(row).some((value) => String(value ?? '').toLowerCase().includes(query.toLowerCase())));
  }, [data, query]);

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-black uppercase tracking-wider">{title}</h2>
          {subtitle && <p className="mt-1 text-xs font-bold text-muted/70">{subtitle}</p>}
        </div>
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-black text-primary">{filtered.length}</span>
      </div>
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari data..."
          className="w-full rounded-2xl border border-border bg-background/60 py-3 pl-10 pr-4 text-sm font-bold outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
        />
      </div>
      <div className="flex flex-col gap-3">
        {filtered.slice(0, limit).map((row, rowIndex) => {
          const primary = columns.find((col) => col.accessor !== 'no') || columns[0];
          return (
            <div key={rowIndex} className="rounded-[1.35rem] border border-border/60 bg-background/35 p-4">
              <div className="mb-3 flex items-start justify-between gap-3">
                <p className="text-sm font-black leading-snug">{formatValue(row[primary.accessor])}</p>
                {actions && (
                  <div className="flex items-center gap-1">
                    <button className="rounded-xl bg-primary/10 p-2 text-primary"><Edit2 className="h-3.5 w-3.5" /></button>
                    <button className="rounded-xl bg-rose-500/10 p-2 text-rose-500"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {columns.filter((col) => col.accessor !== primary.accessor).slice(0, 6).map((col) => (
                  <div key={col.accessor} className="min-w-0">
                    <p className="truncate text-[9px] font-black uppercase tracking-wider text-muted/50">{col.header}</p>
                    <p className="mt-0.5 truncate text-xs font-bold text-foreground/80">{formatValue(row[col.accessor])}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <p className="py-8 text-center text-xs font-bold italic text-muted">Tidak ada data ditemukan.</p>}
      </div>
    </Card>
  );
}

function ActionSheet({ title, isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-background/65 px-4 pb-4 backdrop-blur-xl">
      <div className="w-full max-w-md rounded-[2rem] border border-border/50 bg-surface p-5 shadow-[0_30px_80px_-25px_rgba(15,23,42,0.45)] animate-scale-in">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-black tracking-tight">{title}</h2>
          <button onClick={onClose} className="rounded-2xl border border-border bg-background p-2 text-muted"><X className="h-4 w-4" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ChatBotSheet({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Halo, saya asisten SUGI. Saya bisa bantu baca ringkasan harga, PoU, siklus tanam, penjualan, atau master data.',
    },
    {
      role: 'bot',
      text: 'Coba tanya: "provinsi harga GKP tertinggi?" atau "apa insight pemerintah hari ini?"',
    },
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  function sendMessage(text = input) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { role: 'user', text: trimmed },
      { role: 'bot', text: getBotReply(trimmed) },
    ]);
    setInput('');
  }

  return (
    <div className="fixed inset-0 z-[85] flex items-end justify-center bg-background/65 px-4 pb-4 backdrop-blur-xl">
      <div className="flex max-h-[82vh] w-full max-w-md flex-col overflow-hidden rounded-[2rem] border border-border/50 bg-surface shadow-[0_30px_80px_-25px_rgba(15,23,42,0.45)] animate-scale-in">
        <div className="border-b border-border/40 p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight">SUGI Chatbot</h2>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted/60">Food intelligence assistant</p>
              </div>
            </div>
            <button onClick={onClose} className="rounded-2xl border border-border bg-background p-2 text-muted">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex flex-col gap-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[86%] rounded-[1.35rem] px-4 py-3 text-sm font-semibold leading-relaxed ${
                  message.role === 'user'
                    ? 'ml-auto bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-background/70 text-foreground border border-border/50'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {['Harga GKP tertinggi', 'Insight pemerintah', 'Status siklus', 'Data CPPD'].map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                className="rounded-full bg-primary/10 px-3 py-2 text-[10px] font-black text-primary"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <form
          className="border-t border-border/40 p-4"
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage();
          }}
        >
          <div className="flex items-center gap-2 rounded-[1.5rem] border border-border bg-background/70 p-2">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Tanya tentang data SUGI..."
              className="min-w-0 flex-1 bg-transparent px-3 text-sm font-bold outline-none placeholder:text-muted/45"
            />
            <button className="rounded-2xl bg-primary px-4 py-3 text-xs font-black uppercase tracking-wider text-white">
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function getBotReply(prompt) {
  const text = prompt.toLowerCase();
  if (text.includes('gkp') || text.includes('harga')) {
    const highest = foodSecurityData.hargaProdusenProv
      .filter((row) => row.harga !== null)
      .sort((a, b) => b.harga - a.harga)[0];
    return `Harga GKP produsen tertinggi di data saat ini adalah ${highest.provinsi}, sekitar ${formatCurrency(highest.harga)} per kg.`;
  }
  if (text.includes('pemerintah') || text.includes('pou') || text.includes('cppd')) {
    return 'Insight pemerintah: PoU perlu dipantau bersama proyeksi neraca dan CPPD. Wilayah dengan cadangan rendah sebaiknya diprioritaskan untuk intervensi.';
  }
  if (text.includes('siklus') || text.includes('panen')) {
    return 'Status siklus aktif: ada blok di fase Perawatan, Penanaman, dan Panen. Blok panen dengan progress 91% paling dekat untuk tindak lanjut.';
  }
  return 'Saya bisa bantu menjelaskan dashboard petani, pemerintah, manajemen, operasi, dan master data. Untuk integrasi berikutnya, respons ini bisa disambungkan ke API chatbot sungguhan.';
}

function Login({ onLogin }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function submit(event) {
    event.preventDefault();
    if (!username || !password) {
      setError('Username dan password wajib diisi.');
      return;
    }
    localStorage.setItem('sugi-mobile-auth', 'true');
    onLogin(true);
    navigate('/app');
  }

  return (
    <main className="flex min-h-screen flex-col justify-center px-5 py-8">
      <div className="mx-auto w-full max-w-sm animate-fade-in">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-primary text-3xl font-black text-white shadow-xl shadow-primary/25">
            S
          </div>
          <h1 className="text-3xl font-black tracking-tight text-primary">SUGI<span className="text-foreground">Mobile</span></h1>
          <p className="mt-2 text-sm font-bold text-muted/70">Food security intelligence, dibuat pas di genggaman.</p>
        </div>

        <Card className="p-6">
          <form className="flex flex-col gap-4" onSubmit={submit}>
            <label className="flex flex-col gap-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-muted/70">Username</span>
              <input value={username} onChange={(e) => setUsername(e.target.value)} className="rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm font-bold outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-muted/70">Password</span>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm font-bold outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" />
            </label>
            {error && <p className="text-xs font-bold text-rose-500">{error}</p>}
            <button className="mt-2 rounded-2xl bg-primary px-4 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-primary/25 transition active:scale-[0.98]">
              Masuk
            </button>
          </form>
        </Card>
      </div>
    </main>
  );
}

function Shell({ dark, toggleDark, onLogout }) {
  const location = useLocation();
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col pb-24">
      <header className="safe-top sticky top-0 z-30 px-4 pb-3">
        <div className="glass-panel flex h-16 items-center justify-between rounded-[1.5rem] px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-lg font-black text-white shadow-lg shadow-primary/25">S</div>
            <div>
              <p className="text-sm font-black leading-none tracking-tight">SUGI Mobile</p>
              <p className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-muted/60">Operational PWA</p>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-2xl border border-border/60 bg-background/50 p-1">
            <button onClick={toggleDark} className="rounded-xl p-2 text-muted transition hover:text-primary" aria-label="Toggle theme">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button onClick={onLogout} className="rounded-xl p-2 text-muted transition hover:text-rose-500" aria-label="Logout">
              <ShieldCheck className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 pt-2">
        <Routes>
          <Route index element={<Home />} />
          <Route path="analytics" element={<AnalyticsHub />} />
          <Route path="farmer" element={<Analytics type="farmer" />} />
          <Route path="government" element={<Analytics type="government" />} />
          <Route path="management" element={<Management />} />
          <Route path="operations" element={<Operations />} />
          <Route path="data" element={<MasterData />} />
          <Route path="data/:slug" element={<MasterDataDetail />} />
          <Route path="*" element={<Navigate to="/app" replace />} />
        </Routes>
      </main>

      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-28 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-[1.35rem] bg-primary text-white shadow-2xl shadow-primary/35 transition active:scale-95"
        aria-label="Buka chatbot"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      <ChatBotSheet isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md px-4">
        <div className="glass-panel grid grid-cols-4 rounded-[1.75rem] p-2">
          {bottomNav.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path || (item.path !== '/app' && location.pathname.startsWith(item.path));
            return (
              <NavLink key={item.path} to={item.path} className={`flex flex-col items-center gap-1 rounded-[1.2rem] px-2 py-2.5 text-[10px] font-black transition ${active ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'text-muted hover:bg-primary/5 hover:text-primary'}`}>
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function Home() {
  return (
    <div className="flex flex-col gap-6 pb-6">
      <PageHeader
        title="Ringkasan lapangan"
        subtitle="Snapshot pangan, harga, operasi tani, dan data nasional hari ini."
        action={<button className="rounded-2xl bg-primary/10 p-3 text-primary"><Bell className="h-5 w-5" /></button>}
      />

      <div className="grid grid-cols-2 gap-3">
        {kpis.map((item) => <MetricCard key={item.label} item={item} />)}
      </div>

      <div className="grid gap-3">
        {dashboardFeatures.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.id} to={item.path} className="soft-card flex items-center gap-4 p-4 transition active:scale-[0.99]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-black tracking-tight">{item.label}</p>
                <p className="mt-0.5 text-xs font-bold text-muted/70">{item.helper}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted/50" />
            </NavLink>
          );
        })}
      </div>

      <Card className="border-primary/20 bg-primary/[0.03] p-5">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-primary/10 p-3 text-primary">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-black">Insight cepat</h2>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-muted/80">
              Harga GKP relatif stabil, tapi beberapa wilayah butuh perhatian pada UM assignment dan estimasi panen 10 hari ke depan.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Analytics({ type, embedded = false }) {
  const isGovernment = type === 'government';
  const mapRows = isGovernment ? foodSecurityData.pouProvinsi : foodSecurityData.hargaProdusenProv.filter((row) => row.harga !== null);
  return (
    <div className={`flex flex-col gap-5 pb-6 ${embedded ? '' : 'animate-fade-in'}`}>
      <PageHeader
        title={isGovernment ? 'Dashboard pemerintah' : 'Dashboard petani'}
        subtitle={isGovernment ? 'PoU, neraca, cadangan, dan intervensi pangan.' : 'Harga produsen, tren pasar, dan stabilitas wilayah.'}
        action={<button className="rounded-2xl border border-border bg-surface p-3 text-primary"><RefreshCw className="h-5 w-5" /></button>}
      />

      {!isGovernment && (
        <div className="grid grid-cols-1 gap-3">
          {[
            { label: 'Harga GKP Nasional', value: 'Rp 4,889', sub: '/Kg' },
            { label: 'Target Paling Stabil', value: 'DI Yogyakarta', sub: 'CV 3.20%' },
            { label: 'Komoditas Utama', value: 'Beras Premium', sub: 'Jan 2026' },
          ].map((item) => (
            <MetricCard key={item.label} item={{ label: item.label, value: item.value, helper: item.sub, trend: 'Aktif' }} />
          ))}
        </div>
      )}

      <Card className="overflow-hidden p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider">Peta indikator pangan & harga</h2>
            <p className="mt-1 text-xs font-bold text-muted/70">
              {isGovernment ? 'Peta mobile PoU per provinsi' : 'Peta mobile harga GKP tingkat produsen'}
            </p>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black text-primary">{isGovernment ? 'PoU' : 'Rp'}</span>
        </div>
        <div className="rounded-[1.5rem] border border-border/60 bg-primary/[0.04] p-4">
          <div className="grid grid-cols-2 gap-2">
            {mapRows.slice(0, 8).map((row) => {
              const label = row.provinsi;
              const value = isGovernment ? `${row.pou}%` : formatCurrency(row.harga);
              return (
                <div key={label} className="rounded-2xl bg-surface/75 p-3">
                  <p className="truncate text-[10px] font-black uppercase tracking-wider text-muted/60">{label}</p>
                  <p className="mt-1 text-sm font-black text-primary">{value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      <Card className="border-primary/20 bg-primary/[0.03] p-5">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-primary/10 p-3 text-primary">
            <Bell className="h-5 w-5" />
          </div>
          <p className="text-sm font-semibold leading-relaxed text-muted/85">
            {isGovernment
              ? 'Sistem mendeteksi potensi defisit neraca di beberapa wilayah. Gerakan Pangan Murah dan distribusi CPPD perlu dipantau untuk wilayah rentan.'
              : 'Harga GKP beberapa provinsi produsen menunjukkan fluktuasi positif. Pantau harga konsumen nasional dan regional untuk posisi tawar terbaik.'}
          </p>
        </div>
      </Card>

      {isGovernment ? (
        <>
          <ChartCard title="1. Trend Ketidakcukupan Konsumsi Nasional (PoU %)" subtitle="Sumber: BPS">
            <MiniAreaChart data={foodSecurityData.pouNasional} xKey="tahun" yKey="pou" color="#ef4444" />
          </ChartCard>
          <ChartCard title="2. Proyeksi Neraca Beras Nasional 2026 (Ton)" subtitle="Ketersediaan dibanding kebutuhan">
            <MiniBarChart data={foodSecurityData.proyeksiNeraca} xKey="bulan" barKeys={['ketersediaan', 'kebutuhan']} colors={['#10b981', '#6366f1']} />
          </ChartCard>
          <ChartCard title="3. Skor Pola Pangan Harapan Nasional" subtitle="Mutu dan keragaman konsumsi pangan">
            <MiniAreaChart data={foodSecurityData.skorPPH} xKey="tahun" yKey="skor" color="#0ea5e9" />
          </ChartCard>
          <ChartCard title="4. Indeks Konsumsi per Jenis Pangan" subtitle="Komposisi konsumsi masyarakat">
            <MiniPieChart data={foodSecurityData.konsumsiPangan} nameKey="komoditas" dataKey="nilai" />
          </ChartCard>
          <ChartCard title="5. Jumlah Pangan Terselamatkan (Kg) 2026" subtitle="Food waste/loss yang terselamatkan">
            <MiniBarChart data={foodSecurityData.panganTerselamatkan} xKey="bulan" yKey="kg" colors={['#8b5cf6']} />
          </ChartCard>
          <MobileTable title="Data Ketidakcukupan Konsumsi Nasional" columns={[
            { header: 'Tahun', accessor: 'tahun' },
            { header: 'PoU (%)', accessor: 'pou' },
            { header: 'Undernourished', accessor: 'undernourish' },
          ]} data={foodSecurityData.pouNasional} />
          <MobileTable title="Daftar Cadangan Pangan Pemerintah Daerah (CPPD)" columns={[
            { header: 'Wilayah', accessor: 'wilayah' },
            { header: 'Cadangan (Ton)', accessor: 'ton' },
          ]} data={foodSecurityData.cppdProvinsi} />
          <MobileTable title="Realisasi Gerakan Pangan Murah (2026)" columns={[
            { header: 'Wilayah', accessor: 'provinsi' },
            { header: 'Kab/Kota', accessor: 'kab_kota' },
            { header: 'Jumlah Implementasi', accessor: 'jumlah' },
          ]} data={foodSecurityData.gerakanPanganMurah} />
          <MobileTable title="Penyaluran Donasi Pangan (2024)" columns={[
            { header: 'Bulan', accessor: 'bulan' },
            { header: 'Donasi (Kg)', accessor: 'donasi_kg' },
            { header: 'Penerima Manfaat', accessor: 'penerima' },
          ]} data={foodSecurityData.donasiPangan} />
        </>
      ) : (
        <>
          <ChartCard title="1. Rata-rata Harga Produsen Nasional (Rp/Kg)" subtitle="Panel Harga Bapanas">
            <MiniBarChart data={foodSecurityData.hargaProdusenNasional} xKey="komoditas" yKey="harga" colors={['#10b981']} />
          </ChartCard>
          <ChartCard title="2. Harga Konsumen Nasional vs Produsen" subtitle="Komoditas utama tingkat ritel">
            <MiniBarChart data={foodSecurityData.hargaKonsumenNasional} xKey="komoditas" yKey="harga" colors={['#f59e0b']} />
          </ChartCard>
          <ChartCard title="3. Stabilitas Harga (Koefisien Variasi %)" subtitle="Semakin kecil semakin stabil">
            <MiniBarChart data={foodSecurityData.koefisienVariasi.filter((row) => row.cv !== null)} xKey="provinsi" yKey="cv" colors={['#0ea5e9']} />
          </ChartCard>
          <ChartCard title="4. Harga Konsumen Provinsi (Beras Premium)" subtitle="Harga pengecer tiap provinsi">
            <MiniAreaChart data={foodSecurityData.hargaKonsumenProv} xKey="provinsi" yKey="harga" color="#ef4444" />
          </ChartCard>
          <ChartCard title="5. Harga Produsen (GKP) Provinsi" subtitle="Sentra produksi">
            <MiniBarChart data={foodSecurityData.hargaProdusenProv.filter((row) => row.harga !== null)} xKey="provinsi" yKey="harga" colors={['#8b5cf6']} />
          </ChartCard>
          <ChartCard title="6. Proyeksi Neraca Beras Nasional 2026 (Ton)" subtitle="Ketersediaan vs kebutuhan">
            <MiniBarChart data={foodSecurityData.proyeksiNeraca} xKey="bulan" barKeys={['ketersediaan', 'kebutuhan']} colors={['#14b8a6', '#f43f5e']} />
          </ChartCard>
          <MobileTable title="Daftar Harga GKP per Provinsi" columns={[
            { header: 'Provinsi', accessor: 'provinsi' },
            { header: 'Komoditas', accessor: 'komoditas' },
            { header: 'Harga (Rp)', accessor: 'harga' },
          ]} data={foodSecurityData.hargaProdusenProv} />
          <MobileTable title="Harga Konsumen Provinsi (Beras Premium)" columns={[
            { header: 'Provinsi', accessor: 'provinsi' },
            { header: 'Komoditas', accessor: 'komoditas' },
            { header: 'Harga (Rp)', accessor: 'harga' },
          ]} data={foodSecurityData.hargaKonsumenProv} />
          <MobileTable title="Data Koefisien Variasi Provinsi" columns={[
            { header: 'Provinsi', accessor: 'provinsi' },
            { header: 'Koefisien Variasi (%)', accessor: 'cv' },
          ]} data={foodSecurityData.koefisienVariasi} />
          <MobileTable title="Data Harga Produsen Nasional" columns={[
            { header: 'Komoditas', accessor: 'komoditas' },
            { header: 'Harga Tingkat Produsen', accessor: 'harga' },
          ]} data={foodSecurityData.hargaProdusenNasional} />
        </>
      )}
    </div>
  );
}

function AlertCard({ item }) {
  const tones = {
    amber: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    emerald: 'bg-primary/10 text-primary border-primary/20',
    rose: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  };

  return (
    <div className={`rounded-[1.5rem] border p-4 ${tones[item.tone] || tones.emerald}`}>
      <p className="text-sm font-black">{item.title}</p>
      <p className="mt-1 text-xs font-bold leading-relaxed opacity-80">{item.detail}</p>
    </div>
  );
}

function AnalyticsHub() {
  const [active, setActive] = useState('farmer');

  return (
    <div className="flex flex-col gap-5">
      <div className="sticky top-24 z-20 -mx-1 rounded-[1.6rem] border border-border/50 bg-surface/80 p-1.5 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.35)] backdrop-blur-2xl">
        <div className="grid grid-cols-2 gap-1">
          {[
            { id: 'farmer', label: 'Petani' },
            { id: 'government', label: 'Pemerintah' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`rounded-[1.15rem] px-4 py-3 text-xs font-black uppercase tracking-widest transition ${
                active === tab.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'text-muted hover:bg-primary/5 hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <Analytics type={active} embedded />
    </div>
  );
}

function Management() {
  const totalRevenue = sales.reduce((sum, row) => sum + row.kg * row.price, 0);
  const yieldTrend = [
    { bulan: 'Jan', target: 3.2, realisasi: 3.0 },
    { bulan: 'Feb', target: 3.6, realisasi: 3.8 },
    { bulan: 'Mar', target: 4.1, realisasi: 3.9 },
    { bulan: 'Apr', target: 4.4, realisasi: 4.7 },
    { bulan: 'Mei', target: 4.8, realisasi: 5.0 },
  ];
  const statusBreakdown = [
    { status: 'Planned', count: 4 },
    { status: 'Land Preparation', count: 3 },
    { status: 'Planted', count: 8 },
    { status: 'Maintenance', count: 6 },
    { status: 'Harvesting', count: 2 },
    { status: 'Completed', count: 11 },
  ];

  return (
    <div className="flex flex-col gap-5 pb-6">
      <PageHeader title="Manajemen KPI" subtitle="Ringkasan performa organisasi, alert, dan revenue." />

      <div className="grid grid-cols-2 gap-3">
        <MetricCard item={{ label: 'Revenue', value: formatCurrency(totalRevenue), helper: '3 transaksi', trend: '+12%' }} />
        <MetricCard item={{ label: 'ROI', value: '18.4%', helper: 'estimasi', trend: '+3%' }} />
        <MetricCard item={{ label: 'Total Lahan', value: '34', helper: 'blok tercatat', trend: 'Aktif' }} />
        <MetricCard item={{ label: 'UM Aktif', value: '12', helper: 'unit manajemen', trend: '92%' }} />
      </div>

      <ChartCard title="Analitik & KPI hasil panen" subtitle="Perbandingan target dan realisasi bulanan">
        <MiniBarChart data={yieldTrend} xKey="bulan" barKeys={['target', 'realisasi']} colors={['#0ea5e9', '#10b981']} />
      </ChartCard>

      <Card className="p-5">
        <h2 className="text-sm font-black uppercase tracking-wider">Status siklus tanam</h2>
        <div className="mt-4 flex flex-col gap-3">
          {cycles.map((cycle) => (
            <div key={cycle.name}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-black">{cycle.name}</p>
                <span className="text-[10px] font-black text-primary">{cycle.progress}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-border/70">
                <div className="h-full rounded-full bg-primary" style={{ width: `${cycle.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-3">
        {alerts.map((item) => <AlertCard key={item.title} item={item} />)}
      </div>

      <Card className="p-5">
        <h2 className="text-sm font-black uppercase tracking-wider">Breakdown status siklus</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {statusBreakdown.map((item) => (
            <span key={item.status} className="rounded-full border border-border bg-background/60 px-3 py-2 text-xs font-black text-foreground">
              {item.status} <span className="text-primary">{item.count}</span>
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Operations() {
  const [sheet, setSheet] = useState(null);
  const [toast, setToast] = useState('');
  const [localUsers, setLocalUsers] = useState(users);
  const [localSales, setLocalSales] = useState(sales);

  function notify(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2500);
  }

  function fakeSubmit(message) {
    notify(message);
    setSheet(null);
  }

  const totalKg = localSales.reduce((sum, row) => sum + row.kg, 0);
  const totalRevenue = localSales.reduce((sum, row) => sum + row.kg * row.price, 0);
  const avgPrice = totalKg ? Math.round(totalRevenue / totalKg) : 0;

  return (
    <div className="flex flex-col gap-5 pb-6">
      {toast && (
        <div className="fixed left-4 right-4 top-24 z-[90] mx-auto max-w-md rounded-2xl bg-primary px-5 py-3 text-sm font-black text-white shadow-xl shadow-primary/25">
          {toast}
        </div>
      )}
      <PageHeader
        title="Operasi lapangan"
        subtitle="Akses cepat untuk siklus, UM, pengguna, penjualan, dan pengeluaran."
        action={<button onClick={() => setSheet('cycle')} className="rounded-2xl bg-primary px-3 py-3 text-white shadow-lg shadow-primary/25"><Plus className="h-5 w-5" /></button>}
      />

      <div className="grid grid-cols-2 gap-3">
        {operationFeatures.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.id} onClick={() => setSheet(item.id)} className="soft-card p-4 text-left transition active:scale-[0.98]">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <p className="font-black">{item.label}</p>
              <p className="mt-1 text-xs font-bold leading-relaxed text-muted/70">{item.helper}</p>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-3">
        <MetricCard item={{ label: 'Total Pendapatan', value: formatCurrency(totalRevenue), helper: `${localSales.length} transaksi`, trend: '+12%' }} />
        <MetricCard item={{ label: 'Total Hasil Terjual', value: `${totalKg.toLocaleString('id-ID')} kg`, helper: 'semua transaksi', trend: 'Panen' }} />
        <MetricCard item={{ label: 'Harga Rata-rata/Kg', value: formatCurrency(avgPrice), helper: 'rata-rata penjualan', trend: 'Aktif' }} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => setSheet('sales')} className="rounded-[1.5rem] bg-orange-500 px-4 py-4 text-left text-white shadow-lg shadow-orange-500/20">
          <p className="text-xs font-black uppercase tracking-wider opacity-80">Distribusi</p>
          <p className="mt-1 text-sm font-black">Catat Penjualan</p>
        </button>
        <button onClick={() => setSheet('expense')} className="rounded-[1.5rem] bg-amber-500 px-4 py-4 text-left text-white shadow-lg shadow-amber-500/20">
          <p className="text-xs font-black uppercase tracking-wider opacity-80">Biaya</p>
          <p className="mt-1 text-sm font-black">Catat Pengeluaran</p>
        </button>
      </div>

      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-wider">Siklus aktif</h2>
          <span className="text-[10px] font-black text-muted/60">{cycles.length} blok</span>
        </div>
        <div className="flex flex-col gap-3">
          {cycles.map((cycle) => (
            <div key={cycle.name} className="rounded-[1.5rem] border border-border/60 bg-background/40 p-4">
              <div className="flex justify-between gap-3">
                <div>
                  <p className="text-sm font-black">{cycle.name}</p>
                  <p className="mt-1 text-xs font-bold text-muted/70">{cycle.owner} - {cycle.area}</p>
                </div>
                <span className="h-fit rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-black text-primary">{cycle.status}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="text-sm font-black uppercase tracking-wider">Petani & Pengguna</h2>
        <div className="mt-4 flex flex-col gap-3">
          {localUsers.map((user) => (
            <div key={user.name} className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-black">{user.name}</p>
                <p className="text-xs font-bold text-muted/70">{user.role} - {user.location}</p>
              </div>
              <a className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black text-primary" href={`tel:${user.phone}`}>Hubungi</a>
            </div>
          ))}
        </div>
      </Card>

      <MobileTable title="Riwayat Penjualan" subtitle="Penjualan & distribusi hasil panen" columns={[
        { header: 'Tanggal', accessor: 'date' },
        { header: 'Pembeli', accessor: 'buyer' },
        { header: 'Tipe', accessor: 'type' },
        { header: 'Jumlah (Kg)', accessor: 'kg' },
        { header: 'Harga/Kg', accessor: 'price' },
      ]} data={localSales} actions />

      <ActionSheet title="Buat Siklus Baru" isOpen={sheet === 'cycle'} onClose={() => setSheet(null)}>
        <SimpleForm fields={['Nama Siklus', 'Komoditas', 'Luas Lahan', 'Tanggal Mulai']} submitLabel="Simpan Siklus" onSubmit={() => fakeSubmit('Siklus tanam baru berhasil dibuat.')} />
      </ActionSheet>
      <ActionSheet title="Tambah Penugasan UM" isOpen={sheet === 'um'} onClose={() => setSheet(null)}>
        <SimpleForm fields={['UM ID', 'Nama UM', 'Proses Ditugaskan', 'Tanggal Mulai']} submitLabel="Simpan Penugasan" onSubmit={() => fakeSubmit('Penugasan UM berhasil disimpan.')} />
      </ActionSheet>
      <ActionSheet title="Tambah Pengguna" isOpen={sheet === 'users'} onClose={() => setSheet(null)}>
        <SimpleForm fields={['Nama', 'Email', 'Telepon', 'Peran', 'Alamat']} submitLabel="Tambah Pengguna" onSubmit={() => {
          setLocalUsers((prev) => [{ name: 'Pengguna Baru', role: 'Petani', location: 'Organisasi', phone: '-' }, ...prev]);
          fakeSubmit('Pengguna baru berhasil ditambahkan.');
        }} />
      </ActionSheet>
      <ActionSheet title="Catat Penjualan" isOpen={sheet === 'sales'} onClose={() => setSheet(null)}>
        <SimpleForm fields={['Tanggal', 'Pembeli', 'Tipe Pembeli', 'Jumlah Kg', 'Harga per Kg', 'Invoice']} submitLabel="Catat Penjualan" onSubmit={() => {
          setLocalSales((prev) => [{ buyer: 'Pembeli Baru', type: 'Langsung', kg: 500, price: 5200, date: '2026-02-10' }, ...prev]);
          fakeSubmit('Penjualan berhasil dicatat.');
        }} />
      </ActionSheet>
      <ActionSheet title="Catat Pengeluaran" isOpen={sheet === 'expense'} onClose={() => setSheet(null)}>
        <SimpleForm fields={['Tanggal', 'Kategori', 'Nominal', 'Deskripsi', 'Receipt']} submitLabel="Catat Pengeluaran" onSubmit={() => fakeSubmit('Pengeluaran berhasil dicatat.')} />
      </ActionSheet>
    </div>
  );
}

function SimpleForm({ fields, submitLabel, onSubmit }) {
  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      {fields.map((field) => (
        <label key={field} className="flex flex-col gap-1.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-muted/70">{field}</span>
          <input className="rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm font-bold outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" placeholder={`Masukkan ${field.toLowerCase()}`} />
        </label>
      ))}
      <button className="mt-2 rounded-2xl bg-primary px-4 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-primary/25">
        {submitLabel}
      </button>
    </form>
  );
}

function MasterData() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    return Object.entries(dataRegistry).filter(([, config]) => config.title.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <div className="flex flex-col gap-5 pb-6">
      <PageHeader
        title="Master data"
        subtitle="14 dataset pangan nasional dan provinsi, siap untuk CRUD/import di integrasi berikutnya."
        action={<button className="rounded-2xl border border-border bg-surface p-3 text-primary"><Download className="h-5 w-5" /></button>}
      />

      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari dataset..."
          className="w-full rounded-[1.4rem] border border-border bg-surface/70 py-4 pl-11 pr-4 text-sm font-bold outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
        />
      </div>

      <div className="grid gap-3">
        {filtered.map(([slug, config], index) => (
          <Link key={slug} to={`/app/data/${slug}`} className="soft-card flex items-center gap-4 p-4 text-left transition active:scale-[0.99]">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-xs font-black text-primary">{index + 1}</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-black leading-snug">{config.title}</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-muted/60">{config.data.length} baris - {config.columns.length} kolom</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted/50" />
          </Link>
        ))}
      </div>
    </div>
  );
}

function MasterDataDetail() {
  const { slug } = useParams();
  const config = dataRegistry[slug];
  const [sheet, setSheet] = useState(null);

  if (!config) return <Navigate to="/app/data" replace />;

  const numericColumn = config.columns.find((column) => {
    const sample = config.data.find((row) => typeof row[column.accessor] === 'number');
    return Boolean(sample) && column.accessor !== 'no' && !column.accessor.includes('kode');
  });
  const labelColumn = config.columns.find((column) => column.accessor.includes('bulan') || column.accessor.includes('tahun') || column.accessor.includes('provinsi') || column.accessor.includes('komoditas')) || config.columns[0];

  return (
    <div className="flex flex-col gap-5 pb-6">
      <PageHeader
        title={config.title}
        subtitle={`${config.data.length} baris data. CRUD dan import dibuat dalam pola mobile sheet.`}
        action={
          <div className="flex gap-2">
            <button onClick={() => setSheet('import')} className="rounded-2xl border border-border bg-surface p-3 text-primary"><Upload className="h-5 w-5" /></button>
            <button onClick={() => setSheet('form')} className="rounded-2xl bg-primary p-3 text-white shadow-lg shadow-primary/25"><Plus className="h-5 w-5" /></button>
          </div>
        }
      />

      {numericColumn && (
        <ChartCard title="Visualisasi ringkas" subtitle={`${numericColumn.header} berdasarkan ${labelColumn.header}`}>
          <MiniBarChart data={config.data} xKey={labelColumn.accessor} yKey={numericColumn.accessor} colors={['#10b981']} />
        </ChartCard>
      )}

      <MobileTable title="Data" subtitle="Mode mobile dari tabel desktop" columns={config.columns} data={config.data} limit={20} actions />

      <ActionSheet title="Tambah/Edit Data" isOpen={sheet === 'form'} onClose={() => setSheet(null)}>
        <SimpleForm fields={config.columns.filter((column) => column.accessor !== 'no').slice(0, 7).map((column) => column.header)} submitLabel="Simpan Data" onSubmit={() => setSheet(null)} />
      </ActionSheet>
      <ActionSheet title="Import CSV/Excel" isOpen={sheet === 'import'} onClose={() => setSheet(null)}>
        <div className="rounded-[1.5rem] border-2 border-dashed border-border bg-background/50 p-6 text-center">
          <Upload className="mx-auto h-9 w-9 text-primary" />
          <p className="mt-3 text-sm font-black">Pilih file atau seret ke sini</p>
          <p className="mt-1 text-xs font-bold leading-relaxed text-muted/70">Mendukung format .csv atau .xlsx seperti import modal desktop.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {config.columns.slice(0, 8).map((column) => (
              <span key={column.accessor} className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-black text-primary">{column.header}</span>
            ))}
          </div>
        </div>
        <button onClick={() => setSheet(null)} className="mt-4 w-full rounded-2xl bg-primary px-4 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-primary/25">
          Konfirmasi Import
        </button>
      </ActionSheet>
    </div>
  );
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('sugi-mobile-auth') === 'true');
  const [dark, setDark] = useState(false);

  function logout() {
    localStorage.removeItem('sugi-mobile-auth');
    setAuthenticated(false);
  }

  function toggleDark() {
    setDark((value) => !value);
    document.documentElement.classList.toggle('dark');
  }

  return (
    <Routes>
      <Route path="/" element={authenticated ? <Navigate to="/app" replace /> : <Login onLogin={setAuthenticated} />} />
      <Route path="/app/*" element={authenticated ? <Shell dark={dark} toggleDark={toggleDark} onLogout={logout} /> : <Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to={authenticated ? '/app' : '/'} replace />} />
    </Routes>
  );
}
