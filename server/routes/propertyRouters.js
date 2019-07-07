import express from "express";
import PropertyController from "../controllers/propertiesController";

const propertiesRouter = express.Router();

//get all properties
propertiesRouter.get("/", PropertyController.viewAllProperties);

//post property
propertiesRouter.post("/property", (req, res) => {});

//get one property
propertiesRouter.get("/property/:id", PropertyController.viewSpecificProperty);

//patch property
propertiesRouter.patch("/property/:id", (req, res) => {});

//delete property
propertiesRouter.delete("/property/:id", (req, res) => {});

export default propertiesRouter;
