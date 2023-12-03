import { useState, useEffect, useRef, createRef, forwardRef } from 'react';
import StyledSlider from './components/StyledSlider';
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
    audioRefs.forEach((audioRef, index) => {
      if (audioRef.current) {
        audioRef.current.volume = options.defaultVolume / 100;
      }
    });

    setVolumes(prevVolumes => {
      return prevVolumes.map(() => defaultVolume);
    });
  }

  function handleSliderChange(value, index) {
    console.log(index);
    console.log(audioRefs[index]);
    console.log('==');
    audioRefs[index].current.volume = value / 100;

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

const Audio = forwardRef((props, ref) => {
  const { src, icon, volume, handleSliderChange } = props;

  return (
    <div className="audio">
      <audio ref={ref} loop>
        <source src={src} type="audio/mpeg" /> Your browser does
        not support the audio element.
      </audio>
      <div className="slider-wrapper">
        <StyledSlider
          min={0}
          max={100}
          step={1}
          value={volume}
          onChange={handleSliderChange}
          $icon={icon}
          vertical
        />
        <p>{volume}%</p>
      </div>
    </div>
  );
});

const defaultVolume = 50;

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
          <Audio
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
