const { Router } = require("express");
const { Message, User } = require("../mongo/models");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

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

router.get("/", tokenParse, check_role, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const skipDocuments = (page - 1) * +limit;
    const totalData = await Message.find().count();

    if (skipDocuments >= totalData) {
      console.log("I am here!");
      let messages = {};
      messages.totalData = totalData;
      messages.limit = +limit;
      messages.data = [];
      res.send({ messages });
      return;
    }

    let messages = {};

    messages.totalData = totalData;
    messages.limit = +limit;

    const sort = req.query["sort"];
    const order = req.query["order"] || "desc";

    if (sort && order) {
      messages.data = await Message.find()
        .sort({ [sort]: order })
        .skip(skipDocuments)
        .limit(+limit);
    } else {
      messages.data = await Message.find().skip(skipDocuments).limit(+limit);
    }
    res.send({ messages });
  } catch (err) {
    if (err instanceof mongoose.MongooseError) {
      res.status(400).send({ status: false, message: "Bad request" });
    } else {
      res.sendStatus(500);
    }
    console.log("Get user eror => ", err);
  }
});

router.get("/:id", tokenParse, check_role, async (req, res) => {
  try {
    const messages = await Message.findById(req.params.id);
    res.send({
      messages,
    });
  } catch (err) {
    res.sendStatus(500);
    console.log("Get message eror => ", err);
  }
});

router.post("/create", async (req, res) => {
  try {
    const message = new Message(req.body);
    console.log(message);
    await message.save();
    res.send({ status: true, message: "Message submitted!" });
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
    console.log(req.body);
    await Message.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      },
      { runValidators: true }
    );
    res.send({ status: true, message: "Message updated!" });
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
    console.log("Patch message eror => ", err);
  }
});

router.delete("/delete/:id", tokenParse, check_role, async (req, res) => {
  try {
    await Message.deleteOne({ _id: req.params.id });
    res.send({ status: true, message: "Message deleted!" });
  } catch (err) {
    res.sendStatus(500);
    console.log("Delete message eror => ", err);
  }
});

module.exports = router;
