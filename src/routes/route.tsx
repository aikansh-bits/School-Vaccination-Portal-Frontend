import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../modules/dashboard/Dashboard";
import Layout from "./Layout";
import VaccineDrives from "../modules/vaccine_drives/VaccineDrives";
import Students from "../modules/students/Students";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoutes";
import LoginPage from "../modules/authentication/login";
import GenerateReports from "../modules/generate_report/GenerateReports";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="drives" element={<VaccineDrives />} />
        <Route path="generateReport" element={<GenerateReports />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
