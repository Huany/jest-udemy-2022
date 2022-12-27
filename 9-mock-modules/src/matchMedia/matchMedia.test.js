import "./matchMedia.mock";

describe("myMethod()", () => {
  test("window.matchMedia", () => {
    expect(window.matchMedia).toBeDefined();
  });
});
