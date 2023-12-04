import { useState, useRef } from 'react';

const useAudio = (audios, options) => {
  const [isPlayingAudio, setIsAudioPlaying] = useState(false);
  const [volumes, setVolumes] = useState(audios.map((audio) => options.defaultVolume));
  const audioRefs = audios.map(() => useRef(null));

  function playAudio() {
    if (!isPlayingAudio) {
      audioRefs.forEach((audioRef) => audioRef.current.play());
      setIsAudioPlaying(true);
    } else {
      audioRefs.forEach((audioRef) => audioRef.current?.pause());
      setIsAudioPlaying(false);
    }
  }

  function resetVolumes() {
    setVolumes(prevVolumes => {
      return prevVolumes.map(() => options.defaultVolume);
    });
  }

  function handleVolumeChange(value, index) {
    setVolumes(prevVolumes => {
      return prevVolumes.map((prevVolume, i) => (i === index ? value : prevVolume))
    });
  }

  return {
    audioRefs,
    volumes,
    isPlayingAudio,
    playAudio,
    resetVolumes,
    handleVolumeChange,
  };
};


export default useAudio;
