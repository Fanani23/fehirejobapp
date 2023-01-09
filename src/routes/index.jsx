import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Swal from "sweetalert2";
import ChatCompany from "../pages/Chat/Company";
import ChatCompanyDetail from "../pages/Chat/Company/Detail";
import ChatEmployee from "../pages/Chat/Employee";
import ChatEmployeeDetail from "../pages/Chat/Employee/Detail";
import EditCompany from "../pages/Edit/Company";
import EditEmployee from "../pages/Edit/Employee";
import EditExperience from "../pages/Edit/Employee/EditExperience";
import EditPortfolio from "../pages/Edit/Employee/EditPortfolio";
import Hire from "../pages/Hire";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";
import LoginCompany from "../pages/Login/Company";
import LoginEmployee from "../pages/Login/Employee";
import Profile from "../pages/Profile";
import RegisterCompany from "../pages/Register/Company";
import RegisterEmployee from "../pages/Register/Employee";
import NewPassword from "../pages/ResetPassword/NewPassword";
import RequestEmail from "../pages/ResetPassword/RequestEmail";
import Verification from "../pages/Verification";

const Router = () => {
  const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return <Outlet />;
    } else {
      Swal.fire("Warning", "Please login first", "error");
      return <Navigate to="/" />;
    }
  };

  const PrivateRoleEmployee = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("user_role");
    if (token && role === "employee") {
      return <Outlet />;
    } else {
      Swal.fire(
        "Warning",
        "User role is not match, please login again",
        "error"
      );
      return <Navigate to="/" />;
    }
  };

  const PrivateRoleCompany = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("user_role");
    if (token && role === "company") {
      return <Outlet />;
    } else {
      Swal.fire(
        "Warning",
        "User role is not match, please login again",
        "error"
      );
      return <Navigate to="/" />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/company" element={<LoginCompany />} />
        <Route path="/login/employee" element={<LoginEmployee />} />
        <Route path="/register/company" element={<RegisterCompany />} />
        <Route path="/register/employee" element={<RegisterEmployee />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/request-reset" element={<RequestEmail />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/home" element={<PrivateRoute />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/profile/:id" element={<PrivateRoleCompany />}>
          <Route index element={<Profile />} />
        </Route>
        <Route path="/hire/:id" element={<PrivateRoleCompany />}>
          <Route index element={<Hire />} />
        </Route>
        <Route path="/edit-company" element={<PrivateRoleCompany />}>
          <Route index element={<EditCompany />} />
        </Route>
        <Route path="/edit-employee" element={<PrivateRoleEmployee />}>
          <Route index element={<EditEmployee />} />
        </Route>
        <Route path="/edit-experience/:id" element={<PrivateRoleEmployee />}>
          <Route index element={<EditExperience />} />
        </Route>
        <Route path="/edit-portfolio/:id" element={<PrivateRoleEmployee />}>
          <Route index element={<EditPortfolio />} />
        </Route>
        <Route path="/chat-employee/" element={<PrivateRoleEmployee />}>
          <Route index element={<ChatEmployee />} />
        </Route>
        <Route path="/chat-employee/:id" element={<PrivateRoleEmployee />}>
          <Route index element={<ChatEmployeeDetail />} />
        </Route>
        <Route path="/chat-company" element={<PrivateRoleCompany />}>
          <Route index element={<ChatCompany />} />
        </Route>
        <Route path="/chat-company/:id" element={<PrivateRoleCompany />}>
          <Route index element={<ChatCompanyDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
