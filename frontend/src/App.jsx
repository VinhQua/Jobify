import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Error, Landing, ProtectedRoute, Register } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AddCompany,
  AddJob,
  AllCompanies,
  AllJobs,
  Profile,
  SharedLayout,
} from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="all-companies" element={<AllCompanies />} />
          <Route path="add-company" element={<AddCompany />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
