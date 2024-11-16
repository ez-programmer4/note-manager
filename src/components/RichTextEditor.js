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
          [{ header: [1, 2, false] }], // Header sizes
          [{ font: [] }], // Font selection
          [{ align: [] }], // Text alignment
          ["bold", "italic", "underline"], // Basic formatting
          ["blockquote", "code-block"], // Block quotes and code blocks
          [{ list: "ordered" }, { list: "bullet" }], // Lists
          ["link", "image"], // Links and images
          [{ color: [] }, { background: [] }], // Text and background color
          ["clean"], // Remove formatting button
        ],
      }}
    />
  );
};

export default RichTextEditor;
