import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const RichTextEditor = () => {
  return (
    <CKEditor
    editor={ClassicEditor}
    data="<p>Hello from CKEditor 5!</p>"
    onReady={ editor => {
      console.log( 'Editor ready', editor );
    } }
    onChange={ (event, editor) => {
      console.log( 'Editor content:', editor.getData() );
    } }
    onBlur={ (event, editor) => {
      console.log( 'Editor blur', editor );
    } }
    onFocus={ (event, editor) => {
      console.log( 'Editor focus', editor );
    } }
  />
  )
}

export default RichTextEditor
