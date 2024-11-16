// src/components/RichTextEditor.js

import React from "react";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.bubble.css"; // Import Quill styles

const RichTextEditor = ({ value, onChange }) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      theme="bubble" // or "snow" based on your preference
      modules={{
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"], // Remove formatting button
        ],
      }}
    />
  );
};

export default RichTextEditor;
