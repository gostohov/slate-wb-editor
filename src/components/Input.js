import React from 'react';

const Input = (props) => {
  return <input type="text" onChange={props.inputHandler}/>
};

export default Input;