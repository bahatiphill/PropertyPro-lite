import chai from "chai";
import chaiHttp from "chai-http";

import app from "../index";
import properties from "../model/property";

chai.use(chaiHttp);
const should = chai.should();

describe("Test all property endpoints", () => {
  describe("Test GET / ", () => {
    it("It should GET all properties", done => {
      chai
        .request(app)
        .get("/api/v1")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("status").eql(200);
          res.body.should.have.property("data").eql(properties);
          done();
        });
    });
  });

  describe("Test GET /property/<id>", () => {
    it("It should GET a specific property by ID", done => {
      chai
        .request(app)
        .get("/api/v1/property/1")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("status").eql(200);
          res.body.should.have.property("data").eql(properties[0]);
          done();
        });
      chai
        .request(app)
        .get("/api/v1/property/80")
        .end((err, res) => {
          res.body.should.have.status(404);
          res.body.should.be.a("object");
          res.body.should.have.property("status").eql(404);
          res.body.should.have.property("error").eql("Property not Found");
        });
    });
  });
});
