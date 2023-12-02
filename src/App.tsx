import { useState, useRef, createRef, forwardRef } from 'react';
import StyledSlider from './components/StyledSlider';
import Control from './components/Control';
// import useAudio from './hooks/useAudio';
import useSlider from './hooks/useSlider';
import 'rc-slider/assets/index.css';
import './App.css';

const audios = [
  { src: '/fire.mp3', icon: '\\f06d' },
  { src: '/crickets.mp3', icon: '\\e4d0' },
];

const useAudioPlayer = (audios, options) => {
  const [isPlayingAudio, setIsAudioPlaying] = useState(false);
  const [volumes, setVolumes] = useState(audios.map((audio) => options.defaultVolume));

  const audioRefs = useRef(
    audios.map((audio) => ({
      ...audio,
      ref: createRef(),
    })),
  );

  function playAudio() {
    if (!isPlayingAudio) {
      audioRefs.current?.forEach((audioRef) => audioRef.ref.current.play());
      setIsAudioPlaying(true);
    } else {
      audioRefs.current?.forEach((audioRef) => audioRef.ref.current?.pause());
      setIsAudioPlaying(false);
    }
  }

  function resetAudio() {
    audioRefs.current?.forEach((audioRef, index) => {
      if (audioRef.ref.current) {
        audioRef.ref.current.volume = options.defaultVolume / 100;
      }
    });

    setVolumes(prevVolumes => {
      return prevVolumes.map(() => defaultVolume);
    });
  }

  function handleSliderChange(value, index) {
    audioRefs.current?.forEach((audioRef) => {
      if (audioRef.ref.current) {
        audioRef.ref.current.volume = value / 100;
      }
    });

    setVolumes(prevVolumes => {
      return prevVolumes.map((prevVolume, i) => {
        if (i === index) {
          return value;
        } else {
          return prevVolume;
        }
      });
    });
  }

  return {
    isPlayingAudio,
    playAudio,
    resetAudio,
    audioRefs: audioRefs.current,
    volumes,
    setVolumes,
    handleSliderChange,
  };
};

const Audio = forwardRef((props, ref) => {
  const { src, icon, volume, index, handleSliderChange } = props;

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
          onChange={(value) => handleSliderChange(value, index)}
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
  } = useAudioPlayer(audios, {
    defaultVolume,
  });

  return (
    <>
      <div className="audios">
        {audioRefs.map((audioRef, index) => (
          <Audio
            key={audioRef.src}
            index={index}
            {...audioRef}
            volume={volumes[index]}
            handleSliderChange={handleSliderChange}
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
