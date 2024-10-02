import React, { useEffect } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useDispatch, useSelector } from "react-redux";
import {
  FileInput,
  FormRow,
  FormSelect,
  PriceInput,
  TextInput,
} from "../../components";
import {
  clearValue,
  createJob,
  editJob,
  handleJobInput,
} from "../../features/jobs/jobSlice";
import { getAIResponse } from "../../utils/openaiService";

const AddJob = () => {
  const { user } = useSelector((store) => store.user);
  // add default location
  useEffect(() => {
    if (!isEditing) {
      dispatch(handleJobInput({ name: "jobLocation", value: user.location }));
    }
  }, []);
  const dispatch = useDispatch();
  const {
    editJobId,
    isLoading,
    position,
    company,
    jobLocation,
    isEditing,
    jobDescription,
    jobSalary,
    jobType,
    jobTypeOptions,
    jobPosition,
  } = useSelector((store) => store.job);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      console.log("All Fields Required");
    }
    if (!isEditing) {
      return dispatch(
        createJob({ position, company, jobLocation, jobType, status })
      );
    }
    let job = { position, company, jobLocation, jobType, status };
    return dispatch(editJob({ jobId: editJobId, job }));
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleJobInput({ name, value }));
  };
  const handleGenerateDescription = async () => {
    const input = `generate job description for ${jobType} ${jobPosition} at a company called ${company} with a salary of $${jobSalary}`;
    const aiResponse = await getAIResponse(input);

    dispatch(
      handleJobInput({
        name: "jobDescription",
        value: aiResponse,
      })
    );
  };

  return (
    <Wrapper>
      <div className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>

        <div className="form-center">
          {/* company */}
          <FormRow
            name="company"
            value={company}
            type="text"
            handleChange={handleChange}
          />
          {/* job position */}
          <FormRow
            labelText={"job position"}
            name="jobPosition"
            value={jobPosition}
            type="text"
            handleChange={handleChange}
          />
          {/* job location */}
          <FormRow
            name="jobLocation"
            labelText="job location"
            value={jobLocation}
            type="text"
            handleChange={handleChange}
          />
          {/* job salary */}
          <PriceInput
            name="jobSalary"
            labelText="job salary"
            value={jobSalary}
            type="number"
            handleChange={handleChange}
          />
          {/* Job Type */}
          <FormSelect
            name="jobType"
            value={jobType}
            list={jobTypeOptions}
            handleChange={handleChange}
            labelText="job type"
          />
          {/* Job File */}
          <FileInput labelText="Job File" />
        </div>
        {/* job description */}
        <div className="form">
          <TextInput
            name="jobDescription"
            labelText="job description"
            value={jobDescription}
            type="text"
            handleChange={handleChange}
          />{" "}
          <button
            type="button"
            className="btn"
            onClick={handleGenerateDescription}
          >
            Generate Description
          </button>
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
      </div>
    </Wrapper>
  );
};

export default AddJob;
