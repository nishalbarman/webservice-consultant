import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ImSpinner10 } from "react-icons/im";

import { useToast } from "@chakra-ui/react";

import "./Contact.css";

function Contact() {
  var emailTester =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  const { server_api } = useSelector((state) => state.web_details);

  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    email: "",
    phone: "",
  });

  const toast = useToast();

  const sendMessage = async () => {
    const error = [];

    if (!formData.name || formData.name.length <= 2) {
      error.push("Name required and must be of 3 characters or more!");
    }

    if (!formData.email || !emailTester.test(formData.email)) {
      error.push("Email must be valid!");
    }

    if (!formData.message || formData.message.length < 11) {
      error.push("Message required and must be atleast 10 characters!");
    }

    if (!formData.phone || formData.phone.toString().length !== 10) {
      error.push("Phone required and must be of 10 digit!");
    }

    if (error.length > 0) {
      toast({
        title: "Validation failed",
        description: error.join(", "),
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      setSending(true);
      const res = await axios.post(`${server_api}/messages/create`, formData);
      console.log(res);
      if (res.status === 200) {
        toast({
          title: "Message submitted!",
          description:
            "Your message has been sent, we will get back to you before 48 hours. Thank You!",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Message sent failed!",
          status: "warning",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
      setSending(false);
    } catch (err) {
      setSending(false);
      console.error("Axios error => ", err);
      toast({
        title: "Message sent failed!",
        status: "warning",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

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
                  onChange={handleInputChange}
                  type="text"
                  className="inputBox"
                  id="uName"
                  name="name"
                  placeholder="Name*"
                />
              </div>
              <div className="inputDiv">
                <input
                  onChange={handleInputChange}
                  type="email"
                  className="inputBox"
                  id="uEmail"
                  name="email"
                  placeholder="Email*"
                />
              </div>
            </div>
            <div className="inputDiv">
              <input
                onChange={handleInputChange}
                type="tel"
                className="inputBox"
                id="uPhone"
                name="phone"
                maxLength={10}
                placeholder="Phone Number"
              />
            </div>
            <div className="inputDiv">
              <textarea
                onChange={handleInputChange}
                name="message"
                id=""
                className="inputBox"
                placeholder="Message*"
              />
            </div>

            <div className="" id="">
              <button onClick={sendMessage} className="btn" disabled={sending}>
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
