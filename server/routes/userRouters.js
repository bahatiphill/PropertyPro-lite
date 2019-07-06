import express from "express";

const usersRouter = express.Router();

//user sign up
usersRouter.get("/auth/signup", (req, res) => {});

// user sign in
usersRouter.get("/auth/signin", (req, res) => {});

export default usersRouter;
