import React, { useEffect, useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow } from "../../components";

import { useDispatch, useSelector } from "react-redux";
import {
  clearValue,
  createAdmin,
  editAdmin,
  handleAdminInput,
} from "../../features/admin/adminSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { name, email, isEditing, password, isLoading, editAdminId } =
    useSelector((store) => store.admin);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || password) {
      console.log("All Fields Required");
    }
    if (!isEditing) {
      return dispatch(createAdmin({ name, email, password }));
    }
    let admin = { name, email };
    return dispatch(editAdmin({ adminId: editAdminId, admin }));
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleAdminInput({ name, value }));
  };
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? "Edit Admin" : "Create Admin"}</h3>
        <div style={{ textAlign: "left" }}>
          {/* name field */}

          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={handleChange}
          />

          {/* email field */}
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={handleChange}
          />
          {/* password field */}
          {!isEditing && (
            <FormRow
              type="password"
              name="password"
              value={password}
              handleChange={handleChange}
            />
          )}
        </div>
        <div className="mt-2"></div>
        <div className="btn-container">
          <button
            type="button"
            className="btn btn-block clear-btn"
            onClick={() => dispatch(clearValue())}
          >
            clear
          </button>
          <button
            type="submit"
            className="btn btn-block submit-btn"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isEditing ? "save" : "submit"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Register;
