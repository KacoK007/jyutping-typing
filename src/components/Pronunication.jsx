export default function Pronunciation({ pronunciationMode, setPronunciationMode }) {
  return (
    <div className="flex justify-end mb-2">
        <button
            className={`px-3 py-1 rounded ${pronunciationMode ? 'bg-yellow-400' : 'bg-gray-200'} font-bold`}
            onClick={() => setPronunciationMode(m => !m)}
        >
            {pronunciationMode ? 'Pronunciation Mode: ON' : 'Pronunciation Mode: OFF'}
        </button>
    </div>
  );
}