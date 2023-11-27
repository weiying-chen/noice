import { useState, useEffect, useCallback } from 'react';

const useSliderChange = (audios, audioRefs) => {
  const [sliderValues, setSliderValues] = useState([]);

  const handleSliderChange = useCallback((index, newValue) => {
    setSliderValues((prevValues) =>
      prevValues.map((value, i) => (i === index ? newValue : value))
    );

    if (audioRefs[index].current) {
      audioRefs[index].current.volume = newValue / 100;
    }
  }, [audioRefs]);

  useEffect(() => {
    const defaultSliderValue = 50;
    const initialSliderValues = audios.map(() => defaultSliderValue);

    setSliderValues(initialSliderValues);

    audioRefs.forEach((audioRef) => {
      if (audioRef.current) {
        audioRef.current.volume = defaultSliderValue / 100;
      }
    });
  }, [audios, audioRefs]);

  return { sliderValues, handleSliderChange };
};

export default useSliderChange;
