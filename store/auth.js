const bcrypt = require("bcryptjs");
const User = require("../models/user");

const saveUser = async (data) => {
  try {
    const { password } = data;
    const user = new User(data);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    return await user.save();
  } catch (error) {
    return error;
  }
};

const getUser = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    return error;
  }
};

module.exports = {
  saveUser,
  getUser
};
