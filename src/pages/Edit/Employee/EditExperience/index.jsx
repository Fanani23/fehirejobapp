import React, { useState, useEffect } from "react";
import style from "./editexperience.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditExperience = () => {
  const [data, setData] = useState([]);
  const [position, setPosition] = useState("");
  const [company_name, setCompany_name] = useState("");
  const [work_start, setWork_start] = useState("");
  const [work_ended, setWork_ended] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();
  let token = localStorage.getItem("token");

  const navigate = useNavigate();

  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getExperienceById = async (url) => {
    try {
      const res = await axios.get(url, auth);
      setData(res.data.data[0]);
      console.log("Get experience success", res.data.data[0]);
      setPosition(res.data.data[0].position);
      setCompany_name(res.data.data[0].company_name);
      setWork_start(res.data.data[0].work_start);
      setWork_ended(res.data.data[0].work_ended);
      setDescription(res.data.data[0].description);
    } catch (err) {
      console.log("Get experience failer", err);
    }
  };

  useEffect(() => {
    let url = `http://localhost:3005/experience/${id}`;
    getExperienceById(url);
  }, []);

  const handleUpdateExp = async (e) => {
    e.preventDefault();
    let formUpdateExp = {
      position: position,
      company_name: company_name,
      work_start: work_start,
      work_ended: work_ended,
      description: description,
    };
    try {
      const updateExp = await axios.put(
        `http://localhost:3005/experience/${id}`,
        formUpdateExp,
        auth
      );
      console.log("Update experience success", updateExp);
      navigate(`/edit-employee`);
      Swal.fire("Success", "Update experience success", "success");
    } catch (err) {
      console.log(err);
      Swal.fire("Warning", "Update experience failed", "error");
    }
  };

  return (
    <div className="container-fluid">
      <form className="container mt-5 mx-auto" action="">
        <div>
          <label className={style.EEBFRV3FormLabel} htmlFor="position">
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
            <label className={style.EEBFRV3FormLabel} htmlFor="company_name">
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
            <label className={style.EEBFRV3FormLabel} htmlFor="work_start">
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
            <label className={style.EEBFRV3FormLabel} htmlFor="work_ended">
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
          <label className={style.EEBFRV3FormLabel} htmlFor="description">
            Deskripsi singkat
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
        <button
          type="submit"
          className="btn btn-outline-warning mt-4"
          onClick={handleUpdateExp}
        >
          Tambah Pengalaman Kerja
        </button>
      </form>
    </div>
  );
};

export default EditExperience;
