import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/SearchContainer";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import FormSelect from "./FormSelect";
import {
  clearJobFilters,
  handleFiltersInput,
} from "../features/allJobs/allJobsSlice";
import FormRange from "./FormRange";
const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState("");
  const {
    isLoading,
    search,
    salary,
    searchType,
    searchCompany,
    sort,
    sortOptions,
    companyList,
    searchSuggestions,
  } = useSelector((store) => store.allJobs);
  const { jobTypeOptions } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    if (isLoading) return;
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleFiltersInput({ name, value }));
  };
  //Debounce Search
  useEffect(() => {
    let timeId;
    timeId = setTimeout(() => {
      dispatch(handleFiltersInput({ name: "search", value: localSearch }));
    }, 1000);
    return () => {
      clearTimeout(timeId);
    };
  }, [localSearch]);
  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
    // setLocalSearch(string);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    setLocalSearch(item.name);
    console.log(item);
  };
  return (
    <Wrapper>
      <div className="form">
        <h4>Search Form</h4>
        <div className="form-center">
          <div>
            <label htmlFor="" className="form-label">
              search
            </label>
            <ReactSearchAutocomplete
              items={searchSuggestions}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              // onFocus={handleOnFocus}
              autoFocus
              formatResult={formatResult}
            />
          </div>

          {/* <FormRow
            name="search"
            type="text"
            value={localSearch}
            handleChange={(e) => setLocalSearch(e.target.value)}
          /> */}
          <FormRange
            name="salary"
            type="range"
            value={salary}
            handleChange={handleChange}
          />
          <FormSelect
            name="searchCompany"
            labelText="company"
            list={["all", ...companyList]}
            value={searchCompany}
            handleChange={handleChange}
          />
          <FormSelect
            name="searchType"
            labelText="type"
            list={["all", ...jobTypeOptions]}
            value={searchType}
            handleChange={handleChange}
          />
          <FormSelect
            name="sort"
            list={sortOptions}
            value={sort}
            handleChange={handleChange}
          />
          <button
            type="button"
            className="btn btn-block btn-danger"
            onClick={() => dispatch(clearJobFilters())}
          >
            clear filters
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default SearchContainer;
