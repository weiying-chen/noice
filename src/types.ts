import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    color: {
      text: string,
      fg: string,
      bg: string,
      border: string,
      secondary: string,
    }
  }
}