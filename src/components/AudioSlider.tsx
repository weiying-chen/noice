import { ForwardedRef, forwardRef, useCallback } from 'react';
import { css, useTheme, Theme } from '@emotion/react'
import Slider from 'rc-slider';

function style(theme: Theme, icon: string) {
  return css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 22px;
    margin: 0 20px;

    p {
      font-size: 0.7em;
      margin: 20px 0 0;
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
        background-color: ${theme.color.secondary};
      }

      .rc-slider-track,
      .rc-slider-tracks {
        background-color: #919191;
      }

      .rc-slider-handle {
        background-color: #e2a19c;
        border: solid 2px ${theme.color.border};
        color: ${theme.color.fg};
        opacity: 1;
        width: 32px;
        height: 32px;

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
        box-shadow: 0 0 5px ${theme.color.text};
      }
    }
  `;
}

interface Audio {
  name: string;
  src: string;
  icon: string;
}

interface Props {
  audio: Audio;
  volume: number;
  handleSliderChange: (value: number) => void;
}

const AudioSlider = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLAudioElement>) => {
  const { audio, volume, handleSliderChange } = props;

  const callbackRef = useCallback((node: HTMLAudioElement | null) => {
      if (!node) return;
      
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        node.volume = volume;
        ref.current = node;
      }
  }, [volume]);

  const { name, src, icon } = audio;

  const audioLabel = volume === 0
    ? name
    : `${Math.round(volume * 100)}%`;

  const theme = useTheme();

  return (
    <div className="audio" css={style(theme, icon)}>
      <audio ref={callbackRef} preload="auto" loop>
        <source src={src} type="audio/mpeg" /> Your browser does
        not support the audio element.
      </audio>
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={volume}
        // `value` could be a `number[]`
        onChange={value => handleSliderChange(typeof value === "number" ? value : 0)}
        vertical
      />
      <p>{audioLabel}</p>
    </div>
  );
});

export default AudioSlider
