import { useEffect, useState } from 'react';
import { Plus, Factory, MapPin } from 'lucide-react';

const DEALERS_KEY = 'farmaking_dealers';

export default function DealersManager({ onDealersChange }) {
  const [dealers, setDealers] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', location: '', referenceId: '' });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(DEALERS_KEY) || '[]');
    setDealers(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(DEALERS_KEY, JSON.stringify(dealers));
    onDealersChange && onDealersChange(dealers);
  }, [dealers, onDealersChange]);

  const handleCreate = (e) => {
    e.preventDefault();
    const payload = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      location: form.location.trim(),
      referenceId: form.referenceId.trim(),
      createdAt: Date.now(),
    };
    setDealers((prev) => [payload, ...prev]);
    setForm({ name: '', location: '', referenceId: '' });
    setOpen(false);
  };

  return (
    <div className="p-4 md:p-6">
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 ring-1 ring-emerald-400/30">
            <Factory className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Dealer Management</h2>
            <p className="text-sm text-neutral-400">Add and manage dealer partners</p>
          </div>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-900/30 hover:from-emerald-400 hover:to-teal-400"
        >
          <Plus className="w-4 h-4" /> Add Dealer
        </button>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dealers.map((d) => (
          <div key={d.id} className="p-4 rounded-xl bg-white/5 ring-1 ring-white/10 text-neutral-200">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-white">{d.name}</div>
            </div>
            <div className="mt-2 flex items-center gap-2 text-neutral-400 text-sm">
              <MapPin className="w-4 h-4" /> {d.location || '—'}
            </div>
            <div className="mt-1 text-neutral-400 text-sm">Ref ID: {d.referenceId || '—'}</div>
          </div>
        ))}
        {dealers.length === 0 && (
          <div className="text-neutral-400">No dealers yet. Add your first dealer.</div>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
          <div className="w-full max-w-lg bg-neutral-900 rounded-2xl ring-1 ring-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Add Dealer</h3>
              <button onClick={() => setOpen(false)} className="text-neutral-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm text-neutral-300 mb-1">Dealer Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-white ring-1 ring-white/10 focus:ring-emerald-500/40 outline-none"
                  placeholder="e.g., GreenField Motors"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Location</label>
                <input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-white ring-1 ring-white/10 focus:ring-emerald-500/40 outline-none"
                  placeholder="City / Region"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Reference ID (optional)</label>
                <input
                  value={form.referenceId}
                  onChange={(e) => setForm({ ...form, referenceId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-white ring-1 ring-white/10 focus:ring-emerald-500/40 outline-none"
                  placeholder="e.g., DLR-0021"
                />
              </div>
              <div className="md:col-span-2 flex items-center justify-end gap-2 pt-2">
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg bg-white/5 text-neutral-300 hover:bg-white/10">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-400">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
