import { useState, useEffect } from 'react'
import { EditorState, RichUtils, ContentState, convertToRaw } from 'draft-js'
import { Button } from '@/components/button/Button'
import Editor from "@draft-js-plugins/editor"
import { convertToHTML } from 'draft-convert'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import createImagePlugin from "@draft-js-plugins/image"
import './TextEditor.css'
import 'draft-js/dist/Draft.css'
import clsx from 'clsx'

const imagePlugin = createImagePlugin()

export const TextEditor = ({ data, saveDataFn }) => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  )
  
  useEffect(() => {
    if (data) {
      const blocksFromHtml = htmlToDraft(data)
      const { contentBlocks, entityMap } = blocksFromHtml
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
      setEditorState(EditorState.createWithContent(contentState))
    }
  }, [data])

  const toggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType))
  }

  const toggleInlineStyle = (inlineStyle: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle))
  }

  const handleSaveClick = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(
      rawContentState, 
      // hashtagConfig, 
      // directional, 
      // customEntityTransform
    );
    saveDataFn(markup)
  }
  

  return (
    <>
      <div className="editor__container">
        <div className="toolbar">
          <BlockStyleControls
            editorState={editorState}
            onToggle={toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={toggleInlineStyle}
          />
        </div>
        <div className="editor">
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            plugins={[imagePlugin]}
          />
        </div>
      </div>
      <div>
        <Button onClick={() => handleSaveClick()}>Save</Button>

      </div>
    </>
  )
}

type StyleButtonProps = {
  onClick?: () => void;
  onToggle?: (style: string) => void;
  active?: boolean;
  className?: string;
  style?: string;
  label: string;
};

const StyleButton = (props: StyleButtonProps) => {
  const handleMouseDown = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    props?.onToggle!(props.style || "");
  };

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();

    if (props?.onClick) {
      props.onClick();
    }
  };

  const className = clsx(
    "toolbar__button",
    props.active && "toolbar__button--active",
    props.className
  );

  return (
    <span
      className="toolbar__button"
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      {props.label}
    </span>
  );
};

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" }
];

const BlockStyleControls = (props: any) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  console.log('blockType', blockType)

  return (
    <div className="toolbar__controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" }
];

const InlineStyleControls = (props: any) => {
  const currentStyle = props.editorState.getCurrentInlineStyle()

  return (
    <div className="toolbar__controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export { BlockStyleControls }
export { InlineStyleControls }


