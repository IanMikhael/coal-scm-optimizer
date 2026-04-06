import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';
import { 
  Factory, Train, Ship, AlertTriangle, CheckCircle2, FileText, 
  Activity, Zap, Bell, LayoutDashboard, Database, FileBarChart, Settings, Search, TrendingUp, DollarSign
} from 'lucide-react';

const App = () => {
  const [data, setData] = useState([]);
  const [claims, setClaims] = useState([]);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const fetchData = () => {
    axios.get('http://127.0.0.1:8000/api/performance/').then(res => setData(res.data));
    axios.get('http://127.0.0.1:8000/api/claims/').then(res => setClaims(res.data));
  };

  useEffect(() => { fetchData(); }, []);

  const formatIDR = (val) => {
    if (!val) return "Rp 0";
    return `Rp ${(val / 1000000000).toFixed(1)} Miliar`;
  };

  const COLORS = {
    bg: '#f8fafc',
    nav: '#ffffff',
    surface: '#ffffff',
    accent: '#3b82f6',
    danger: '#ef4444',
    success: '#10b981',
    border: '#e2e8f0',
    textMain: '#1e293b',
    textMuted: '#64748b',
    primary: '#0f172a'
  };

  // --- LOGIC PERPINDAHAN HALAMAN ---
  const renderContent = () => {
    switch (activeTab) {
      case 'Coal Data':
        // Data Simulasi Harga Batubara Global (Indonesian Coal Index - ICI)
        const priceTrend = [
          { month: 'Jan', price: 142 }, { month: 'Feb', price: 155 },
          { month: 'Mar', price: 148 }, { month: 'Apr', price: 160 },
          { month: 'Mei', price: 175 }, { month: 'Jun', price: 168 }
        ];

        return (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px' }}>
              {/* GRAFIK HARGA GLOBAL */}
              <div style={{ backgroundColor: '#fff', padding: '35px', borderRadius: '28px', border: `1px solid ${COLORS.border}`, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>Global Coal Price Index (ICI)</h3>
                  <div style={{ padding: '6px 12px', background: '#f0fdf4', color: COLORS.success, borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' }}>+12.4% YTD</div>
                </div>
                <div style={{ height: '350px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceTrend}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} unit=" $" />
                      <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                      <Line type="monotone" dataKey="price" stroke={COLORS.accent} strokeWidth={4} dot={{ r: 6, fill: COLORS.accent }} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p style={{ fontSize: '12px', color: COLORS.textMuted, marginTop: '20px' }}>* Referensi harga batubara Newcastle & ICI (Indonesian Coal Index) Tahun 2026.</p>
              </div>

              {/* ANALISIS COGS VS PRICE (INSIGHT JURNAL) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ backgroundColor: COLORS.primary, padding: '30px', borderRadius: '28px', color: '#fff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                    <DollarSign size={24} color={COLORS.accent} />
                    <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Efficiency Analysis</h3>
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>Actual COGS PT.XYZ</div>
                    <div style={{ fontSize: '32px', fontWeight: '900' }}>40%</div>
                  </div>
                  <div style={{ height: '4px', background: '#334155', borderRadius: '2px', marginBottom: '10px' }}>
                    <div style={{ width: '40%', height: '100%', background: COLORS.danger, borderRadius: '2px' }}></div>
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Target Perusahaan: 30% (Gap 10%)</div>
                </div>

                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '28px', border: `1px solid ${COLORS.border}` }}>
                  <h4 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '15px' }}>Faktor Pemicu (Jurnal Muara Enim):</h4>
                  <ul style={{ paddingLeft: '15px', color: COLORS.textMuted, fontSize: '13px', lineHeight: '1.8' }}>
                    <li>Fluktuasi harga bahan bakar alat berat.</li>
                    <li>Biaya pengupasan tanah (Overburden).</li>
                    <li>Inflow air tambang di PIT Tambang 3.</li>
                    <li>Kenaikan tarif jasa logistik kereta api.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Reports':
        return (
          <div style={{ backgroundColor: '#fff', padding: '35px', borderRadius: '28px', border: `1px solid ${COLORS.border}`, animation: 'fadeIn 0.5s ease' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '25px' }}>Full Modul Return: Quality Dispute Management</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: `2px solid ${COLORS.bg}`, color: COLORS.textMuted, fontSize: '13px' }}>
                  <th style={{ padding: '15px' }}>CUSTOMER</th>
                  <th style={{ padding: '15px' }}>ISSUE DESCRIPTION</th>
                  <th style={{ padding: '15px' }}>STATUS</th>
                  <th style={{ padding: '15px', textAlign: 'center' }}>LAB EVIDENCE</th>
                </tr>
              </thead>
              <tbody>
                {claims.map(claim => (
                  <tr key={claim.id} style={{ borderBottom: `1px solid ${COLORS.bg}`, fontSize: '14px' }}>
                    <td style={{ padding: '20px 15px', fontWeight: '700' }}>{claim.customer}</td>
                    <td style={{ padding: '20px 15px', color: '#475569' }}>{claim.issue}</td>
                    <td style={{ padding: '20px 15px' }}>
                      <span style={{ padding: '6px 14px', borderRadius: '12px', fontSize: '11px', fontWeight: '800', backgroundColor: '#f0fdf4', color: COLORS.success }}>
                        {claim.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '20px 15px', textAlign: 'center' }}><FileText size={22} color={COLORS.accent} style={{cursor:'pointer'}}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default: // Dashboard Tab
        return (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            {/* LOGISTICS WIDGETS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', marginBottom: '35px' }}>
              {[
                { icon: <Factory />, label: 'PIT Tanjung Enim', status: 'Produksi Aktif', color: '#eff6ff' },
                { icon: <Train />, label: 'KAI Logistik', status: 'Distribusi Rel', color: '#f0fdf4' },
                { icon: <Ship />, label: 'Port Tarahan', status: 'Terminal Ekspor', color: '#fef2f2' }
              ].map((item, i) => (
                <div key={i} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '24px', border: `1px solid ${COLORS.border}`, display: 'flex', gap: '20px', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                  <div style={{ backgroundColor: item.color, padding: '15px', borderRadius: '18px', color: COLORS.primary }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: '14px', color: COLORS.textMuted, fontWeight: '500' }}>{item.label}</div>
                    <div style={{ fontSize: '20px', fontWeight: '800' }}>{item.status}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* BENTO GRID (Chart & Alerts) */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', marginBottom: '35px' }}>
              <div style={{ backgroundColor: '#fff', padding: '35px', borderRadius: '28px', border: `1px solid ${COLORS.border}`, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '30px' }}>RKAB vs Realisasi Produksi (Ton)</h3>
                <div style={{ height: '380px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                      <Tooltip cursor={{fill: '#f8fafc'}} />
                      <Bar dataKey="rkap_target" fill={COLORS.primary} radius={[7, 7, 0, 0]} barSize={30} />
                      <Bar dataKey="realization" fill={COLORS.accent} radius={[7, 7, 0, 0]} barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div style={{ backgroundColor: '#fff', padding: '35px', borderRadius: '28px', border: `1px solid ${COLORS.border}`, height: '490px', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px' }}>SCOR Alerts</h3>
                <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px' }}>
                  {data.map(item => (
                    <div key={item.id} style={{ padding: '20px', backgroundColor: '#fdf2f2', borderRadius: '20px', border: '1px solid #fee2e2', marginBottom: '15px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ fontWeight: '800', color: COLORS.danger }}>{item.month}</span>
                        <AlertTriangle size={18} color={COLORS.danger} />
                      </div>
                      <div style={{ fontSize: '22px', fontWeight: '900', color: COLORS.primary }}>{formatIDR(item.pof_opportunity_loss)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ backgroundColor: COLORS.bg, minHeight: '100vh', width: '100vw', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      {/* 1. TOP NAVIGATION BAR */}
      <nav style={{ backgroundColor: COLORS.nav, borderBottom: `1px solid ${COLORS.border}`, padding: '0 40px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ backgroundColor: COLORS.accent, padding: '6px', borderRadius: '8px' }}><Zap size={18} color="#fff"/></div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>RunDev <span style={{color: COLORS.accent}}>SCM</span></h2>
          </div>
          <div style={{ display: 'flex', gap: '25px' }}>
            {[
              { label: 'Dashboard', icon: <LayoutDashboard size={16}/> },
              { label: 'Coal Data', icon: <Database size={16}/> },
              { label: 'Reports', icon: <FileBarChart size={16}/> },
              { label: 'Settings', icon: <Settings size={16}/> }
            ].map((nav) => (
              <div key={nav.label} onClick={() => setActiveTab(nav.label)} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: activeTab === nav.label ? COLORS.accent : COLORS.textMuted, cursor: 'pointer', borderBottom: activeTab === nav.label ? `2px solid ${COLORS.accent}` : '2px solid transparent', height: '70px', padding: '0 5px', transition: '0.2s' }}>
                {nav.icon} {nav.label}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Bell size={20} color={COLORS.textMuted}/>
          <button style={{ padding: '10px 20px', borderRadius: '10px', background: COLORS.primary, color: '#fff', fontWeight: '700', cursor: 'pointer', border: 'none' }}>SKAB Digital</button>
        </div>
      </nav>

      {/* 2. MAIN CONTENT */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px' }}>
        <div style={{ marginBottom: '35px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>Operational <span style={{color: COLORS.accent}}>Control Tower</span></h1>
          <p style={{ color: COLORS.textMuted, marginTop: '5px' }}>Mode: {activeTab} | PT.XYZ Muara Enim</p>
        </div>
        {renderContent()}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default App;