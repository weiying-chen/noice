import styled from 'styled-components';

const Button = styled.button`
  background: #e3b0c8;
  border: solid 2px #555;
  border-radius: 50%;
  color: #fff;
  margin: 0 5px;
  padding: 0;
  outline: none !important;
  position: relative;
  width: 38px;
  height: 38px;

  &::before {
    content: ${(props) => `"${props.$icon}"`};
    font-family: "Font Awesome 5 Free"; /* Font family for Font Awesome 5 Free */
    font-size: 1.2em;
    font-weight: 900;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    border-color: #222;
  }
`;

function Control({ index, onClick, icon}) {
  return (
    <Button onClick={onClick} $icon={icon} />
  );
};

export default Control
