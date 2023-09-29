import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Spacer,
  StackDivider,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import web_dev from "../../Images/develop_web.jpg";
import styles from "./HomePage.module.css";

function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <Box my={"140px"}></Box>
      <div className={styles.outer_wrapper}>
        <div className={styles.section_wrapper}>
          <div className={styles.details_wrapper}>
            <p className={styles.first_sec_heading}>
              Unlimited website & Web Development
            </p>
            <p>
              Scale up your creative content production with a reliable and
              hassle-free design service.
            </p>
            <Button
              alignSelf={{
                base: "center", // 0px
                sm: "center", // ~480px. em is a relative unit and is dependant on the font size.
                md: "center", // ~768px
                lg: "center", // ~992px
                xl: "center", // ~1280px
                "2xl": "flex-start",
              }}
              onClick={() => {
                navigate("/contact");
              }}
              colorScheme="twitter"
              py={"1.7rem"}
              w={"170px"}
              my={"1rem"}
              boxShadow={"0px 0px 10px white"}
              style={{
                fontSize: "16px",
                textTransform: "uppercase",
                alignItems: "center",
              }}>
              Contact Now
            </Button>
          </div>
          <div className={styles.image_wrapper}>
            {/* <img
              className={styles.right_image}
              src={
                "https://img.freepik.com/free-vector/people-creating-social-media-landing-page_52683-38062.jpg?w=1380&t=st=1695986088~exp=1695986688~hmac=a802ccfcd2b2556aafb1ac4d776ba4914f27c0b92fc433d10608a999bc4c80dc"
              }
              alt=""
            /> */}
            <img
              className={styles.right_image}
              src={
                "https://img.freepik.com/free-vector/web-development-concept-with-programmer-ar_107791-17049.jpg?w=1380&t=st=1695986238~exp=1695986838~hmac=d6ffcb0f1ebf8840cfa8fcb11268a17f6eaf6c8e781a11c9b5bb7873d29a04d6"
              }
              alt=""
            />
          </div>
        </div>
        <Box my={"140px"}></Box>
        <div className={styles.services_wrapper}>
          <p className={styles.service_heading}>
            Get your project done in 1-2 weeks, not months
          </p>
          <div className={styles.grid_section}>
            <div className={styles.service_card}>
              <img
                src="https://global-uploads.webflow.com/63a9cb71c629474d4ae334b9/6476092fa947b640e4b7711f_Group%204810.svg"
                alt=""
              />
              <p>Submit your request</p>
              <p>
                Let us know what you need. Share references and upload your
                brand assets.
              </p>
            </div>
            <div className={styles.service_card}>
              <img
                src="https://global-uploads.webflow.com/63a9cb71c629474d4ae334b9/6476092fc91007c933836c58_Group%204811.svg"
                alt=""
              />
              <p>Your developers gets to work</p>
              <p>Get instantly matched with the best developers for the job.</p>
            </div>
            <div className={styles.service_card}>
              <img
                src="https://global-uploads.webflow.com/63a9cb71c629474d4ae334b9/6476092f6b8c519b822eb495_Group%204812.svg"
                alt=""
              />
              <p>Recieve your project</p>
              <p>
                Give us your trust. We will revise your project as many times as
                needed.
              </p>
            </div>
          </div>
          <Button
            alignSelf={"center"}
            onClick={() => {
              navigate("/contact");
            }}
            colorScheme="twitter"
            py={"1.7rem"}
            w={"170px"}
            my={"1rem"}
            boxShadow={"0px 0px 10px white"}
            style={{
              fontSize: "16px",
              textTransform: "uppercase",
            }}>
            Contact Today
          </Button>
        </div>
        <Box my={"80px"}></Box>

        <div className={styles.section_wrapper}>
          <img
            className={styles.right_image}
            src={
              "https://img.freepik.com/premium-vector/color-modern-illustration-web_145666-925.jpg?w=826"
            }
            alt=""
          />
          <div className={styles.details_wrapper}>
            <p>Getting a developer should be simple</p>
            <p>
              Finding quality and reliable freelancers takes a lot of time and
              luck. In-house hires are expensive and can create HR drama.
            </p>
          </div>
        </div>

        <Box my={"50px"}></Box>

        <div className={styles.section_wrapper}>
          <div className={styles.details_wrapper}>
            <p>Meet your virtual developer team</p>
            <p>
              We provide you with vetted developers for a flat monthly fee. No
              hiring, no contracts, no stress.
            </p>
          </div>
          <img
            className={styles.right_image}
            src={
              "https://img.freepik.com/free-vector/engineer-developer-with-laptop-tablet-code-cross-platform-development-cross-platform-operating-systems-software-environments-concept-bright-vibrant-violet-isolated-illustration_335657-312.jpg?w=1380&t=st=1695985893~exp=1695986493~hmac=22ed511e52f5001bbe7e88bf6a579845dd54a430a2a0d1a01b4ff21f65a8bc5c"
            }
            alt=""
          />
        </div>

        <Box my={"100px"}></Box>

        <div className={styles.services_wrapper}>
          <p className={styles.service_heading}>
            Services we offer at very less cost
          </p>
          <div className={styles.grid_section}>
            <div className={styles.service_card}>
              <img
                src="https://aavinyatechnology.in/wp-content/uploads/2023/07/app-development.png"
                alt=""
                style={{ marginBottom: "30px" }}
              />
              <p>App Development</p>
              <p>
                Let us know what you need. Share references and upload your
                brand assets.
              </p>
            </div>
            <div className={styles.service_card}>
              <img
                src="https://aavinyatechnology.in/wp-content/uploads/2023/07/web.png"
                alt=""
                style={{ marginBottom: "30px" }}
              />
              <p>Webapp Development</p>
              <p>
                Hire the best Web developer for your business and reach your
                highest goal online.
              </p>
            </div>
            <div className={styles.service_card}>
              <img
                src="https://aavinyatechnology.in/wp-content/uploads/2023/07/cloud-server.png"
                alt=""
                style={{ marginBottom: "30px" }}
              />
              <p>Software Development</p>
              <p>
                We develop custom software for your business with our
                cutting-edge technologies and skills.
              </p>
            </div>
          </div>
          <Button
            alignSelf={"center"}
            onClick={() => {
              navigate("/contact");
            }}
            colorScheme="twitter"
            py={"1.7rem"}
            w={"170px"}
            my={"1rem"}
            boxShadow={"0px 0px 10px white"}
            style={{
              fontSize: "16px",
              textTransform: "uppercase",
            }}>
            Contact Today
          </Button>
        </div>
        <Box my={"10px"}></Box>
      </div>
    </>
  );
}

export default HomePage;
