import { initials } from './constants';

export function parseJyutpingInput(value) {
  const toneMatch = value.match(/([1-6])$/);
  const tone = toneMatch ? toneMatch[1] : '';
  const rest = tone ? value.slice(0, -1) : value;
  const foundInitial = initials.find(init => rest.startsWith(init)) || '';
  const final = rest.slice(foundInitial.length);
  return { initial: foundInitial, final, tone };
}