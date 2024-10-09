import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleJobInput } from "../features/jobs/jobSlice";
import { toast } from "react-toastify";
import { FaFilePdf } from "react-icons/fa";
import customFetch from "../utils/axios";
const FileInput = ({ name, value, labelText }) => {
  const { file } = useSelector((store) => store.job);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return toast.error("Choose a file");
    }
    if (!file.name.match(/\.(pdf)$/)) {
      return toast.error("PDF Only");
    }
    console.log(file);
    try {
      setIsLoading(true);
      const form = new FormData();
      form.append("file", file);
      const { data } = await customFetch.post("jobs/uploadFile", form);
      dispatch(handleJobInput({ name: "file", value: data.url }));

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
  if (isLoading) {
    return (
      <button type="button" c lassName="btn btn-block">
        Uploading...
      </button>
    );
  }
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
          onChange={handleChange}
        />
      </div>
      {file && (
        <div className="flex items-center justify-start gap-2">
          <a
            href={file}
            target="_blank"
            rel="noreferrer"
            className="btn btn-danger"
          >
            <FaFilePdf />
            <span>
              {file.replace("https://storage.cloud.google.com/jobify/", "")}
            </span>
          </a>
          <button
            type="button"
            className="btn clear-btn"
            onClick={() =>
              dispatch(handleJobInput({ name: "file", value: "" }))
            }
          >
            clear file
          </button>
        </div>
      )}
    </>
  );
};

export default FileInput;
