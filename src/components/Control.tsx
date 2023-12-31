import { css, useTheme, Theme } from '@emotion/react'
import { MouseEvent } from 'react';

function style(theme: Theme, icon: string, big: boolean | undefined) {
  return css`
    background: #d5b1c5;
    border: solid 2px ${theme.color.border};
    border-radius: 50%;
    color: ${theme.color.fg};
    margin: 0 5px;
    padding: 0;
    outline: none !important;
    position: relative;
    width: ${big ? '46px' : '38px'};
    height: ${big ? '46px' : '38px'};

    &::before {
      content: "${icon}";
      font-family: "Font Awesome 5 Free";
      font-size: ${big ? '1.7em' : '1.4em'};
      font-weight: 900;
      position: absolute;
      top: 50%;
      /* The Play icon looks better when it's slightly to the right */
      left: ${icon === '\\f04b' ? '54%' : '50%'};
      transform: translate(-50%, -50%);
    }

    /* The focus gets stuck on mobile */
    &:focus-visible {
      box-shadow: none;
    }

    /* This is the tapped state on mobile */
    &:active {
      box-shadow: 0 0 5px ${theme.color.text};
    }

    /* This prevents the sticky hover on mobile */
    @media (hover: hover) and (pointer: fine) {
      &:hover,
      /* An example is focusing element with Tab */
      &:focus-visible {
        box-shadow: 0 0 5px ${theme.color.text};
      }
    }
  `;
}

interface Props {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  icon: string;
  big?: boolean | undefined;
}

function Control({ icon, big, onClick }: Props) {
  const theme = useTheme();

  return (
    <button css={style(theme, icon, big)} onClick={onClick} />
  );
}

export default Control;
