export const normalizeFrequency = (freq) => {
  if (!freq) return "";
  const array = Array.isArray(freq)
    ? freq
    : freq.split(",").map((day) => day.trim());
  return array.sort().join(", ");
};
