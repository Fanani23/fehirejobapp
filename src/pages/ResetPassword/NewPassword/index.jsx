import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./newpassword.module.css";
import assets from "../../../assets";

const NewPassword = () => {
  const navigate = useNavigate();

  return (
    <div className={style.containerResetPassword}>
      <div className={style.containerResetPasswordLeft}>
        <div className={style.resetPasswordLeft}>
          <img
            className={style.resetPasswordLeftImg}
            src={assets.loginbanner}
            alt=""
          />
        </div>
      </div>
      <div className={style.containerResetPasswordRight}>
        <div className={style.resetPasswordRight}>
          <div className={style.ResetPasswordRTop}>
            <p>Halo, Pewpeople</p>
          </div>
          <div className={style.ResetPasswordRTop2}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              euismod ipsum et dui rhoncus auctor.
            </p>
          </div>
          <div className={style.ResetPasswordRCenter}>
            <form className={style.ResetPasswordRCForm} action="">
              <div>
                <label
                  className={style.ResetPasswordRCFormLabel}
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Masukkan password baru"
                  className="form-control"
                />
              </div>
            </form>
          </div>
          <div className={style.ResetPasswordRCButton}>
            <button type="button" className={style.ResetPasswordRCButtonVal}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
