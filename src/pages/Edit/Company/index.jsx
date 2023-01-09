import React, { useState, useEffect } from "react";
import style from "./editcompany.module.css";
import assets from "../../../assets";
import axios from "axios";
import Swal from "sweetalert2";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EditCompany = () => {
  const [data, setData] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [company_name, setCompany_name] = useState("");
  const [position, setPosition] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [company_email, setCompany_email] = useState("");
  const [company_phone, setCompany_phone] = useState("");
  const [linkedin, setLinkedin] = useState("");

  let token = localStorage.getItem("token");

  const navigate = useNavigate();

  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getProfile = async (url) => {
    try {
      const res = await axios.get(url, auth);
      setData(res.data.data[0]);
      console.log(res.data.data[0]);
      setCompany_name(res.data.data[0].company_name);
      setPosition(res.data.data[0].position);
      setProvince(res.data.data[0].province);
      setCity(res.data.data[0].city);
      setDescription(res.data.data[0].description);
      setCompany_email(res.data.data[0].company_email);
      setCompany_phone(res.data.data[0].company_phone);
      setLinkedin(res.data.data[0].linkedin);
    } catch (err) {
      console.log("Get profile data failed", err);
    }
  };

  useEffect(() => {
    let url = `http://localhost:3005/auth/profile`;
    getProfile(url);
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
      formData.append("company_name", company_name);
      formData.append("position", position);
      formData.append("province", province);
      formData.append("city", city);
      formData.append("description", description);
      formData.append("company_email", company_email);
      formData.append("company_phone", company_phone);
      formData.append("linkedin", linkedin);
      formData.append("photo", photo);
      await axios.put(
        `http://localhost:3005/auth/update-company`,
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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login/company");
  };

  return (
    <div className={style.containerECompany}>
      <div className={style.containerECompanyNavBasis}>
        <div className={style.containerECompanyNav}>
          <div className={style.containerECNLogo}>
            <img src={assets.logoweb} alt="" />
          </div>
          <div className={style.containerECNButton}>
            <div className={style.ECNButtonLeft}>
              <img src={assets.logobell} alt="" />
            </div>
            <div className={style.ECNButtonCenter}>
              <img src={assets.logomail} alt="" />
            </div>
            <div className={style.ECNButtonRight}>
              <Dropdown className="profile-box">
                <Dropdown.Toggle className="dropdown" variant="secondary">
                  <img src={assets.navprofiledef} alt="" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/home">Home</Dropdown.Item>
                  <Dropdown.Item href="/edit-company">My Profile</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLogout()}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      <div className={style.containerECBodyBasis}>
        <div className={style.ECBFieldTop}>
          <div className={style.ECBFieldLeft}>
            <div className={style.ECBFieldLeftValue}>
              <div>
                {data.photo === null ? (
                  <img
                    className={style.ECBFLVImg}
                    src={assets.navprofiledef}
                    alt=""
                  />
                ) : (
                  <img className={style.ECBFLVImg} src={data.photo} alt="" />
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
                <p className={style.ECBFLVName}>{data.company_name}</p>
              </div>
              <div>
                <p className={style.ECBFLVPos}>{data.position}</p>
              </div>
              <div className={style.ECBFLVLocation}>
                <img
                  className={style.ECBFLVLocationImg}
                  src={assets.mappin}
                  alt=""
                />
                <div className="mb-4">
                  <p className={style.ECBFLVLocationText}>{data.city}</p>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className={style.ECBFieldLeftButton}
              onClick={handleUpdateProfile}
            >
              Save
            </button>
            <button type="button" className={style.ECBFieldLeftButton2}>
              Cancel
            </button>
          </div>
          <div className={style.ECBFieldRight}>
            <div className={style.ECBFieldRightValue}>
              <div className="pt-5">
                <p className={style.ECBFRVData}>Data Diri</p>
              </div>
              <form className={style.ECBFRVForm} action="">
                <div>
                  <label
                    className={style.ECBFRVFormLabel}
                    htmlFor="company_name"
                  >
                    Name Perusahaan
                  </label>
                  <input
                    type="text"
                    id="company_name"
                    name="company_name"
                    placeholder="Nama Perusahaan"
                    className="form-control"
                    value={company_name}
                    onChange={(e) => setCompany_name(e.target.value)}
                  />
                </div>
                <div>
                  <label className={style.ECBFRVFormLabel} htmlFor="position">
                    Position
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
                  <label className={style.ECBFRVFormLabel} htmlFor="province">
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
                <div>
                  <label className={style.ECBFRVFormLabel} htmlFor="city">
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
                  <label
                    className={style.ECBFRVFormLabel}
                    htmlFor="description"
                  >
                    Deskripsi
                  </label>
                  <textarea
                    type="text"
                    id="description"
                    name="description"
                    row={6}
                    placeholder="Deskripsi"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className={style.ECBFRVFormLabel}
                    htmlFor="company_email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="company_email"
                    name="company_email"
                    placeholder="Email"
                    className="form-control"
                    value={company_email}
                    onChange={(e) => setCompany_email(e.target.value)}
                  />
                </div>
                <div className="">
                  <label
                    className={style.ECBFRVFormLabel}
                    htmlFor="company_phone"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="company_phone"
                    name="company_phone"
                    placeholder="Phone"
                    className="form-control"
                    value={company_phone}
                    onChange={(e) => setCompany_phone(e.target.value)}
                  />
                </div>
                <div className="mb-5">
                  <label className={style.ECBFRVFormLabel} htmlFor="linkedin">
                    Linkedin
                  </label>
                  <input
                    type="text"
                    id="linkedin"
                    name="linkedin"
                    placeholder="Linkedin"
                    className="form-control"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className={style.containerECompanyFooter}>
        <div className={style.containerECFBasis}>
          <div className={style.ECFTop}>
            <img src={assets.logofooter} alt="" />
          </div>
          <div className={style.ECFCenter}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              euismod ipsum et dui rhoncus auctor.
            </p>
          </div>
          <div>
            <img src={assets.linefooter} alt="" />
          </div>
          <div className={style.ECFBottom}>
            <div className={style.ECFBLeft}>
              <p>2020 Pewworld. All right reserved</p>
            </div>
            <div className={style.ECFBRight}>
              <p>Telepon</p>
              <p>Email</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCompany;
