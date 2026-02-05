import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock3, Menu, Sparkles, X } from 'lucide-react';
import DestinationCard from './components/DestinationCard';
import DestinationModal from './components/DestinationModal';
import ChatWidget from './components/ChatWidget';
import Quiz from './components/Quiz';
import BookingForm from './components/BookingForm';

const destinations = [
  {
    id: 'paris-1889',
    name: 'Paris 1889 – Belle Époque',
    period: 'Exposition Universelle',
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80',
    summary: 'Vivez le faste parisien avec l’inauguration de la tour Eiffel et les salons artistiques privés.',
    details:
      'Partez pour une immersion raffinée au cœur de la Belle Époque. Entre réceptions mondaines, cabarets élégants et balades en fiacre, découvrez Paris dans sa période la plus flamboyante.',
    highlights: ['Dîner privé vue tour Eiffel', 'Accès VIP aux salons impressionnistes', 'Concierge temporel 24/7'],
    experiences: ['Croisière nocturne sur la Seine', 'Initiation à la haute couture de 1889', 'Rencontre guidée avec des inventeurs'],
    priceRange: 'À partir de 8 900€ / voyageur',
  },
  {
    id: 'cretace',
    name: 'Crétacé (−65 millions d’années)',
    period: 'Ère préhistorique premium',
    image:
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1600&q=80',
    summary: 'Observez des dinosaures dans des zones sécurisées avec capsules panoramiques blindées.',
    details:
      'Pour les explorateurs exigeants, notre circuit Crétacé offre une aventure spectaculaire. Vous découvrirez une biodiversité gigantesque depuis des plateformes anti-impact certifiées.',
    highlights: ['Capsule anti-paradoxe niveau 5', 'Guide paléo-biologiste expert', 'Protocoles de sécurité quantum'],
    experiences: ['Safari titanosaures', 'Observation volcanique au coucher du soleil', 'Laboratoire fossiles interactif'],
    priceRange: 'À partir de 14 500€ / voyageur',
  },
  {
    id: 'florence-1504',
    name: 'Florence 1504 – Renaissance',
    period: 'Âge d’or artistique',
    image:
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=1600&q=80',
    summary: 'Rencontrez les maîtres de la Renaissance et vivez l’effervescence artistique florentine.',
    details:
      'Séjournez dans un palais florentin discret et expérimentez la Renaissance de l’intérieur. Ateliers, mécénat, architecture et innovations vous attendent.',
    highlights: ['Atelier privé d’artistes', 'Visites nocturnes hors public', 'Sommelier historique dédié'],
    experiences: ['Cours de peinture à tempera', 'Banquet inspiré des Médicis', 'Parcours secret des chefs-d’œuvre'],
    priceRange: 'À partir de 9 700€ / voyageur',
  },
];

const navItems = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Quiz', href: '#quiz' },
  { label: 'Planifier', href: '#booking' },
  { label: 'Agent IA', href: '#chatbot' },
  { label: 'Contact', href: '#footer' },
];

function App() {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [recommendedId, setRecommendedId] = useState(destinations[0].id);

  const recommendation = useMemo(
    () => destinations.find((destination) => destination.id === recommendedId),
    [recommendedId],
  );

  return (
    <div className="min-h-screen bg-night text-white">
      <header className="fixed top-0 z-40 w-full border-b border-white/10 bg-[#07080d]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <a href="#hero" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            <Clock3 size={17} /> TimeTravel Agency
          </a>

          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors duration-700 hover:text-gold">
                {item.label}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden"
            aria-label="ouvrir le menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-white/10 bg-[#080a11] px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3 text-sm">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="transition-colors duration-700 hover:text-gold"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        <section
          id="hero"
          className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-[#171924] via-[#0a0d16] to-[#07080d] px-4 pt-24 md:px-8"
        >
          <img
            className="absolute inset-0 h-full w-full object-cover opacity-35"
            src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1900&q=80"
            alt="Fond spatial temporel"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07080d] via-[#07080ddf] to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto max-w-6xl"
          >
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/60 bg-gold/10 px-4 py-2 text-xs uppercase tracking-[0.15em] text-gold">
              <Sparkles size={14} /> Voyages temporels de prestige
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight md:text-6xl">
              Traversez les siècles avec l’élégance d’un service <span className="text-gold">ultra-premium</span>.
            </h1>
            <p className="mt-5 max-w-xl text-base text-slate-200 md:text-lg">
              TimeTravel Agency orchestre des expéditions exclusives à travers les plus grandes époques de l’Histoire, accompagnées
              d’un concierge IA et d’une sécurité temporelle de haut niveau.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#destinations"
                className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black transition-transform duration-700 hover:-translate-y-0.5"
              >
                Découvrir les destinations
              </a>
              <a
                href="#chatbot"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium transition-colors duration-700 hover:border-gold hover:text-gold"
              >
                Parler à un conseiller
              </a>
            </div>
          </motion.div>
        </section>

        <section id="destinations" className="mx-auto max-w-6xl px-4 py-20 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm uppercase tracking-[0.2em] text-gold">Destinations signature</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Choisissez votre époque d’exception</h2>
          </motion.div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {destinations.map((destination, index) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                index={index}
                isRecommended={destination.id === recommendation?.id}
                onExplore={() => setSelectedDestination(destination)}
              />
            ))}
          </div>
        </section>

        <section id="quiz" className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
          <Quiz onRecommendation={setRecommendedId} />
        </section>

        <section id="booking" className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
          <BookingForm destinations={destinations} />
        </section>

        <section id="chatbot" className="mx-auto max-w-6xl px-4 pb-24 md:px-6">
          <div className="rounded-3xl border border-gold/20 bg-[#11131e] p-8">
            <h3 className="text-2xl font-semibold">Concierge IA inclus</h3>
            <p className="mt-3 max-w-2xl text-slate-300">
              Notre agent conversationnel vous accompagne dans le choix de votre destination, les activités recommandées et la
              création d’un programme temporel personnalisé.
            </p>
          </div>
        </section>
      </main>

      <footer id="footer" className="border-t border-white/10 px-4 py-10 text-sm text-slate-300 md:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} TimeTravel Agency — L’excellence du voyage temporel.</p>
          <p>Expériences fictives • Design premium • Déploiement prêt Vercel/Netlify</p>
        </div>
      </footer>

      <ChatWidget destinations={destinations} />

      <DestinationModal destination={selectedDestination} onClose={() => setSelectedDestination(null)} />
    </div>
  );
}

export default App;
