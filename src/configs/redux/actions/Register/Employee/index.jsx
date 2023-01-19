import axios from "axios";
import Swal from "sweetalert2";

export const registerEmployee = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "EMPLOYEE_REGISTER_PENDING" });
    const res = await axios.post(
      `${process.env.REACT_APP_BUILD_API}/auth/register/employee`,
      data
    );
    const employee = res.data.data;
    console.log(employee);
    dispatch({ type: "EMPLOYEE_REGISTER_SUCCESS", payload: employee });
    Swal.fire(
      "Success",
      "Register success, we already sent otp to your email. You can verification your account first by your email",
      "success"
    );
    navigate("/verification");
  } catch (err) {
    console.log(err);
    Swal.fire("Warning", "Register failed", "error");
  }
};
