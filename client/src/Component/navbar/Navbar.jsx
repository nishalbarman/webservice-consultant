import React, { useDebugValue, useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../Images/logo_navbar.png";
import { useDispatch, useSelector } from "react-redux";
// import { userLogOut } from "../../Redux/auth/action.js";

function Navbar({ isWhiteBackground, isOfferVisible }) {
  const [colorChange, setColorchange] = useState(false);
  const [sideBarHidden, setSideBarHidden] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  //   const { isAuth } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();
  //   const dispatch = useDispatch();

  const changeNavbarColor = () => {
    if (window.scrollY >= 30) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };

  if (!isWhiteBackground) {
    window.addEventListener("scroll", changeNavbarColor);
  }

  const handleShowSideMenu = () => {
    setSideBarHidden((prev) => {
      if (prev === null) return false;
      return !prev;
    });
  };

  const handleBlankScreen = () => {
    setSideBarHidden(true);
  };

  const handleLinkClick = () => {
    handleShowSideMenu();
  };

  const handleLogOut = (e) => {
    try {
      e.preventDefault();
      // dispatch(userLogOut());
      alert("Logged out ...");
    } catch (er) {
      console.error(er);
    }
  };

  return (
    <>
      <div
        className={`${styles.blank_screen} ${
          sideBarHidden || sideBarHidden === null ? "hidden" : ""
        }`}
        onClick={handleBlankScreen}></div>
      {isOfferVisible && !colorChange && (
        <div className={styles.discount}>
          <p>Upto 50% of on your trips</p>
        </div>
      )}
      <div
        className={styles.navouter}
        style={
          isWhiteBackground || colorChange
            ? {
                backgroundColor: "white",
                top: "0",
                boxShadow: " rgba(17, 17, 26, 0.1) 0px 1px 0px",
              }
            : {}
        }>
        <div
          className={`${styles.navbar} max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4`}>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}>
            <span className="text-3xl font-semibold whitespace-nowrap">
              AntarAtma
            </span>
          </div>

          <div className={styles.sidebar_icon} onClick={handleShowSideMenu}>
            <i
              className="fa-solid fa-bars fa-xl"
              style={{ color: "#000000" }}
            />
          </div>
          <div className={`${styles.desk_links}`}>
            <Link
              to={"/"}
              className={`${
                location.pathname === "/" ? styles.link_active_desk : ""
              } font-semibold`}>
              Home
            </Link>
            <Link
              to={"/"}
              className={`${
                location.pathname.includes("/aboutus")
                  ? styles.link_active_desk
                  : ""
              } font-semibold`}>
              About Us
            </Link>
            <Link
              to={"/services"}
              className={`${
                location.pathname === "/services" ? styles.link_active_desk : ""
              } font-semibold`}>
              Services
            </Link>
            <Link
              to={"/"}
              className={`${
                location.pathname === "/projects" ? styles.link_active_desk : ""
              } font-semibold`}>
              Projects
            </Link>

            <Link
              to={"/contact"}
              className={`${
                location.pathname === "/contact" ? styles.link_active_desk : ""
              } font-semibold`}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* mobile sidebars */}
      <div
        style={{ zIndex: 330 }}
        className={`${styles.mobile_sidebar} ${
          !sideBarHidden && sideBarHidden !== null
            ? `${styles.sidebar_anima}`
            : sideBarHidden === null
            ? ""
            : `${styles.sidebar_backward}`
        } z-50`}>
        <div className={styles.logoouter}>
          <img src={logo} />
          <h2 className={`${styles.logo}`}>Voyawander</h2>
        </div>
        <div className={styles.hor_line}></div>
        <Link
          onClick={handleLinkClick}
          to={"/"}
          className={`${
            location.pathname === "/" ? styles.mobile_active_link : ""
          } font-semibold`}>
          Home
        </Link>
        <div className={styles.hor_line}></div>
        <Link
          onClick={handleLinkClick}
          to={"/"}
          className={`${
            location.pathname === "/aboutus" ? styles.mobile_active_link : ""
          } font-semibold`}>
          About Us
        </Link>
        <div className={styles.hor_line}></div>
        <Link
          onClick={handleLinkClick}
          to={"/services"}
          className={`${
            location.pathname.includes("/services")
              ? styles.mobile_active_link
              : ""
          } font-semibold`}>
          Services
        </Link>
        <div className={styles.hor_line}></div>
        <Link
          onClick={handleLinkClick}
          to={"/"}
          className={`${
            location.pathname.includes("/projects")
              ? styles.mobile_active_link
              : ""
          } font-semibold`}>
          Projects
        </Link>
        <div className={styles.hor_line}></div>
        <Link
          onClick={handleLinkClick}
          to={"/contact"}
          className={`${
            location.pathname === "/contact" ? styles.mobile_active_link : ""
          } font-semibold`}>
          Contact Us
        </Link>
        <div className={styles.hor_line}></div>
      </div>
    </>
  );
}

export default Navbar;
