const bcrypt = require("bcryptjs");

const validatePassword = (password, userDBpassword) => {
  const validPassword = bcrypt.compareSync(password, userDBpassword);
  return validPassword;
};

module.exports = {
  validatePassword,
};
