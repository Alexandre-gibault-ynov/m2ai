import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Send, X } from 'lucide-react';

const faq = [
  {
    trigger: ['prix', 'tarif', 'coût', 'combien'],
    response: 'Nos expériences commencent autour de 8 900€ et peuvent aller au-delà de 20 000€ selon le niveau de personnalisation.',
  },
  {
    trigger: ['sécurité', 'danger', 'risque'],
    response: 'Chaque voyage inclut un protocole de sécurité chrono-certifié, avec capsule stabilisée et monitoring en temps réel.',
  },
  {
    trigger: ['réserver', 'reservation', 'book'],
    response: 'Vous pouvez sélectionner une destination, puis confirmer vos dates et préférences via notre conseiller pour obtenir une proposition immédiate.',
  },
];

function findDestinationMessage(destinations, message) {
  const found = destinations.find((destination) => message.toLowerCase().includes(destination.name.toLowerCase().split(' ')[0].toLowerCase()));
  if (!found) return null;
  return `Excellente idée. ${found.name} est parfaite pour ${found.summary.toLowerCase()} ${found.priceRange}.`;
}

function getAiResponse(message, destinations) {
  const lower = message.toLowerCase();
  const destinationMessage = findDestinationMessage(destinations, message);

  if (destinationMessage) return destinationMessage;

  const faqEntry = faq.find((entry) => entry.trigger.some((keyword) => lower.includes(keyword)));
  if (faqEntry) return faqEntry.response;

  if (lower.includes('bonjour') || lower.includes('salut')) {
    return 'Bienvenue chez TimeTravel Agency ✨ Je suis votre concierge IA, ravi de préparer votre prochaine immersion historique.';
  }

  return 'Je peux vous recommander une destination, expliquer nos protocoles de sécurité et simuler un budget sur mesure. Dites-moi ce qui vous fait rêver.';
}

function ChatWidget({ destinations }) {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Bonjour, je suis Chronos, votre conseiller IA premium. Posez-moi vos questions sur les voyages temporels…',
    },
  ]);

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  const sendMessage = () => {
    if (!canSend) return;
    const userText = input.trim();
    const aiText = getAiResponse(userText, destinations);
    setMessages((prev) => [...prev, { role: 'user', text: userText }, { role: 'assistant', text: aiText }]);
    setInput('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50" aria-live="polite">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.65 }}
            className="mb-3 flex h-[440px] w-[min(92vw,360px)] flex-col rounded-3xl border border-gold/35 bg-[#0e111b] shadow-glow"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <p className="flex items-center gap-2 text-sm font-medium text-gold">
                <Bot size={16} /> Agent IA — Chronos
              </p>
              <button onClick={() => setOpen(false)} aria-label="fermer le chat">
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm ${
                    message.role === 'assistant' ? 'bg-white/10 text-slate-100' : 'ml-auto bg-gold text-black'
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 p-3">
              <div className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => event.key === 'Enter' && sendMessage()}
                  placeholder="Posez-moi vos questions sur les voyages temporels…"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
                <button
                  onClick={sendMessage}
                  disabled={!canSend}
                  className="rounded-full bg-gold p-2 text-black disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="envoyer"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="ml-auto flex items-center gap-2 rounded-full bg-gold px-4 py-3 text-sm font-medium text-black shadow-glow"
        >
          <Bot size={16} /> Ouvrir le conseiller IA
        </button>
      )}
    </div>
  );
}

export default ChatWidget;
