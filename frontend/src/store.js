import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/users/userSlice";
import jobSlice from "./features/jobs/jobSlice";
import allJobsSlice from "./features/allJobs/allJobsSlice";
import companySlice from "./features/companies/companySlice";
import allCompaniesSlice from "./features/allCompanies/allCompaniesSlice";
import allAdminsSlice from "./features/allUsers/allUsersSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: allJobsSlice,
    company: companySlice,
    allCompanies: allCompaniesSlice,
    allAdmins: allAdminsSlice,
  },
});
