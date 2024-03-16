const request = require("supertest");
const app = require("../app");
const { User } = require("../models/index");
const Token = require("../helpers/jwt");

let token;
beforeAll(async () => {
  let user = await User.bulkCreate(
    [
      {
        email: "admin@mail.com",
        password: "admins",
        address: "DKI Jakarta",
      },
    ],
    {
      individualHooks: true,
    }
  );
  token = Token.genToken({ id: user[0].id });
});

describe("POST /login", () => {
  test("login success", async () => {
    const dummyData = {
      email: "admin@mail.com",
      password: "admins",
    };
    const response = await request(app).post("/login").send(dummyData);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Success Login");
    expect(response.body).toHaveProperty("newToken", expect.any(String));
  });
  test("login no Email", async () => {
    const dummyData = {
      email: "",
      password: "admins",
    };
    const response = await request(app).post("/login").send(dummyData);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email is required");
  });
  test("login no Password", async () => {
    const dummyData = {
      email: "admin@mail.com",
      password: "",
    };
    const response = await request(app).post("/login").send(dummyData);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Password is required");
  });
  test("login wrong email", async () => {
    const dummyData = {
      email: "adminss@mail.com",
      password: "admins",
    };
    const response = await request(app).post("/login").send(dummyData);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Email/Password");
  });
  test("login wrong Password", async () => {
    const dummyData = {
      email: "admin@mail.com",
      password: "adminsss",
    };
    const response = await request(app).post("/login").send(dummyData);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Email/Password");
  });
});

describe("POST /register", () => {
  test("success register", async () => {
    const dummyData = {
      email: "test1@mail.com",
      password: "tes123",
      address: "DKI Jakarta",
    };
    const response = await request(app).post("/register").send(dummyData);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("role", "Staff");
    expect(response.body).toHaveProperty("email", dummyData.email);
    expect(response.body).toHaveProperty("phoneNumber", dummyData.phoneNumber);
    expect(response.body).toHaveProperty("password", "");
    expect(response.body).toHaveProperty("address", dummyData.address);
  });
  test("empty Email", async () => {
    const dummyData = {
      password: "tes123",
      address: "DKI Jakarta",
    };
    const response = await request(app).post("/register").send(dummyData);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toEqual(
      expect.arrayContaining(["Email is required"])
    );
  });
  test("empty Password", async () => {
    const dummyData = {
      email: "test1@mail.com",
      address: "DKI Jakarta",
    };
    const response = await request(app).post("/register").send(dummyData);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toEqual(
      expect.arrayContaining(["Password is required"])
    );
  });
  test("Empty String Email", async () => {
    const dummyData = {
      email: "",
      password: "tes123",
      address: "DKI Jakarta",
    };
    const response = await request(app).post("/register").send(dummyData);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toEqual(
      expect.arrayContaining(["Email is required"])
    );
  });
  test("empty Password", async () => {
    const dummyData = {
      email: "test1@mail.com",
      password: "",
      address: "DKI Jakarta",
    };
    const response = await request(app).post("/register").send(dummyData);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toEqual(
      expect.arrayContaining(["Password is required"])
    );
  });
  test("Unique Email", async () => {
    const dummyData = {
      email: "admin@mail.com",
      password: "admins",
      address: "DKI Jakarta",
    };
    const response = await request(app).post("/register").send(dummyData);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toEqual(
      expect.arrayContaining(["email must be unique"])
    );
  });
  test("Format is not email", async () => {
    const dummyData = {
      email: "admin",
      password: "admins",
      address: "DKI Jakarta",
    };
    const response = await request(app).post("/register").send(dummyData);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toEqual(
      expect.arrayContaining(["Only email format is allowed"])
    );
  });
});

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
});
