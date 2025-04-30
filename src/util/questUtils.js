import { normalizeFrequency } from "./frequencyHelpers";

export const filterDefaultQuests = (defaultQuests, savedBookQuests) => {
  return defaultQuests.filter((def) => {
    return !savedBookQuests.some((saved) => {
      const savedFreq = normalizeFrequency(saved.frequency);
      const defFreq = normalizeFrequency(def.frequency);
      return (
        saved.title === def.title &&
        saved.icon === def.icon &&
        savedFreq === defFreq
      );
    });
  });
};
