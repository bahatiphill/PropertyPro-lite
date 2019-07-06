import properties from "../model/property";

class PropertyController {
  //View all properties
  static viewAllProperties(req, res) {
    return res.status(200).json({
      status: "sucess",
      data: properties
    });
  }
}

export default PropertyController;
