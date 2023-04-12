const { Schema, model } = require("mongoose");

const aboutMeSchema = new Schema(
  {
    textBody: {
      type: String
    }
  }
);

const AboutMe = model("AboutMe", aboutMeSchema);

module.exports = AboutMe;