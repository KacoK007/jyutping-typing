import React, { useState, useEffect } from 'react';
import Keyboard from './components/Keyboard';
import { questions } from './constants';
import { initials } from './constants';

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-HK";
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

// Helper to parse jyutping input into initial, final, tone
function parseJyutpingInput(value) {
  // Assume tone is always the last character and is a digit
  const toneMatch = value.match(/([1-6])$/);
  const tone = toneMatch ? toneMatch[1] : '';
  const rest = tone ? value.slice(0, -1) : value;
  const foundInitial = initials.find(init => rest.startsWith(init)) || '';
  const final = rest.slice(foundInitial.length);
  return { initial: foundInitial, final, tone };
}

export default function JyutpingPractice() {
  const [current, setCurrent] = useState(0);
  const [inputs, setInputs] = useState({
    initial: '',
    final: '',
    tone: ''
  });
  const [feedback, setFeedback] = useState({ message: '', isCorrect: null });
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [resetKeyboards, setResetKeyboards] = useState(false);
  const question = questions[current];
  const userInput = inputs.initial + inputs.final + (inputs.tone || '');

  useEffect(() => {
    setInputs({ initial: '', final: '', tone: '' });
    setFeedback({ message: '', isCorrect: null });
  }, [current]);

  const handleSubmit = () => {
    if (feedback.message) {
      setCurrent(prev => (prev + 1) % questions.length);
      return;
    }

    // Compare without tone if tone wasn't provided
    const userJyutping = inputs.initial + inputs.final;
    const isCorrect = question.jyutpings.some(correctJyutping => {
      if (inputs.tone) {
        return userInput === correctJyutping;
      } else {
        return userJyutping === correctJyutping.slice(0, -1);
      }
    });

    setScore(prev => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      total: prev.total + 1
    }));

    if (isCorrect) {
      setFeedback({ 
        message: `✅ Correct! Possible answers: ${question.jyutpings.join(', ')}`, 
        isCorrect: true 
      });
    } else {
      let incorrectParts = [];

      // Helper to split jyutping into initial, final, tone
      function splitJyutping(jyutping) {
        // Assume tone is always the last character and is a digit
        const tone = jyutping.slice(-1);
        const rest = jyutping.slice(0, -1);
        // Find matching initial from initials list
        const foundInitial = initials.find(init => rest.startsWith(init)) || '';
        const final = rest.slice(foundInitial.length);
        return { initial: foundInitial, final, tone };
      }

      // Check each part
      const partCorrect = { initial: false, final: false, tone: false };
      question.jyutpings.forEach(j => {
        const parts = splitJyutping(j);
        if (inputs.initial === parts.initial) partCorrect.initial = true;
        if (inputs.final === parts.final) partCorrect.final = true;
        if (!inputs.tone || inputs.tone === parts.tone) partCorrect.tone = true;
      });

      if (!partCorrect.initial) incorrectParts.push('initial');
      if (!partCorrect.final) incorrectParts.push('final');
      if (inputs.tone && !partCorrect.tone) incorrectParts.push('tone');

      setFeedback({ 
        message: `❌ Incorrect (wrong ${incorrectParts.join(', ')}). Possible answers: ${question.jyutpings.join(', ')}`,
        isCorrect: false 
      });
    }
  };

  const isReady = inputs.final;

  useEffect(() => {
    if (resetKeyboards) {
      setResetKeyboards(false);
    }
  }, [resetKeyboards]);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Jyutping Typing Practice</h1>
      <div className="mb-4 text-lg">
        Progress: {score.correct}/{score.total} correct ({Math.round((score.correct / Math.max(1, score.total)) * 100)}%)
      </div>
      
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="mb-2 text-xl">
          {question.type === 'word' ? 'Word' : 'Character'}: 
          <span className="font-bold text-2xl ml-2">{question.char}</span>
          <button
            className="ml-2 px-2 py-1 rounded hover:bg-blue-100"
            onClick={() => speak(question.char)}
          >
            🔊
          </button>
        </div>
      </div>

      {/* New: Jyutping text input */}
      <div className="mb-4">
        <label className="block mb-1 font-medium" htmlFor="jyutping-input">Type Jyutping:</label>
        <input
          id="jyutping-input"
          className="w-full px-3 py-2 border rounded font-mono text-lg"
          type="text"
          value={userInput}
          onChange={e => {
            const parsed = parseJyutpingInput(e.target.value.trim().toLowerCase());
            setInputs(parsed);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' && isReady) {
              handleSubmit();
              setResetKeyboards(true);
            }
          }}
          placeholder="e.g. ngo5"
          autoComplete="off"
        />
      </div>

      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="mb-2">
          Your input: <span className="font-mono text-2xl font-bold text-blue-600">{userInput}</span>
          {!inputs.tone && <span className="text-gray-500"> (no tone)</span>}
        </div>
        {feedback.message && (
          <div className={`mt-2 p-2 rounded ${feedback.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
            {feedback.message}
          </div>
        )}
      </div>

      <Keyboard
        type="syllable"
        initialValue={inputs.initial}
        finalValue={inputs.final}
        onInitialChange={(initial) => setInputs(prev => ({ ...prev, initial }))}
        onFinalChange={(final) => setInputs(prev => ({ ...prev, final }))}
        reset={resetKeyboards}
      />

      <Keyboard
        type="tone"
        onToneChange={(tone) => setInputs(prev => ({ ...prev, tone }))}
        reset={resetKeyboards}
      />

      <button
        className={`w-full py-3 rounded-lg text-lg font-bold ${
          isReady ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'
        } text-white transition-colors`}
        onClick={() => { handleSubmit(); setResetKeyboards(true); }}
        disabled={!isReady}
      >
        {feedback.message ? 'Next Question' : 'Submit'}
      </button>
    </div>
  );
}