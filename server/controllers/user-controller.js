const User = require("../models/User");

const setUser = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findOne({ name });
    if (!user) {
      const newUser = new User({ name });
      await newUser.save().then((user) => res.status(200).json(user));
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.send({ message: "Server error" });
  }
};

const getUsers = (req, res) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((error) => {
      console.log(error);
      res.send({ message: "Server error" });
    });
};

module.exports = { setUser, getUsers };
