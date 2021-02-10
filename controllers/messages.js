const store = require("../store/messages");

const getChat = async (req, res) => {
  try {
    const myUid = req.uid;
    const messagesFrom = req.params.from;

    const data = { myUid, messagesFrom };

    const response = await store.getChat(data);

    res.json({
      ok: true,
      messages: response,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getChat,
};
