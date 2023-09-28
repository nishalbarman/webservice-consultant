const { Router } = require("express");
const { Client } = require("../mongo/models");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const upload = multer().single("client_image");

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
    const clients = await Client.find().all().exec();
    res.send({ clients });
  } catch (err) {
    res.sendStatus(500);
    console.log("Get client error => ", err);
  }
});

router.post("/create", tokenParse, check_role, (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        res.status(403).send({ status: false, message: "image required" });
        return;
      } else if (err) {
        throw err;
      }

      console.log(req.file);

      req.body.image = {
        data: req.file.buffer,
        mimetype: req.file.mimetype,
      };

      const client = new Client(req.body);
      console.log(client);
      await client.save();
      res.send({ status: true, message: "Client created!" });
    });
  } catch (err) {
    res.sendStatus(500);
    console.log("Create client eror => ", err);
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
      await Client.updateOne({ _id: req.params.id }, { $set: req.body });
      res.send({ status: true, message: "Client updated!" });
    });
  } catch (err) {
    res.sendStatus(500);
    console.log("Update client error => ", err);
  }
});

router.delete("/delete/:id", tokenParse, check_role, async (req, res) => {
  try {
    await Client.deleteOne({ _id: req.params.id });
    res.send({ status: true, message: "Client deleted!" });
  } catch (err) {
    res.sendStatus(500);
    console.log("Delete client error => ", err);
  }
});

module.exports = router;
