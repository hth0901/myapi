import React, { Fragment, useState } from 'react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const uploadImageCallBack = (file) => {
    return new Promise((resolve, reject) => {
        var formdata = new FormData()
        formdata.append('image', file)

        var requestOptions = {
            method: 'POST',
            body: formdata,
        }

        fetch('https://localhost:44311/api/TicketType', requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
                resolve({
                    data: {
                        url: `https://localhost:44311/${result}`,
                    },
                })
            })
            .catch((error) => reject('chi laj ri'))
    })
}

const HtmlEditor = (props) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const onEditorStateChange = (edtState) => {
        setEditorState(edtState)
    }

    return (
        <Fragment>
            <div className="editor">
                <Editor
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    toolbar={{
                        options: [
                            'inline',
                            'blockType',
                            'fontSize',
                            'fontFamily',
                            'list',
                            'textAlign',
                            'colorPicker',
                            'link',
                            'image',
                            'remove',
                            'history',
                        ],
                        blockType: { className: 'blockType-in-draft-editor' },
                        fontSize: { className: 'fontSize-in-draft-editor' },
                        image: {
                            popupClassName: 'popup-upload-in-draft-editor',
                            uploadCallback: uploadImageCallBack,
                            alt: { present: true, mandatory: false },
                            previewImage: true,
                        },
                    }}
                />
            </div>
        </Fragment>
    )
}

export default HtmlEditor
