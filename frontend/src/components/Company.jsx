import React from "react";
import Wrapper from "../assets/wrappers/Job";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteCompany,
  setEditCompany,
} from "../features/companies/companySlice";
const Company = ({ _id, name, logo }) => {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <header>
        <div className="grid grid-cols-2"></div>
      </header>
      <div className="content">
        <div className="content-center">
          <img src={logo} alt="" />
          <div className="pl-4">
            <div className="main-icon">{name.charAt(0)}</div>
            <h5>{name}</h5>
          </div>
        </div>

        <footer>
          <div className="actions">
            <Link
              to="/add-company"
              className="btn edit-btn"
              onClick={() =>
                dispatch(
                  setEditCompany({
                    editCompanyId: _id,
                    name,
                    logo,
                  })
                )
              }
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => dispatch(deleteCompany(_id))}
            >
              delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Company;
