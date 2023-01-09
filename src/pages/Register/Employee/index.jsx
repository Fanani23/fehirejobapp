import React, { useState } from "react";
import style from "./registeremployee.module.css";
import assets from "../../../assets";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerEmployee } from "../../../configs/redux/actions/Register/Employee";

const RegisterEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToLogin = () => {
    navigate("/login/company");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(email);
    console.log(phone);
    console.log(password);
    let data = {
      name,
      email,
      phone,
      password,
    };
    dispatch(registerEmployee(data, navigate));
  };

  return (
    <div className={style.containerRegister}>
      <div className={style.containerRegisterLeft}>
        <div className={style.registerLeft}>
          <img
            className={style.registerLeftImg}
            src={assets.loginbanner}
            alt=""
          />
        </div>
      </div>
      <div className={style.containerRegisterRight}>
        <div className={style.registerRight}>
          <div className={style.RRTop}>
            <p>Halo, Pewpeople</p>
          </div>
          <div className={style.RRTop2}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              euismod ipsum et dui rhoncus auctor.
            </p>
          </div>
          <div className={style.RRCenter}>
            <form className={style.RRCForm} id="form-register" action="">
              <div>
                <label className={style.RRCFormLabel} htmlFor="nama">
                  Nama
                </label>
                <input
                  type="text"
                  name="nama"
                  id="nama"
                  placeholder="Nama"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className={style.RRCFormLabel} htmlFor="email">
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
                <label className={style.RRCFormLabel} htmlFor="phone">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label className={style.RRCFormLabel} htmlFor="password">
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
          <div className={style.RRCButton}>
            <button
              type="submit"
              form="form-register"
              className={style.RRCButtonVal}
              onClick={handleRegister}
            >
              Daftar
            </button>
          </div>
          <div className={style.RRCSign}>
            <p>Anda sudah punya akun?</p>
            <p type="button" className={style.RRCSText} onClick={handleToLogin}>
              Masuk disini
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterEmployee;
