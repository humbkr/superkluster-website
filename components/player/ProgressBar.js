import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ProgressBar = ({ current = 0, max = 0 }) => {
  const processedCurrent = (current / max) * 100

  return (
    <Container>
      <Progress style={{ width: `${processedCurrent}%` }} />
    </Container>
  )
}
ProgressBar.propTypes = {
  max: PropTypes.number.isRequired,
  current: PropTypes.number,
}
ProgressBar.defaultProps = {
  current: undefined,
}

export default ProgressBar

const Container = styled.div`
  width: 100%;
  height: 5px;
  background-color: #aaaaaa;
`
const Progress = styled.div`
  height: 100%;
  background-color: darkred;
  width: 0;
`
