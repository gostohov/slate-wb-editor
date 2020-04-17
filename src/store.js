import React from 'react'
import Output from "./components/Output";
import OutputCheckbox from './components/OutputCheckbox';

export let store;
export let outputList = [];

export const addContext = (state) => store = {...store, ...state};

export const getOutputElement = (props) => {
  const { element, inputState } = props;

  const addToList = () => {
    const output = <Output {...props} value={inputState.value} inputNumber={element.options.inputNumber}/>;
    outputList.push(output);
    return output;
  }

  const deleteFromList = () => {
    const targetOutputIndex = outputList.findIndex(item => item.props.inputNumber === inputState.inputNumber);
    if (targetOutputIndex !== -1) {
      outputList.splice(targetOutputIndex, 1);
    }
  }

  if (inputState.inputNumber == null) {
    return addToList();      
  } else if (inputState.inputNumber === element.options.inputNumber) {
    deleteFromList();
    return addToList();      
  } else {
    const targetOutput = outputList.find(item => item.props.inputNumber === element.options.inputNumber);
    if (!targetOutput) {
      return addToList();   
    }
    return targetOutput;
  }
}

export const getOutputCheckboxElement = (props) => {
  return <OutputCheckbox {...props} />
}