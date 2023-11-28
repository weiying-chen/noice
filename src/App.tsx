import { useState, useRef, useEffect } from 'react';
import AudioSlider from './components/AudioSlider';
import Control from './components/Control';
// import useAudio from './hooks/useAudio';
import useSlider from './hooks/useSlider';
import 'rc-slider/assets/index.css';
import './App.css';

const audios = [
  { src: '/fire.mp3', icon: '\\f73d' },
  { src: '/crickets.mp3', icon: '\\f06d' },
];

const controls = [
  { name: "Play", icon: '\\f04b', toggledIcon: '\\f04c', action: null},
  { name: "Reset", icon: '\\f06d', action: null },
];

const defaultSliderValue = 50

function App() {
  const audioRefs = audios.map(() => useRef(null));
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const { sliderValues, setSliderValues, handleSliderChange } = useSlider(
    audios,
    audioRefs,
    defaultSliderValue
  );

  // const { isAudioPlaying, handleControlClick } = useAudio(audioRefs);

  controls.forEach(control => {
    if (control.name === 'Play') {
      control.action = playAudio;
    } else if (control.name === 'Reset') {
      control.action = resetAudio;
    }
  });

  function playAudio() {
    if (!isAudioPlaying) {
      audioRefs.forEach((audioRef) => {
        if (audioRef.current) {
          audioRef.current.play();
        }
      });

      setIsAudioPlaying(true);
    } else {
      audioRefs.forEach((audioRef) => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      });

      setIsAudioPlaying(false);
    }
  }

  function resetAudio() {
    audioRefs.forEach((audioRef, index) => {
      setSliderValues((prevValues) =>
        prevValues.map(() => defaultSliderValue)
      );

      if (audioRef.current) {
        audioRef.current.volume = defaultSliderValue / 100;
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
        {controls.map((control, index) => (
          <Control
            key={index}
            index={index}
            onClick={() => control.action()}
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
