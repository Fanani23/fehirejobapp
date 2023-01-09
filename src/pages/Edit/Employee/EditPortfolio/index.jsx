import React, { useState, useEffect } from "react";
import style from "./editportfolio.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditPortfolio = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [repo_link, setRepo_link] = useState("");
  const [repo_type, setRepo_type] = useState("");
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getPortofolioById = async (url) => {
    try {
      const res = await axios.get(url, auth);
      setData(res.data.data[0]);
      console.log("Get portofolio success", res.data.data[0]);
      setRepo_link(res.data.data[0].repo_link);
      setDescription(res.data.data[0].description);
    } catch (err) {
      console.log("Get portofolio failed", err);
    }
  };

  useEffect(() => {
    let url = `http://localhost:3005/portofolio/${id}`;
    getPortofolioById(url);
  }, []);

  const handlePhotoPortoChange = (e) => {
    setPhoto(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleUpdatePort = async (e) => {
    e.preventDefault();
    try {
      const formPort = new FormData();
      formPort.append("repo_link", repo_link);
      formPort.append("repo_type", repo_type);
      formPort.append("description", description);
      formPort.append("photo", photo);
      const updatePort = await axios.put(
        `http://localhost:3005/portofolio/${id}`,
        formPort,
        auth,
        {
          "content-type": "multipart/form-data",
        }
      );
      console.log("Update portofolio success", updatePort);
      navigate(`/edit-employee`);
      Swal.fire("Success", "Update portfolio success", "success");
    } catch (err) {
      console.log("Update portofolio failed", err);
      Swal.fire("Warning", "Update portfolio failed", "error");
    }
  };

  return (
    <div className="container-fluid">
      <div className="container mt-5 mx-auto">
        <form action="">
          <div>
            <label className={style.EEBFRV4FormLabel} htmlFor="repositori">
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-outline-warning mt-4"
            onClick={handleUpdatePort}
          >
            Update Portofolio
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPortfolio;
