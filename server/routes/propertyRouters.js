import express from "express";
import PropertyController from "../controllers/propertiesController";
import multiparty from "connect-multiparty";
import auth from "../middleware/auth";

const multipartyMiddleware = multiparty();

const propertiesRouter = express.Router();

//get all properties
propertiesRouter.get("/", PropertyController.viewAllProperties);

//post property
propertiesRouter.post(
  "/property",
  multipartyMiddleware,
  auth,
  PropertyController.addProperty
);

//get one property
propertiesRouter.get("/property/:id", PropertyController.viewSpecificProperty);

//patch property
propertiesRouter.patch(
  "/property/:id",
  multipartyMiddleware,
  auth,
  PropertyController.updateProperty
);

//delete property
propertiesRouter.delete(
  "/property/:id",
  auth,
  PropertyController.deleteProperty
);

//Mark property as sold
propertiesRouter.patch(
  "/property/:id/sold",
  auth,
  PropertyController.markPropertyAsSold
);

//filter properties by type
propertiesRouter.get("/properties", PropertyController.filterByPropertyType);

export default propertiesRouter;
