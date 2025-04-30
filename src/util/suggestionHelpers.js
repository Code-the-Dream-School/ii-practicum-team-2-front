export const isLocal = true;

export function getRandomSuggestions(list) {
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(3, shuffled.length));
}