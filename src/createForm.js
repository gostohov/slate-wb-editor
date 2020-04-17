import React from 'react'
import { store } from './store';
import Input from './components/Input';

export const createForm = (toggleBlock) => {
  const inputNumber = store.sidebar.getInputList().length;
  const key = `input_${inputNumber}`;
  const input = <Input key={key} inputNumber={inputNumber} />;
  store.sidebar.addInput(input);
  toggleBlock({inputNumber});
}