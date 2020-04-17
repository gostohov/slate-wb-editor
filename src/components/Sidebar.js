import React from 'react';
import { useState } from 'react';
import { addContext } from '../store';
import { cx, css } from 'emotion';

const Sidebar = (props) => {
  const [state, setState] = useState({
    inputList: []
  });

  const getInputList = () => state.inputList;
  const addInput = (input) => setState({ inputList: [...state.inputList,  input]});
  const removeInput = (key) => {
    const oldList = state.inputList;
    const newList = oldList.filter(item => item.props.keyProp !== key);
    setState({ inputList: [...newList] });
  };

  addContext({ sidebar: {addInput, removeInput, getInputList}})

  return (
    <Wrapper>
      Сайдбар
      {state.inputList}
    </Wrapper>
  )
};

export default Sidebar;

const Wrapper = ({ className, ...props }) => (
  <div
    {...props}
    className={cx(
      className,
      css`
        position: sticky;
        top: 0px;
        height: 100vh; 
        margin: 20px;
        grid-column: 1;
        padding: 20px;
        background: #fff;
        overflow-y: scroll;
      `
    )}
  />
)
