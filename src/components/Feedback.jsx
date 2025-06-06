

export default function Feedback({ score, feedback }) {
  return (
    <div className="mb-4 text-lg">
      <div className="text-center mb-4 text-gray-600">
        Progress: {score.correct}/{score.total} correct ({Math.round((score.correct / Math.max(1, score.total)) * 100)}%)
      </div>
      {feedback.message && (
        <div className={`mt-2 p-2 rounded ${feedback.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
          {feedback.message}
        </div>
      )}
    </div>
  );
}