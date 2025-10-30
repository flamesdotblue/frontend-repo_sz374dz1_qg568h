import { useEffect, useMemo, useState } from 'react';
import { Users, Plus, IndianRupee } from 'lucide-react';

const CUSTOMERS_KEY = 'farmaking_customers';
const MODELS_KEY = 'farmaking_models';
const DEALERS_KEY = 'farmaking_dealers';

export default function CustomersManager() {
  const [customers, setCustomers] = useState([]);
  const [models, setModels] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    type: 'direct',
    dealerId: '',
    name: '',
    contact: '',
    modelId: '',
    hasReference: false,
  });

  useEffect(() => {
    setCustomers(JSON.parse(localStorage.getItem(CUSTOMERS_KEY) || '[]'));
    setModels(JSON.parse(localStorage.getItem(MODELS_KEY) || '[]'));
    setDealers(JSON.parse(localStorage.getItem(DEALERS_KEY) || '[]'));
  }, []);

  useEffect(() => {
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
  }, [customers]);

  const selectedModel = useMemo(() => models.find((m) => m.id === form.modelId), [models, form.modelId]);

  const computed = useMemo(() => {
    if (!selectedModel) return { selling: 0, profit: 0 };
    const base = form.type === 'direct' ? selectedModel.customerPrice : selectedModel.dealerPrice;
    const selling = base + (form.hasReference ? 20000 : 0);
    const profit = selling - selectedModel.cost;
    return { selling, profit };
  }, [selectedModel, form.type, form.hasReference]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!selectedModel) return;
    const payload = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      contact: form.contact.trim(),
      type: form.type,
      dealerId: form.type === 'dealer' ? form.dealerId : '',
      modelId: form.modelId,
      hasReference: !!form.hasReference,
      sellingPrice: computed.selling,
      profit: computed.profit,
      createdAt: Date.now(),
    };
    setCustomers((prev) => [payload, ...prev]);
    setOpen(false);
    setForm({ type: 'direct', dealerId: '', name: '', contact: '', modelId: '', hasReference: false });
    window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Customer added successfully!' } }));
  };

  const dealerName = (id) => dealers.find((d) => d.id === id)?.name || '—';
  const modelName = (id) => models.find((m) => m.id === id)?.name || '—';

  return (
    <div className="p-4 md:p-6">
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 ring-1 ring-emerald-400/30">
            <Users className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Customer Management</h2>
            <p className="text-sm text-neutral-400">Add customers and track selling price & profit</p>
          </div>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-900/30 hover:from-emerald-400 hover:to-teal-400"
        >
          <Plus className="w-4 h-4" /> Add Customer
        </button>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-neutral-300">
          <thead>
            <tr className="bg-white/5">
              <th className="text-left px-4 py-3 font-medium">Customer</th>
              <th className="text-left px-4 py-3 font-medium">Type</th>
              <th className="text-left px-4 py-3 font-medium">Dealer</th>
              <th className="text-left px-4 py-3 font-medium">Model</th>
              <th className="text-left px-4 py-3 font-medium">Selling Price</th>
              <th className="text-left px-4 py-3 font-medium">Profit</th>
              <th className="text-left px-4 py-3 font-medium">Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-white/5">
                <td className="px-4 py-3 text-white">{c.name}</td>
                <td className="px-4 py-3">{c.type === 'direct' ? 'Direct' : "Dealer's"}</td>
                <td className="px-4 py-3">{c.type === 'dealer' ? dealerName(c.dealerId) : '—'}</td>
                <td className="px-4 py-3">{modelName(c.modelId)}</td>
                <td className="px-4 py-3 flex items-center gap-1 text-emerald-300"><IndianRupee className="w-4 h-4" />₹{c.sellingPrice.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 flex items-center gap-1 text-teal-300"><IndianRupee className="w-4 h-4" />₹{c.profit.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3">{c.contact || '—'}</td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-neutral-400">No customers yet. Add your first customer.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 transition">
          <div className="w-full max-w-2xl bg-neutral-900 rounded-2xl ring-1 ring-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Add Customer</h3>
              <button onClick={() => setOpen(false)} className="text-neutral-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Customer Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-white ring-1 ring-white/10 focus:ring-emerald-500/40 outline-none"
                  placeholder="e.g., Rohan Kumar"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Contact Number</label>
                <input
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-white ring-1 ring-white/10 focus:ring-emerald-500/40 outline-none"
                  placeholder="e.g., 9876543210"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-white ring-1 ring-white/10 focus:ring-emerald-500/40 outline-none"
                >
                  <option value="direct">Direct Customer</option>
                  <option value="dealer">Dealer's Customer</option>
                </select>
              </div>

              {form.type === 'dealer' && (
                <div className="md:col-span-1">
                  <label className="block text-sm text-neutral-300 mb-1">Select Dealer</label>
                  <select
                    required
                    value={form.dealerId}
                    onChange={(e) => setForm({ ...form, dealerId: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-white ring-1 ring-white/10 focus:ring-emerald-500/40 outline-none"
                  >
                    <option value="">Select dealer</option>
                    {dealers.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="md:col-span-2">
                <label className="block text-sm text-neutral-300 mb-1">Selected Model</label>
                <select
                  required
                  value={form.modelId}
                  onChange={(e) => setForm({ ...form, modelId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-white ring-1 ring-white/10 focus:ring-emerald-500/40 outline-none"
                >
                  <option value="">Select model</option>
                  {models.map((m) => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <input
                  id="hasReference"
                  type="checkbox"
                  checked={form.hasReference}
                  onChange={(e) => setForm({ ...form, hasReference: e.target.checked })}
                  className="h-4 w-4 rounded border-white/20 bg-neutral-800"
                />
                <label htmlFor="hasReference" className="text-sm text-neutral-300">Has Reference (Adds ₹20,000)</label>
              </div>

              <div className="md:col-span-3 mt-2 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-white/5 ring-1 ring-white/10">
                  <div className="text-xs text-neutral-400">Selling Price</div>
                  <div className="flex items-center gap-1 text-emerald-300 font-semibold">
                    <IndianRupee className="w-4 h-4" />
                    ₹{computed.selling.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-white/5 ring-1 ring-white/10">
                  <div className="text-xs text-neutral-400">Profit</div>
                  <div className="flex items-center gap-1 text-teal-300 font-semibold">
                    <IndianRupee className="w-4 h-4" />
                    ₹{computed.profit.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <div className="md:col-span-3 flex items-center justify-end gap-2 pt-2">
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
