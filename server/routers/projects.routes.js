const { Router } = require("express");
const { Project } = require("../mongo/models");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const upload = multer().single("project_image");

const secret = process.env.SECRET || "";

const router = Router();

const tokenParse = (req, res, next) => {
  try {
    const token = req.get("Auth-Token");
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.send(401, { status: false, message: "Unauthorised access!" });
        console.log("JWT Token Error =>", err);
      } else {
        req.tokenData = decoded;
        next();
      }
    });
  } catch (err) {
    res.sendStatus(500);
    console.log("Server jwt error cach block", err);
  }
};

const check_role = (req, res, next) => {
  if (req.tokenData && req.tokenData.role === 1) {
    next();
  } else {
    res.send(401, { status: false, message: "Unauthorised access" });
  }
};

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().all().exec();
    res.send({ projects });
  } catch (err) {
    res.sendStatus(500);
    console.log("Get service eror => ", err);
  }
});

router.post("/create", tokenParse, check_role, (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        res.status(403, { status: false, message: "Some error occured" });
      } else if (err) {
        throw err;
      }

      console.log(req.file);

      req.body.image = {
        data: req.file.buffer,
        mimetype: req.file.mimetype,
      };
      const project = new Project(req.body);
      console.log(project);
      await project.save();
      res.send({ status: true, message: "Project created!" });
    });
  } catch (err) {
    res.sendStatus(500);
    console.log("Get project eror => ", err);
  }
});

router.patch("/update/:id", tokenParse, check_role, (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
      } else if (err) {
        throw err;
      }

      if (req.body._id) {
        delete req.body._id;
      }

      if (req.file) {
        req.body.image = {
          data: req.file.buffer,
          mimetype: req.file.mimetype,
        };
      }

      console.log(req.body);
      await Project.updateOne({ _id: req.params.id }, { $set: req.body });
      res.send({ status: true, message: "Project updated!" });
    });
  } catch (err) {
    res.sendStatus(500);
    console.log("Get project error => ", err);
  }
});

router.delete("/delete/:id", tokenParse, check_role, async (req, res) => {
  try {
    await Project.deleteOne({ _id: req.params.id });
    res.send({ status: true, message: "Project deleted!" });
  } catch (err) {
    res.sendStatus(500);
    console.log("Get project eror => ", err);
  }
});

module.exports = router;
