import {
  BarChart3,
  Building2,
  Database,
  Leaf,
  LineChart,
  ReceiptText,
  Sprout,
  Tractor,
  UserCheck,
  Users,
} from 'lucide-react';

export const dashboardFeatures = [
  { id: 'farmer', label: 'Petani', path: '/app/farmer', icon: Tractor, helper: 'Harga, peta ringkas, dan pasar' },
  { id: 'government', label: 'Pemerintah', path: '/app/government', icon: Building2, helper: 'PoU, CPPD, intervensi' },
  { id: 'management', label: 'Manajemen', path: '/app/management', icon: BarChart3, helper: 'KPI, alert, performa' },
];

export const operationFeatures = [
  { id: 'cycle', label: 'Siklus', icon: Leaf, helper: 'Persiapan sampai panen' },
  { id: 'um', label: 'UM', icon: Users, helper: 'Penugasan dan skor' },
  { id: 'users', label: 'Petani', icon: UserCheck, helper: 'Akun dan peran' },
  { id: 'sales', label: 'Penjualan', icon: ReceiptText, helper: 'Revenue dan distribusi' },
];

export const bottomNav = [
  { label: 'Home', path: '/app', icon: Sprout },
  { label: 'Analitik', path: '/app/analytics', icon: LineChart },
  { label: 'Operasi', path: '/app/operations', icon: Leaf },
  { label: 'Data', path: '/app/data', icon: Database },
];
