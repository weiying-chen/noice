import { useState, useRef } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './App.css';

const audios = [
  { src: '/fire.mp3', icon: '\\f73d' },
  { src: '/crickets.mp3', icon: '\\f06d' },
];

const controls = [
  { text: 'Play', icon: '\\f73d' },
  { text: 'Reset', icon: '\\f06d' },
];

function App() {
  const [sliderValues, setSliderValues] = useState(
    audios.map(() => 1)
  );

  const audioRefs = audios.map(() => useRef(null));

  const handleSliderChange = (index, newValue) => {
    setSliderValues((prevValues) =>
      prevValues.map((value, i) => (i === index ? newValue : value))
    );

    if (audioRefs[index].current) {
      audioRefs[index].current.volume = newValue / 100;
    }
  };

  return (
    <>
      <div className="audios">
        {audios.map((audio, index) => (
          <div key={index} className="audio">
            <audio ref={audioRefs[index]}>
              <source src={audio.src} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <div className="slider-wrapper">
              <Slider
                className={`slider-${index}`} // Unique class name for each slider
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
          <div key={index} className={`control-${index}`}>
            <button key={index} className={`control-handle`}>{control.text}</button>
            <style>
              {`
                .control-${index} .control-handle:before {
                  content: "${control.icon}";
                }
              `}
            </style>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
