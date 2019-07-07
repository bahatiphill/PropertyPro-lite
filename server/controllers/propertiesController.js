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
      status: "sucess",
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

  //POST property
  static addProperty(req, res) {
    const validationSchema = Joi.object().keys({
      owner: Joi.number()
        .integer()
        .required(),
      price: Joi.number().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      address: Joi.string().required(),
      type: Joi.string().required()
    });

    console.log(req.body);

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
    const { owner, price, state, city, address, type } = req.body;
    // console.log(req.body);

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
}

export default PropertyController;
