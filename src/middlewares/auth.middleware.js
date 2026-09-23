const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

    if (decoded.role !== "artist") {
      return res.status(403).json({ message: "Only artists have access" });
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({  message: "Unauthorized" });
  }

}
async function authUser(req, res, next) {

const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {  
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

    if (decoded.role !== "artist" && decoded.role !== "user") {
      return res.status(403).json({ message: "you don't have access" });
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({  message: "Unauthorized" });
  }
}

module.exports = { authMiddleware, authUser };