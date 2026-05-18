import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Sparkles } from 'lucide-react';
import NeonButton from '../components/ui/NeonButton';
import GlassCard from '../components/ui/GlassCard';
import PageWrapper from '../components/layout/PageWrapper';

const questions = [
  {
    question: 'You discover a mysterious door. What do you do?',
    options: [
      { text: 'Kick it open without hesitation', type: 'shounen' },
      { text: 'Observe it carefully before deciding', type: 'mystery' },
      { text: 'Walk away, it is not my business', type: 'slice_of_life' },
      { text: 'Feel drawn to it emotionally', type: 'drama' },
    ],
  },
  {
    question: 'What matters most in a story?',
    options: [
      { text: 'Epic battles and power', type: 'shounen' },
      { text: 'Unraveling the truth', type: 'mystery' },
      { text: 'Everyday moments of beauty', type: 'slice_of_life' },
      { text: 'Deep emotional connections', type: 'drama' },
    ],
  },
  {
    question: 'Your ideal weekend is...',
    options: [
      { text: 'Training or competing in something', type: 'shounen' },
      { text: 'Binge-watching a thriller series', type: 'mystery' },
      { text: 'Relaxing with friends at a cafe', type: 'slice_of_life' },
      { text: 'Getting lost in a good book or film', type: 'drama' },
    ],
  },
  {
    question: 'When you face a challenge, you...',
    options: [
      { text: 'Charge at it with determination', type: 'shounen' },
      { text: 'Analyze it from every angle', type: 'mystery' },
      { text: 'Take it one step at a time, calmly', type: 'slice_of_life' },
      { text: 'Feel it deeply and find meaning in it', type: 'drama' },
    ],
  },
  {
    question: 'Your anime soulmate would be...',
    options: [
      { text: 'A rival who pushes you to be stronger', type: 'shounen' },
      { text: 'A detective who sees through everything', type: 'mystery' },
      { text: 'A gentle friend who is always there', type: 'slice_of_life' },
      { text: 'A kindred spirit who understands your pain', type: 'drama' },
    ],
  },
];

const results: Record<string, { title: string; description: string; anime: string[]; color: string }> = {
  shounen: {
    title: 'The Shounen Hero',
    description: 'You are driven by passion, rivalry, and the will to never give up. Your spirit burns bright like a supernova.',
    anime: ['Naruto', 'One Piece', 'My Hero Academia', 'Haikyuu!!', 'Dragon Ball Z'],
    color: '#FF4500',
  },
  mystery: {
    title: 'The Mystery Solver',
    description: 'You see patterns others miss. Your mind is your greatest weapon, and the truth is your ultimate goal.',
    anime: ['Death Note', 'Monster', 'Steins;Gate', 'Psycho-Pass', 'Detective Conan'],
    color: '#BF00FF',
  },
  slice_of_life: {
    title: 'The Slice of Life Soul',
    description: 'You find beauty in the ordinary. Life is not about the destination but the gentle moments along the way.',
    anime: ['K-On!', 'Yuru Camp', 'Barakamon', 'Non Non Biyori', 'Aria the Animation'],
    color: '#00CED1',
  },
  drama: {
    title: 'The Drama Empath',
    description: 'You feel everything deeply. Stories are not entertainment for you — they are experiences that shape your soul.',
    anime: ['Your Lie in April', 'Clannad', 'Violet Evergarden', 'Anohana', 'A Silent Voice'],
    color: '#FF69B4',
  },
};

export default function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    const counts: Record<string, number> = {};
    answers.forEach((a) => { counts[a] = (counts[a] || 0) + 1; });
    const max = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    return results[max?.[0] || 'shounen'];
  };

  const reset = () => {
    setCurrentQ(0);
    setAnswers([]);
    setShowResult(false);
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-void pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <Sparkles className="w-10 h-10 text-neon-purple mx-auto mb-4" />
            <h1 className="font-display font-bold text-3xl sm:text-4xl gradient-text mb-2">What Anime Are You?</h1>
            <p className="text-text-secondary text-sm">Discover your anime personality</p>
          </div>

          <div className="flex items-center justify-center gap-1 mb-8">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`w-8 h-1 rounded-full transition-all duration-300
                  ${i <= currentQ || showResult ? 'bg-neon-cyan' : 'bg-glass-border'}`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-display font-bold text-xl text-text-primary text-center mb-6">
                  {questions[currentQ].question}
                </h2>
                <div className="space-y-3">
                  {questions[currentQ].options.map((option, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => handleAnswer(option.type)}
                      className="w-full text-left p-4 rounded-card glass-card border border-glass-border hover:border-neon-cyan/50 hover:bg-neon-cyan/5 transition-all duration-200"
                    >
                      <span className="text-sm text-text-primary">{option.text}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
              >
                {(() => {
                  const result = getResult();
                  return (
                    <GlassCard className="p-8 text-center" neonBorder>
                      <div
                        className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                        style={{
                          background: `${result.color}20`,
                          border: `2px solid ${result.color}50`,
                          boxShadow: `0 0 30px ${result.color}30`,
                        }}
                      >
                        <Sparkles className="w-10 h-10" style={{ color: result.color }} />
                      </div>
                      <h2 className="font-display font-bold text-2xl mb-3" style={{ color: result.color }}>
                        {result.title}
                      </h2>
                      <p className="text-text-secondary text-sm mb-6 max-w-md mx-auto">{result.description}</p>
                      <div className="mb-6">
                        <p className="text-xs font-mono text-text-muted mb-3">Your anime matches:</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {result.anime.map((title) => (
                            <span
                              key={title}
                              className="px-3 py-1 rounded-full text-xs font-mono border"
                              style={{
                                color: result.color,
                                borderColor: `${result.color}30`,
                                background: `${result.color}10`,
                              }}
                            >
                              {title}
                            </span>
                          ))}
                        </div>
                      </div>
                      <NeonButton variant="cyan" onClick={reset}>
                        <span className="flex items-center gap-2"><RotateCcw className="w-4 h-4" /> Retake Quiz</span>
                      </NeonButton>
                    </GlassCard>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
}
