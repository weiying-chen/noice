import { Theme as EmotionTheme } from '@emotion/react';

export interface Icon {
  [key: string]: string;
}

declare module '@emotion/react' {
  export interface Theme extends EmotionTheme {
    color: {
      text: string,
      fg: string,
      bg: string,
      border: string,
      secondary: string,
    }
  }
}