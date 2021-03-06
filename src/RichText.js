import React, { useCallback, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate, ReactEditor } from 'slate-react'
import { Editor, Transforms, createEditor, Range } from 'slate'
import { withHistory } from 'slate-history'
import { css } from 'emotion'

import { Button, Icon, Toolbar } from './components'
import { createForm } from './createForm'
import { getOutputElement, getOutputCheckboxElement } from './store';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const RichText = (props) => {
  const inputState = props.inputState;
  const [value, setValue] = useState(initialValue)
  const renderElement = useCallback(props => <Element {...props} inputState={inputState}/>, [inputState])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(
    () => withOutputs(withReact(withHistory(createEditor()))), 
    []
  )

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <ToolbarWrapper>
        <Toolbar>
          <MarkButton format="bold" icon="format_bold" />
          <MarkButton format="italic" icon="format_italic" />
          <MarkButton format="underline" icon="format_underlined" />
          <MarkButton format="code" icon="code" />
          <BlockButton format="heading-one" icon="looks_one" />
          <BlockButton format="heading-two" icon="looks_two" />
          <BlockButton format="block-quote" icon="format_quote" />
          <BlockButton format="numbered-list" icon="format_list_numbered" />
          <BlockButton format="bulleted-list" icon="format_list_bulleted" />
          <FormButton format="output" icon="note_add" />
          <CheckboxButton format="output-checkbox" icon="check_box" />
        </Toolbar>
      </ToolbarWrapper>
      <Page>
        <EditableWrapper>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Введите ваш текст…"
            spellCheck
            autoFocus
            onKeyDown={event => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event)) {
                  event.preventDefault()
                  const mark = HOTKEYS[hotkey]
                  toggleMark(editor, mark)
                }
              }
            }}
          />
        </EditableWrapper>
      </Page>
    </Slate>
  )
}

const withOutputs = editor => {
  const { isInline, isVoid } = editor
  editor.isInline = element => {
    return element.type === 'output' || element.type === 'output-checkbox' ? true : isInline(element)
  }

  editor.isVoid = element => {
    return element.type === 'output' || element.type === 'output-checkbox' ? true : isVoid(element)
  }

  return editor
}

const Page = props => {
  const style = {
    margin: '20px auto',
    width: '21cm',
    height: '29.7cm',
    background: '#fff'
  };

  return (
    <div style={style}>
      {props.children}
    </div>
  );
}


const EditableWrapper = props => (
  <div
    {...props}
    className={css`
      padding: 2cm;
    `}
  />
)

const ToolbarWrapper = props => (
  <div
    {...props}
    className={css`
      position: sticky;
      top: 0px;
      background: #fff;
      z-index: 1000;
      margin: 20px auto;
      width: 21cm;
    `}
  />
)

const toggleBlock = (editor, format, options) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true,
  })

  let block = { type: isActive ? 'paragraph' : isList ? 'list-item' : format };
  switch (block.type) {
    case 'output':
      block = {...block, children: [{ text: '' }], options};
      Transforms.insertNodes(editor, block)
      Transforms.move(editor)
      break;
    case 'output-checkbox': 
      block = {...block, children: [{ text: '' }], options};
      Transforms.insertNodes(editor, block)
      Transforms.move(editor)
      break;
    default:
      Transforms.setNodes(editor, { block })
      break;
  }


  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  })

  return !!match
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Element = (props) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case 'block-quote'        : return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list'      : return <ul {...attributes}>{children}</ul>
    case 'heading-one'        : return <h1 {...attributes}>{children}</h1>
    case 'heading-two'        : return <h2 {...attributes}>{children}</h2>
    case 'list-item'          : return <li {...attributes}>{children}</li>
    case 'numbered-list'      : return <ol {...attributes}>{children}</ol>
    case 'output'             : return getOutputElement(props)
    case 'output-checkbox'    : return getOutputCheckboxElement(props)
    default                   : return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, icon }) => {
  const editor = useSlate()
  
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

const FormButton = ({ format, icon }) => {
  const editor = useSlate();
  
  
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        createForm('output', options => toggleBlock(editor, format, options))
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
}

const CheckboxButton = ({ format, icon }) => {
  const editor = useSlate();

  const { selection } = editor
  let text = '';
  if (
    selection &&
    ReactEditor.isFocused(editor) &&
    !Range.isCollapsed(selection) &&
    Editor.string(editor, selection) !== ''
  ) {
    text = Editor.string(editor, selection);
  }

  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        createForm('output-checkbox', text, options => toggleBlock(editor, format, options))
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
}

const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: '' },
    ]
  }
]

export default RichText;