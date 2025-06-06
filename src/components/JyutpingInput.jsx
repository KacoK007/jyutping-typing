import { parseJyutpingInput } from '../utils/jyutping';

export default function JyutpingInput({ userInput, inputs, setInputs, isReady, handleSubmit, setResetKeyboards }) {
  return (
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
      <div className="mb-2">
        Your input: <span className="font-mono text-2xl font-bold text-blue-600">{userInput}</span>
        {!inputs.tone && <span className="text-gray-500"> (no tone)</span>}
      </div>
    </div>
  );
}