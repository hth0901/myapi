import React, { useState,useEffect } from 'react';

import HtmlEditor, { Toolbar, Item } from 'devextreme-react/html-editor';

import 'devextreme/ui/html_editor/converters/markdown';

const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];
const fontValues = ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'];


const Editor = (props)=>{
    const [valueContent,setValueContent]=useState("");
    useEffect(() => {
        setValueContent(props.dataContent);
    }, [props.dataContent])
    const valueChanged = (e)=>{
        setValueContent(e.value);
        props.valueChanged(props.name,e.value);
    } 
    return(
        <div className="widget-container">
        <HtmlEditor
          height={300}
          value={valueContent}
          valueType="html"
          onValueChanged={valueChanged}
        >
          <Toolbar>
            <Item name="undo" />
            <Item name="redo" />
            <Item name="separator" />
            <Item
              name="size"
              acceptedValues={sizeValues}
            />
            <Item
              name="font"
              acceptedValues={fontValues}
            />
            <Item name="separator" />
            <Item name="bold" />
            <Item name="italic" />
            <Item name="strike" />
            <Item name="underline" />
            <Item name="separator" />
            <Item name="alignLeft" />
            <Item name="alignCenter" />
            <Item name="alignRight" />
            <Item name="alignJustify" />
            <Item name="separator" />
            <Item name="color" />
            <Item name="background" />
          </Toolbar>
        </HtmlEditor>

        <div className="options">
         
          
        </div>
      </div>
    )
}
export default Editor;
