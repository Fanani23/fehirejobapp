import React from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../assets";
import style from "./landingpage.module.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className={style.containerLanding}>
      <div className={style.containerLandingNav}>
        <div className={style.containerLNLogo}>
          <img src={assets.logoweb} alt="" />
        </div>
        <div className={style.containerLNButton}>
          <div>
            <button
              type="button"
              className={style.LNButtonLeft}
              onClick={() => navigate("/login/employee")}
            >
              Login Employee
            </button>
          </div>
          <div>
            <button
              type="button"
              className={style.LNButtonRight}
              onClick={() => navigate("/login/company")}
            >
              Login Company
            </button>
          </div>
        </div>
      </div>
      <div className={style.containerLandingBody}>
        <div className={style.containerLBTop}>
          <div className={style.LBTopLeft}>
            <div className={style.LBTLTop}>
              <p>Talenta terbaik negri untuk perubahan revolusi 4.0</p>
            </div>
            <div className={style.LBTLCenter}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                euismod ipsum et dui rhoncus auctor.
              </p>
            </div>
            <div>
              <button type="button" className={style.LBTLBottom}>
                Mulai Dari Sekarang
              </button>
            </div>
          </div>
          <div className={style.LBTopRight}>
            <div className={style.LBTRImg}>
              <img
                className={style.LBTRImg}
                src={assets.landingtopright}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className={style.containerLBCenter}>
          <div className={style.LBCenterLeft}>
            <div className={style.LBCLBasisImg}>
              <img
                className={style.LBCLImg}
                src={assets.landingcenterleft}
                alt=""
              />
            </div>
          </div>
          <div className={style.LBCenterRight}>
            <div className={style.LBCRTop}>
              <p>Kenapa harus mencari tallent di peworld</p>
            </div>
            <div className={style.LBCRBottom}>
              <div className={style.LBCRBottomValue}>
                <img
                  className={style.LBCRBVImg}
                  src={assets.logocheck}
                  alt=""
                />
                <p className={style.LBCRBVText}>Lorem ipsum dolor sit amet.</p>
              </div>
              <div className={style.LBCRBottomValue}>
                <img
                  className={style.LBCRBVImg}
                  src={assets.logocheck}
                  alt=""
                />
                <p className={style.LBCRBVText}>Lorem ipsum dolor sit amet.</p>
              </div>
              <div className={style.LBCRBottomValue}>
                <img
                  className={style.LBCRBVImg}
                  src={assets.logocheck}
                  alt=""
                />
                <p className={style.LBCRBVText}>Lorem ipsum dolor sit amet.</p>
              </div>
              <div className={style.LBCRBottomValue}>
                <img
                  className={style.LBCRBVImg}
                  src={assets.logocheck}
                  alt=""
                />
                <p className={style.LBCRBVText}>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </div>
        </div>
        <div className={style.containerLBCenter2}>
          <div className={style.LBCenter2Left}>
            <div className={style.LBC2LTop}>
              <p>Skill Talent</p>
            </div>
            <div className={style.LBC2LCenter}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                euismod ipsum et dui rhoncus auctor.
              </p>
            </div>
            <div className={style.LBC2LBottom}>
              <div className={style.LBC2LBLeft}>
                <div className={style.LBC2LBLeftValue}>
                  <img
                    className={style.LBC2LBLVImg}
                    src={assets.logocheck2}
                    alt=""
                  />
                  <p className={style.LBC2LBLVText}>Java</p>
                </div>
                <div className={style.LBC2LBLeftValue}>
                  <img
                    className={style.LBC2LBLVImg}
                    src={assets.logocheck2}
                    alt=""
                  />
                  <p className={style.LBC2LBLVText}>Kotlin</p>
                </div>
                <div className={style.LBC2LBLeftValue}>
                  <img
                    className={style.LBC2LBLVImg}
                    src={assets.logocheck2}
                    alt=""
                  />
                  <p className={style.LBC2LBLVText}>PHP</p>
                </div>
                <div className={style.LBC2LBLeftValue}>
                  <img
                    className={style.LBC2LBLVImg}
                    src={assets.logocheck2}
                    alt=""
                  />
                  <p className={style.LBC2LBLVText}>JavaScript</p>
                </div>
              </div>
              <div className={style.LBC2LBRight}>
                <div className={style.LBC2LBRightValue}>
                  <img
                    className={style.LBC2LBRVImg}
                    src={assets.logocheck2}
                    alt=""
                  />
                  <p className={style.LBC2LBRVText}>Java</p>
                </div>
                <div className={style.LBC2LBRightValue}>
                  <img
                    className={style.LBC2LBRVImg}
                    src={assets.logocheck2}
                    alt=""
                  />
                  <p className={style.LBC2LBRVText}>Kotlin</p>
                </div>
                <div className={style.LBC2LBRightValue}>
                  <img
                    className={style.LBC2LBRVImg}
                    src={assets.logocheck2}
                    alt=""
                  />
                  <p className={style.LBC2LBRVText}>PHP</p>
                </div>
                <div className={style.LBC2LBRightValue}>
                  <img
                    className={style.LBC2LBRVImg}
                    src={assets.logocheck2}
                    alt=""
                  />
                  <p className={style.LBC2LBRVText}>JavaScript</p>
                </div>
              </div>
            </div>
          </div>
          <div className={style.LBCenter2Right}>
            <div className={style.LBC2RBasisImg}>
              <img
                className={style.LBC2RImg}
                src={assets.landingbottomright}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className={style.containerLBCenter3}>
          <div className={style.LBC3Top}>
            <p className={style.LBC3TopText}>Their opinion about peworld</p>
          </div>
          <div className={style.LBC3Bottom}>
            <img
              className={style.LBC3BottomImg}
              src={assets.landingbottomcenter}
              alt=""
            />
          </div>
        </div>
        <div className={style.containerLBBottom}>
          <div className={style.LBBottom}>
            <img src={assets.landingbottombottom} alt="" />
          </div>
        </div>
      </div>
      <div className={style.containerLandingFooter}>
        <div className={style.containerLFBasis}>
          <div className={style.LFTop}>
            <img src={assets.logofooter} alt="" />
          </div>
          <div className={style.LFCenter}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              euismod ipsum et dui rhoncus auctor.
            </p>
          </div>
          <div>
            <img src={assets.linefooter} alt="" />
          </div>
          <div className={style.LFBottom}>
            <div className={style.LFBLeft}>
              <p>2020 Pewworld. All right reserved</p>
            </div>
            <div className={style.LFBRight}>
              <p>Telepon</p>
              <p>Email</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
