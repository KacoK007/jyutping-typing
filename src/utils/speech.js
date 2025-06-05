export function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-HK";
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}