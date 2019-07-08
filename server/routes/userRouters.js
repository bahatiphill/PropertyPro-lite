import express from "express";
import UserController from "../controllers/usersControllers";

const usersRouter = express.Router();

//user sign up
usersRouter.post("/auth/signup", UserController.userSignUp);

//Get all users
usersRouter.get("/users", UserController.allUsers);

// user sign in
usersRouter.post("/auth/signin", UserController.userLogin);

export default usersRouter;
