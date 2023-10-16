const request = require("supertest");
const app = require("../app");

describe("login test", () => {
  test("code - 200", async () => {
    const requestBody = {
      email: "qwe@qwe.com",
      password: "123456",
    };
    const response = await request(app).post("/api/users/login").send(requestBody);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: {
          email: expect.any(String),
          subscription: expect.any(String),
        },
      })
    );
  }, 30000)
});