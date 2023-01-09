import React, { useEffect, useState } from "react";
import style from "./editemployee.module.css";
import assets from "../../../assets";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

const EditEmployee = () => {
  const [data, setData] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [job, setJob] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [description, setDescription] = useState("");

  const [dataSkill, setDataSkill] = useState([]);
  const [skill, setSkill] = useState("");

  const [dataExp, setDataExp] = useState([]);
  const [position, setPosition] = useState("");
  const [company_name, setCompany_name] = useState("");
  const [work_start, setWork_start] = useState("");
  const [work_ended, setWork_ended] = useState("");
  const [exp_description, setExp_description] = useState("");

  const [dataPorto, setDataPorto] = useState([]);
  const [repo_link, setRepo_link] = useState("");
  const [repo_type, setRepo_type] = useState("");
  const [porto_photo, setPorto_photo] = useState(null);
  const [porto_description, setPorto_description] = useState("");

  const navigate = useNavigate();

  let token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");

  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getProfile = async (url) => {
    let token = localStorage.getItem("token");
    console.log("My token", token);
    try {
      const res = await axios.get(url, auth);
      setData(res.data.data[0]);
      console.log(res.data.data[0]);
      setJob(res.data.data[0].job);
      setWorkplace(res.data.data[0].workplace);
      setCity(res.data.data[0].city);
      setProvince(res.data.data[0].province);
      setDescription(res.data.data[0].description);
    } catch (err) {
      console.log(err);
    }
  };

  const getExperience = async (url2) => {
    try {
      const res = await axios.get(url2, auth);
      setDataExp(res.data.data.result);
      console.log("Get experience success", res.data.data.result);
      console.log(res.data.data);
    } catch (err) {
      console.log("Get experience failer", err);
    }
  };

  const getPortofolio = async (url3) => {
    try {
      const res = await axios.get(url3, auth);
      setDataPorto(res.data.data.result);
      console.log("Get portofolio success", res.data.data.result);
    } catch (err) {
      console.log("Get portofolio failed", err);
    }
  };

  useEffect(() => {
    let url = `http://localhost:3005/auth/profile`;
    let url2 = `http://localhost:3005/experience`;
    let url3 = `http://localhost:3005/portofolio`;
    getProfile(url);
    getExperience(url2);
    getPortofolio(url3);
  }, []);

  useEffect(() => {
    getProfile();
  }, []);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("job", job);
      formData.append("city", city);
      formData.append("province", province);
      formData.append("workplace", workplace);
      formData.append("description", description);
      formData.append("photo", photo);
      await axios.put(
        `http://localhost:3005/auth/update-employee`,
        formData,
        auth,
        {
          "content-type": "multipart/form-data",
        }
      );
      console.log("Update profile success");
      Swal.fire("Success", "Update profile success", "success");
      window.location.reload(false);
    } catch (err) {
      console.log(err);
      Swal.fire("Warning", "Update profile failed", "error");
    }
  };

  const handleCreateSkill = async (e) => {
    e.preventDefault();
    let formSkill = {
      name: skill,
    };
    try {
      const createSkill = await axios.post(
        `http://localhost:3005/skill/add`,
        formSkill,
        auth
      );
      console.log("Create skill success", createSkill);
      Swal.fire("Success", "Create skill success", "success");
    } catch (err) {
      console.log(err);
      Swal.fire("Warning", "Create skill failed", "error");
    }
  };

  const handleCreateExp = async (e) => {
    e.preventDefault();
    let formExp = {
      position: position,
      company_name: company_name,
      work_start: work_start,
      work_ended: work_ended,
      description: exp_description,
    };
    try {
      const createExp = await axios.post(
        `http://localhost:3005/experience/add`,
        formExp,
        auth
      );
      console.log("Create experience success", createExp);
      Swal.fire("Success", "Create experience success", "success");
      window.location.reload(false);
    } catch (err) {
      console.log(err);
      Swal.fire("Warning", "Create experience failed", "error");
    }
  };

  const handleDeleteExp = async (delete_id) => {
    try {
      await axios.delete(`http://localhost:3005/experience/${delete_id}`, auth);
      console.log("Success delete experience");
      Swal.fire("Success", "Success delete experience", "success");
      window.location.reload(false);
    } catch (err) {
      console.log(err);
      Swal.fire("Warning", "Delete experience failed", "error");
    }
  };

  const handlePhotoPortoChange = (e) => {
    setPorto_photo(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleCreatePort = async (e) => {
    e.preventDefault();
    try {
      const formPort = new FormData();
      formPort.append("repo_link", repo_link);
      formPort.append("repo_type", repo_type);
      formPort.append("description", porto_description);
      formPort.append("photo", porto_photo);
      const createPort = await axios.post(
        `http://localhost:3005/portofolio/add`,
        formPort,
        auth,
        {
          "content-type": "multipart/form-data",
        }
      );
      console.log("Create portofolio success", createPort);
      Swal.fire("Success", "Create portfolio success", "success");
      window.location.reload(false);
    } catch (err) {
      console.log("Create portofolio failed", err);
      Swal.fire("Warning", "Create portfolio failed", "error");
    }
  };

  const handleDeletePorto = async (delete_id) => {
    try {
      await axios.delete(`http://localhost:3005/portofolio/${delete_id}`, auth);
      console.log("Success delete portfolio");
      Swal.fire("Success", "Success delete portfolio", "success");
      window.location.reload(false);
    } catch (err) {
      console.log(err);
      Swal.fire("Warning", "Delete portfolio failed", "error");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login/employee");
  };

  return (
    <div className={style.containerEEmployee}>
      <div className={style.containerEEmployeeNavBasis}>
        <div className={style.containerEEmployeeNav}>
          <div className={style.containerEENLogo}>
            <img src={assets.logoweb} alt="" />
          </div>
          <div className={style.containerEENButton}>
            <div className={style.EENButtonLeft}>
              <img src={assets.logobell} alt="" />
            </div>
            <div className={style.EENButtonCenter}>
              <img src={assets.logomail} alt="" />
            </div>
            <div className={style.EENButtonRight}>
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
                  <Dropdown.Item onClick={() => handleLogout()}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      <div className={style.containerEEBodyBasis}>
        <div className={style.EEBFieldTop} />
        <div className={style.BodyProfile}>
          <div className={style.EEBFieldLeft}>
            <div className={style.EEBFieldLeftValue}>
              <div>
                {data.photo === null ? (
                  <img
                    className={style.EEBFLVImg}
                    src={assets.navprofiledef}
                    alt=""
                  />
                ) : (
                  <img className={style.EEBFLVImg} src={data.photo} alt="" />
                )}
                <label className={style.EEBFLEditLabel} htmlFor="photo">
                  Edit
                </label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  className={style.EEBFLEdit}
                  onChange={handlePhotoChange}
                />
              </div>
              <div>
                <p className={style.EEBFLVName}>{data.name}</p>
              </div>
              <div>
                <p className={style.EEBFLVPos}>{data.job}</p>
              </div>
              <div className={style.EEBFLVLocation}>
                <img
                  className={style.EEBFLVLocationImg}
                  src={assets.mappin}
                  alt=""
                />
                <div className="mb-4">
                  <p className={style.EEBFLVLocationText}>{data.workplace}</p>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className={style.EEBFieldLeftButton}
              onClick={handleUpdateProfile}
            >
              Save
            </button>
            <button type="submit" className={style.EEBFieldLeftButton2}>
              Cancel
            </button>
          </div>
          <div className={style.EEBFieldRight}>
            <div className={style.EEBFieldRightValue}>
              <div className="pt-5">
                <p className={style.EEBFRVData}>Data Diri</p>
              </div>
              <form className={style.EEBFRVForm} action="">
                <div>
                  <label className={style.EEBFRVFormLabel} htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nama"
                    className="form-control"
                    value={data.name}
                  />
                </div>
                <div>
                  <label className={style.EEBFRVFormLabel} htmlFor="job">
                    Jobdesk
                  </label>
                  <input
                    type="text"
                    id="jobdesk"
                    name="job"
                    placeholder="Jobdesk"
                    className="form-control"
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                  />
                </div>
                <div>
                  <label className={style.EEBFRVFormLabel} htmlFor="place">
                    Tempat kerja
                  </label>
                  <input
                    type="text"
                    id="place"
                    name="workplace"
                    placeholder="Tempat kerja"
                    className="form-control"
                    value={workplace}
                    onChange={(e) => setWorkplace(e.target.value)}
                  />
                </div>
                <div>
                  <label className={style.EEBFRVFormLabel} htmlFor="city">
                    Kota
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Kota"
                    className="form-control"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <label className={style.EEBFRVFormLabel} htmlFor="province">
                    Provinsi
                  </label>
                  <input
                    type="text"
                    id="province"
                    name="province"
                    placeholder="Provinsi"
                    className="form-control"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                  />
                </div>
                <div className="mb-5">
                  <label className={style.EEBFRVFormLabel} htmlFor="desc">
                    Deskripsi
                  </label>
                  <textarea
                    type="text"
                    id="desc"
                    name="description"
                    row={6}
                    placeholder="Deskripsi"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className={style.EEBFieldRightValue2}>
              <div className="pt-5">
                <p className={style.EEBFRVData}>Skill</p>
                <div className="pb-4">
                  <form className={style.EEBFRV2Form} action="">
                    <input
                      type="text"
                      id="skill"
                      name="skill"
                      className="form-control"
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                    />
                    <button
                      type="submit"
                      className={style.EEBFRV2FormButton}
                      onClick={handleCreateSkill}
                    >
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className={style.EEBFieldRightValue3}>
              <div className="pt-5">
                <p className={style.EEBFRVData}>Pengalaman Kerja</p>
              </div>
              <div className={style.containerBSFRVExp}>
                {dataExp ? (
                  dataExp.map((item) => (
                    <div className={style.BSVRFExpBasis}>
                      <div className={style.BSFRVExpValue}>
                        <img
                          className={style.BSFRVExpValueImg}
                          src={assets.profileexp}
                          alt=""
                        />
                        <div className={style.BSFRVExpValueInfo}>
                          <div className="d-flex flex-row justify-content-between">
                            <p className={style.BSFRVEVIJob}>{item.position}</p>
                            <div className="d-flex flex-row gap-3">
                              <button
                                type="submit"
                                className={style.PKButtonLeft}
                                onClick={() =>
                                  navigate(`/edit-experience/${item.id}`)
                                }
                              >
                                Edit
                              </button>
                              <button
                                type="submit"
                                className={style.PKButtonRight}
                                key={item.id}
                                onClick={() => handleDeleteExp(item.id)}
                              >
                                Del
                              </button>
                            </div>
                          </div>
                          <p className={style.BSFRVEVIPlace}>
                            {item.company_name}
                          </p>
                          <div className={style.BSFRVEVIDate}>
                            <p className={style.BSFRVEVIDateLeft}>
                              {item.work_start}
                            </p>
                            <p className={style.BSFRVEVIDateCenter}>-</p>
                            <p className={style.BSFRVEVIDateRight}>
                              {item.work_start}
                            </p>
                          </div>
                          <p className={style.BSFRVEVIDesc}>
                            {item.exp_description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div>
                      <p>Data experience not found</p>
                    </div>
                  </>
                )}
              </div>
              <div className="pb-4">
                <form className={style.EEBFRV3Form} action="">
                  <div>
                    <label
                      className={style.EEBFRV3FormLabel}
                      htmlFor="position"
                    >
                      Posisi
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      placeholder="Posisi"
                      className="form-control"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                    />
                  </div>
                  <div className="d-flex flex-row justify-content-between gap-3">
                    <div>
                      <label
                        className={style.EEBFRV3FormLabel}
                        htmlFor="company_name"
                      >
                        Perusahaan
                      </label>
                      <input
                        type="text"
                        id="company_name"
                        name="company_name"
                        placeholder="Nama perusahaan"
                        className="form-control"
                        value={company_name}
                        onChange={(e) => setCompany_name(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        className={style.EEBFRV3FormLabel}
                        htmlFor="work_start"
                      >
                        Dari
                      </label>
                      <input
                        type="date"
                        id="work_start"
                        name="work_start"
                        placeholder="Dari"
                        className="form-control"
                        value={work_start}
                        onChange={(e) => setWork_start(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        className={style.EEBFRV3FormLabel}
                        htmlFor="work_ended"
                      >
                        Sampai
                      </label>
                      <input
                        type="date"
                        id="work_ended"
                        name="work_ended"
                        placeholder="Sampai"
                        className="form-control"
                        value={work_ended}
                        onChange={(e) => setWork_ended(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className={style.EEBFRV3FormLabel}
                      htmlFor="description"
                    >
                      Deskripsi singkat
                    </label>
                    <textarea
                      type="text"
                      id="description"
                      name="description"
                      row={6}
                      placeholder="Deskripsi"
                      className="form-control"
                      value={exp_description}
                      onChange={(e) => setExp_description(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-outline-warning mt-4"
                    onClick={handleCreateExp}
                  >
                    Tambah Pengalaman Kerja
                  </button>
                </form>
              </div>
            </div>
            <div className={style.EEBFieldRightValue4}>
              <div className="pt-5">
                <p className={style.EEBFRVData}>Portofolio</p>
              </div>
              <div className={style.containerBSFRVExp}>
                {dataPorto ? (
                  dataPorto.map((item) => (
                    <div className={style.BSVRFExpBasis}>
                      <div className={style.BSFRVExpValue}>
                        <img
                          className={style.BSFRVExpValueImg}
                          src={item.photo}
                          alt=""
                        />
                        <div className={style.BSFRVExpValueInfo}>
                          <div className="d-flex flex-row gap-5 justify-content-between">
                            <p className={style.BSFRVEVIJob}>
                              {item.description}
                            </p>
                            <div className="d-flex flex-row gap-3">
                              <button
                                type="submit"
                                className={style.PKButtonLeft}
                                onClick={() =>
                                  navigate(`/edit-portfolio/${item.id}`)
                                }
                              >
                                Edit
                              </button>
                              <button
                                type="submit"
                                className={style.PKButtonRight}
                                key={item.id}
                                onClick={() => handleDeletePorto(item.id)}
                              >
                                Del
                              </button>
                            </div>
                          </div>
                          <p className={style.BSFRVEVIPlace}>
                            {item.repo_type}
                          </p>
                          <p className={style.BSFRVEVIDesc}>{item.repo_link}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div>
                      <p>Data experience not found</p>
                    </div>
                  </>
                )}
              </div>
              <div className="pb-4">
                <form className={style.EEBFRV4Form} action="">
                  <div>
                    <label
                      className={style.EEBFRV4FormLabel}
                      htmlFor="repositori"
                    >
                      Link repositori
                    </label>
                    <input
                      type="text"
                      id="repositori"
                      name="repo_link"
                      placeholder="Link repositori"
                      className="form-control"
                      value={repo_link}
                      onChange={(e) => setRepo_link(e.target.value)}
                    />
                  </div>
                  <div className="d-flex flex-row gap-4 mt-3">
                    <div className="d-flex flex-row gap-2">
                      <input
                        type="radio"
                        name="repo_type"
                        id="mobile"
                        className="form-check-input"
                        value="Mobile"
                        onChange={(e) => setRepo_type(e.target.value)}
                      />
                      <label htmlFor="mobile">Aplikasi mobile</label>
                    </div>
                    <div className="d-flex flex-row gap-2">
                      <input
                        type="radio"
                        name="repo_type"
                        id="web"
                        className="form-check-input"
                        value="Website"
                        onChange={(e) => setRepo_type(e.target.value)}
                      />
                      <label htmlFor="web">Aplikasi web</label>
                    </div>
                  </div>
                  <div className="mt-3">
                    <input type="file" onChange={handlePhotoPortoChange} />
                  </div>
                  <div className="mb-5 mt-3">
                    <label className={style.EEBFRVFormLabel} htmlFor="desc">
                      Deskripsi
                    </label>
                    <textarea
                      type="text"
                      id="desc"
                      name="description"
                      row={6}
                      placeholder="Deskripsi"
                      className="form-control"
                      value={porto_description}
                      onChange={(e) => setPorto_description(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-warning mt-4"
                    onClick={handleCreatePort}
                  >
                    Tambah Portofolio
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.containerEEmployeeFooter}>
        <div className={style.containerEEFBasis}>
          <div className={style.EEFTop}>
            <img src={assets.logofooter} alt="" />
          </div>
          <div className={style.EEFCenter}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              euismod ipsum et dui rhoncus auctor.
            </p>
          </div>
          <div>
            <img src={assets.linefooter} alt="" />
          </div>
          <div className={style.EEFBottom}>
            <div className={style.EEFBLeft}>
              <p>2020 Pewworld. All right reserved</p>
            </div>
            <div className={style.EEFBRight}>
              <p>Telepon</p>
              <p>Email</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
