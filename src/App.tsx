import { useEffect } from 'react';
import { css, Global } from '@emotion/react'
import { fgColor } from './styles'
import AudioSlider from './components/AudioSlider';
import Control from './components/Control';
import useAudio from './hooks/useAudio';
import 'rc-slider/assets/index.css';
import './App.css';

const icons = {
  play: '\\f04b',
  pause: '\\f04c',
  reset: '\\f2f9',
  fire: '\\f06d',
  crickets: '\\e4d0',
};

const audios = [
  { src: '/fire.mp3', icon: icons.fire },
  { src: '/crickets.mp3', icon: icons.crickets },
];

const defaultVolume = 0.5;

const styles = css`
  body {
    color: ${fgColor};
    font-family: 'Nunito', sans-serif;
  }

  button {
    cursor: pointer;
  }
`

function App() {
  const {
    audioRefs,
    volumes,
    isPlayingAudio,
    playAudio,
    resetVolumes,
    handleVolumeChange,
  } = useAudio(audios, {
    defaultVolume,
  });
  
  useEffect(() => {
    resetVolumes();
  }, []);

  return (
    <>
      <Global styles={styles} />
      <div className="audios">
        {audios.map((audio, index) => (
          <AudioSlider
            key={index}
            src={audio.src}
            icon={audio.icon}
            ref={audioRefs[index]}
            volume={volumes[index]}
            handleSliderChange={(value) => handleVolumeChange(value, index)}
          />
        ))}
      </div>
      <div className="controls">
        <Control
          onClick={playAudio}
          icon={isPlayingAudio ? icons.pause : icons.play }
        />
        <Control onClick={resetVolumes} icon={icons.reset} />
      </div>
    </>
  );
}

export default App;
