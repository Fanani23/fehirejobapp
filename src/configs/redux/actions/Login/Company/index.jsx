import axios from "axios";
import Swal from "sweetalert2";

export const loginCompany = (data, navigate) => async (dispatch) => {
  try {
    console.log(data);
    dispatch({ type: "COMPANY_LOGIN_PENDING" });
    const res = await axios.post(`http://localhost:3005/auth/login`, data);
    const company = res.data.data;
    console.log(company, "data company");
    const token = company.token;
    const id = company.id;
    const name = company.name;
    const email = company.email;
    const phone = company.phone;
    const role = company.role;
    console.log(token, "token company");
    localStorage.setItem("token", token);
    localStorage.setItem("user_id", id);
    localStorage.setItem("user_name", name);
    localStorage.setItem("user_email", email);
    localStorage.setItem("user_phone", phone);
    localStorage.setItem("user_role", role);
    dispatch({ type: "COMPANY_LOGIN_SUCCESS", payload: company });
    Swal.fire("Success", "Login success", "success");
    navigate("/home");
  } catch (err) {
    console.log(err);
    Swal.fire("Warning", "Login failed", "error");
  }
};
