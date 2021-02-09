const User = require("../models/user");

const saveUser = async (data) => {
  try {
    const user = new User(data);
    return await user.save();
  } catch (error) {
    return error;
  }
};

module.exports = {
  saveUser,
};
