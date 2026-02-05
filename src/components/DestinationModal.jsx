import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

function DestinationModal({ destination, onClose }) {
  return (
    <AnimatePresence>
      {destination && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-4 md:items-center"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.65 }}
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-gold/30 bg-[#0d0f18]"
          >
            <div className="relative h-56">
              <img src={destination.image} alt={destination.name} className="h-full w-full object-cover" />
              <button
                onClick={onClose}
                className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white"
                aria-label="fermer"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-6">
              <h4 className="text-2xl font-semibold">{destination.name}</h4>
              <p className="mt-3 text-slate-300">{destination.details}</p>
              <p className="mt-3 text-sm font-semibold text-gold">{destination.priceRange}</p>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <h5 className="text-sm uppercase tracking-[0.18em] text-gold">Points forts</h5>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    {destination.highlights.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm uppercase tracking-[0.18em] text-gold">Expériences</h5>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    {destination.experiences.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DestinationModal;
