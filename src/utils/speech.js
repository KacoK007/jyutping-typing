export function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-HK";
  utterance.pitch = 0.8;
  utterance.rate = 0.70;
  window.speechSynthesis.speak(utterance);
}