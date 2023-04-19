require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  if (req.headers.authorization.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SERVER_TOKEN_SECRET, (error, decoded) => {
      if (!error) {
        return res.send(decoded);
      }
      return res.send(error.message);
    });
  } else {
    return res.status(401).send("Unauthorized !");
  }
};
