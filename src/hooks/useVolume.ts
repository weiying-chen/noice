import { useState } from 'react';

const useVolume = (audios, defaultVolume) => {
  const [volumes, setVolumes] = useState(audios.map(() => defaultVolume));

  function resetVolumes() {
    setVolumes(() => audios.map(() => defaultVolume));
  }

  function handleVolumeChange(value, index) {
    setVolumes((prevVolumes) =>
      prevVolumes.map((prevVolume, i) => (i === index ? value : prevVolume))
    );
  }

  return {
    volumes,
    handleVolumeChange,
    resetVolumes,
  };
};

export default useVolume;