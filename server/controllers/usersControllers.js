import Users from "../model/user";
import jwt from "jsonwebtoken";
require("dotenv").config();

class UserController {
  //login
  static userLogin(req, res) {
    const loginUser = Users.find(user => {
      return user.email == req.body.email && user.password == req.body.password;
    });
    if (loginUser) {
      return res.status(200).json({
        status: res.statusCode,
        data: loginUser
      });
    }

    return res.status(400).json({
      status: res.statusCode,
      error: "Incorrect email or password"
    });
  }

  //Get all users
  static allUsers(req, res) {
    return res.status(200).json({
      status: res.statusCode,
      data: Users
    });
  }

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
      email,
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
