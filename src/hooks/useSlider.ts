import { useState, useRef, useEffect } from 'react';

const useSlider = (audios, audioRefs) => {
  const [sliderValues, setSliderValues] = useState(audios.map(() => 1));

  const handleSliderChange = (index, newValue) => {
    setSliderValues((prevValues) =>
      prevValues.map((value, i) => (i === index ? newValue : value))
    );

    if (audioRefs[index].current) {
      audioRefs[index].current.volume = newValue / 100;
    }
  };

  useEffect(() => {
    audioRefs.forEach((audioRef, index) => {
      const defaultSliderValue = 50;

      setSliderValues((prevValues) =>
        prevValues.map(() => defaultSliderValue)
      );

      if (audioRef.current) {
        audioRef.current.volume = defaultSliderValue / 100;
      }
    });
  }, []);

  return { sliderValues, handleSliderChange };
};

export default useSlider;
