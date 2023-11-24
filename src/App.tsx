import { useState, useRef } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './App.css';

const audioSources = [
  { src: '/fire.mp3', unicode: '\\f73d' },
  { src: '/crickets.mp3', unicode: '\\f06d' },
  // Add more sources as needed
];

function App() {
  const [sliderValues, setSliderValues] = useState(
    audioSources.map(() => 1)
  );

  const audioRefs = audioSources.map(() => useRef(null));

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
      {audioSources.map((source, index) => (
        <div key={index} className="noise">
          <audio controls ref={audioRefs[index]}>
            <source src={source.src} type="audio/mpeg" />
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
                  content: "${source.unicode}";
                  font-family: 'Font Awesome 5 Free';
                }
              `}
            </style>
            <p>{sliderValues[index]}%</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default App;
