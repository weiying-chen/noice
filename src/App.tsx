import { useState, useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import '@fortawesome/fontawesome-free/css/all.css';
import 'rc-slider/assets/index.css';
import { DEFAULT_VOLUME, MOBILE_AUDIOS } from './constants'
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  const {
    volumes,
    setVolumes,
    handleVolumeChange,
    increaseVolumes,
    decreaseVolumes,
    resetVolumes,
  } = useVolume(audios, DEFAULT_VOLUME);

  const [isLoadedFromLocalStorage, setIsLoadedFromLocalStorage] = useState(false);

  // useEffect to load volumes from localStorage or set to default
  useEffect(() => {
    const savedVolumes = localStorage.getItem('volumes');

    if (savedVolumes) {
      try {
        const parsedVolumes = JSON.parse(savedVolumes);
        setVolumes(parsedVolumes);
      } catch (error) {
        console.error("Error parsing volumes from localStorage:", error);
        resetVolumes();
      }
    } else {
      resetVolumes();
    }
    setIsLoadedFromLocalStorage(true);  // Set the flag to true after loading data
  }, []);

  // useEffect to save volumes to localStorage whenever they change
  useEffect(() => {
    if (isLoadedFromLocalStorage) {
      localStorage.setItem('volumes', JSON.stringify(volumes));
    }
  }, [volumes]); // Dependency on volumes

  function toggleDarkMode() {
    setIsDarkMode(prevMode => !prevMode);
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
