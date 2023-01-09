import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./loginemployee.module.css";
import assets from "../../../assets";
import { useDispatch } from "react-redux";
import { loginEmployee } from "../../../configs/redux/actions/Login/Employee";

const LoginEmployee = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToForgot = () => {
    navigate("/request-reset");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    let data = {
      email,
      password,
    };
    dispatch(loginEmployee(data, navigate));
  };

  return (
    <div className={style.containerLogin}>
      <div className={style.containerLoginLeft}>
        <div className={style.loginLeft}>
          <img className={style.loginLeftImg} src={assets.loginbanner} alt="" />
        </div>
      </div>
      <div className={style.containerLoginRight}>
        <div className={style.loginRight}>
          <div className={style.LRTop}>
            <p>Halo, Pewpeople</p>
          </div>
          <div className={style.LRTop2}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              euismod ipsum et dui rhoncus auctor.
            </p>
          </div>
          <div className={style.LRCenter}>
            <form className={style.LRCForm} id="form-login" action="">
              <div>
                <label className={style.LRCFormLabel} htmlFor="email">
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
                <label className={style.LRCFormLabel} htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Masukkan password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className={style.LRCForgot}>
            <p type="button" onClick={handleToForgot}>
              Lupa kata sandi?
            </p>
          </div>
          <div className={style.LRCButton}>
            <button
              type="submit"
              form="form-login"
              className={style.LRCButtonVal}
              onClick={handleLogin}
            >
              Masuk
            </button>
          </div>
          <div className={style.LRCSign}>
            <p>Anda belum punya akun?</p>
            <p
              type="button"
              className={style.LRCSText}
              onClick={() => navigate("/register/employee")}
            >
              Daftar disini
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginEmployee;
