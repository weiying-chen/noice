import styled from 'styled-components';
import Slider from 'rc-slider';

const StyledSlider = styled(Slider)`
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

  .rc-slider-track, .rc-slider-tracks {
    background-color: #bbb;
  }

  .rc-slider-handle {
    background-color: #ffb4af;
    border: solid 2px #183153;
    border-bottom-width: 2px;
    color: #183153;
    opacity: 1;
    width: 32px;
    height: 32px;
  }

  .rc-slider-handle:hover {
    border-color: #222;
  }

  .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    border-color: #222;
    box-shadow: 0 0 5px #222;
  }

  .rc-slider-handle:focus-visible {
    border-color: #222;
    box-shadow: 0 0 5px #222;
  }

  .rc-slider-handle:before {
    content: ${(props) => `"${props.$icon}"`};
    font-family: "Font Awesome 5 Free"; /* Font family for Font Awesome 5 Free */
    font-weight: 900;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Center the icon */
  }
`;

export default StyledSlider;