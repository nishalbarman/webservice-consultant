import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

function Navbar({ isWhiteBackground, isOfferVisible }) {
  const [colorChange, setColorchange] = useState(false);
  const [sideBarHidden, setSideBarHidden] = useState(null);

  const [navbarHide, setNavbarHidden] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  // const changeNavbarColor = () => {
  //   if (window.scrollY >= 70) {
  //     setColorchange(true);
  //   } else {
  //     setColorchange(false);
  //   }
  // };

  // if (!isWhiteBackground) {
  window.addEventListener("scroll", () => {
    let st = window.scrollY || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      // downscroll code
      setNavbarHidden(true);
    } else if (st < lastScrollTop) {
      // upscroll code
      setNavbarHidden(false);
    } // else was horizontal scroll
    setLastScrollTop(st <= 0 ? 0 : st); // For Mobile or negative scrolling
  });
  // }

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

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <>
      <div
        className={`${styles.blank_screen} ${
          sideBarHidden || sideBarHidden === null ? "hidden" : ""
        }`}
        onClick={handleBlankScreen}></div>

      {navbarHide || (
        <div
          className={styles.navouter}
          style={
            isWhiteBackground || colorChange
              ? {
                  backgroundColor: "white",
                  top: "0",
                  boxShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px",
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
                to={"/aboutus"}
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
                  location.pathname === "/services"
                    ? styles.link_active_desk
                    : ""
                } font-semibold`}>
                Services
              </Link>
              <Link
                to={"/projects"}
                className={`${
                  location.pathname === "/projects"
                    ? styles.link_active_desk
                    : ""
                } font-semibold`}>
                Projects
              </Link>

              <Link
                to={"/contact"}
                className={`${
                  location.pathname === "/contact"
                    ? styles.link_active_desk
                    : ""
                } font-semibold`}>
                Contact Us
              </Link>
            </div>
            <Button
              display={{ base: "none", sm: "none", lg: "inline-flex" }}
              onClick={() => {
                navigate("/contact");
              }}
              colorScheme="twitter"
              py={"1.7rem"}
              px={"1.3rem"}
              style={{
                fontSize: "17px",
                textTransform: "uppercase",
                alignItems: "center",
              }}>
              Contact Now
            </Button>
          </div>
        </div>
      )}

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
          {/* <img src={logo} /> */}
          <h1 className={`${styles.logo}`}>AntarAtma</h1>
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
          to={"/aboutus"}
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
          to={"/projects"}
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
        <Button
          display={{ base: "inline-flex", sm: "inline-flex", lg: "none" }}
          onClick={() => {
            navigate("/contact");
            handleLinkClick();
          }}
          colorScheme="twitter"
          py={"1.5rem"}
          w={"140px"}
          my={"1rem"}
          boxShadow={"0px 0px 10px white"}
          style={{
            fontSize: "13px",
            textTransform: "uppercase",
            alignItems: "center",
          }}>
          Contact Now
        </Button>
      </div>
    </>
  );
}

export default Navbar;
