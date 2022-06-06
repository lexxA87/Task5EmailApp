const express = require("express");
const { setUser, getUsers } = require("../controllers/user-controller");

const router = express();

router.post("/api/user", setUser);
router.get("/api/users", getUsers);

module.exports = router;
