import React, { useState, useEffect, useRef } from 'react';
import { store } from '../store';
import { cx, css } from 'emotion';
import { Button, Icon } from '../components';

const Input = (props) => {
  const initTitle = useRef(null);
  const [state, setState] = useState({
    title: `[Новый шаблон_${store.sidebar.getInputList().length}]`,
    openConfigBlock: false
  })

  useEffect(() => {
    inputHandler({ target: { value: state.title }});
    initTitle.current = state.title;
  }, []);

  const inputHandler = (e) => {
    const value = e.target.value;
    if (value.length !== 0) {
      store.app.setInputState({value, inputNumber: props.inputNumber});
      return;
    }
    store.app.setInputState({value: state.title, inputNumber: props.inputNumber});
  }

  const toggleConfigBlock = (e) => setState({ ...state, openConfigBlock: !state.openConfigBlock });

  const destroySelf = (e) => store.sidebar.removeInput(props.keyProp);
  
  const setTitle = (e) => {
    const value = e.target.value;
    if (value.length !== 0) {
      setState({ ...state, title: value });
      return;
    }
    setState({ ...state, title: initTitle.current });
  }
  
  const style = {
    button: {
      display: 'inline-flex',
      alignItems: 'center',
      gridArea: 'config'
    },
    icon: {
      color: 'black'
    },
    input: {
      gridArea: 'input'
    }
  }

  return (
    <div style={{ margin: '20px 0' }}>
      {state.title}
      <Wrapper>
        <input style={style.input} type="text" onChange={(e) => inputHandler(e)}/>
        {state.openConfigBlock ? 
                                <ConfigBlock>
                                  <div>
                                    Название поля:
                                    <input type="text" onChange={(e) => setTitle(e)}/>
                                  </div>
                                  <ButtonWrapper>
                                    <button onClick={e => destroySelf()}>Удалить</button>
                                  </ButtonWrapper>
                                </ConfigBlock>
                                : null
        }
        <Button style={style.button}
          onMouseDown={event => {
            event.preventDefault();
            toggleConfigBlock();
          }}
        >
          <Icon style={style.icon}>{'more_vert'}</Icon>
        </Button>
      </Wrapper>
    </div>
  );
};

export default Input;

const Wrapper = ({ className, ...props }) => (
  <div
    {...props}
    className={cx(
      className,
      css`
        display: grid;
        grid-template-columns: max-content auto min-content;
        grid-template-rows: min-content min-content;
        grid-template-areas:
            "input input config"
            "configBlock configBlock nothing"; 
      `
    )}
  />
)

const ConfigBlock = ({ className, ...props }) => (
  <div
    {...props}
    className={cx(
      className,
      css`
        grid-area: configBlock;
        height: 200px;
        border: 2px solid #ddd;
        padding: 20px; 
        position: relative;
      `
    )}
  />
)

const ButtonWrapper = ({ className, ...props }) => (
  <div
    {...props}
    className={cx(
      className,
      css`
        position: absolute;
        bottom: 20px;
        right: 20px;
      `
    )}
  />
)