export const useQuestHandlers = (
  quests,
  setQuests,
  selectedQuest,
  setShowModal,
) => {
  const handleSave = (updatedQuest) => {
    let updatedQuests;

    if (selectedQuest) {
      updatedQuests = quests.map((quest) =>
        quest.id === selectedQuest.id ? updatedQuest : quest,
      );
    } else {
      updatedQuests = [
        ...quests,
        { ...updatedQuest, id: Date.now(), completed: {} },
      ];
    }

    setQuests(updatedQuests);
    localStorage.setItem("readBooksQuests", JSON.stringify(updatedQuests));
    setShowModal(false);
  };

  const handleDelete = () => {
    if (selectedQuest) {
      const updatedQuests = quests.filter(
        (quest) => quest.id !== selectedQuest.id,
      );
      setQuests(updatedQuests);
      setShowModal(false);
    }
  };

  return { handleSave, handleDelete };
};
