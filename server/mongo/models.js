const mongoose = require("mongoose");
const string = process.env.MONGO_URI_STRING || "Your connection string";
mongoose.connect(string);

/* schema start here*/

// project details schema
const projectsSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: Buffer,
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
      byId(id) {
        this.where({ _id: id });
      },
      byName(name) {
        this.where({ [created_date.name]: name });
      },
    },
  }
);

// create and export the model
const Project = mongoose.model("projects", projectsSchema);

module.exports = { Project };
