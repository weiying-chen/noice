import { useState, useRef, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [sliderValue1, setSliderValue1] = useState(1);
  const [sliderValue2, setSliderValue2] = useState(1);
  const [sliderValue3, setSliderValue3] = useState(1);
  const audioRef = useRef(null);

  const handleSliderChange = (newValue) => {
    setSliderValue1(newValue);

    if (audioRef.current) {
      // `<audio>`'s `volume` property accepts values ranging from 0.0 to 1.0
      audioRef.current.volume = newValue / 100;
    }
  };

  useEffect(() => {
    // Set initial volume when the component mounts
    if (audioRef.current) {
      audioRef.current.volume = sliderValue1 / 100;

      // Mimic autoPlay
      audioRef.current.play(); 
      audioRef.current.loop = true;
    }
  // The empty array ensures this effect runs only once on mount
  }, []); 

  return (
    <>
      <div className="audio-controls">
        <audio ref={audioRef} controls>
          <source src="/fire.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className="sliders-container">
        <div className="slider-wrapper">
          <Slider
            className="slider-1"
            min={0}
            max={100}
            step={1}
            value={sliderValue1}
            onChange={handleSliderChange}
            vertical
          />
          <p>{sliderValue1}%</p>
        </div>
        <div className="slider-wrapper">
          <Slider
            className="slider-2"
            min={0}
            max={100}
            step={1}
            value={sliderValue2}
            onChange={(newValue) => setSliderValue2(newValue)}
            vertical // Set the slider to vertical
          />
          <p>{sliderValue2}%</p>
        </div>
        <div className="slider-wrapper">
          <Slider
            className="slider-3"
            min={0}
            max={100}
            step={1}
            value={sliderValue3}
            onChange={(newValue) => setSliderValue3(newValue)}
            vertical // Set the slider to vertical
          />
          <p>{sliderValue3}%</p>
        </div>
      </div>
    </>
  );
}

export default App
