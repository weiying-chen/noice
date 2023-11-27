import styled from 'styled-components';

const Button = styled.button`
  background: #e3b0c8;
  border: solid 2px #555;
  border-radius: 50%;
  color: #fff;
  padding: 0;
  outline: none !important;
  position: relative;
  width: 38px;
  height: 38px;
`;

function Control({ index, onClick, icon}) {
  return (
    <div key={index} className={`control-${index}`}>
      <Button onClick={onClick} />
      <style>
        {`
          .control-${index} button:before {
            content: "${icon}";
          }
        `}
      </style>
    </div>
  );
};

export default Control
