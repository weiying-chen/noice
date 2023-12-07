import { forwardRef, useCallback } from 'react';
import { css } from '@emotion/react'
import { fgColor } from '../styles'
import Slider from 'rc-slider';

function style(icon) {
  return css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 22px;
    margin: 0 20px;

    p {
      font-size: 0.7em;
      margin: 20px 0;
    }

    .rc-slider {
      height: 250px;

      &.rc-slider-vertical {
        padding: 0;
        width: inherit;
        display: flex;
        flex-direction: column;
        align-items: center;

        .rc-slider-rail {
          width: 12px;
        }

        .rc-slider-track {
          left: auto;
          width: 12px;
        }

        .rc-slider-handle {
          margin-left: 0;
        }

        .rc-slider-step {
          width: 12px;
        }
      }

      .rc-slider-rail {
        background-color: #ddd;
      }

      .rc-slider-track,
      .rc-slider-tracks {
        background-color: #bbb;
      }

      .rc-slider-handle {
        background-color: #ffb4af;
        border: solid 2px ${fgColor};
        color: ${fgColor};
        opacity: 1;
        width: 32px;
        height: 32px;

        &:hover,
        /* An example is focusing element with Tab */
        &:focus-visible {
          box-shadow: 0 0 5px #222;
        }

        &::before {
          content: "${icon}";
          font-family: "Font Awesome 5 Free";
          font-weight: 900;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
        border-color: #222;
        box-shadow: 0 0 5px #222;
      }
    }
  `;
}

const AudioSlider = forwardRef((props, ref) => {
  const { audio, volume, handleSliderChange } = props;
  const { name, src, icon } = audio; 

  const callbackRef = useCallback((node) => {
    if (node) {
      ref.current = node
      ref.current.volume = volume;
    }
  }, [volume])

  const audioLabel = volume === 0
    ? name
    : `${parseInt(volume * 100)}%`;

  return (
    <div className="audio" css={style(icon)}>
      <audio ref={callbackRef} loop>
        <source src={src} type="audio/mpeg" /> Your browser does
        not support the audio element.
      </audio>
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={handleSliderChange}
        vertical
      />
      <p>{audioLabel}</p>
    </div>
  );
});

export default AudioSlider
