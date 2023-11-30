import { useState, useRef, useEffect } from 'react';
import AudioSlider from './components/AudioSlider';
import Control from './components/Control';
// import useAudio from './hooks/useAudio';
import useSlider from './hooks/useSlider';
import 'rc-slider/assets/index.css';
import './App.css';

const audios = [
  { src: '/fire.mp3', icon: '\\f06d' },
  { src: '/crickets.mp3', icon: '\\e4d0' },
  { src: '/birds.mp3', icon: '\\f520' },
  { src: '/wind.mp3', icon: '\\f72e' },
  { src: '/rain.mp3', icon: '\\f73d' },
  { src: '/river.mp3', icon: '\\f773' },
  { src: '/waves.mp3', icon: '\\f5ca' },
];

const defaultSliderValue = 50

function App() {
  const audioRefs = audios.map(() => useRef(null));
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const { sliderValues, setSliderValues, handleSliderChange } = useSlider(
    audios,
    audioRefs,
    defaultSliderValue
  );

  function playAudio() {
    if (!isPlayingAudio) {
      audioRefs.forEach((audioRef) => {
        if (audioRef.current) {
          audioRef.current.play();
        }
      });

      setIsPlayingAudio(true);
    } else {
      audioRefs.forEach((audioRef) => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      });

      setIsPlayingAudio(false);
    }
  }

  function resetAudio() {
    setSliderValues((prevSliderValues) =>
      prevSliderValues.map(() => defaultSliderValue)
    );

    audioRefs.forEach((audioRef, index) => {
      if (audioRef.current) {
        audioRef.current.volume = defaultSliderValue / 100;
      }
    });
  }

  function amplifyAudio() {
    const increasedSliderValue = 20

    setSliderValues((prevSliderValues) => 
      prevSliderValues.map((prevSliderValue) => {
        return prevSliderValue + increasedSliderValue;
      })
    );

    audioRefs.forEach((audioRef, index) => {
      if (audioRef.current) {
        audioRef.current.volume =
          audioRef.current.volume + (increasedSliderValue / 100);
      }
    });
  }

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
                min={0}
                max={100}
                step={1}
                value={sliderValues[index]}
                onChange={(newValue) => handleSliderChange(index, newValue)}
                icon={audio.icon}
                vertical
              />
              <p>{sliderValues[index]}%</p>
            </div>
          </div>
        ))}
      </div>
      <div className="controls">
        <Control
          onClick={playAudio}
          icon={isPlayingAudio ? "\\f04c" : "\\f04b"}
        />
        <Control onClick={resetAudio} icon="\f2f9" />
        <Control onClick={amplifyAudio} icon="\f028" />
      </div>
    </>
  );
}

export default App;
