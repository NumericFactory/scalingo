require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
 try {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;
  next();
 } catch {
  res.status(401).json({ message: "Vous n'êtes pas connecté(e)" });
 }
};