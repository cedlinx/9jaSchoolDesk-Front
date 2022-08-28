import React, {useState} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillEditor = ({placeholder, getQuillContent}) => {

  const [value, setValue] =  useState("");
  getQuillContent(value);

  const  modules  = {
    toolbar: [
      [{ font: [] }]
      // ["bold", "italic", "underline", "strike"],
      // [{ color: [] }, { background: [] }],
      // [{ script:  "sub" }, { script:  "super" }],
      // [{ list:  "ordered" }, { list:  "bullet" }],
      // [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
      // ["link", "image", "video"]
    ]
  };


  return (
    <ReactQuill modules={modules} theme="snow" onChange={setValue} placeholder={placeholder} />
  );
};

export default QuillEditor;