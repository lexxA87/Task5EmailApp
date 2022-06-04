const { Schema, model } = require("mongoose");

const Message = new Schema(
  {
    title: { type: String, required: true },
    bodyMessage: { type: String, required: true },
    recipientMessage: { type: String, required: true },
    authorMessage: { type: String, required: true },
  },
  { timeseries: true }
);

module.exports = model("Message", Message);
