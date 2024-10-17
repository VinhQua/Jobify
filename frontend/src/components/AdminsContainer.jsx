import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/JobsContainer";
import Loading from "./Loading";
import AdminsPagination from "./AdminsPagination";
import Admin from "./Admin";
import { getAllAdmins } from "../features/allUsers/allUsersSlice";
const AdminsContainer = () => {
  const { admins, isLoading, totalAdmins, page } = useSelector(
    (store) => store.allAdmins
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAdmins());
  }, [page]);
  if (isLoading) {
    return <Loading center />;
  }
  if (admins.length === 0) {
    return (
      <Wrapper>
        <h2>No admins to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalAdmins} admins{totalAdmins > 1 ? "s" : ""} found
      </h5>
      <div className="jobs">
        {admins.map((company) => {
          return <Admin key={company._id} {...company} />;
        })}
      </div>
      <AdminsPagination />
    </Wrapper>
  );
};

export default AdminsContainer;
