import { useState } from 'react';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import 'rc-slider/assets/index.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

const handleWithIcon = (node, props) => {
  return (
    <div className="custom-handle">
      <FontAwesomeIcon icon={faCoffee} />
      {node}
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0);
  const [sliderValue1, setSliderValue1] = useState(1); // State for the first slider value
  const [sliderValue2, setSliderValue2] = useState(1); // State for the second slider value
  const [sliderValue3, setSliderValue3] = useState(1); // State for the third slider value

  return (
    <>
      <Slider min={0} max={20} defaultValue={3} />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count + 1)}>Count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <div className="sliders-container">
          <div className="slider-wrapper">
            <Slider
              className="slider-1"
              min={0}
              max={20}
              step={1}
              value={sliderValue1}
              onChange={(newValue) => setSliderValue1(newValue)}
              vertical // Set the slider to vertical
            />
            <p>{sliderValue1}%</p>
          </div>
          <div className="slider-wrapper">
            <Slider
              className="slider-2"
              min={0}
              max={20}
              step={1}
              value={sliderValue2}
              onChange={(newValue) => setSliderValue2(newValue)}
              vertical // Set the slider to vertical
            />
            <p>{sliderValue2}%</p>
          </div>
          <div className="slider-wrapper">
            <Slider
              className="slider-3"
              min={0}
              max={20}
              step={1}
              value={sliderValue3}
              onChange={(newValue) => setSliderValue3(newValue)}
              vertical // Set the slider to vertical
            />
            <p>{sliderValue3}%</p>
          </div>
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App
