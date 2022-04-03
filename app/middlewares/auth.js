const jwt = require("jsonwebtoken");

module.exports = {
  auth: (req, res, next) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : null;
      const decoded = jwt.verify(token, "secret");
      if (decoded) {
        req.user = decoded.user;
        req.token = token;
        next();
      } else {
        throw new Error();
      }
    } catch (err) {
      res.status(401).json({
        message: "Not authorized to access this resource",
      });
    }
  },
};
