import React, { useState, useEffect } from "react";
import style from "./hire.module.css";
import assets from "../../assets";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Dropdown } from "react-bootstrap";

const Hire = () => {
  const [data, setData] = useState([]);
  const [dataSkill, setDataSkill] = useState([]);

  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getData = async (url) => {
    try {
      const res = await axios.get(url, auth);
      setData(res.data.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getSkill = async (url2) => {
    try {
      const res = await axios.get(url2, auth);
      setDataSkill(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(data);

  useEffect(() => {
    let url = `http://localhost:3005/employee/${id}`;
    let url2 = `http://localhost:3005/skill/${id}`;
    getData(url);
    getSkill(url2);
  }, []);

  const handleHire = async (e) => {
    e.preventDefault();
    let formHire = {
      position: position,
      description: description,
    };
    try {
      const createHire = await axios.post(
        `http://localhost:3005/hire/add/${id}`,
        formHire,
        auth
      );
      console.log("Hiring success", createHire);
      Swal.fire("Success", "Hiring success", "success");
      navigate("/chat-company");
    } catch (err) {
      console.log("Hiring failed", err);
      Swal.fire("Warning", "Hiring failed", "error");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login/company");
  };

  return (
    <div className={style.containerHire}>
      <div className={style.containerHireNavBasis}>
        <div className={style.containerHireNav}>
          <div className={style.containerHireNLogo}>
            <img src={assets.logoweb} alt="" />
          </div>
          <div className={style.containerHireNButton}>
            <div className={style.HireNButtonLeft}>
              <img src={assets.logobell} alt="" />
            </div>
            <div className={style.HireNButtonCenter}>
              <img src={assets.logomail} alt="" />
            </div>
            <div className={style.HireNButtonRight}>
              <Dropdown className="profile-box">
                <Dropdown.Toggle className="dropdown" variant="secondary">
                  <img src={assets.navprofiledef} alt="" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/home">Home</Dropdown.Item>
                  <Dropdown.Item href="/edit-company">My Profile</Dropdown.Item>
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
      <div className={style.containerHireBody}>
        <div className={style.HireBLeft}>
          <div className={style.HireBLeftValue}>
            <div>
              <img className={style.HireBLVImg} src={data.photo} alt="" />
            </div>
            <div>
              <p className={style.HireBLVName}>{data.name}</p>
            </div>
            <div>
              <p className={style.HireBLVPos}>{data.job}</p>
            </div>
            <div className={style.HireBLVLocation}>
              <img
                className={style.HireBLVLocationImg}
                src={assets.mappin}
                alt=""
              />
              <p className={style.HireBLVLocationText}>
                {data.city}, {data.province}
              </p>
            </div>
            <div>
              <p className={style.HireBLVJob}>{data.workplace}</p>
            </div>
            <div className={style.HireBLVDesc}>
              <p className={style.HireBLVDescValue}>{data.description}</p>
            </div>
            <div>
              <p className={style.HireBLVSkill}>Skill</p>
            </div>
            <div className={style.HireBLVSkillBasis}>
              {dataSkill ? (
                dataSkill.map((item) => (
                  <div className={style.HireBLVSkillValue}>{item.name}</div>
                ))
              ) : (
                <>
                  <p>Skill empty</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={style.HireBRight}>
          <div className={style.HireBRightValue}>
            <p className={style.HireBRVName}>Hubungi {data.name}</p>
            <p className={style.HireBRVDesc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              euismod ipsum et dui rhoncus auctor.
            </p>
            <form className={style.HireBRVForm} action="">
              <div>
                <label className={style.HireBRVFormLabel} htmlFor="position">
                  Untuk Posisi
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  placeholder="Position"
                  className="form-control"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>
              <div>
                <label className={style.HireBRVFormLabel} htmlFor="description">
                  Description
                </label>
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  rows={6}
                  placeholder="Description"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className={style.HireBRVFormButton}
                onClick={handleHire}
              >
                Hire
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className={style.containerHireFooter}>
        <div className={style.containerHireFBasis}>
          <div className={style.HireFTop}>
            <img src={assets.logofooter} alt="" />
          </div>
          <div className={style.HireFCenter}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              euismod ipsum et dui rhoncus auctor.
            </p>
          </div>
          <div>
            <img src={assets.linefooter} alt="" />
          </div>
          <div className={style.HireFBottom}>
            <div className={style.HireFBLeft}>
              <p>2020 Pewworld. All right reserved</p>
            </div>
            <div className={style.HireFBRight}>
              <p>Telepon</p>
              <p>Email</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hire;
