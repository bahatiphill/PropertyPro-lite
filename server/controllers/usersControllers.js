import Users from "../model/user";
import jwt from "jsonwebtoken";
require("dotenv").config();

class UserController {
  static userSignUp(req, res) {
    //get Posted data
    const {
      email,
      first_name,
      last_name,
      password,
      phoneNumber,
      address
    } = req.body;

    const newToken = jwt.sign({ email }, process.env.secret_password);

    const user = {
      id: Users.length + 1,
      first_name,
      last_name,
      password,
      phoneNumber,
      address,
      is_admin: false
    };
    user.token = newToken;
    Users.push(user);

    return res.status(201).json({
      status: res.statusCode,
      data: user
    });
  }
}

export default UserController;
