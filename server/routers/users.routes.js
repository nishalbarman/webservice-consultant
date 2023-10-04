const { Router } = require("express");
const { User } = require("../mongo/models");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const passValidator = require("password-validator");
const bcrypt = require("bcrypt");

const validatePass = new passValidator();
validatePass.is().min(8).has().uppercase().has().lowercase();

const secret = process.env.SECRET || "";

const router = Router();

const tokenParse = (req, res, next) => {
  try {
    if (req.url === "/create" && (!req.body.role || req.body.role === 0)) {
      next();
      return;
    }

    const token = req.get("Auth-Token");
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.send(401, { status: false, message: "Unauthorised access!" });
        console.log("JWT Token Error =>", err);
      } else {
        req.tokenData = decoded;
        console.log("Decoded auth token details =>", decoded);
        next();
      }
    });
  } catch (err) {
    res.sendStatus(500);
    console.log("Server jwt error cach block", err);
  }
};

const check_role = async (req, res, next) => {
  try {
    if (req.url === "/create" && (!req.body.role || req.body.role === 0)) {
      next();
      return;
    }

    const id = req.tokenData._id;
    const email = req.tokenData.email;
    console.log("Token id and Token email => ", id, email);

    const user = await User.findOne().byIdEmail(id, email).exec();

    if (!user) {
      res.status(401).send({ status: false, message: "Unauthorised access" });
      return;
    }

    if (user.role && (user.role === 1 || user.role === 2)) {
      next();
      return;
    }
    res.send(401, { status: false, message: "Unauthorised access" });
  } catch (error) {
    res.send(500, { message: "Internal server error" });
    console.log("Role check error", error);
  }
};

router.post("/login", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.send({
        status: false,
        message: "required fields are missing",
      });
      return;
    }

    const user = await User.findOne().byEmail(req.body.email);
    console.log("login user data => ", user);

    if (!user) {
      res.send({
        status: false,
        message: "Login failed",
      });
      return;
    }

    if (user.email && user._id && user.name && user.password) {
      const result = bcrypt.compareSync(req.body.password, user.password);
      console.log("Hash compare result => ", result);
      if (result) {
        const token = jwt.sign({ email: user.email, _id: user._id }, secret);
        res.send({
          status: true,
          message: "Login successful",
          data: { name: user.name, token: token },
        });
        return;
      }
    }

    res.send({ status: false, message: "Login failed!" });
  } catch (err) {
    res.status(400).send({ message: "required fields are missing" });
    console.log("Get login eror => ", err);
  }
});

router.get("/", tokenParse, check_role, async (req, res) => {
  try {
    const service = await User.find().all();
    res.send({
      users: service,
    });
  } catch (err) {
    res.sendStatus(500);
    console.log("Get user eror => ", err);
  }
});

router.get("/:role", tokenParse, check_role, async (req, res) => {
  try {
    const service = await User.find().byRole(role);
    res.send({
      services: service,
    });
  } catch (err) {
    res.sendStatus(500);
    console.log("Get service eror => ", err);
  }
});

router.post("/create", tokenParse, check_role, async (req, res) => {
  try {
    if (validatePass.validate(req.body.password || "") === false) {
      res.status(400).send({ status: false, message: "Enter valid password!" });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;

    const user = new User(req.body);
    console.log(user);
    await user.save();
    res.send({ status: true, message: "User created!" });
  } catch (err) {
    if (err instanceof mongoose.Error) {
      const errors = [];
      for (key in err.errors) {
        errors.push(err.errors[key].properties.message);
      }
      res.status(400).send({ status: false, message: errors.join(", ") });
    } else {
      res.sendStatus(500);
    }
  }
});

router.patch("/update/:id", tokenParse, check_role, async (req, res) => {
  try {
    if (req.body._id) {
      delete req.body._id;
    }

    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
    }

    console.log(req.body);
    await User.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      },
      { runValidators: true }
    );
    res.send({ status: true, message: "User updated!" });
  } catch (err) {
    if (err instanceof mongoose.Error) {
      const errors = [];
      for (key in err.errors) {
        errors.push(err.errors[key].properties.message);
      }
      res.status(400).send({ status: false, message: errors.join(", ") });
    } else {
      res.sendStatus(500);
    }
    console.log("Get service eror => ", err);
  }
});

router.delete("/delete/:id", tokenParse, check_role, async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.send({ status: true, message: "User deleted!" });
  } catch (err) {
    res.sendStatus(500);
    console.log("Get service eror => ", err);
  }
});

module.exports = router;
