import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./requestemail.module.css";
import assets from "../../../assets";

const RequestEmail = () => {
  const navigate = useNavigate();

  return (
    <div className={style.containerReset}>
      <div className={style.containerResetLeft}>
        <div className={style.resetLeft}>
          <img className={style.resetLeftImg} src={assets.loginbanner} alt="" />
        </div>
      </div>
      <div className={style.containerResetRight}>
        <div className={style.resetRight}>
          <div className={style.ResetRTop}>
            <p>Halo, Pewpeople</p>
          </div>
          <div className={style.ResetRTop2}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              euismod ipsum et dui rhoncus auctor.
            </p>
          </div>
          <div className={style.ResetRCenter}>
            <form className={style.ResetRCForm} action="">
              <div>
                <label className={style.ResetRCFormLabel} htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Masukkan email"
                  className="form-control"
                />
              </div>
            </form>
          </div>
          <div className={style.ResetRCButton}>
            <button type="button" className={style.ResetRCButtonVal}>
              Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestEmail;
