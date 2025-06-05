import React, { useState, useEffect } from 'react';
import Keyboard from './components/Keyboard';
import Feedback from './components/Feedback';
import CharacterDisplay from './components/CharacterDisplay';
import JyutpingInput from './components/JyutpingInput';
import HelpModal from './components/HelpModal';
import InfoModal from './components/InfoModal';
import { questions } from './utils/questions';
import { parseJyutpingInput } from './utils/jyutping';

export default function JyutpingPractice() {
  const [current, setCurrent] = useState(0);
  const [inputs, setInputs] = useState({ initial: '', final: '', tone: '' });
  const [feedback, setFeedback] = useState({ message: '', isCorrect: null });
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [resetKeyboards, setResetKeyboards] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const question = questions[current];
  const userInput = inputs.initial + inputs.final + (inputs.tone || '');

  useEffect(() => {
    setInputs({ initial: '', final: '', tone: '' });
    setFeedback({ message: '', isCorrect: null });
  }, [current]);

  useEffect(() => {
    if (resetKeyboards) {
      setResetKeyboards(false);
    }
  }, [resetKeyboards]);

  const handleSubmit = () => {
    if (feedback.message) {
      setCurrent(prev => (prev + 1) % questions.length);
      return;
    }

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
      const partCorrect = { initial: false, final: false, tone: false };
      question.jyutpings.forEach(j => {
        const parts = parseJyutpingInput(j);
        if (inputs.initial === parts.initial) partCorrect.initial = true;
        if (inputs.final === parts.final) partCorrect.final = true;
        if (!inputs.tone || inputs.tone === parts.tone) partCorrect.tone = true;
      });

      const incorrectParts = [];
      if (!partCorrect.initial) incorrectParts.push('initial');
      if (!partCorrect.final) incorrectParts.push('final');
      if (inputs.tone && !partCorrect.tone) incorrectParts.push('tone');

      setFeedback({ 
        message: `❌ Incorrect (wrong ${incorrectParts.join(', ')}). Possible answers: ${question.jyutpings.join(', ')}`,
        isCorrect: false 
      });
    }
  };

  const isReady = !!inputs.final;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <HelpModal showHelp={showHelp} setShowHelp={setShowHelp} />
      <InfoModal showInfo={showInfo} setShowInfo={setShowInfo} />
      
      <h1 className="text-2xl font-bold mb-6 text-center">Jyutping Practice</h1>
      
      <div className="text-center mb-4 text-gray-600 flex justify-center gap-10">
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-2 rounded bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold"
          onClick={() => setShowHelp(true)}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
            <title>Help</title>
            <path d="M0 0h24v24H0V0z" fill="none"></path>
            <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path>
          </svg>
          Help
        </button>
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-2 rounded bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold"
          onClick={() => setShowInfo(true)}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
            <title>Info</title>
            <path d="M0 0h24v24H0V0z" fill="none"></path>
            <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
          </svg>
          Info
        </button>
      </div>

      <Feedback score={score} feedback={feedback} />
      <CharacterDisplay question={question} />
      <JyutpingInput
        userInput={userInput}
        inputs={inputs}
        setInputs={setInputs}
        isReady={isReady}
        handleSubmit={handleSubmit}
        setResetKeyboards={setResetKeyboards}
      />

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