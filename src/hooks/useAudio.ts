import { useState, useRef } from 'react';

function useAudio(audios: any) {
  const [isPlayingAudio, setIsAudioPlaying] = useState(false);
  const audioRefs = audios.map(() => useRef<HTMLAudioElement>());

  function playAudio() {
    if (!isPlayingAudio) {
      audioRefs.forEach((audioRef: any) => audioRef.current.play());
      setIsAudioPlaying(true);
    } else {
      audioRefs.forEach((audioRef: any) => audioRef.current?.pause());
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