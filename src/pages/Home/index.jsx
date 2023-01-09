import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./home.module.css";
import assets from "../../assets";
import axios from "axios";
import Pagination from "../../components/Pagination";
import { Dropdown } from "react-bootstrap";

const Home = () => {
  const [data, setData] = useState([]);

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState("10");

  const [page, setPage] = useState("1");
  const [totalData, setTotalData] = useState("");
  const [totalPage, setTotalPage] = useState("");

  const navigate = useNavigate();

  const getData = async (url) => {
    let token = localStorage.getItem("token");
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.data.result);
      setPage(res.data.data.pagination.currentPage);
      setTotalData(res.data.data.pagination.totalData);
      setTotalPage(res.data.data.pagination.totalPage);
      console.log(res.data.data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let url = `http://localhost:3005/employee`;
    if (limit !== "10") {
      url = `${url}?limit=${limit}`;
    } else {
      url = `${url}?limit=10`;
    }
    if (search !== "") {
      url = `${url}&search=${search}`;
    }
    if (page !== "1") {
      url = `${url}&page=${page}`;
    }
    getData(url);
  }, [search, limit, page]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login/company");
  };

  return (
    <div className={style.containerHome}>
      <div className={style.containerHomeNavBasis}>
        <div className={style.containerHomeNav}>
          <div className={style.containerHNLogo}>
            <img src={assets.logoweb} alt="" />
          </div>
          <div className={style.containerHNButton}>
            <button type="button" className={style.HNButtonLeft}>
              <img src={assets.logobell} alt="" />
            </button>
            <button type="button" className={style.HNButtonCenter}>
              <img src={assets.logomail} alt="" />
            </button>
            <button type="button" className={style.HNButtonRight}>
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
            </button>
          </div>
        </div>
      </div>
      <div className={style.containerHomeNav2}>
        <div className={style.HN2Basis}>
          <div className={style.HN2Text}>Top Jobs</div>
        </div>
      </div>
      <div className={style.containerHomeBody}>
        <div className={style.HBTop}>
          <input
            type="search"
            name="search"
            placeholder="Search..."
            className={style.HBTopSearch}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          <div className={style.HBTopSelect}>
            <select className={style.HBTopSelectValue} name="sort" id="sort">
              <option value="nama">Nama</option>
              <option value="lokasi">Lokasi</option>
            </select>
          </div>
          <div className={style.HBTopButton}>
            <button type="button" className={style.HBTopButtonValue}>
              Select
            </button>
          </div>
        </div>
        <div className={style.HBBottom}>
          {data ? (
            data.map((item) => (
              <div className={style.HBBottomBody}>
                <div>
                  <img className={style.HBBBImg} src={item.photo} alt="" />
                </div>
                <div className={style.HBBBInfo}>
                  <div>
                    <p className={style.HBBBInfoName}>{item.name}</p>
                  </div>
                  <div>
                    <p className={style.HBBBInfoPos}>{item.job}</p>
                  </div>
                  <div className={style.HBBBInfoMap}>
                    <img
                      className={style.HBBBInfoMapImg}
                      src={assets.mappin}
                      alt=""
                    />
                    <p className={style.HBBBInfoMapText}>
                      {item.city}, {item.province}
                    </p>
                  </div>
                  <div className={style.HBBBInfoSkill}>
                    <div className={style.HBBBInfoSkillValue}>PHP</div>
                    <div className={style.HBBBInfoSkillValue}>Javascript</div>
                    <div className={style.HBBBInfoSkillValue}>HTML</div>
                  </div>
                </div>
                <div className={style.HBBBButton}>
                  <button
                    type="button"
                    className={style.HBBBButtonValue}
                    onClick={() => navigate(`/profile/${item.id}`)}
                  >
                    Profile
                  </button>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}

          {totalPage > 1 ? (
            <div className="mt-4 mb-4">
              <Pagination
                totalPages={totalPage}
                currentPages={page}
                setCurrentPages={(page) => setPage(page)}
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className={style.containerHomeFooter}>
        <div className={style.containerHFBasis}>
          <div className={style.HFTop}>
            <img src={assets.logofooter} alt="" />
          </div>
          <div className={style.HFCenter}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              euismod ipsum et dui rhoncus auctor.
            </p>
          </div>
          <div>
            <img src={assets.linefooter} alt="" />
          </div>
          <div className={style.HFBottom}>
            <div className={style.HFBLeft}>
              <p>2020 Pewworld. All right reserved</p>
            </div>
            <div className={style.HFBRight}>
              <p>Telepon</p>
              <p>Email</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
