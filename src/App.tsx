import { useState, useEffect } from 'react';
import { css, Global, ThemeProvider, useTheme } from '@emotion/react';
import { fgColor, bgColor } from './styles';
import AudioSlider from './components/AudioSlider';
import Control from './components/Control';
import useAudio from './hooks/useAudio';
import useVolume from './hooks/useVolume';
import '@fortawesome/fontawesome-free/css/all.css';
import 'rc-slider/assets/index.css';

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
  sun: '\\f185',
  moon: '\\f186',
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

// function styles(isDarkMode) { 
//   return css`
//     @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');

//     body {
//       background-color: ${isDarkMode ? fgColor : bgColor};
//       color: ${isDarkMode ? bgColor : fgColor };
//       font-family: 'Nunito', sans-serif;
//       margin: 0;
//       display: flex;
//       place-items: center;
//       min-width: 320px;
//       min-height: 100vh;
//     }

//     button {
//       cursor: pointer;
//     }

//     #root {
//       max-width: 1280px;
//       margin: 0 auto;
//       padding: 2rem;
//       text-align: center;
//     }

//     .audios {
//       display: flex;
//       justify-content: center;
//     }

//     .controls {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       margin: 30px 0 0;
//     }

//     .dark-mode {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       margin: 0 0 90px;
//     }
//   `;
// }

const theme = {
  colors: {
    primary: 'hotpink'
  }
}

const GlobalStyles = () => {
  const theme = useTheme()

  return (
    <Global styles={css`
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');

      body {
        background-color: ${theme.colors.primary};
        color: ${fgColor};
        font-family: 'Nunito', sans-serif;
        margin: 0;
        display: flex;
        place-items: center;
        min-width: 320px;
        min-height: 100vh;
      }

      button {
        cursor: pointer;
      }

      #root {
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
      }

      .audios {
        display: flex;
        justify-content: center;
      }

      .controls {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 30px 0 0;
      }

      .dark-mode {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 0 90px;
      }
    `} />
  )
}

function App() {
  const { audioRefs, isPlayingAudio, playAudio } = useAudio(audios);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  function toggleDarkMode() {
    setIsDarkMode(prevMode => !prevMode);
  }

  return (
    // TODO: change theme in <ThemeProvider theme={isDarkMode ? theme : theme2}
    <ThemeProvider theme={theme}>
      <GlobalStyles />
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
    </ThemeProvider>
  );
}

export default App;
