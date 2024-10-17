import React from "react";
import Wrapper from "../assets/wrappers/Job";
import { Link } from "react-router-dom";
import JobInfo from "./JobInfo";
import { useDispatch } from "react-redux";
import { MdOutlineEmail, MdOutlineSecurity } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { deleteAdmin, setEditAdmin } from "../features/admin/adminSlice";
const Admin = ({ _id, name, email, role }) => {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <header className="gap-2">
        <FaUser /> <div className="info">{name}</div>
      </header>
      <div className="content">
        <div>
          <JobInfo icon={<MdOutlineEmail />} text={email} />
          <JobInfo icon={<MdOutlineSecurity />} text={role} />
        </div>{" "}
        <footer>
          <div className="actions">
            <Link
              to="/add-admin"
              className="btn edit-btn"
              onClick={() =>
                dispatch(
                  setEditAdmin({
                    editAdminId: _id,
                    name,
                    email,
                    role,
                  })
                )
              }
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => dispatch(deleteAdmin(_id))}
            >
              delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Admin;
