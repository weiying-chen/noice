import { useState } from 'react';

const VOLUME_CHANGE = 0.1;
const MAX_VOLUME = 1;
const MIN_VOLUME = 0;
const LOCAL_STORAGE_KEY = 'volumes';

function useVolume(audios: object[], defaultVolume: number) {
  const [volumes, setVolumes] = useState(() => {
    const storedVolumes = localStorage.getItem(LOCAL_STORAGE_KEY);
    const defaultVolumes = audios.map(() => defaultVolume);
    return JSON.parse(storedVolumes ?? JSON.stringify(defaultVolumes));
  });

  const updateVolumes = (newVolumes: number[]) => {
    setVolumes(newVolumes);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newVolumes));
  };

  function handleVolumeChange(value: number, index: number) {
    updateVolumes(
      volumes.map((volume: number, i: number) => (i === index ? value : volume))
    );
  }

  function increaseVolumes() {
    updateVolumes(
      volumes.map((volume: number) => Math.min(volume + VOLUME_CHANGE, MAX_VOLUME))
    );
  }

  function decreaseVolumes() {
    updateVolumes(
      volumes.map((volume: number) => Math.max(volume - VOLUME_CHANGE, MIN_VOLUME))
    );
  }

  return {
    volumes,
    handleVolumeChange,
    increaseVolumes,
    decreaseVolumes,
  };
}

export default useVolume;
