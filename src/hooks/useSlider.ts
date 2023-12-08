import { useState, useEffect } from 'react';

function useSlider(audios: any, audioRefs: any, defaultSliderValue: any) {
  const defaultSliderOr = defaultSliderValue || 1;
  const [sliderValues, setSliderValues] = useState(audios.map(() => 1));

  function handleSliderChange(index: any, newValue: any) {
    setSliderValues((prevValues: any) =>
      prevValues.map((value: any, i: any) => (i === index ? newValue : value))
    );

    if (audioRefs[index].current) {
      audioRefs[index].current.volume = newValue / 100;
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
