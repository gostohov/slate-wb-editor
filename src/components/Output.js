import React, { useEffect, useState } from 'react';
import { store } from '../store';
import { cx, css } from 'emotion';
import Input from './Input';

const Output = (props) => {
  const [state, setState] = useState({ value: '[Введите ваш текст]' });

  const inputHandler = (e) => setState({ value: e.target.value });

  useEffect(() => {
    const key = `input_${store.sidebar.getInputList().length}`;
    const input = <Input inputHandler={inputHandler} key={key} keyProp={key} />;
    store.sidebar.addInput(input);
    return () => {
      store.sidebar.removeInput(key);
    }
  }, []);

  return (
    <Wrapper>
      <span contentEditable={false} style={{ userSelect: "none" }}>{state.value}{props.children}</span>
    </Wrapper>
  )
};

export default Output;

const Wrapper = ({ className, ...props }) => (
  <span
    {...props}
    className={cx(
      className,
      css`
        background-color: rgb(201, 201, 201);
        padding: 2px;
      `
    )}
  />
)