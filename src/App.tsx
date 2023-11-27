import { useState, useRef, useEffect } from 'react';
import AudioSlider from './components/AudioSlider';
import Control from './components/Control';
import useAudio from './hooks/useAudio';
import useSlider from './hooks/useSlider';
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

const defaultSliderValue = 50

function App() {
  const audioRefs = audios.map(() => useRef(null));

  const { sliderValues, handleSliderChange } = useSlider(
    audios,
    audioRefs,
    defaultSliderValue
  );

  const { isAudioPlaying, handleControlClick } = useAudio(audioRefs);

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
              <AudioSlider
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
