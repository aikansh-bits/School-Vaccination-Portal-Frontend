import { Route, Routes } from "react-router-dom";
import Dashboard from "../modules/dashboard/Dashboard";
import Layout from "./Layout";
import VaccineDrives from "../modules/vaccine_drives/VaccineDrives";
import Students from "../modules/students/Students";
import LoginPage from "../modules/authentication/login";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="" element={<LoginPage />} />
      <Route path="/" element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="drives" element={<VaccineDrives />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
