import { useState } from 'react';
import { motion } from 'framer-motion';

function BookingForm({ destinations }) {
  const [form, setForm] = useState({ destination: destinations[0].id, date: '', guests: 2 });
  const [confirmation, setConfirmation] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    if (!form.date) {
      setConfirmation('Merci de sélectionner une date de départ.');
      return;
    }
    const destination = destinations.find((item) => item.id === form.destination);
    setConfirmation(`Parfait. Votre pré-réservation pour ${destination.name} (${form.guests} voyageur(s)) est enregistrée pour le ${form.date}.`);
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="rounded-3xl border border-white/10 bg-[#11131e] p-6"
    >
      <p className="text-sm uppercase tracking-[0.2em] text-gold">Planifier</p>
      <h3 className="mt-2 text-2xl font-semibold">Pré-réservation express</h3>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <label className="text-sm text-slate-300">
          Destination
          <select
            value={form.destination}
            onChange={(event) => setForm((prev) => ({ ...prev, destination: event.target.value }))}
            className="mt-1 w-full rounded-xl border border-white/15 bg-[#0c0f17] px-3 py-2 outline-none focus:border-gold"
          >
            {destinations.map((destination) => (
              <option key={destination.id} value={destination.id}>
                {destination.name}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm text-slate-300">
          Date de départ
          <input
            type="date"
            value={form.date}
            onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
            className="mt-1 w-full rounded-xl border border-white/15 bg-[#0c0f17] px-3 py-2 outline-none focus:border-gold"
          />
        </label>

        <label className="text-sm text-slate-300">
          Voyageurs
          <input
            type="number"
            min="1"
            max="6"
            value={form.guests}
            onChange={(event) => setForm((prev) => ({ ...prev, guests: Number(event.target.value) }))}
            className="mt-1 w-full rounded-xl border border-white/15 bg-[#0c0f17] px-3 py-2 outline-none focus:border-gold"
          />
        </label>
      </div>

      <button className="mt-5 rounded-full bg-gold px-5 py-2 text-sm font-semibold text-black">Valider ma demande</button>
      {confirmation && <p className="mt-4 text-sm text-gold">{confirmation}</p>}
    </motion.form>
  );
}

export default BookingForm;
