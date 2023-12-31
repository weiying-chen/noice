import { css, Global, useTheme, Theme } from '@emotion/react';

function styles(theme: Theme, icon: string) {
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
      min-height: 100dvh;
    }

    h1 {
      font-size: 1.4em;
    }

    input,
    textarea,
    button,
    select,
    a {
      -webkit-tap-highlight-color: transparent;
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
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);

      h1 {
        margin: 0;

        &::before {
          /* \`transform: rotate()\` won't work without \`display: inline-block\` */
          display: inline-block;
          content: "${icon}";
          font-family: "Font Awesome 5 Free";
          font-weight: 900;
          margin: 0 5px 0 0;
          transform: rotate(180deg);
        }
      }
    }

    .dark-mode {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 0 60px;
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

    .made-by {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);

      p {
        font-size: 0.7em;        
      }
    }
  `;
}

interface Props {
  icon: string
}

function GlobalStyles({ icon }: Props) {
  const theme = useTheme();
  return <Global styles={styles(theme, icon)} />;
}

export default GlobalStyles;
