import { useState, useRef, createRef, forwardRef } from 'react';
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

const useAudioPlayer = (audios, options) => {
  const [isPlayingAudio, setIsAudioPlaying] = useState(false);

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
      if (audioRef.current) {
        audioRef.current.volume = options.defaultVolume / 100;
      }
    });
  }

  return {
    isPlayingAudio,
    playAudio,
    resetAudio,
    audioRefs: audioRefs.current,
  };
};

const defaultSliderValue = 50;

const Audio = forwardRef((props, ref) => {
  const { src, icon } = props;
  const [volume, setVolume] = useState(50);

  function handleVolumeChange(value) {
    ref.current.volume = value / 100;
    setVolume(value);
  }

  return (
    <div className="audio">
      <audio ref={ref} loop>
        <source src={src} type="audio/mpeg" /> Your browser does
        not support the audio element.
      </audio>
      <div className="slider-wrapper">
        <AudioSlider
          min={0}
          max={100}
          step={1}
          value={volume}
          onChange={handleVolumeChange}
          icon={icon}
          vertical
        />
        <p>{volume}%</p>
      </div>
    </div>
  );
});

function App() {
  const { isPlayingAudio, playAudio, resetAudio, audioRefs } = useAudioPlayer(audios, {
    defaultVolume: defaultSliderValue,
  });

  function handleVolumeChange(value) {
    audioRefs.forEach((audioRef) => {
      audioRef.current.volume = value / 100;
    });
  }

  return (
    <>
      <div className="audios">
        {audioRefs.map((audioRef, index) => (
          <Audio key={audioRef.src} {...audioRef} />
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
