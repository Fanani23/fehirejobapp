import React, { useState } from "react";
import style from "./verification.module.css";
import assets from "../../assets";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verificationAccount } from "../../configs/redux/actions/Verification";

const Verification = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleVerification = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(otp);
    let data = {
      email,
      otp,
    };
    dispatch(verificationAccount(data, navigate));
  };

  return (
    <div className={style.containerVerification}>
      <div className={style.containerVerificationLeft}>
        <div className={style.verificationLeft}>
          <img
            className={style.verificationLeftImg}
            src={assets.loginbanner}
            alt=""
          />
        </div>
      </div>
      <div className={style.containerVerificationRight}>
        <div className={style.verificationRight}>
          <div className={style.VRTop}>
            <p>Halo, Pewpeople</p>
          </div>
          <div className={style.VRTop2}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              euismod ipsum et dui rhoncus auctor.
            </p>
          </div>
          <div className={style.VRCenter}>
            <form className={style.VRCForm} id="form-verification" action="">
              <div>
                <label className={style.VRCFormLabel} htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Masukkan email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className={style.VRCFormLabel} htmlFor="otp">
                  Otp
                </label>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  placeholder="Masukkan otp"
                  className="form-control"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className={style.VRCButton}>
            <button
              type="submit"
              form="form-verification"
              className={style.VRCButtonVal}
              onClick={handleVerification}
            >
              Verification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
