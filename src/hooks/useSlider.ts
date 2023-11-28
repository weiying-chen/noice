import { useState, useRef, useEffect } from 'react';

function useSlider(audios, audioRefs, defaultSliderValue) {
  const defaultSliderOr = defaultSliderValue || 1;
  const [sliderValues, setSliderValues] = useState(audios.map(() => 1));

  function handleSliderChange(index, newValue) {
    setSliderValues((prevValues) =>
      prevValues.map((value, i) => (i === index ? newValue : value))
    );

    if (audioRefs[index].current) {
      audioRefs[index].current.volume = newValue / 100;
    }
  }

  useEffect(() => {
    audioRefs.forEach((audioRef, index) => {
      setSliderValues((prevValues) =>
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
