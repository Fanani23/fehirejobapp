import axios from "axios";
import Swal from "sweetalert2";

export const verificationAccount = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "VERIFICATION_PENDING" });
    const res = await axios.post(
      `http://localhost:3005/auth/verification`,
      data
    );
    const otp = res.data.data;
    console.log(otp);
    dispatch({ type: "VERIFICATION_SUCCESS", payload: otp });
    navigate("/");
    Swal.fire(
      "Success",
      "Verification account success, you can login to your account now",
      "success"
    );
  } catch (err) {
    console.log(err);
    Swal.fire("Warning", "Verification account failed", "error");
  }
};
