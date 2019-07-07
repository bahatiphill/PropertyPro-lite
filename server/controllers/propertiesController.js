import properties from "../model/property";

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
}

export default PropertyController;
