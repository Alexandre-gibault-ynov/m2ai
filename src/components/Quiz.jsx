import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const questions = [
  {
    id: 'mood',
    question: 'Quelle ambiance recherchez-vous ?',
    options: [
      { label: 'Art, salons et élégance urbaine', value: 'paris-1889' },
      { label: 'Aventure extrême et nature brute', value: 'cretace' },
      { label: 'Culture, génie et raffinement', value: 'florence-1504' },
    ],
  },
  {
    id: 'comfort',
    question: 'Niveau d’adrénaline souhaité ?',
    options: [
      { label: 'Faible', value: 'florence-1504' },
      { label: 'Moyen', value: 'paris-1889' },
      { label: 'Élevé', value: 'cretace' },
    ],
  },
  {
    id: 'purpose',
    question: 'Votre objectif principal ?',
    options: [
      { label: 'Vivre une soirée iconique', value: 'paris-1889' },
      { label: 'Observer des dinosaures', value: 'cretace' },
      { label: 'Rencontrer des artistes légendaires', value: 'florence-1504' },
    ],
  },
];

function Quiz({ onRecommendation }) {
  const [answers, setAnswers] = useState({});

  const result = useMemo(() => {
    const votes = Object.values(answers).reduce((accumulator, value) => {
      accumulator[value] = (accumulator[value] || 0) + 1;
      return accumulator;
    }, {});

    const winner = Object.entries(votes).sort((a, b) => b[1] - a[1])[0]?.[0];
    return winner;
  }, [answers]);

  const handleAnswer = (questionId, value) => {
    const next = { ...answers, [questionId]: value };
    setAnswers(next);

    const allAnswered = Object.keys(next).length === questions.length;
    if (allAnswered) {
      const votes = Object.values(next).reduce((accumulator, current) => {
        accumulator[current] = (accumulator[current] || 0) + 1;
        return accumulator;
      }, {});

      const winner = Object.entries(votes).sort((a, b) => b[1] - a[1])[0]?.[0];
      if (winner) onRecommendation(winner);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="rounded-3xl border border-white/10 bg-[#11131e] p-6"
    >
      <p className="text-sm uppercase tracking-[0.2em] text-gold">Personnalisation intelligente</p>
      <h3 className="mt-2 text-2xl font-semibold">Quiz de recommandation temporelle</h3>
      <div className="mt-6 space-y-6">
        {questions.map((question) => (
          <div key={question.id}>
            <p className="mb-2 text-sm font-medium">{question.question}</p>
            <div className="flex flex-wrap gap-2">
              {question.options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleAnswer(question.id, option.value)}
                  className={`rounded-full border px-4 py-2 text-sm transition-all duration-700 ${
                    answers[question.id] === option.value
                      ? 'border-gold bg-gold text-black'
                      : 'border-white/20 text-slate-200 hover:border-gold hover:text-gold'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {result && <p className="mt-6 text-sm text-gold">Destination recommandée débloquée dans la galerie ✨</p>}
    </motion.div>
  );
}

export default Quiz;
