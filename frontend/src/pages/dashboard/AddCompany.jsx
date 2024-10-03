import React, { useEffect } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useDispatch, useSelector } from "react-redux";
import { CompanyImage, FormRow } from "../../components";
import {
  clearValue,
  createCompany,
  editCompany,
  handleCompanyInput,
} from "../../features/companies/companySlice";

const AddCompany = () => {
  const dispatch = useDispatch();
  const { name, logo, isEditing, editCompanyId, isLoading } = useSelector(
    (store) => store.company
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !logo) {
      console.log("All Fields Required");
    }
    if (!isEditing) {
      return dispatch(createCompany({}));
    }
    let company = { name, logo };
    return dispatch(editCompany({ companyId: editCompanyId, company }));
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleCompanyInput({ name, value }));
  };

  return (
    <Wrapper>
      <div className="form">
        <h3>{isEditing ? "edit company" : "add company"}</h3>

        <div className="grid grid-cols-2 mb-2 form-center">
          {/* image */}
          <CompanyImage />
          {/* name */}
          <FormRow
            name="name"
            value={name}
            type="text"
            handleChange={handleChange}
          />
        </div>
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
      </div>
    </Wrapper>
  );
};

export default AddCompany;
