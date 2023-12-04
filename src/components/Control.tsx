import { css } from '@emotion/react'

const style = (icon) => ({
  background: '#f1c9e0',
  border: 'solid 2px #183153',
  borderBottomWidth: '2px',
  borderRadius: '50%',
  color: '#183153',
  margin: '0 5px',
  padding: 0,
  outline: 'none !important',
  position: 'relative',
  width: '38px',
  height: '38px',

  '&::before': {
    content: `"${icon}"`,
    fontFamily: '"Font Awesome 5 Free"',
    fontSize: '1.2em',
    fontWeight: 900,
    position: 'absolute',
    top: '50%',
    left: `${icon === '\\f04b' ? '54%' : '50%'}`,
    transform: 'translate(-50%, -50%)',
  },

  '&:hover': {
    borderColor: '#222',
  },
});

function Control({ index, onClick, icon}) {
  return (
    <button css={style(icon)} onClick={onClick} />
  );
};

export default Control
