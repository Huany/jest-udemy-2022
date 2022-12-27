const lodash = require("lodash");

test("repeat", () => {
  expect(lodash.repeat("A", 5)).toBe("BBB");
});

test("isEmpty", () => {
  expect(lodash.isEmpty([])).toBe(true);
});
