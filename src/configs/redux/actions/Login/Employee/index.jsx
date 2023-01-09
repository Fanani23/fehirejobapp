import axios from "axios";
import Swal from "sweetalert2";

export const loginEmployee = (data, navigate) => async (dispatch) => {
  try {
    console.log(data);
    dispatch({ type: "EMPLOYEE_LOGIN_PENDING" });
    const res = await axios.post(`http://localhost:3005/auth/login`, data);
    const employee = res.data.data;
    console.log(employee, "data employee");
    const token = employee.token;
    const id = employee.id;
    const name = employee.name;
    const email = employee.email;
    const phone = employee.phone;
    const role = employee.role;
    console.log(token, "token employee");
    localStorage.setItem("token", token);
    localStorage.setItem("user_id", id);
    localStorage.setItem("user_name", name);
    localStorage.setItem("user_email", email);
    localStorage.setItem("user_phone", phone);
    localStorage.setItem("user_role", role);
    dispatch({ type: "EMPLOYEE_LOGIN_SUCCESS", payload: employee });
    Swal.fire("Success", "Login success", "success");
    navigate("/edit-employee");
  } catch (err) {
    console.log(err);
    Swal.fire("Warning", "Login failed", "error");
  }
};
