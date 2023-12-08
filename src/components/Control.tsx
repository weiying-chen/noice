import { css } from '@emotion/react'
import { fgColor } from '../styles'

function style(icon: any, big: any) {
  return css`
    background: #f1c9e0;
    border: solid 2px ${fgColor};
    border-radius: 50%;
    color: ${fgColor};
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

    &:hover,
    /* An example is focusing element with Tab */
    &:focus-visible {
      box-shadow: 0 0 5px #222;
    }
  `;
}

interface Props {
  onClick: () => void;
  icon: any;
  big?: boolean;
}

function Control({ onClick, icon, big }: Props): JSX.Element {
  return (
    <button css={style(icon, big)} onClick={onClick} />
  );
}

export default Control;
