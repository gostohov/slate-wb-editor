import React from 'react'
import { store } from './store';
import Input from './components/Input';

export const createForm = (type, text, callback) => {
  switch (type) {
    case 'output'           : createInput(callback); break;
    case 'output-checkbox'  : createCheckboxInput(callback, text); break;
    default                 : break;
  }
}

const createInput = (callback) => {
  const inputNumber = store.sidebar.getInputList().length;
  const key = `input_${inputNumber}`;
  const input = <Input key={key} inputNumber={inputNumber} />;
  store.sidebar.addInput(input);
  callback({inputNumber});
}

const createCheckboxInput = (callback, text) => {
  callback({text})
};