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
      <Box my={"120px"}></Box>
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
              alignSelf={"flex-start"}
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
          <img className={styles.right_image} src={web_dev} alt="" />
        </div>
        <Box my={"170px"}></Box>
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
        <Box my={"170px"}></Box>

        <div className={styles.section_wrapper}>
          <img
            className={styles.right_image}
            src={
              "https://global-uploads.webflow.com/63a9cb71c629474d4ae334b9/6474e102f522e723a6380cd1_frame_6878-p-500.webp"
            }
            alt=""
          />
          <div className={styles.details_wrapper}>
            <p>Hiring a designer should be simple</p>
            <p>
              Finding quality and reliable freelancers takes a lot of time and
              luck. In-house hires are expensive and can create HR drama.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
