import React, { useEffect, useState } from 'react';
import { store } from '../store';
import { cx, css } from 'emotion';
import Input from './Input';
import { tap } from 'rxjs/operators';

const Output = (props) => {
  const [state, setState] = useState({ 
    value: '',
    isAlive: true
  });

  const inputHandler = (value) => setState({ ...state, value });

  useEffect(() => {
    const { inputSbj, key, destroySbj } = props.element.options;
    const isExist = store.sidebar.getInputList().some(item => item.props.keyProp === key);
    const subList = [];
    if (!isExist) {
      const input = <Input key={key} keyProp={key} inputSubject={inputSbj} destroySbj={destroySbj}/>;
      store.sidebar.addInput(input);
      subList.push(inputSbj.pipe(tap(e => inputHandler(e))).subscribe());
      subList.push(destroySbj.pipe(tap(val => setState({ ...state, isAlive: val }))).subscribe());
    }
    return () => {
      if (subList.length) {
        subList.forEach(sub => sub.unsubscribe());
      }
    }
  }, []);

  return (
    state.isAlive ?
                  <Wrapper>
                    <span contentEditable={false} style={{ userSelect: "none" }}>{state.value}{props.children}</span>
                  </Wrapper>
                  : null
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