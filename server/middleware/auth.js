import jwt from "jsonwebtoken";
import Users from "../model/user";
require("dotenv").config();

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.secret_password);
    const user = Users.find(user => decoded.token == user.token);

    if (!user) {
      return res.status(404).json({
        status: res.statusCode,
        error: "User doesnt exist"
      });
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = auth;
