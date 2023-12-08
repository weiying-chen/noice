import { useState } from 'react';

const VOLUME_CHANGE = 0.1;
const MAX_VOLUME = 1;
const MIN_VOLUME = 0;

function useVolume(audios: any, defaultVolume: any) {
  const [volumes, setVolumes] = useState(audios.map(() => defaultVolume));

  function handleVolumeChange(value: any, index: any) {
    setVolumes((prevVolumes: any) => {
      return prevVolumes.map((prevVolume: any, i: any) => (i === index ? value : prevVolume))
    });
  }

  function increaseVolumes() {
    setVolumes((prevVolumes: any) => {
      return prevVolumes.map((prevVolume: any) => {
        const increasedVolume = prevVolume + VOLUME_CHANGE;
        return increasedVolume <= MAX_VOLUME ? increasedVolume : MAX_VOLUME;
      });
    });
  }

  function decreaseVolumes() {
    setVolumes((prevVolumes: any) => {
      return prevVolumes.map((prevVolume: any) => {
        const decreasedVolume = prevVolume - VOLUME_CHANGE;
        return decreasedVolume >= MIN_VOLUME ? decreasedVolume : MIN_VOLUME;
      });
    });
  }

  function resetVolumes() {
    setVolumes(() => audios.map(() => defaultVolume));
  }

  return {
    volumes,
    handleVolumeChange,
    increaseVolumes,
    decreaseVolumes,
    resetVolumes,
  };
};

export default useVolume;