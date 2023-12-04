import { useState, useEffect, useRef, createRef } from 'react';
import { css } from '@emotion/react'
import AudioSlider from './components/AudioSlider';
import Control from './components/Control';
// import useAudio from './hooks/useAudio';
// import useSlider from './hooks/useSlider';
import 'rc-slider/assets/index.css';
import './App.css';

const audios = [
  { src: '/fire.mp3', icon: '\\f06d' },
  { src: '/crickets.mp3', icon: '\\e4d0' },
];

const useAudio = (audios, options) => {
  const [isPlayingAudio, setIsAudioPlaying] = useState(false);
  const [volumes, setVolumes] = useState(audios.map((audio) => options.defaultVolume));
  const audioRefs = audios.map(() => useRef(null));

  function playAudio() {
    if (!isPlayingAudio) {
      audioRefs.forEach((audioRef) => audioRef.current.play());
      setIsAudioPlaying(true);
    } else {
      audioRefs.forEach((audioRef) => audioRef.current?.pause());
      setIsAudioPlaying(false);
    }
  }

  function resetAudio() {
    setVolumes(prevVolumes => {
      return prevVolumes.map(() => options.defaultVolume);
    });
  }

  function handleSliderChange(value, index) {
    setVolumes(prevVolumes => {
      return prevVolumes.map((prevVolume, i) => (i === index ? value : prevVolume))
    });
  }

  return {
    isPlayingAudio,
    playAudio,
    resetAudio,
    audioRefs,
    volumes,
    setVolumes,
    handleSliderChange,
  };
};

const defaultVolume = 0.5;

function App() {
  const {
    isPlayingAudio,
    playAudio,
    resetAudio,
    audioRefs,
    volumes,
    setVolumes,
    handleSliderChange,
  } = useAudio(audios, {
    defaultVolume,
  });
  
  useEffect(() => {
    resetAudio();
  }, []);

  return (
    <>
      <div className="audios">
        {audios.map((audio, index) => (
          <AudioSlider
            key={index}
            src={audio.src}
            icon={audio.icon}
            ref={audioRefs[index]}
            volume={volumes[index]}
            handleSliderChange={(value) => handleSliderChange(value, index)}
          />
        ))}
      </div>
      <div className="controls">
        <Control
          onClick={playAudio}
          icon={isPlayingAudio ? "\\f04c" : "\\f04b"}
        />
        <Control onClick={resetAudio} icon="\f2f9" />
      </div>
    </>
  );
}

export default App;
