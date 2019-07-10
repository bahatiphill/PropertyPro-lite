import properties from "../model/property";
import Joi from "@hapi/joi";
import moment from "moment";
import cloudinary from "cloudinary";
require("dotenv").config();

//Cloud configuration
const { cloud_name, api_key, api_secret } = process.env;

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret
});

class PropertyController {
  //View all properties
  static viewAllProperties(req, res) {
    return res.status(200).json({
      status: res.statusCode,
      data: properties
    });
  }

  //Get property by id
  static viewSpecificProperty(req, res) {
    const propertId = req.params.id;
    const property = properties.find(item => item.id == propertId);
    if (property) {
      return res.status(200).json({
        status: res.statusCode,
        data: property
      });
    }
    return res.status(404).json({
      status: res.statusCode,
      error: "Property not Found"
    });
  }

  // Delete Property
  static deleteProperty(req, res) {
    const propertyId = req.params.id;
    const propertyIndex = properties.findIndex(item => item.id == propertyId);

    const property = properties.find(item => (item.id = propertyId));

    if (propertyIndex != -1) {
      properties.splice(propertyIndex, 1);
      return res.status(200).json({
        status: res.statusCode,
        message: "deleted Successfully"
      });
    }
    return res.status(404).json({
      status: res.statusCode,
      message: "Property not Found"
    });
  }

  //Update property
  static updateProperty(req, res) {
    const validationSchema = Joi.object().keys({
      owner: Joi.number()
        .integer()
        .min(1),
      price: Joi.number().min(3),
      state: Joi.string().min(2),
      city: Joi.string().min(2),
      address: Joi.string().min(2),
      type: Joi.string().min(3)
    });

    const { error: validationErrors } = Joi.validate(
      req.body,
      validationSchema,
      {
        abortEarly: false
      }
    );
    if (validationErrors) {
      const error = [];
      const { details: errors } = validationErrors;
      errors.forEach(item => {
        error.push(item.message.split('"').join(""));
      });
      return res.status(400).json({
        status: res.statusCode,
        error: error
      });
    }

    const propertId = req.params.id;
    const property = properties.find(item => item.id == propertId);
    if (property) {
      const updates = Object.keys(req.body);

      updates.forEach(update => {
        property[update] = req.body[update];
      });

      return res.status(200).json({
        status: res.statusCode,
        data: property
      });
    }
    return res.status(404).json({
      status: res.statusCode,
      error: "Property not Found"
    });
  }

  //POST property
  static addProperty(req, res) {
    const validationSchema = Joi.object().keys({
      price: Joi.number().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      address: Joi.string().required(),
      type: Joi.string().required()
    });

    const { error: validationErrors } = Joi.validate(
      req.body,
      validationSchema,
      {
        abortEarly: false
      }
    );
    if (validationErrors) {
      const error = [];
      const { details: errors } = validationErrors;
      errors.forEach(item => {
        error.push(item.message.split('"').join(""));
      });
      return res.status(400).json({
        status: res.statusCode,
        error: error
      });
    }
    const owner = req.user.id;
    const { price, state, city, address, type } = req.body;

    if (!req.files.image_url) {
      return res.status(400).json({
        status: res.statusCode,
        error: "You did not provide property image"
      });
    }

    const propertyImage = req.files.image_url.path;
    cloudinary.uploader.upload(propertyImage, (result, error) => {
      if (error) {
        return res.status(400).json({
          status: res.statusCode,
          error: error
        });
      }
      const property = {
        id: properties.length + 1,
        owner,
        status: "available",
        price,
        state,
        city,
        address,
        type,
        created_on: moment().format(),
        image_url: result.url
      };
      properties.push(property);
      return res.status(201).json({
        status: res.statusCode,
        data: property
      });
    });
  }

  //Mark as sold
  static markPropertyAsSold(req, res) {
    const property = properties.find(item => item.id == req.params.id);
    if (property) {
      property.status = "sold";

      return res.status(200).json({
        status: res.statusCode,
        data: property
      });
    }
    return res.status(404).json({
      status: res.statusCode,
      error: "Property not Found"
    });
  }

  static filterByPropertyType(req, res) {
    const type = req.query.type;

    const result = properties.filter(item => item.type == type);
    return res.status(200).json({
      status: res.statusCode,
      data: result
    });
  }
}

export default PropertyController;
