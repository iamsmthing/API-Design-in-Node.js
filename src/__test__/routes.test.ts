import app from "../server";
import supertest from "supertest";
//Integration testing
describe("GET /", () => {
  it("should send back some data", async () => {
    const res = await supertest(app).get("/");
    expect(res.body.message).toBe("success");
  });
});

describe("POST /user", () => {
  it("should send back:created", async () => {
    const res = await supertest(app)
      .post("/user")
      .send({ username: "testuser3", password: "admin" })
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
  });
});

describe("POST /signin", () => {
  it("should send back:signed in", async () => {
    const res = await supertest(app)
      .post("/signin")
      .send({ username: "shivam", password: "admin" })
      .set("Accept", "application/json");
    expect(res.body.message).toBe("You are Authorized");
  });
});

describe("GET /api/product", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI5ZWQ4MmQ1LTMyZWMtNGViYi05YmE2LTI3MDU2MDY3ZjUzYiIsInVzZXJuYW1lIjoiaXNoYSIsImlhdCI6MTY5MzEzNjU4MX0.IB96WhCIikupzqMkBicOVYbCK4SVCpYEAMpXhuB-eaE";
  it("should send back:signed in", async () => {
    const res = await supertest(app)
      .get("/api/product")
      .set("Authorization", `Bearer ${token}`);
    //   .set("Accept", "application/json");
    expect(res.body.message).toBe("success");
  });
});
