import React from 'react'
import { cx, css } from 'emotion'
import RichText from './RichText'

import './App.css';

const Wrapper = ({ className, ...props }) => (
  <div
    {...props}
    className={cx(
      className,
      css`
        margin: 20px auto;
        padding: 20px;
        width: calc(21cm - 20px);
        height: calc(29.7cm - 20px); 
      `
    )}
  />
)

const ExampleContent = props => (
  <Wrapper
    {...props}
    className={css`
      background: #fff;
    `}
  />
)

const App = () => {
  return (
    <ExampleContent>
      <RichText />
    </ExampleContent>
  )
}

export default App;