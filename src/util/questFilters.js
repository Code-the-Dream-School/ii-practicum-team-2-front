import { format } from "date-fns";

export const getFilteredQuests = (quests, selectedDay) => {
  return quests
    .filter((quest) => {
      if (!quest.frequency) return false;

      const selectedDayName = format(selectedDay, "EEEE").toLowerCase();
      const freqString =
        typeof quest.frequency === "string"
          ? quest.frequency.toLowerCase()
          : "";
      const freqDays = freqString
        .split(/,\s*/)
        .map((day) => day.replace(/s$/, ""));

      return (
        freqString === "daily" ||
        freqDays.includes(selectedDayName.replace(/s$/, ""))
      );
    })
    .sort((questA, questB) => {
      const aIsDaily = questA.frequency.toLowerCase() === "daily";
      const bIsDaily = questB.frequency.toLowerCase() === "daily";
      return aIsDaily === bIsDaily ? 0 : aIsDaily ? -1 : 1;
    });
};
