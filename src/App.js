import React from 'react'
import { cx, css } from 'emotion'
import RichText from './RichText'

import './App.css';
import Sidebar from './components/Sidebar';

const Wrapper = ({ className, ...props }) => (
  <div
    {...props}
    className={cx(
      className,
      css`
        margin: 20px auto;
        width: 21cm;
        height: 29.7cm;
        grid-column: 2;
      `
    )}
  />
)

const EditorContent = props => (
  <Wrapper
    {...props}
    className={css`
      background: #fff;
    `}
  />
)

const Main = props => (
  <div
    {...props}
    className={css`
      display: grid;
      grid-template-columns: 4fr 8fr;
    `}
  />
)

const App = () => {
  return (
    <Main>
      <Sidebar />
      <EditorContent>
        <RichText />
      </EditorContent>
    </Main>
  )
}

export default App;