import React, { useEffect, useState } from 'react';
import { store } from '../store';
import { cx, css } from 'emotion';
import Input from './Input';
import { tap } from 'rxjs/operators';

const Output = (props) => {
  const [state, setState] = useState({ value: '[Введите ваш текст]' });

  const inputHandler = (e) => {
    let value = e.target.value;
    if (!value.length) {
      value = '[Введите ваш текст]';
    }
    setState({ value: value });
  }

  useEffect(() => {
    const { subject, key } = props.element.options;
    const isExist = store.sidebar.getInputList().some(item => item.props.keyProp === key);
    let sub;
    if (!isExist) {
      const input = <Input key={key} keyProp={key} inputSubject={subject}/>;
      store.sidebar.addInput(input);
      sub = subject.pipe(tap(e => inputHandler(e))).subscribe();
    }
    return () => {
      if (sub) {
        sub.unsubscribe();
      }
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
        background-color: #eee;
        padding: 2px;
        border-radius: 4px;
        font-size: 0.9em;
        box-shadow: 0 0 0 2px #B4D5FF;
      `
    )}
  />
)