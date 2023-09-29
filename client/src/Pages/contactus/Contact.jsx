import React from "react";
import { ImSpinner10 } from "react-icons/im";
import "./Contact.css";

function Contact() {
  const sending = false;

  return (
    <>
      <div className="headCont">
        <h1 className="head">Contact Us</h1>
      </div>

      <div className="container">
        <div className="form">
          <div className="formHeader">
            {/* title anf ptompt here */}
            <div className="title">
              <h4>Let's Code Your Vision!</h4>
            </div>
            <div className="prompt">
              <span>
                Whether you've got an idea, a few technical hitches, or just
                want to discuss tech and the future of digital, we're here. Drop
                your messages in the box below and let's bring your visions to
                life!
              </span>
            </div>
          </div>

          <div className="formBody">
            <div className="inputCluster">
              <div className="inputDiv">
                <input
                  type="text"
                  className="inputBox"
                  id="uName"
                  name="uName"
                  placeholder="Name*"
                />
              </div>
              <div className="inputDiv">
                <input
                  type="email"
                  className="inputBox"
                  id="uEmail"
                  name="uEmail"
                  placeholder="Email*"
                />
              </div>
            </div>
            <div className="inputDiv">
              <input
                type="tel"
                className="inputBox"
                id="uPhone"
                name="uPhone"
                maxLength={10}
                placeholder="Phone Number"
              />
            </div>
            <div className="inputDiv">
              <textarea
                name=""
                id=""
                className="inputBox"
                placeholder="Message*"
              />
            </div>

            <div className="" id="">
              <button className="btn" id="">
                REACH US
                {sending ? (
                  <ImSpinner10 />
                ) : (
                  <i className="bi bi-arrow-right" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
