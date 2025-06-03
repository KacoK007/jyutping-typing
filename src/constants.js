// constants.js
import CHARLIST from './data/charlist.json';
import CHARCOUNT from './data/charcount.json';

for (const char of Object.keys(CHARCOUNT)) {
  const charCode = char.charCodeAt(0);
    const isCJK = (0x3400 <= charCode && charCode <= 0x4DBF) ||
                  (0x4E00 <= charCode && charCode <= 0x9FFF) ||
                  (0xF900 <= charCode && charCode <= 0xFAFF) ||
                  (0x20000 <= charCode && charCode <= 0x2FFFF);

    if (!isCJK && char.length === 1) { // Check for single character
        // pop the character from CHARLIST if it's not CJK
        delete CHARLIST[char];
        delete CHARCOUNT[char];
    }
}

var jyutpings = {};

for (let obj of Object.keys(CHARLIST)) {
    let jps = CHARLIST[obj];

    // Count the total number of pronunciations
    let total = Object.values(jps).reduce((sum, count) => sum + count, 0);

    for (let jp in jps) {
        let count = jps[jp];
        let rate = count / total;

        if (rate > 0.2) {
            jyutpings[jp] = jyutpings[jp] || [];
            jyutpings[jp].push(obj);
        }
    }
}

export function getCharJyutpingSortedByFrequency() {
  // Create an array of { char, jyutpings, freq }
  const arr = Object.keys(CHARLIST).map(char => ({
    char,
    jyutpings: Object.keys(CHARLIST[char]),
    freq: CHARCOUNT[char] || 0
  }));
  // Sort by frequency descending
  arr.sort((a, b) => b.freq - a.freq);
  return arr;
}

const characterQuestions = getCharJyutpingSortedByFrequency().map(item => ({
  char: item.char,
  jyutpings: item.jyutpings
}));

export const initials = ["b", "p", "m", "f", "d", "t", "n", "l", "g", "k", "ng", "h", "gw", "kw", "w", "z", "c", "s", "j"];

export const finalsByGroup ={
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
    }

export const tones = ["1", "2", "3", "4", "5", "6"];

export const questions = [...characterQuestions];