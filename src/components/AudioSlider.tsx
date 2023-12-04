import { forwardRef, useCallback } from 'react';
import Slider from 'rc-slider';

const Audio = forwardRef((props, ref) => {
  const { src, icon, volume, handleSliderChange } = props;

  const callbackRef = useCallback((node) => {
    if (node) {
      ref.current = node
      ref.current.volume = volume;
    }
  }, [volume])

  const style = (icon) => ({
    height: '250px',

    '&.rc-slider-vertical': {
      padding: 0,
      width: 'inherit',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

      '.rc-slider-rail': {
        width: '12px',
      },

      '.rc-slider-track': {
        left: 'auto',
        width: '12px',
      },

      '.rc-slider-handle': {
        marginLeft: 0,
      },

      '.rc-slider-step': {
        width: '12px',
      },
    },

    '.rc-slider-rail': {
      backgroundColor: '#ddd',
    },

    '.rc-slider-track, .rc-slider-tracks': {
      backgroundColor: '#bbb',
    },

   '.rc-slider-handle': {
      backgroundColor: '#ffb4af',
      border: 'solid 2px #183153',
      borderBottomWidth: '2px',
      color: '#183153',
      opacity: 1,
      width: '32px',
      height: '32px',

      '&:hover': {
        borderColor: '#222',
      },

      '&:focus-visible': {
        borderColor: '#222',
        boxShadow: '0 0 5px #222',
      },

      '&::before': {
        content: `"${icon}"`,
        fontFamily: '"Font Awesome 5 Free"',
        fontWeight: 900,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
    },

    '.rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging': {
      borderColor: '#222',
      boxShadow: '0 0 5px #222',
    },
  });

  return (
    <div className="audio">
      <audio ref={callbackRef} loop>
        <source src={src} type="audio/mpeg" /> Your browser does
        not support the audio element.
      </audio>
      <div className="slider-wrapper">
        <Slider
          css={style(icon)}
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleSliderChange}
          vertical
        />
        <p>{parseInt(volume * 100)}%</p>
      </div>
    </div>
  );
});

export default Audio
