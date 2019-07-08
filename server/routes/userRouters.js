import express from "express";
import UserController from "../controllers/usersControllers";

const usersRouter = express.Router();

//user sign up
usersRouter.post("/auth/signup", UserController.userSignUp);

// user sign in
usersRouter.post("/auth/signin", (req, res) => {});

export default usersRouter;
