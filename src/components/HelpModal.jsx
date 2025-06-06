import React from 'react';

export default function HelpModal({ showHelp, setShowHelp }) {
  if (!showHelp) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
          onClick={() => setShowHelp(false)}
          aria-label="Close"
        >×</button>
        <h2 className="text-xl font-bold mb-3">How to Play</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Type the Jyutping romanization for the given Cantonese character or word.</li>
          <li>You can use the on-screen keyboard or type directly in the input box.</li>
          <li>Include the tone number at the end (e.g. <span className="font-mono">ngo5</span>).</li>
          <li>Press <b>Pronunication Mode</b> to listen examples.</li>
          <li>Press <b>Submit</b> or hit <b>Enter</b> to check your answer.</li>
          <li>Feedback will show which parts (initial, final, tone) are correct or incorrect.</li>
          <li>Click <b>Next Question</b> to continue.</li>
        </ul>
      </div>
    </div>
  );
}