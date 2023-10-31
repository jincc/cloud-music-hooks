import styled from 'styled-components';
import style from '../../styles/global';
const Container = styled.div`
  position: relative;
  circle {
    stroke-width: 8px;
    stroke-linecap: round;
    transform-origin: center;
    &.bg-circle {
      stroke: ${style['theme-color-shadow']};
      transform: scale(0.9);
    }

    &.progress-circle {
      stroke: ${style['theme-color']};
      transform: scale(0.9) rotate(-90deg);
    }
  }
`

const Progressbar = ({ radius, percent = 0, children }) => {
  const dashArray = Math.PI * 100
  const dashOffset = (1 - percent) * dashArray
  return (
    <Container>
      <svg width={radius} height={radius} viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle
          className='bg-circle'
          r='50'
          cx='50'
          cy='50'
          fill='transparent'
        />
        <circle
          className='progress-circle'
          r='50'
          cx='50'
          cy='50'
          fill='transparent'
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        />
      </svg>
      {children}
    </Container>
  )
}

export default Progressbar
