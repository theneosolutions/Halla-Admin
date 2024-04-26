import React, { useState } from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const PageEditor = ({ content, setContent }) => {
  // const [editorState, setEditorState] = useState(
  //   initialContent
  //     ? EditorState.createWithContent(ContentState.createFromText(initialContent))
  //     : EditorState.createEmpty()
  // );

  // const [content, setContent] = useState(
  //   initialContent ? initialContent : ''
  // )


  // const handleSave = () => {
  //   const contentState = editorState.getCurrentContent();
  //   const content = contentState.getPlainText(); // Get plain text from content state
  //   onSave(content);
  // };



  const Editor = {
    modules: {

    }
  }
  Editor.modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }, { 'font': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  }
  const suneditorOptions = {
    buttonList: [
      ['undo', 'redo'],
      ['font', 'fontSize', 'formatBlock'],
      ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
      ['fontColor', 'hiliteColor', 'textStyle', 'removeFormat'],
      ['outdent', 'indent', 'align', 'horizontalRule', 'list', 'table'],
      ['link', 'image', 'video', 'audio'],
      ['showBlocks', 'codeView', 'preview', 'fullScreen', 'print'],
    ],
    height: '500',
  }

  return (
    <div>
      {/* <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="editor-wrapper"
        editorClassName="editor-content"
      />
      <button onClick={handleSave}>Save</button> */}


      <SunEditor
        setOptions={suneditorOptions}
        onChange={setContent}
        setContents={content}
        placeholder="Start designing your page"
      />
    </div>
  );
};

export default PageEditor;
