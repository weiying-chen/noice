import { useState, useEffect } from 'react';

function useSlider(audios: any, audioRefs: any, defaultSliderValue: any) {
  const defaultSliderOr = defaultSliderValue || 1;
  const [sliderValues, setSliderValues] = useState(audios.map(() => 1));

  function handleSliderChange(index: any, value: any) {
    setSliderValues((prevValues: any) =>
      prevValues.map((prevValue: any, i: any) => (i === index ? value : prevValue))
    );

    if (audioRefs[index].current) {
      audioRefs[index].current.volume = value / 100;
    }
  }

  useEffect(() => {
    audioRefs.forEach((audioRef: any) => {
      setSliderValues((prevValues: any) =>
        prevValues.map(() => defaultSliderOr)
      );

      if (audioRef.current) {
        audioRef.current.volume = defaultSliderOr / 100;
      }
    });
  }, []);

  return { sliderValues, setSliderValues, handleSliderChange };
}

export default useSlider;
