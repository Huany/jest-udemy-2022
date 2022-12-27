const user = require("../user");
jest.mock("../user");

test("user mock data", () => {
  expect(user.name).toBe("Huany Mock");
});
