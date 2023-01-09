import React, { useEffect, useState } from "react";
import style from "./chatemployee.module.css";
import assets from "../../../assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

const ChatCompany = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState([]);

  const [hire_id, setHire_id] = useState("");

  let token = localStorage.getItem("token");

  const navigate = useNavigate();

  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getData = async (url) => {
    try {
      const res = await axios.get(url, auth);
      setData(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log("hire id", hire_id);

  useEffect(() => {
    let url = `http://localhost:3005/hire`;
    getData(url);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login/company");
  };

  return (
    <div className={style.containerProfile}>
      <div className={style.containerProfileNavBasis}>
        <div className={style.containerProfileNav}>
          <div className={style.containerPNLogo}>
            <img src={assets.logoweb} alt="" />
          </div>
          <div className={style.containerPNButton}>
            <div className={style.PNButtonLeft}>
              <img src={assets.logobell} alt="" />
            </div>
            <div className={style.PNButtonCenter}>
              <img src={assets.logomail} alt="" />
            </div>
            <div className={style.PNButtonRight}>
              <Dropdown className="profile-box">
                <Dropdown.Toggle className="dropdown" variant="secondary">
                  <img src={assets.navprofiledef} alt="" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/edit-employee">
                    My Profile
                  </Dropdown.Item>
                  <Dropdown.Item href="/chat-employee">
                    My Notification
                  </Dropdown.Item>
                  <Dropdown.Item href="/chat-company">My Chat</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLogout()}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-between">
        <div className={style.BodyLeft}>
          <div className={style.BLWhite}>
            <div className={style.MessageLeft}>
              <p className="pt-4 pb-4">Messages</p>
            </div>
            <div className="d-flex flex-column gap-3 pb-4">
              {data ? (
                data.map((item) => (
                  <div
                    type="button"
                    key={item.id}
                    className={style.MessageLeftBasis}
                    onClick={() => navigate(`/chat-company/${item.id}`)}
                  >
                    <div className="d-flex flex-row gap-1">
                      <img
                        className={style.MessageLeftImg}
                        src={assets.chatprofile}
                        alt=""
                      />
                      <div className="d-flex flex-column gap-2 justify-content-center">
                        {item.name === "undefined" ? (
                          <p className={style.MessageLeftName}>No name</p>
                        ) : (
                          <p className={style.MessageLeftName}>{item.name}</p>
                        )}

                        <p className={style.MessageLeftJob}>{item.position}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <p>Chat empty</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={style.BodyRight}>
          <div className={style.BRWhite}>
            <div className="d-flex flex-column justify-content-between">
              <div className={style.MessageRightBasis}>
                <div className="d-flex flex-row gap-2">
                  <img
                    className={style.MessageRightImg}
                    src={assets.chatprofile}
                    alt=""
                  />
                  <p className={style.MessageRightName}>Luis</p>
                </div>
                <p className={style.MessageRightJob}>
                  Fulltime Frontend Developer
                </p>
                <p className={style.MessageRightDetail}>Detail Profile</p>
              </div>
            </div>
            <div className={style.MessageRightValue}>
              Membuat fitur dan maintenance untuk dashrboard admin dan posisi
              remote
            </div>
            <div className={style.InputBasis}>
              <div className="d-flex flex-row gap-3 justify-content-center pl-3 pb-3">
                <input
                  type="text"
                  name="chat"
                  id="chat"
                  className="form-control"
                />
                <button className={style.MessageRightButton} type="button">
                  <img
                    className={style.MessageRightButton}
                    src={assets.buttonchat}
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.containerProfileFooter}>
        <div className={style.containerPFBasis}>
          <div className={style.PFTop}>
            <img src={assets.logofooter} alt="" />
          </div>
          <div className={style.PFCenter}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              euismod ipsum et dui rhoncus auctor.
            </p>
          </div>
          <div>
            <img src={assets.linefooter} alt="" />
          </div>
          <div className={style.PFBottom}>
            <div className={style.PFBLeft}>
              <p>2020 Pewworld. All right reserved</p>
            </div>
            <div className={style.PFBRight}>
              <p>Telepon</p>
              <p>Email</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCompany;
