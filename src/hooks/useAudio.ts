import { useState, useRef } from 'react';

function useAudio(audios: object[]) {
  const [isPlayingAudio, setIsAudioPlaying] = useState(false);
  const audioRefs = audios.map(() => useRef<HTMLAudioElement>(null));

  function playAudio() {
    if (!isPlayingAudio) {
      audioRefs.forEach(audioRef => audioRef.current?.play());
      setIsAudioPlaying(true);
    } else {
      audioRefs.forEach(audioRef => audioRef.current?.pause());
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