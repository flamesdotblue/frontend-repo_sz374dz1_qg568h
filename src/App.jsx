import { useEffect, useMemo, useState } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import ModelsManager from './components/ModelsManager';
import DealersManager from './components/DealersManager';
import CustomersManager from './components/CustomersManager';
import { Menu } from 'lucide-react';

function Topbar({ active, onChange, onLogout }) {
  const items = [
    { key: 'models', label: 'Models' },
    { key: 'dealers', label: 'Dealers' },
    { key: 'customers', label: 'Customers' },
  ];
  return (
    <div className="md:hidden sticky top-0 z-40 bg-neutral-950/80 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60 border-b border-white/10">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="font-semibold text-white">FarmaKing</div>
        <button onClick={onLogout} className="text-sm text-neutral-300">Logout</button>
      </div>
      <div className="px-2 pb-2 flex gap-2">
        {items.map((it) => (
          <button
            key={it.key}
            onClick={() => onChange(it.key)}
            className={`px-3 py-2 rounded-lg text-sm ${
              active === it.key ? 'bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/30' : 'bg-white/5 text-neutral-300'
            }`}
          >
            {it.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [section, setSection] = useState('models');

  useEffect(() => {
    setLoggedIn(localStorage.getItem('farmaking_logged_in') === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('farmaking_logged_in');
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return <Login onSuccess={() => setLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900 text-neutral-200">
      <div className="flex">
        <Sidebar active={section} onChange={setSection} onLogout={handleLogout} />
        <main className="flex-1 min-h-screen">
          <Topbar active={section} onChange={setSection} onLogout={handleLogout} />
          {section === 'models' && <ModelsManager />}
          {section === 'dealers' && <DealersManager />}
          {section === 'customers' && <CustomersManager />}
        </main>
      </div>
    </div>
  );
}
