import React, { Component, useEffect, useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';



function Exp() {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    return (
        <>
            <div>
                <Editor editorState={editorState} onChange={setEditorState} />
            </div>
        </>
    )
}

export default Exp