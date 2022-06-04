const express = require("express");
const { setUser } = require("../controllers/user-controller");

const router = express();

router.post("/api/user", setUser);

module.exports = router;
