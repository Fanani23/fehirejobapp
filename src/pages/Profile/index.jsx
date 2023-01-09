import React, { useState, useEffect } from "react";
import style from "./profile.module.css";
import assets from "../../assets";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Dropdown } from "react-bootstrap";

const Profile = () => {
  const [data, setData] = useState([]);
  const [dataSkill, setDataSkill] = useState([]);
  const [dataExp, setDataExp] = useState([]);
  const [dataPorto, setDataPorto] = useState([]);

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
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(data);

  const getSkill = async (url2) => {
    try {
      const res = await axios.get(url2, auth);
      setDataSkill(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPorto = async (url3) => {
    try {
      const res = await axios.get(url3, auth);
      setDataPorto(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getExp = async (url4) => {
    try {
      const res = await axios.get(url4, auth);
      setDataExp(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let url = `http://localhost:3005/employee/${id}`;
    let url2 = `http://localhost:3005/skill/${id}`;
    let url3 = `http://localhost:3005/portofolio/${id}`;
    let url4 = `http://localhost:3005/experience/${id}`;
    getData(url);
    getSkill(url2);
    getPorto(url3);
    getExp(url4);
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
      <div className={style.containerBodyBasis}>
        <div className={style.BSFieldTop} />
        <div className={style.BodyProfile}>
          <div className={style.BSFieldLeft}>
            <div className={style.BSFieldLeftValue}>
              <div>
                <img className={style.BSFLVImg} src={data.photo} alt="" />
              </div>
              <div>
                <p className={style.BSFLVName}>{data.name}</p>
              </div>
              <div>
                <p className={style.BSFLVPos}>{data.job}</p>
              </div>
              <div className={style.BSFLVLocation}>
                <img
                  className={style.BSFLVLocationImg}
                  src={assets.mappin}
                  alt=""
                />
                <p className={style.BSFLVLocationText}>
                  {data.city}, {data.province}
                </p>
              </div>
              <div>
                <p className={style.BSFLVJob}>{data.workplace}</p>
              </div>
              <div className={style.BSFLVDesc}>
                <p className={style.BSFLVDescValue}>{data.description}</p>
              </div>
              <div>
                <p className={style.BSFLVSkill}>Skill</p>
              </div>
              <div className={style.BSFLVSkillBasis}>
                {dataSkill ? (
                  dataSkill.map((item) => (
                    <div className={style.BSFLVSkillValue}>{item.name}</div>
                  ))
                ) : (
                  <>
                    <p>Skill empty</p>
                  </>
                )}
              </div>
              <div className={style.BSFLVMail}>
                <img
                  className={style.BSFLVMailImg}
                  src={assets.logomail}
                  alt=""
                />
                <p className={style.BSFLVMailText}>{data.email}</p>
              </div>
              <div className={style.BSFLVIg}>
                <img className={style.BSFLVIgImg} src={assets.logoig} alt="" />
                {data.instagram ? (
                  <p className={style.BSFLVIgText}>{data.instagram}</p>
                ) : (
                  <p className={style.BSFLVIgText}>Empty</p>
                )}
              </div>
              <div className={style.BSFLVGithub}>
                <img
                  className={style.BSFLVGithubImg}
                  src={assets.logogithub}
                  alt=""
                />
                {data.github ? (
                  <p className={style.BSFLVGithubText}>{data.github}</p>
                ) : (
                  <p className={style.BSFLVGithubText}>Empty</p>
                )}
              </div>
              <div className={style.BSFLVGitlab}>
                <img
                  className={style.BSFLVGitlabImg}
                  src={assets.logogitlab}
                  alt=""
                />
                {data.gitlab ? (
                  <p className={style.BSFLVGitlabText}>{data.gitlab}</p>
                ) : (
                  <p className={style.BSFLVGitlabText}>Empty</p>
                )}
              </div>
              <div className={style.BSFLVButton}>
                <button
                  type="button"
                  className={style.BSFLVButtonValue}
                  onClick={() => navigate(`/hire/${id}`)}
                >
                  Hire
                </button>
              </div>
            </div>
          </div>
          <div className={style.BSFieldRight}>
            <div className={style.BSFieldRightValue}>
              <div className={style.containerBSFRVPorto}>
                <div className={style.BSFRVPorto}>
                  <p className={style.BSFRVPortoText}>Portofolio</p>
                  <img
                    className={style.BSFRVPortoImg}
                    src={assets.lineprofile}
                    alt=""
                  />
                </div>
                <div className={style.BSFRVPortoBasis}>
                  {dataPorto ? (
                    dataPorto.map((item) => (
                      <div className="d-flex flex-column gap-2">
                        <img
                          className={style.BSFRVPortoValue}
                          src={item.photo}
                          alt=""
                        />
                        <p>{item.description}</p>
                      </div>
                    ))
                  ) : (
                    <>
                      <p>Portfolio empty</p>
                    </>
                  )}
                </div>
              </div>
              <div className={style.containerBSFRVExp}>
                <div className={style.BSFRVExp}>
                  <p className={style.BSFRVExpText}>Pengalaman Kerja</p>
                  <img
                    className={style.BSFRVExpImg}
                    src={assets.lineprofile}
                    alt=""
                  />
                </div>
                {dataExp ? (
                  dataExp.map((item) => (
                    <div className="pb-2">
                      <div className={style.BSVRFExpBasis}>
                        <div className={style.BSFRVExpValue}>
                          <img
                            className={style.BSFRVExpValueImg}
                            src={assets.profileexp}
                            alt=""
                          />
                          <div className={style.BSFRVExpValueInfo}>
                            <p className={style.BSFRVEVIJob}>{item.position}</p>
                            <p className={style.BSFRVEVIPlace}>
                              {item.company_name}
                            </p>
                            <div className={style.BSFRVEVIDate}>
                              <p className={style.BSFRVEVIDateLeft}>
                                {item.work_start}
                              </p>
                              <p className={style.BSFRVEVIDateCenter}>-</p>
                              <p className={style.BSFRVEVIDateRight}>
                                {item.work_ended}
                              </p>
                            </div>
                            <p className={style.BSFRVEVIDesc}>
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <p>Experience empty</p>
                  </>
                )}
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

export default Profile;
