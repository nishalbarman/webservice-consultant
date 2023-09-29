import React from "react";
import "./Footer.css";

function Footer() {
  const footerFunction = () => {
    const footerScroll = document.querySelector("#fifth_footer");
    footerScroll.addEventListener("click", () => {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0;
    });
  };

  return (
    <div id="footer">
      <div className="footer">
        <div className="top_footer">
          <div className="first_footer">
            <p className="footer_heading">About us</p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Doloribus sequi quis voluptatibus, reprehenderit quibusdam
              pariatur eum quo rem alias ea, ut ab ad, atque quidem quae animi
              eaque? Cumque, magni.
            </p>
          </div>

          <div className="second_footer">
            <p className="footer_heading">Get in Touch</p>

            <p>support@antaratma.in</p>
            <p>bussiness@antaratma.in</p>
          </div>

          <div className="third_footer">
            <p className="footer_heading">Quick Links</p>
            <p>Projects</p>
            <p>Services</p>
            <p>Contact Us</p>
            <p>About US</p>
          </div>

          <div className="fourth_footer">
            <p className="footer_heading">Get in Touch</p>
            <input type="email" placeholder="Email Address" />
            <button>Subscribe</button>
            <div className="social_footer_btn">
              <i
                className="fa-brands fa-facebook-f"
                style={{ color: "rgb(152,152,152)" }}
              />
              <i
                className="fa-brands fa-twitter"
                style={{ color: "rgb(152,152,152)" }}
              />
              <i
                className="fa-brands fa-instagram"
                style={{ color: "rgb(152,152,152)" }}
              />
              <i
                className="fa-brands fa-linkedin-in"
                style={{ color: "rgb(152,152,152)" }}
              />
            </div>
          </div>

          <i
            id="fifth_footer"
            className="fa-solid fa-angle-up"
            style={{ color: "white" }}
          />
        </div>
        <div className="footer_bottom">
          <div className="logo">
            <h1 className="logo-text" style={{ color: "white" }}>
              AntarAtma.in
            </h1>
            {/* <img src={webLogo} alt="bartalap.in" style={{ height: "100px" }} /> */}
          </div>
          <div className="bottom-copyright">
            <p>
              Copyrights @ 2020{" "}
              <span
                style={{
                  color: "white",
                  textTransform: "uppercase",
                  textDecoration: "1px dotted white underline",
                }}>
                AntarAatma.In
              </span>
            </p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
