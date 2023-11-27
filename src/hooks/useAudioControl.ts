import { useEffect, useRef, useState } from 'react';

function useAudioControl(audioRefs) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  function handleControlClick() {
    if (!isAudioPlaying) {
      audioRefs.forEach((audioRef) => {
        if (audioRef.current) {
          audioRef.current.play();
        }
      });
      setIsAudioPlaying(true);
    } else {
      audioRefs.forEach((audioRef) => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      });
      setIsAudioPlaying(false);
    }
  }

  return { isAudioPlaying, handleControlClick };
}

export default useAudioControl;
