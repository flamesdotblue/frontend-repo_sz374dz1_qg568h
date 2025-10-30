import { Factory, Package, Users, User, LogOut } from 'lucide-react';

export default function Sidebar({ active, onChange, onLogout }) {
  const items = [
    { key: 'models', label: 'Models', icon: Package },
    { key: 'dealers', label: 'Dealers', icon: Factory },
    { key: 'customers', label: 'Customers', icon: Users },
  ];

  return (
    <aside className="h-screen w-64 bg-neutral-950 text-neutral-200 border-r border-white/10 hidden md:flex flex-col">
      <div className="p-5 border-b border-white/10">
        <div className="text-lg font-semibold">FarmaKing</div>
        <div className="text-xs text-neutral-400">Automation Dashboard</div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {items.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              active === key
                ? 'bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/30'
                : 'hover:bg-white/5'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-white/10">
        <button
          onClick={onLogout}
          className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-200"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
