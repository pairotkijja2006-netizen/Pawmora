import { useState, useEffect } from 'react';

export const useSavedPets = () => {
  const [savedPetIds, setSavedPetIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('savedPets');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedPets', JSON.stringify(savedPetIds));
  }, [savedPetIds]);

  const toggleSave = (petId: string) => {
    setSavedPetIds(prev => 
      prev.includes(petId) 
        ? prev.filter(id => id !== petId)
        : [...prev, petId]
    );
  };

  const isSaved = (petId: string) => savedPetIds.includes(petId);

  return { savedPetIds, toggleSave, isSaved };
};
