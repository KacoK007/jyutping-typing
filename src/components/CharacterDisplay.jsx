
import { speak } from '../utils/speech';

export default function CharacterDisplay({ question }) {
  return (
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
  );
}