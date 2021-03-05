const Message = require("../models/messages");

const getChat = async (data) => {
  try {
    const { myUid, messagesFrom } = data;

    const last30messages = await Message.find({
      $or: [
        { from: myUid, to: messagesFrom },
        { from: messagesFrom, to: myUid },
      ],
    })
      .sort({ createdAt: "desc" })
      .limit(30);

    return last30messages;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  getChat,
};
