import { useEffect } from 'react';
import { css, Global } from '@emotion/react';
import { fgColor } from './styles';
import AudioSlider from './components/AudioSlider';
import Control from './components/Control';
import useAudio from './hooks/useAudio';
import useVolume from './hooks/useVolume';
import 'rc-slider/assets/index.css';
import './App.css';

const icon = {
  bugs: '\\e4d0',
  play: '\\f04b',
  pause: '\\f04c',
  fire: '\\f06d',
  volumeHigh: '\\f028',
  volumeLow: '\\f027',
  volumeOff: '\\f026',
  crow: '\\f520',
  wind: '\\f72e',
  cloudRain: '\\f73d',
  water: '\\f773',
  umbrellaBeach: '\\f5ca',
};

const audios = [
  { name: 'Fire', src: '/fire.mp3', icon: icon.fire },
  { name: 'Crickets', src: '/crickets.mp3', icon: icon.bugs },
  { name: 'Birds', src: 'birds.mp3', icon: icon.crow },
  { name: 'Wind', src: '/wind.mp3', icon: icon.wind },
  { name: 'Rain', src: '/rain.mp3', icon: icon.cloudRain },
  { name: 'River', src: '/river.mp3', icon: icon.water },
  { name: 'Sea', src: '/waves.mp3', icon: icon.umbrellaBeach },
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

  const {
    volumes,
    handleVolumeChange,
    increaseVolumes,
    decreaseVolumes,
    resetVolumes,
  } = useVolume(audios, DEFAULT_VOLUME);

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
            handleSliderChange={value => handleVolumeChange(value, index)}
          />
        ))}
      </div>
      <div className="controls">
        <Control onClick={decreaseVolumes} icon={icon.volumeLow} />
        <Control
          onClick={playAudio}
          icon={isPlayingAudio ? icon.pause : icon.play}
          big
        />
        <Control onClick={increaseVolumes} icon={icon.volumeHigh} />
      </div>
    </>
  );
}

export default App;
