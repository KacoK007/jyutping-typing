import { useState , useEffect} from 'react';
import Key from './Key';

const Keyboard = ({ 
  type,
  initialValue = '',
  finalValue = '',
  onInitialChange,
  onFinalChange,
  onToneChange,
  reset
}) => {
  const [selectedInitial, setSelectedInitial] = useState(initialValue);
  const [selectedFinal, setSelectedFinal] = useState(finalValue);
  const [selectedTone, setSelectedTone] = useState('');
  const [finalGroup, setFinalGroup] = useState('i');


  const keyboardData = {
    initial: ["", "b", "p", "m", "f", "d", "t", "n", "l", "g", "k", "ng", "h", "gw", "kw", "w", "z", "c", "s", "j"],
    final: {
      aa: ["aa", "aai", "aau", "aam", "aan", "aang", "aap", "aat", "aak"],
      a: ["a", "ai", "au", "am", "an", "ang", "ap", "at", "ak"],
      e: ["e", "ei", "en", "eu", "em", "eng", "ep", "et", "ek"],
      i: ["i", "iu", "im", "in", "ip", "it", "ing", "ik"],
      o: ["o", "ou", "oi", "on", "ong", "ot", "ok"],
      oe: ["oe", "oeng", "oet", "oek"],
      eo: ["eoi", "eon", "eong", "eot"],
      u: ["u", "ui", "un", "ut", "um", "ung", "up", "uk"],
      yu: ["yu", "yun", "yung", "yut"],
      鼻音: ["m", "ng"],
    },
    tone: ["", "1", "2", "3", "4", "5", "6"]
  };

  const handleInitialSelect = (initial) => {
    setSelectedInitial(initial);
    onInitialChange(initial);
  };

  const handleFinalSelect = (final) => {
    setSelectedFinal(final);
    onFinalChange(final);
  };

  const handleToneSelect = (tone) => {
    setSelectedTone(tone);
    onToneChange(tone);
  };

  const handleGroupChange = (group) => {
    setFinalGroup(group);
  };
  
  useEffect(() => {
    if (reset) {
      setSelectedInitial('');
      setSelectedFinal('');
      setSelectedTone('');
      setFinalGroup('i');
    }
  }, [reset]);
  if (type === 'syllable') {
    return (
      <div className="mb-6">
        <h3 className="font-semibold mb-4 text-lg">Syllable</h3>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Initials</h4>
          <div className="flex flex-wrap">
            {keyboardData.initial.map(initial => (
              <Key
                key={initial}
                label={initial || "(none)"}
                selected={selectedInitial === initial}
                onClick={() => handleInitialSelect(initial)}
                type="initial"
              />
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Finals</h4>
          <div className="mb-3">
            <div className="text-xs text-gray-500 mb-1">Final Groups:</div>
            <div className="flex flex-wrap">
              {Object.keys(keyboardData.final).map(group => (
                <Key
                  key={group}
                  label={group.toUpperCase()}
                  selected={finalGroup === group}
                  onClick={() => handleGroupChange(group)}
                  type="group"
                />
              ))}
            </div>
          </div>
          <div className="flex flex-wrap">
            {keyboardData.final[finalGroup].map(final => (
              <Key
                key={final}
                label={final}
                selected={selectedFinal === final}
                onClick={() => handleFinalSelect(final)}
                type="final"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'tone') {
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg">Tone</h3>
        </div>
        <div className="flex flex-wrap">
          {keyboardData.tone.map(tone => (
            <Key
              key={tone}
              label={tone || "Skip"}
              selected={selectedTone === tone}
              onClick={() => handleToneSelect(tone)}
              type="tone"
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default Keyboard;