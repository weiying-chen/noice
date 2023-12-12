import { css, Global, useTheme } from '@emotion/react';
import { icon } from '../constants'

function styles(theme, icon) {
  return css`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');

    body {
      background-color: ${theme.color.bg};
      color: ${theme.color.text};
      font-family: 'Nunito', sans-serif;
      margin: 0;
      display: flex;
      place-items: center;
      min-width: 320px;
      min-height: 100vh;
    }

    h1 {
      font-size: 1.4em;
    }

    a {
      color: ${theme.color.text};
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

    .app-name {
      margin: 0 0 190px;
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);

      h1 {
        margin: 0;

        &::before {
          /* \`transform: rotate()\` won't work without \`display: inline-block\` */
          display: inline-block;
          content: "${icon.circlePlay}";
          font-family: "Font Awesome 5 Free";
          font-weight: 400;
          margin: 0 3px 0 0;
          transform: rotate(-90deg);
        }
      }
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
      margin: 0 0 60px;
    }

    .made-by {
      margin: 60px 0 0;

      p {
        font-size: 0.7em;        
      }
    }
  `;
}

function GlobalStyles() {
  const theme = useTheme();
  return <Global styles={styles(theme, icon)} />;
}

export default GlobalStyles;
