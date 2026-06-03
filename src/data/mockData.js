export const kpis = [
  { label: 'Harga GKP', value: 'Rp 4,889', helper: 'nasional / kg', trend: '+2.4%' },
  { label: 'PoU Nasional', value: '8.53%', helper: 'indikator pangan', trend: '-0.6%' },
  { label: 'CPPD', value: '42.1K', helper: 'ton cadangan', trend: '+8%' },
  { label: 'Revenue', value: 'Rp 1.82M', helper: 'bulan ini', trend: '+12%' },
];

export const farmerPrices = [
  { name: 'Lampung', harga: 5050 },
  { name: 'Sumbar', harga: 5320 },
  { name: 'Jabar', harga: 4870 },
  { name: 'Jatim', harga: 4720 },
  { name: 'Sulsel', harga: 4980 },
];

export const pouTrend = [
  { tahun: '2021', pou: 8.1 },
  { tahun: '2022', pou: 8.7 },
  { tahun: '2023', pou: 8.5 },
  { tahun: '2024', pou: 8.2 },
  { tahun: '2025', pou: 7.9 },
  { tahun: '2026', pou: 7.7 },
];

export const balanceData = [
  { bulan: 'Jan', ketersediaan: 2450, kebutuhan: 2180 },
  { bulan: 'Feb', ketersediaan: 2380, kebutuhan: 2210 },
  { bulan: 'Mar', ketersediaan: 2600, kebutuhan: 2240 },
  { bulan: 'Apr', ketersediaan: 2510, kebutuhan: 2270 },
  { bulan: 'Mei', ketersediaan: 2330, kebutuhan: 2290 },
];

export const cycles = [
  { name: 'Blok A - Padi IR64', status: 'Perawatan', progress: 68, owner: 'Budi Santoso', area: '2.4 ha' },
  { name: 'Blok C - Jagung', status: 'Penanaman', progress: 34, owner: 'Rina Dewi', area: '1.8 ha' },
  { name: 'Blok D - Padi Premium', status: 'Panen', progress: 91, owner: 'Joko Purnomo', area: '3.1 ha' },
];

export const alerts = [
  { title: 'Harga konsumen naik', detail: 'Beras premium naik 4.2% di 5 provinsi sentra.', tone: 'amber' },
  { title: 'Siklus panen dekat', detail: '2 lahan masuk estimasi panen dalam 10 hari.', tone: 'emerald' },
  { title: 'UM belum ditugaskan', detail: '3 proses butuh penanggung jawab lapangan.', tone: 'rose' },
];

export const users = [
  { name: 'Budi Santoso', role: 'Petani', location: 'Lampung', phone: '0812-3456-7890' },
  { name: 'Siti Aminah', role: 'UM', location: 'Sumatra Barat', phone: '0813-9876-5432' },
  { name: 'Rina Dewi', role: 'Petani', location: 'Riau', phone: '0817-5555-6666' },
];

export const sales = [
  { buyer: 'Pabrik Maju', type: 'Pabrik', kg: 1200, price: 5200, date: '2026-01-12' },
  { buyer: 'Koperasi Desa', type: 'Langsung', kg: 680, price: 5350, date: '2026-01-18' },
  { buyer: 'Bapanas Region', type: 'Pemerintah', kg: 920, price: 5150, date: '2026-02-02' },
];

export const masterGroups = [
  'Ketidakcukupan Nasional',
  'Ketidakcukupan Provinsi',
  'Konsumsi per Jenis',
  'Penyaluran Donasi',
  'Proyeksi Neraca',
  'Gerakan Pangan Murah',
  'Harga Konsumen Provinsi',
  'Harga Konsumen Nasional',
  'Harga Produsen Nasional',
  'Harga Produsen Provinsi',
  'Variasi Harga Produsen',
  'Skor PPH',
  'Pangan Terselamatkan',
  'Cadangan Pangan Provinsi',
];

export const foodSecurityData = {
  pouNasional: [
    { tahun: 2011, pou: 16.97, jumlah_penduduk: 241990736, undernourish: 41065828 },
    { tahun: 2012, pou: 13.83, jumlah_penduduk: 245425244, undernourish: 33945256 },
    { tahun: 2013, pou: 12.36, jumlah_penduduk: 248818215, undernourish: 30765153 },
    { tahun: 2014, pou: 12.89, jumlah_penduduk: 252164786, undernourish: 32504041 },
    { tahun: 2015, pou: 10.73, jumlah_penduduk: 255461686, undernourish: 27401360 },
    { tahun: 2016, pou: 8.93, jumlah_penduduk: 258704986, undernourish: 23091634 },
    { tahun: 2017, pou: 8.23, jumlah_penduduk: 261890872, undernourish: 21553619 },
  ],
  pouProvinsi: [
    { kode: 11, provinsi: 'ACEH', pou: 8.66, penduduk: 5243400, undernourish: 454185 },
    { kode: 12, provinsi: 'SUMATERA UTARA', pou: 5.73, penduduk: 14476000, undernourish: 829915 },
    { kode: 13, provinsi: 'SUMATERA BARAT', pou: 5.45, penduduk: 5411800, undernourish: 294684 },
    { kode: 14, provinsi: 'RIAU', pou: 9.63, penduduk: 6717600, undernourish: 646660 },
    { kode: 15, provinsi: 'JAMBI', pou: 10.04, penduduk: 3527100, undernourish: 354285 },
    { kode: 16, provinsi: 'SUMATERA SELATAN', pou: 10.84, penduduk: 8391500, undernourish: 909295 },
    { kode: 17, provinsi: 'BENGKULU', pou: 8.7, penduduk: 1948600, undernourish: 169556 },
    { kode: 18, provinsi: 'LAMPUNG', pou: 12.1, penduduk: 8377700, undernourish: 1013397 },
    { kode: 19, provinsi: 'KEPULAUAN BANGKA BELITUNG', pou: 10.06, penduduk: 1432100, undernourish: 144060 },
    { kode: 21, provinsi: 'KEPULAUAN RIAU', pou: 4.39, penduduk: 2174800, undernourish: 95430 },
    { kode: 31, provinsi: 'DKI JAKARTA', pou: 1.46, penduduk: 10428000, undernourish: 152656 },
  ],
  konsumsiPangan: [
    { kelompok: 'Padi-padian', komoditas: 'Beras', nilai: 97.1 },
    { kelompok: 'Padi-padian', komoditas: 'Jagung', nilai: 1.6 },
    { kelompok: 'Padi-padian', komoditas: 'Terigu', nilai: 18.2 },
    { kelompok: 'Umbi-umbian', komoditas: 'Umbi-umbian', nilai: 16.4 },
    { kelompok: 'Umbi-umbian', komoditas: 'Singkong', nilai: 9.5 },
    { kelompok: 'Umbi-umbian', komoditas: 'Ubi Jalar', nilai: 3.4 },
    { kelompok: 'Umbi-umbian', komoditas: 'Kentang', nilai: 2.4 },
  ],
  donasiPangan: [
    { bulan: 'Januari', donasi_kg: 16712.64, penerima: 33364 },
    { bulan: 'Februari', donasi_kg: 27956.83, penerima: 55034 },
    { bulan: 'Maret', donasi_kg: 224858.71, penerima: 455328 },
    { bulan: 'April', donasi_kg: 1285.4, penerima: 2193 },
    { bulan: 'Mei', donasi_kg: 38649.51, penerima: 77292 },
  ],
  proyeksiNeraca: [
    { bulan: 'Januari', ketersediaan: 14335076, kebutuhan: 2630718, neraca: 11704359 },
    { bulan: 'Februari', ketersediaan: 14614708, kebutuhan: 2381224, neraca: 12233484 },
    { bulan: 'Maret', ketersediaan: 17584401, kebutuhan: 2749524, neraca: 14834876 },
    { bulan: 'April', ketersediaan: 19789499, kebutuhan: 2545856, neraca: 17243643 },
    { bulan: 'Mei', ketersediaan: 20023657, kebutuhan: 2632839, neraca: 17390817 },
    { bulan: 'Juni', ketersediaan: 19581292, kebutuhan: 2545856, neraca: 17035436 },
    { bulan: 'Juli', ketersediaan: 19654303, kebutuhan: 2630718, neraca: 17023585 },
    { bulan: 'Agustus', ketersediaan: 20091891, kebutuhan: 2630718, neraca: 17461173 },
  ],
  gerakanPanganMurah: [
    { provinsi: 'Aceh', kab_kota: 'Kab. Aceh Barat', jumlah: 2 },
    { provinsi: 'Bali', kab_kota: 'Kab. Buleleng', jumlah: 4 },
    { provinsi: 'Bengkulu', kab_kota: 'Kota Bengkulu', jumlah: 14 },
    { provinsi: 'DI Yogyakarta', kab_kota: 'Kab. Sleman', jumlah: 1 },
    { provinsi: 'DI Yogyakarta', kab_kota: 'Kota Yogyakarta', jumlah: 2 },
    { provinsi: 'Jawa Barat', kab_kota: 'Kab. Bandung', jumlah: 3 },
  ],
  hargaKonsumenProv: [
    { provinsi: 'Aceh', komoditas: 'Beras Premium', harga: 12072 },
    { provinsi: 'Sumatera Utara', komoditas: 'Beras Premium', harga: 12523 },
    { provinsi: 'Sumatera Barat', komoditas: 'Beras Premium', harga: 13096 },
    { provinsi: 'Riau', komoditas: 'Beras Premium', harga: 14605 },
    { provinsi: 'Jambi', komoditas: 'Beras Premium', harga: 12323 },
    { provinsi: 'Sumatera Selatan', komoditas: 'Beras Premium', harga: 11675 },
    { provinsi: 'Bengkulu', komoditas: 'Beras Premium', harga: 11752 },
    { provinsi: 'Lampung', komoditas: 'Beras Premium', harga: 11428 },
  ],
  hargaKonsumenNasional: [
    { komoditas: 'Beras Premium', harga: 12319 },
    { komoditas: 'Beras Medium', harga: 10865 },
    { komoditas: 'Kedelai Biji Kering', harga: 10607 },
    { komoditas: 'Bawang Merah', harga: 30329 },
    { komoditas: 'Bawang Putih (Bonggol)', harga: 26308 },
    { komoditas: 'Cabai Merah Keriting', harga: 47968 },
  ],
  hargaProdusenNasional: [
    { komoditas: 'GKP Tingkat Petani', harga: 4889 },
    { komoditas: 'GKP Tingkat Penggilingan', harga: 5170 },
    { komoditas: 'GKG Tingkat Penggilingan', harga: 5756 },
    { komoditas: 'Beras Medium Tk. Penggilingan', harga: 9497 },
    { komoditas: 'Beras Premium Tk. Penggilingan', harga: 10729 },
  ],
  hargaProdusenProv: [
    { provinsi: 'Aceh', komoditas: 'GKP Tk. Petani', harga: 5494 },
    { provinsi: 'Sumatera Utara', komoditas: 'GKP Tk. Petani', harga: 5465 },
    { provinsi: 'Sumatera Barat', komoditas: 'GKP Tk. Petani', harga: 6760 },
    { provinsi: 'Riau', komoditas: 'GKP Tk. Petani', harga: null },
    { provinsi: 'Jambi', komoditas: 'GKP Tk. Petani', harga: 5224 },
    { provinsi: 'Sumatera Selatan', komoditas: 'GKP Tk. Petani', harga: 5230 },
    { provinsi: 'Bengkulu', komoditas: 'GKP Tk. Petani', harga: null },
  ],
  koefisienVariasi: [
    { provinsi: 'Aceh', cv: 7.09 },
    { provinsi: 'Bali', cv: 7.15 },
    { provinsi: 'Banten', cv: 3.88 },
    { provinsi: 'Bengkulu', cv: null },
    { provinsi: 'DI Yogyakarta', cv: 3.2 },
  ],
  skorPPH: [
    { tahun: 2018, skor: 90.81 },
    { tahun: 2019, skor: 93.4 },
    { tahun: 2020, skor: 95.77 },
    { tahun: 2021, skor: 96.78 },
    { tahun: 2022, skor: 96 },
    { tahun: 2023, skor: 96.05 },
    { tahun: 2024, skor: 96.54 },
    { tahun: 2025, skor: 97.55 },
  ],
  panganTerselamatkan: [
    { bulan: 'Januari', kg: 19327.84 },
    { bulan: 'Februari', kg: 27891.03 },
    { bulan: 'Maret', kg: 225044.71 },
    { bulan: 'April', kg: 1059.4 },
    { bulan: 'Mei', kg: 38649.71 },
    { bulan: 'Juni', kg: 12771.85 },
  ],
  cppdProvinsi: [
    { wilayah: 'Aceh', ton: 191.1 },
    { wilayah: 'Sumatera Utara', ton: 57.27 },
    { wilayah: 'Sumatera Barat', ton: 119.34 },
    { wilayah: 'Riau', ton: 85.1 },
    { wilayah: 'Jambi', ton: 66.14 },
    { wilayah: 'Sumatera Selatan', ton: 0 },
    { wilayah: 'Bengkulu', ton: 84.15 },
  ],
};

export const columnSets = {
  columns1: [
    { header: 'No', accessor: 'no' },
    { header: 'Tahun', accessor: 'tahun' },
    { header: 'PoU', accessor: 'pou' },
    { header: 'Jumlah Penduduk', accessor: 'jumlah_penduduk' },
    { header: 'Penduduk Undernourish', accessor: 'penduduk_undernourish' },
  ],
  columns2: [
    { header: 'No', accessor: 'no' },
    { header: 'Tahun', accessor: 'tahun' },
    { header: 'Kode Provinsi', accessor: 'kode_provinsi' },
    { header: 'Provinsi', accessor: 'provinsi' },
    { header: 'PoU', accessor: 'pou' },
    { header: 'Jumlah Penduduk', accessor: 'jumlah_penduduk' },
    { header: 'Penduduk Undernourish', accessor: 'penduduk_undernourish' },
  ],
  columns3: [
    { header: 'No', accessor: 'no' },
    { header: 'Kelompok Bahan Pangan', accessor: 'kelompok_bahan_pangan' },
    { header: 'Komoditas', accessor: 'komoditas' },
    { header: 'Konsumsi Pangan', accessor: 'konsumsi_pangan' },
    { header: 'Satuan', accessor: 'satuan' },
    { header: 'Tahun', accessor: 'tahun' },
  ],
  columns4: [
    { header: 'Tahun', accessor: 'tahun' },
    { header: 'Bulan', accessor: 'bulan' },
    { header: 'Jumlah Donasi (kg)', accessor: 'jumlah_donasi_kg' },
    { header: 'Penerima Manfaat (Jiwa)', accessor: 'penerima_manfaat_jiwa' },
  ],
  columns5: [
    { header: 'Tahun', accessor: 'tahun' },
    { header: 'Bulan', accessor: 'bulan' },
    { header: 'Status', accessor: 'status' },
    { header: 'Tingkat', accessor: 'tingkat' },
    { header: 'Komoditas', accessor: 'komoditas' },
    { header: 'Ketersediaan', accessor: 'ketersediaan' },
    { header: 'Kebutuhan', accessor: 'kebutuhan' },
    { header: 'Neraca', accessor: 'neraca' },
    { header: 'Satuan', accessor: 'satuan' },
  ],
  columns6: [
    { header: 'Tahun', accessor: 'tahun' },
    { header: 'Bulan', accessor: 'bulan' },
    { header: 'Provinsi', accessor: 'provinsi' },
    { header: 'Kode Provinsi', accessor: 'kode_provinsi' },
    { header: 'Kab/Kota', accessor: 'kab_kota' },
    { header: 'Kode Kab/Kota', accessor: 'kode_kab_kota' },
    { header: 'Jumlah Pelaksanaan Gerakan Pangan Murah', accessor: 'pelaksana' },
  ],
  columns7: [
    { header: 'Kode Provinsi', accessor: 'kode_provinsi' },
    { header: 'Nama Provinsi', accessor: 'nama_provinsi' },
    { header: 'Komoditas', accessor: 'komoditas' },
    { header: 'Tahun', accessor: 'tahun' },
    { header: 'Bulan', accessor: 'bulan' },
    { header: 'Harga', accessor: 'harga' },
  ],
  columns8: [
    { header: 'Komoditas', accessor: 'komoditas' },
    { header: 'Tahun', accessor: 'tahun' },
    { header: 'Bulan', accessor: 'bulan' },
    { header: 'Harga', accessor: 'harga' },
  ],
  columns9: [
    { header: 'Komoditas', accessor: 'komoditas' },
    { header: 'Tahun', accessor: 'tahun' },
    { header: 'Bulan', accessor: 'bulan' },
    { header: 'Harga', accessor: 'harga' },
  ],
  columns10: [
    { header: 'Kode Provinsi', accessor: 'kode_provinsi' },
    { header: 'Nama Provinsi', accessor: 'nama_provinsi' },
    { header: 'Komoditas', accessor: 'komoditas' },
    { header: 'Tahun', accessor: 'tahun' },
    { header: 'Bulan', accessor: 'bulan' },
    { header: 'Harga', accessor: 'harga' },
  ],
  columns11: [
    { header: 'Kode Wilayah', accessor: 'kode_wilayah' },
    { header: 'Provinsi', accessor: 'provinsi' },
    { header: 'Komoditas', accessor: 'komoditas' },
    { header: 'Tahun', accessor: 'tahun' },
    { header: 'Bulan', accessor: 'bulan' },
    { header: 'Koefisien Variasi', accessor: 'koefisien_variasi' },
  ],
  columns12: [
    { header: 'No', accessor: 'no' },
    { header: 'Tahun', accessor: 'tahun' },
    { header: 'PPH Ketersediaan', accessor: 'pph_ketersediaan' },
    { header: 'Keterangan', accessor: 'keterangan' },
  ],
  columns13: [
    { header: 'Tahun', accessor: 'tahun' },
    { header: 'Bulan', accessor: 'bulan' },
    { header: 'Jumlah Donasi (kg)', accessor: 'jumlah_donasi_kg' },
  ],
  columns14: [
    { header: 'Tahun', accessor: 'tahun' },
    { header: 'Bulan', accessor: 'bulan' },
    { header: 'Kode Wilayah', accessor: 'kode_wilayah' },
    { header: 'Wilayah', accessor: 'wilayah' },
    { header: 'CPPD Ton', accessor: 'cppd_ton' },
  ],
};

export const dataRegistry = {
  'ketidakcukupan-nasional': {
    title: 'Jumlah Penduduk yang Mengalami Ketidakcukupan Konsumsi Pangan Nasional',
    columns: columnSets.columns1,
    data: [
      { no: 1, tahun: 2011, pou: 16.97, jumlah_penduduk: 241990736, penduduk_undernourish: 41065828 },
      { no: 2, tahun: 2012, pou: 13.83, jumlah_penduduk: 245425244, penduduk_undernourish: 33945256 },
      { no: 3, tahun: 2013, pou: 12.36, jumlah_penduduk: 248818215, penduduk_undernourish: 30765153 },
      { no: 4, tahun: 2014, pou: 12.89, jumlah_penduduk: 252164786, penduduk_undernourish: 32504041 },
      { no: 5, tahun: 2015, pou: 10.73, jumlah_penduduk: 255461686, penduduk_undernourish: 27401360 },
      { no: 6, tahun: 2016, pou: 8.93, jumlah_penduduk: 258704986, penduduk_undernourish: 23091634 },
      { no: 7, tahun: 2017, pou: 8.23, jumlah_penduduk: 261890872, penduduk_undernourish: 21553619 },
    ],
  },
  'ketidakcukupan-provinsi': {
    title: 'Jumlah Penduduk yang Mengalami Ketidakcukupan Konsumsi Pangan Provinsi',
    columns: columnSets.columns2,
    data: foodSecurityData.pouProvinsi.map((row, index) => ({
      no: index + 1,
      tahun: 2018,
      kode_provinsi: row.kode,
      provinsi: row.provinsi,
      pou: row.pou,
      jumlah_penduduk: row.penduduk,
      penduduk_undernourish: row.undernourish,
    })),
  },
  'konsumsi-per-jenis': {
    title: 'Rata-rata Konsumsi per Jenis Pangan Penduduk Indonesia Nasional',
    columns: columnSets.columns3,
    data: [
      { no: 1, kelompok_bahan_pangan: 'Padi-padian', komoditas: 'Padi-padian', konsumsi_pangan: 116.9, satuan: 'kg/kap/tahun', tahun: 2018 },
      ...foodSecurityData.konsumsiPangan.map((row, index) => ({
        no: index + 2,
        kelompok_bahan_pangan: row.kelompok,
        komoditas: row.komoditas,
        konsumsi_pangan: row.nilai,
        satuan: 'kg/kap/tahun',
        tahun: 2018,
      })),
    ],
  },
  'penyaluran-donasi': {
    title: 'Jumlah Pangan yang Disalurkan ke Penerima Manfaat',
    columns: columnSets.columns4,
    data: foodSecurityData.donasiPangan.map((row) => ({ tahun: 2024, bulan: row.bulan, jumlah_donasi_kg: row.donasi_kg, penerima_manfaat_jiwa: row.penerima })),
  },
  'proyeksi-neraca': {
    title: 'Proyeksi Neraca Pangan Nasional',
    columns: columnSets.columns5,
    data: foodSecurityData.proyeksiNeraca.map((row) => ({ tahun: 2026, status: 'Proyeksi', tingkat: 'Nasional', komoditas: 'Beras', satuan: 'ton', ...row })),
  },
  'gerakan-pangan-murah': {
    title: 'Jumlah Pelaksanaan Gerakan Pangan Murah',
    columns: columnSets.columns6,
    data: foodSecurityData.gerakanPanganMurah.map((row, index) => ({ tahun: 2026, bulan: 'Januari', kode_provinsi: index + 11, kode_kab_kota: 1100 + index, pelaksana: row.jumlah, ...row })),
  },
  'harga-konsumen-provinsi': {
    title: 'Rata-rata Harga Pangan Bulanan Tingkat Konsumen Provinsi',
    columns: columnSets.columns7,
    data: foodSecurityData.hargaKonsumenProv.map((row, index) => ({ kode_provinsi: index + 11, nama_provinsi: row.provinsi, komoditas: row.komoditas, tahun: 2021, bulan: 'Januari', harga: `Rp${row.harga.toLocaleString('id-ID')}` })),
  },
  'harga-konsumen-nasional': {
    title: 'Rata-rata Harga Pangan Bulanan Tingkat Konsumen Nasional',
    columns: columnSets.columns8,
    data: foodSecurityData.hargaKonsumenNasional.map((row) => ({ komoditas: row.komoditas, tahun: 2021, bulan: 'Januari', harga: `Rp${row.harga.toLocaleString('id-ID')}` })),
  },
  'harga-produsen-nasional': {
    title: 'Rata-rata Harga Pangan Bulanan Tingkat Produsen Nasional',
    columns: columnSets.columns9,
    data: foodSecurityData.hargaProdusenNasional.map((row) => ({ komoditas: `${row.komoditas} (Rp/Kg)`, tahun: 2019, bulan: 'Januari', harga: `Rp${row.harga.toLocaleString('id-ID')}` })),
  },
  'harga-produsen-provinsi': {
    title: 'Rata-rata Harga Pangan Bulanan Tingkat Produsen Provinsi',
    columns: columnSets.columns10,
    data: foodSecurityData.hargaProdusenProv.map((row, index) => ({ kode_provinsi: index + 11, nama_provinsi: row.provinsi, komoditas: row.komoditas, tahun: 2023, bulan: 'Januari', harga: row.harga ? `Rp${row.harga.toLocaleString('id-ID')}` : '-' })),
  },
  'variasi-harga-produsen': {
    title: 'Koefisien Variasi Harga Pangan Tingkat Produsen Provinsi',
    columns: columnSets.columns11,
    data: foodSecurityData.koefisienVariasi.map((row, index) => ({ kode_wilayah: index + 11, provinsi: row.provinsi, komoditas: 'GKP Tingkat Petani', tahun: 2022, bulan: 'Januari', koefisien_variasi: row.cv ? `${row.cv.toLocaleString('id-ID')}%` : '-' })),
  },
  'skor-pph': {
    title: 'Skor Pola Pangan Harapan Ketersediaan Nasional',
    columns: columnSets.columns12,
    data: foodSecurityData.skorPPH.map((row, index) => ({ no: index + 1, tahun: row.tahun, pph_ketersediaan: row.skor, keterangan: index > 5 ? 'Angka sementara' : 'Angka tetap' })),
  },
  'pangan-terselamatkan': {
    title: 'Jumlah Total Pangan yang Terselamatkan',
    columns: columnSets.columns13,
    data: foodSecurityData.panganTerselamatkan.map((row) => ({ tahun: 2024, bulan: row.bulan, jumlah_donasi_kg: row.kg })),
  },
  'cadangan-pangan-provinsi': {
    title: 'Jumlah Cadangan Pangan Pemerintah Daerah Provinsi',
    columns: columnSets.columns14,
    data: foodSecurityData.cppdProvinsi.map((row, index) => ({ tahun: 2025, bulan: '31 Januari 2025', kode_wilayah: index + 11, wilayah: row.wilayah, cppd_ton: row.ton.toLocaleString('id-ID') })),
  },
};
