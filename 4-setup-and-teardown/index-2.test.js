let cities = [];

function initializeCityDatabase() {
  return new Promise((resolve) => {
    setTimeout(() => {
      cities.push("San Juan");
      cities.push("Vienna");
      resolve();
    }, 100);
  });
}

function clearCityDatabase() {
  return new Promise((resolve) => {
    setTimeout(() => {
      cities = [];
      resolve();
    }, 100);
  });
}

function isCity(name) {
  return cities.includes(name);
}

//executa 1x antes de todos os testes
beforeAll(() => {
  return initializeCityDatabase();
});

//executa 1x depois de todos os testes
afterAll(() => {
  return clearCityDatabase();
});

test("city database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});

test("city database has San Juan", () => {
  expect(isCity("San Juan")).toBeTruthy();
});

test("has 2 cities", () => {
  expect(cities.length).toBe(2);
});
