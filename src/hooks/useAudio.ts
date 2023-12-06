import { useState, useRef } from 'react';

const useAudio = (audios) => {
  const [isPlayingAudio, setIsAudioPlaying] = useState(false);
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

  return {
    audioRefs,
    isPlayingAudio,
    playAudio,
  };
};

export default useAudio;