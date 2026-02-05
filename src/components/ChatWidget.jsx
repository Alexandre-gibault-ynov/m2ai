import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Send, X } from 'lucide-react';
import { askTravelAgent, hasRealProviderConfig } from '../lib/aiProvider';

const fallbackFaq = [
  {
    trigger: ['prix', 'tarif', 'coût', 'combien', 'price'],
    response: 'Our journeys usually start around €8,900 and can exceed €20,000 depending on personalization and safety class.',
  },
  {
    trigger: ['sécurité', 'danger', 'risque', 'safety', 'safe'],
    response:
      'Each trip includes chrono-certified safety protocols: stabilized capsule, paradox controls, and real-time monitoring by our temporal operations team.',
  },
  {
    trigger: ['réserver', 'reservation', 'book', 'booking'],
    response:
      'You can choose a destination and preferred dates, then our concierge finalizes a tailored proposal with a coherent fictional price range.',
  },
];

function findFallbackDestinationMessage(destinations, message) {
  const normalized = message.toLowerCase();
  const found = destinations.find((destination) => {
    const firstWord = destination.name.toLowerCase().split(' ')[0];
    return normalized.includes(firstWord);
  });

  if (!found) return null;
  return `Excellent choice. ${found.name} is ideal if you want to ${found.summary.toLowerCase()} ${found.priceRange}.`;
}

function getFallbackResponse(message, destinations) {
  const lower = message.toLowerCase();
  const destinationMessage = findFallbackDestinationMessage(destinations, message);
  if (destinationMessage) return destinationMessage;

  const faqEntry = fallbackFaq.find((entry) => entry.trigger.some((keyword) => lower.includes(keyword)));
  if (faqEntry) return faqEntry.response;

  if (lower.includes('bonjour') || lower.includes('salut') || lower.includes('hello') || lower.includes('hi')) {
    return 'Welcome to TimeTravel Agency ✨ I am Chronos, your premium travel advisor. Tell me the era you dream of and I will design the right experience.';
  }

  return 'I can recommend the right era, explain safety protocols, and create a coherent fictional budget for your trip. Tell me your interests.';
}

function ChatWidget({ destinations }) {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hello, I am Chronos, your premium AI concierge. Ask me anything about time-travel journeys…',
    },
  ]);

  const configured = hasRealProviderConfig();
  const canSend = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);

  const sendMessage = async () => {
    if (!canSend) return;

    const userText = input.trim();
    const nextMessages = [...messages, { role: 'user', text: userText }];

    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const aiText = configured
        ? await askTravelAgent({
            message: userText,
            history: nextMessages,
            destinations,
          })
        : getFallbackResponse(userText, destinations);

      setMessages((prev) => [...prev, { role: 'assistant', text: aiText }]);
    } catch (error) {
      const fallbackText = getFallbackResponse(userText, destinations);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `I cannot reach the live AI provider right now, so I am switching to local concierge mode. ${fallbackText}`,
        },
      ]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
            className="mb-3 flex h-[460px] w-[min(92vw,360px)] flex-col rounded-3xl border border-gold/35 bg-[#0e111b] shadow-glow"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div>
                <p className="flex items-center gap-2 text-sm font-medium text-gold">
                  <Bot size={16} /> Agent IA — Chronos
                </p>
                <p className="mt-0.5 text-[11px] text-slate-400">{configured ? 'Live AI provider: OpenRouter' : 'Local fallback mode'}</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="close chat">
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
              {isLoading && <div className="max-w-[90%] rounded-2xl bg-white/10 px-3 py-2 text-sm text-slate-300">Chronos is preparing your itinerary…</div>}
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
                  aria-label="send"
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
          <Bot size={16} /> Open AI concierge
        </button>
      )}
    </div>
  );
}

export default ChatWidget;
