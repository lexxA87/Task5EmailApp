const User = require("../models/User");

const setUser = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findOne({ name });
    if (!user) {
      const newUser = new User({ name });
      await newUser.save();
      return res.json({
        message: "User was created",
        user: {
          name: newUser.name,
        },
      });
    }
    return res.json({
      user: {
        name: user.name,
      },
    });
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
