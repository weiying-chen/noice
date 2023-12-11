import { css, Global, useTheme } from '@emotion/react';

function GlobalStyles() {
  const theme = useTheme();

  return (
    <Global styles={css`
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

export default GlobalStyles