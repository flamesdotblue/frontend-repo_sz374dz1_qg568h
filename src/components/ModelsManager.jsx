import { useEffect, useState } from 'react';
import { Plus, IndianRupee, Package } from 'lucide-react';

const MODELS_KEY = 'farmaking_models';

export default function ModelsManager({ onModelsChange }) {
  const [models, setModels] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', cost: '', customerPrice: '', dealerPrice: '' });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(MODELS_KEY) || '[]');
    setModels(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(MODELS_KEY, JSON.stringify(models));
    onModelsChange && onModelsChange(models);
  }, [models, onModelsChange]);

  const handleCreate = (e) => {
    e.preventDefault();
    const payload = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      cost: Number(form.cost) || 0,
      customerPrice: Number(form.customerPrice) || 0,
      dealerPrice: Number(form.dealerPrice) || 0,
      createdAt: Date.now(),
    };
    setModels((prev) => [payload, ...prev]);
    setForm({ name: '', cost: '', customerPrice: '', dealerPrice: '' });
    setOpen(false);
    window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Model added successfully!' } }));
  };

  return (
    <div className="p-4 md:p-6">
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 ring-1 ring-emerald-400/30">
            <Package className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Model Management</h2>
            <p className="text-sm text-neutral-400">Create and manage tractor models</p>
          </div>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-900/30 hover:from-emerald-400 hover:to-teal-400"
        >
          <Plus className="w-4 h-4" /> Add Model
        </button>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-neutral-300">
          <thead>
            <tr className="bg-white/5">
              <th className="text-left px-4 py-3 font-medium">Model</th>
              <th className="text-left px-4 py-3 font-medium">Cost</th>
              <th className="text-left px-4 py-3 font-medium">Customer Price</th>
              <th className="text-left px-4 py-3 font-medium">Dealer Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {models.map((m) => (
              <tr key={m.id} className="hover:bg-white/5">
                <td className="px-4 py-3">{m.name}</td>
                <td className="px-4 py-3 flex items-center gap-1"><IndianRupee className="w-4 h-4" />₹{m.cost.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 flex items-center gap-1 text-emerald-300"><IndianRupee className="w-4 h-4" />₹{m.customerPrice.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 flex items-center gap-1 text-teal-300"><IndianRupee className="w-4 h-4" />₹{m.dealerPrice.toLocaleString('en-IN')}</td>
              </tr>
            ))}
            {models.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-neutral-400">No models yet. Add your first model.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 transition">
          <div className="w-full max-w-lg bg-neutral-900 rounded-2xl ring-1 ring-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Create Model</h3>
              <button onClick={() => setOpen(false)} className="text-neutral-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm text-neutral-300 mb-1">Model Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-white ring-1 ring-white/10 focus:ring-emerald-500/40 outline-none"
                  placeholder="e.g., FK-210 Pro"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Model Cost</label>
                <input
                  type="number"
                  min="0"
                  value={form.cost}
                  onChange={(e) => setForm({ ...form, cost: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-white ring-1 ring-white/10 focus:ring-emerald-500/40 outline-none"
                  placeholder="e.g., 210000"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Customer Price</label>
                <input
                  type="number"
                  min="0"
                  value={form.customerPrice}
                  onChange={(e) => setForm({ ...form, customerPrice: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-white ring-1 ring-white/10 focus:ring-emerald-500/40 outline-none"
                  placeholder="e.g., 360000"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-neutral-300 mb-1">Dealer Price</label>
                <input
                  type="number"
                  min="0"
                  value={form.dealerPrice}
                  onChange={(e) => setForm({ ...form, dealerPrice: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-white ring-1 ring-white/10 focus:ring-emerald-500/40 outline-none"
                  placeholder="e.g., 310000"
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
