import { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import '@fortawesome/fontawesome-free/css/all.css';
import 'rc-slider/assets/index.css';
import { DEFAULT_VOLUME, MOBILE_AUDIOS, LOCAL_STORAGE_KEY } from './constants'
import { audios as allAudios } from './constants'
import { icon } from './constants'
import AudioSlider from './components/AudioSlider';
import Control from './components/Control';
import GlobalStyles from './components/GlobalStyles';
import useAudio from './hooks/useAudio';
import useVolume from './hooks/useVolume';
import { darkTheme, lightTheme } from './styles';

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

const audios = isMobile() ? allAudios.slice(0, MOBILE_AUDIOS) : allAudios;

function App() {
  const { audioRefs, isPlayingAudio, playAudio } = useAudio(audios);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const storedIsDarkMode = localStorage.getItem(LOCAL_STORAGE_KEY);

    return JSON.parse(storedIsDarkMode ?? JSON.stringify(false));
  });

  const {
    volumes,
    handleVolumeChange,
    increaseVolumes,
    decreaseVolumes,
  } = useVolume(audios, DEFAULT_VOLUME);

  function toggleDarkMode() {
    setIsDarkMode(prevIsDarkMode => {
      const newIsDarkMode = !prevIsDarkMode;

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newIsDarkMode));

      return newIsDarkMode;
    });
  }

  return (
    <ThemeProvider
      theme={isDarkMode ? darkTheme : lightTheme}
    >
      <GlobalStyles icon={icon.gaugeSimple} />
      <div className="app-name">
        <h1>Noice</h1>
      </div>
      <div className="dark-mode">
        <Control
          onClick={toggleDarkMode}
          icon={isDarkMode ? icon.sun : icon.moon}
        />
      </div>
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
      <div className="made-by">
        <p>Crafted by <a href="https://github.com/weiying-chen/" target="_blank">Wei-ying Chen</a></p>
      </div>
    </ThemeProvider>
  );
}

export default App;
