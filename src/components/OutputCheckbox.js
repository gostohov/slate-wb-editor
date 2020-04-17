import React from 'react'
import { cx, css } from 'emotion';

const OutputCheckbox = (props) => {
  return (
    <Wrapper>
      <span {...props.attributes}
            contentEditable={false} 
      >
        {props.element.options?.text}{props.children}
      </span>
    </Wrapper>
  )
};

export default OutputCheckbox;

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