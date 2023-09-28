const mongoose = require("mongoose");
const string = process.env.URI_STRING || "mongodb+srv://";
mongoose.connect(string);

/* schema start here*/

const clientSchema = new mongoose.Schema(
  {
    title: String,
    image: {
      mimetype: String,
      data: Buffer,
    },
    created_date: {
      name: { type: String, default: "." },
      date: { type: Date, default: Date.now },
    },
    updated_date: { type: Array, default: [] },
  },
  {
    query: {
      all() {
        return this.where({});
      },
    },
  }
);

// service schema and projects schema is same

const servicesSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: {
      mimetype: String,
      data: Buffer,
    },
    created_date: {
      name: { type: String, default: "." },
      date: { type: Date, default: Date.now },
    },
    updated_date: { type: Array, default: [] },
  },
  {
    query: {
      all() {
        return this.where({});
      },
    },
  }
);

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: { type: String },
    role: { type: Number, default: 0 }, // 1 means super admin, 2 means user with edit access, 0 means normal user
    created_date: {
      name: { type: String, default: "." },
      date: { type: Date, default: Date.now },
    },
  },
  {
    query: {
      all() {
        return this.where({});
      },
      byRole(role) {
        return this.where({ role });
      },
      byEmail(email) {
        return this.where({ email });
      },
      byIdEmail(_id, email) {
        return this.where({ _id, email });
      },
      byEmailPassword(email, password) {
        return this.where({ email, password });
      },
    },
  }
);

// create and export the model
const Project = mongoose.model("projects", servicesSchema);
const Service = mongoose.model("services", servicesSchema);
const Client = mongoose.model("clients", clientSchema);
const User = mongoose.model("users", userSchema);

// validations for the models

User.schema.path("name").validate({
  validator: function (value) {
    if (value && value.length > 0) {
      return true;
    }
    return false;
  },
  message: "Name required",
});

User.schema.path("email").validate({
  validator: function (value) {
    var tester =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    return value && tester.test(value);
  },
  message: "Enter a valid email!",
});

User.schema.path("email").validate({
  validator: async (value) => {
    const count = await User.findOne({ email: value }).count();
    return count === 0;
  },
  message: "Email already exist",
});

Project.schema.path("title").validate({
  validator: function (value) {
    return value.length > 0;
  },
  message: "title required",
});

module.exports = { Project, Service, Client, User };
