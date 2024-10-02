import React, { useState } from "react";

const FileInput = ({ name, value, handleChange, labelText }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      console.log("Uploading file...");

      const formData = new FormData();
      formData.append("file", file);

      try {
        // You can write the URL of your server or any other endpoint used for file upload
        const result = await fetch("https://httpbin.org/post", {
          method: "POST",
          body: formData,
        });

        const data = await result.json();

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="form-row">
        <label htmlFor={name} className="form-label">
          {labelText || name}
        </label>
        <input
          className="form-input"
          id={name}
          type="file"
          name={name}
          onChange={handleFileChange}
        />
      </div>
    </>
  );
};

export default FileInput;
