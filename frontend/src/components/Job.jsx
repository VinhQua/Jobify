import React from "react";
import Wrapper from "../assets/wrappers/Job";
import { Link } from "react-router-dom";
import JobInfo from "./JobInfo";
import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from "react-icons/fa";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { deleteJob, setEditJob } from "../features/jobs/jobSlice";
import { formatPrice } from "../utils/formatPrice";
import { MdOutlineAttachMoney } from "react-icons/md";
const Job = ({
  _id,
  JobPosition,
  company,
  jobLocation,
  jobType,
  createdAt,
  jobSalary,
  description,
  jobPosition,
  pdf: file,
}) => {
  const date = moment(createdAt).format("MMM Do YYYY");
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.name.charAt(0)}</div>
        <div className="info">
          {jobPosition}
          <p>{company.name}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <JobInfo
            icon={<MdOutlineAttachMoney />}
            text={formatPrice(jobSalary)}
          />
        </div>{" "}
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={() =>
                dispatch(
                  setEditJob({
                    editJobId: _id,
                    JobPosition,
                    company,
                    jobLocation,
                    jobType,
                    createdAt,
                    jobSalary,
                    description,
                    jobPosition,
                    pdf: file,
                  })
                )
              }
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => dispatch(deleteJob(_id))}
            >
              delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
