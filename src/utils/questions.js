import CHARLIST from '../data/charlist.json';
import CHARCOUNT from '../data/charcount.json';

for (const char of Object.keys(CHARCOUNT)) {
  const charCode = char.charCodeAt(0);
    // Check if the character is a CJK character
    // CJK characters are in the ranges:
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

export function getWeightedShuffledQuestions() {
  const arr = getCharJyutpingSortedByFrequency();
  return arr
    .map(item => ({
      ...item,
      sortKey: item.freq + Math.random() * item.freq * 0.6 
    }))
    .sort((a, b) => b.sortKey - a.sortKey);
}
export const questions = getWeightedShuffledQuestions().map(item => ({
  char: item.char,
  jyutpings: item.jyutpings
}));

console.log("jyutpings", jyutpings);