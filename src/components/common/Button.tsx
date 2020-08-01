import React from 'react'
import styled from 'styled-components'
import Loader from '@src/components/common/Loader'

const Button: React.FC<{
  loading?: boolean
  submitButton?: boolean
}> = ({ loading = false, submitButton = false, children }) => (
  <Container type={submitButton ? 'submit' : 'button'} disabled={loading}>
    {loading && <Loader size={20} />}
    <Text>{children}</Text>
  </Container>
)

export default Button

const Container = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.6rem;
  height: ${(props) => props.theme.buttons.actionButton.height};
  border: 0;
  border-radius: 5px;
  font-size: 1.6rem;
  font-weight: bold;
  color: ${(props) => props.theme.buttons.actionButton.color};
  background-color: ${(props) => props.theme.buttons.actionButton.backgroundColor};
  box-shadow: 10px 10px 24px -6px rgba(0, 0, 0, 0.75);
`
const Text = styled.span`
  margin-left: 0.5rem;
`
