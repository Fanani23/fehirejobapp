import axios from "axios";
import Swal from "sweetalert2";

export const registerCompany = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "COMPANY_REGISTER_PENDING" });
    const res = await axios.post(
      `http://localhost:3005/auth/register/company`,
      data
    );
    const company = res.data.data;
    console.log(company);
    dispatch({ type: "COMPANY_REGISTER_SUCCESS", payload: company });
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
