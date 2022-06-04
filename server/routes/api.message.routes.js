const express = require("express");
const {
  getMessages,
  postMessage,
} = require("../controllers/message-controller");

const router = express();

router.get("/api/messages", getMessages);
router.post("/api/message", postMessage);

module.exports = router;
