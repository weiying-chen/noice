import { useState, useRef, useEffect } from 'react';
import Slider from 'rc-slider';
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
  const [isPlaying, setIsPlaying] = useState(false); // State to manage play/pause
  const audioRefs = audios.map(() => useRef(null));

  const handleSliderChange = (index, newValue) => {
    setSliderValues((prevValues) =>
      prevValues.map((value, i) => (i === index ? newValue : value))
    );

    if (audioRefs[index].current) {
      audioRefs[index].current.volume = newValue / 100;
    }
  };

  const handleControlClick = (index) => {
    if (index === 0) {
      if (!isPlaying) {
        audioRefs.forEach((audioRef) => {
          if (audioRef.current) {
            audioRef.current.play();
          }
        });

        setIsPlaying(true);
      } else {
        audioRefs.forEach((audioRef) => {
          if (audioRef.current) {
            audioRef.current.pause();
          }
        });

        setIsPlaying(false);
      }
    } else {
      console.log('else');
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
            <button onClick={() => handleControlClick(index)} />
            <style>
              {`
                .control-${index} button:before {
                  content: "${index === 0 && isPlaying
                    ? controls[index].toggledIcon
                    : controls[index].icon}";
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
