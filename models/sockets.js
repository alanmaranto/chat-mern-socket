const { verifyJWT } = require("../helpers/jwt");

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      const [isValid, uid] = verifyJWT(socket.handshake.query["x-token"]);

      if (!isValid) {
        console.log("socket no identificado");
        return socket.disconnect();
      }
      console.log("cliente conectado", uid);

      socket.on("disconnect", () => {
        console.log("cliente desconectado", uid);
      });
    });
  }
}

module.exports = Sockets;
