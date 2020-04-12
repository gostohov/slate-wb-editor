import React from 'react';

const Input = (props) => {
  return <input type="text" onChange={(e) => props.inputSubject.next(e)}/>
};

export default Input;