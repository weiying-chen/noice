import { css } from '@emotion/react'

function Control({ index, onClick, icon}) {
  const style = css`
    background: #f1c9e0;
    border: solid 2px #183153;
    border-bottom-width: 2px;
    border-radius: 50%;
    color: #183153;
    margin: 0 5px;
    padding: 0;
    outline: none !important;
    position: relative;
    width: 38px;
    height: 38px;

    &::before {
      content: "${icon}";
      font-family: "Font Awesome 5 Free";
      font-size: 1.2em;
      font-weight: 900;
      position: absolute;
      top: 50%;
      left: ${icon === '\\f04b' ? '54%' : '50%'};
      transform: translate(-50%, -50%);
    }

    &:hover {
      border-color: #222;
    }
  `;

  return (
    <button css={style} onClick={onClick} />
  );
};

export default Control;
