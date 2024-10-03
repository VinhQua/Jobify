import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/JobsContainer";
import Loading from "./Loading";
import { getAllCompanies } from "../features/allCompanies/allCompaniesSlice";
import CompaniesPagination from "./CompaniesPagination";
import Company from "./Company";
const CompaniesContainer = () => {
  const { companies, isLoading, totalCompanies, search, sort, page } =
    useSelector((store) => store.allCompanies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCompanies());
  }, [search, sort, page]);
  if (isLoading) {
    return <Loading center />;
  }
  if (companies.length === 0) {
    return (
      <Wrapper>
        <h2>No companies to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalCompanies} job{totalCompanies > 1 ? "s" : ""} found
      </h5>
      <div className="jobs">
        {companies.map((company) => {
          return <Company key={company._id} {...company} />;
        })}
      </div>
      <CompaniesPagination />
    </Wrapper>
  );
};

export default CompaniesContainer;
