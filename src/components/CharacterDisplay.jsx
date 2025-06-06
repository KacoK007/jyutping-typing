
import { speak } from '../utils/speech';

export default function CharacterDisplay({ question }) {
  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
      <div className="mb-2 text-xl">
        {question.type === 'word' ? 'Word' : 'Character'}: 
        <span className="font-bold text-2xl ml-2">{question.char}</span>
        <button
          className="ml-2 px-2 py-2 rounded hover:bg-gray-200"
          onClick={() => speak(question.char)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" role="img" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
          <title>Play audio</title> <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"></path></svg>
        </button>
      </div>
    </div>
  );
}