const User = require("../models/user");
const Message = require("../models/messages");

const userConnected = async (uid) => {
  const user = await User.findById(uid);
  user.online = true;
  await user.save();
  return user;
};

const userDisconnected = async (uid) => {
  const user = await User.findById(uid);
  user.online = false;
  await user.save();
  return user;
};

const getUsers = async () => {
  const users = await User.find().sort("-online");
  return users;
};

const saveMessage = async (message) => {
  try {
    const msg = new Message(message);
    await msg.save();
    return msg;
  } catch (error) {
    console.log(error);
    return error;
  }
};
module.exports = {
  userConnected,
  userDisconnected,
  getUsers,
  saveMessage
};
