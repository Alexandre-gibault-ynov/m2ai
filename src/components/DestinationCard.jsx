import { motion } from 'framer-motion';

function DestinationCard({ destination, onExplore, index, isRecommended }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-[#11131e]"
    >
      <div className="relative h-60 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {isRecommended && (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-black">Recommandé</span>
        )}
      </div>
      <div className="space-y-3 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-gold/80">{destination.period}</p>
        <h3 className="text-xl font-semibold">{destination.name}</h3>
        <p className="text-sm text-slate-300">{destination.summary}</p>
        <button
          onClick={onExplore}
          className="mt-2 rounded-full border border-gold/60 px-4 py-2 text-sm font-medium transition-all duration-700 hover:bg-gold hover:text-black"
        >
          Explorer
        </button>
      </div>
    </motion.article>
  );
}

export default DestinationCard;
