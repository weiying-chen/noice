import React, { useEffect } from 'react';
import { css, Global } from '@emotion/react';
import { fgColor } from './styles';
import AudioSlider from './components/AudioSlider';
import Control from './components/Control';
import useAudio from './hooks/useAudio';
import useVolume from './hooks/useVolume';
import 'rc-slider/assets/index.css';
import './App.css';

const icons = {
  play: '\\f04b',
  pause: '\\f04c',
  reset: '\\f026',
  fire: '\\f06d',
  crickets: '\\e4d0',
};

const audios = [
  { name: 'Fire', src: '/fire.mp3', icon: icons.fire },
  { name: 'Crickets', src: '/crickets.mp3', icon: icons.crickets },
];

const DEFAULT_VOLUME = 0;

const styles = css`
  body {
    color: ${fgColor};
    font-family: 'Nunito', sans-serif;
  }

  button {
    cursor: pointer;
  }
`;

function App() {
  const { audioRefs, isPlayingAudio, playAudio } = useAudio(audios);
  const { volumes, handleVolumeChange, resetVolumes } = useVolume(audios, DEFAULT_VOLUME);

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
            audio={audio}
            ref={audioRefs[index]}
            volume={volumes[index]}
            handleSliderChange={(value) => handleVolumeChange(value, index)}
          />
        ))}
      </div>
      <div className="controls">
        <Control onClick={playAudio} icon={isPlayingAudio ? icons.pause : icons.play} />
        <Control onClick={resetVolumes} icon={icons.reset} />
      </div>
    </>
  );
}

export default App;
