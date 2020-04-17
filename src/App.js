import React, { useState } from 'react'
import { cx, css } from 'emotion'
import RichText from './RichText'
import Sidebar from './components/Sidebar';
import { addContext } from './store';

import './App.css';

const EditorContent = props => (
  <div
    {...props}
    className={css`
      grid-column: 2;
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

  const [inputState, setInputState] = useState({
    value: '',
    inputNumber: null
  });

  addContext({ app: {inputState, setInputState}});

  return (
    <Main>
      <Sidebar setInputState={setInputState}/>
      <EditorContent>
        <RichText inputState={inputState} />
      </EditorContent>
    </Main>
  )
}

export default App;