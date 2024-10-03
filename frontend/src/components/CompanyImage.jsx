"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import customFetch from "../utils/axios";
import { handleCompanyInput } from "../features/companies/companySlice";
const CompanyImage = () => {
  const { logo } = useSelector((store) => store.company);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleChange = async (e) => {
    const image = e.target.files[0];
    if (!image) {
      return toast.error("Choose an image");
    }
    if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      return toast.error("Image Only");
    }
    console.log(image);
    try {
      setIsLoading(true);
      const form = new FormData();
      form.append("image", image);
      const { data } = await customFetch.post("/products/uploadImage", form);
      dispatch(handleCompanyInput({ name: "logo", value: data.uploadedLink }));

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="grid content-start justify-items-center">
      <img src={logo} alt={""} className="object-cover rounded-lg w-80 h-80" />
      {/* Upload BTN */}
      <div className="pb-0 mt-2 w-80 lg:w-full">
        {isLoading ? (
          <button type="button" className="btn" disabled={isLoading}>
            uploading...
          </button>
        ) : (
          <label htmlFor="filePicker" className="btn">
            Add logo
          </label>
        )}

        <input
          id="filePicker"
          style={{ visibility: "hidden" }}
          type={"file"}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default CompanyImage;
