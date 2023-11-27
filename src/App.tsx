import { useState, useRef, useEffect } from 'react';
import useAudioControl from './hooks/useAudioControl';
import useSliderChange from './hooks/useSliderChange';
import Slider from 'rc-slider';
import Control from './components/Control';

import 'rc-slider/assets/index.css';
import './App.css';

const audios = [
  { src: '/fire.mp3', icon: '\\f73d' },
  { src: '/crickets.mp3', icon: '\\f06d' },
];

const controls = [
  { name: "Play", icon: '\\f04b', toggledIcon: '\\f04c'},
  { name: "Reset", icon: '\\f06d' },
];

function App() {
  const [sliderValues, setSliderValues] = useState(audios.map(() => 1));
  const audioRefs = audios.map(() => useRef(null));
  const { isAudioPlaying, handleControlClick } = useAudioControl(audioRefs);

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

  return (
    <>
      <div className="audios">
        {audios.map((audio, index) => (
          <div key={index} className="audio">
            <audio ref={audioRefs[index]} loop>
              <source src={audio.src} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <div className="slider-wrapper">
              <Slider
                className={`slider-${index}`}
                min={0}
                max={100}
                step={1}
                value={sliderValues[index]}
                onChange={(newValue) => handleSliderChange(index, newValue)}
                vertical
              />
              <style>
                {`
                  .slider-${index} .rc-slider-handle:before {
                    content: "${audio.icon}";
                  }
                `}
              </style>
              <p>{sliderValues[index]}%</p>
            </div>
          </div>
        ))}
      </div>
      <div className="controls">
        {controls.map((control, index) => (
          <Control
            key={index}
            index={index}
            onClick={() => handleControlClick(index)}
            icon={
              index === 0 && isAudioPlaying
                ? control.toggledIcon
                : control.icon
            }
          />
        ))}
      </div>
    </>
  );
}

export default App;
