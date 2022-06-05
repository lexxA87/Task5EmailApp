const Message = require("../models/Message");

const handleError = (res, error) => {
  console.log(error);
  res.send({ message: "Server error" });
};

const getMessages = (req, res) => {
  const { name } = req.query;

  Message.find({ recipientMessage: name })
    .then((messages) => res.status(200).json(messages))
    .catch((error) => handleError(res, error));
};

const postMessage = (req, res) => {
  const { title, authorMessage, bodyMessage, recipientMessage } = req.body;
  const message = new Message({
    title,
    authorMessage,
    bodyMessage,
    recipientMessage,
  });
  message
    .save()
    .then((message) => res.status(200).json(message))
    .catch((error) => handleError(res, error));
};

module.exports = { getMessages, postMessage };
