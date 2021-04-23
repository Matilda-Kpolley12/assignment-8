const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

//  styling method
chai.should();

// middleware
chai.use(chaiHttp);

describe("testing Post Controller", () => {
  describe("GET All Post", () => {
    it("Should return all posts", (done) => {
      chai
        .request(server)
        .get("/posts")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          // res.body.should.have.a("post")

          done();
        });
    });

    it("Should return all posts", (done) => {
      chai
        .request(server)
        .get("/posts")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          // res.body.should.have.a("post")

          done();
        });
    });
  });

  describe("GET single post", () => {
    it("Should return single post", (done) => {
      const postId = "606c542cb4084e2534ceb316";
      chai
        .request(server)
        .get(`/posts/${postId}`)
        .end((err, res) => {
          res.should.status(404);
          res.body.should.be.an("object");

          done();
        });
    });

    it("Should return single post", (done) => {
      const postId = "606c542cb4084e2534c";
      chai
        .request(server)
        .get(`/posts/${postId}`)
        .end((err, res) => {
          res.should.have.status(500);

          done();
        });
    });
  });

  describe("UPDATE single post", () => {
    it("Should Update a post", (done) => {
      const postId = "606c542cb4084e2534ceb316";
      const body = {
        content: "First Post Content",
      };

      chai
        .request(server)
        .patch(`/posts/${postId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");

          done();
        });
    });
  });
});
