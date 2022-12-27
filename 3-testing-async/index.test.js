function tetchData(callback) {
  setTimeout(() => {
    callback("peanut butter");
  }, 100);
}

function fetchDataPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("peanut butter");
    }, 100);
  });
}

function fetchDataPromiseWithError() {
  return new Promise((reject) => {
    setTimeout(() => {
      reject("error");
    }, 100);
  });
}

// nao fazer
// test("the data is peanut butter", (done) => {
//   function callback(data) {
//     expect(data).toBe("peanut butterr");
//   }

//   tetchData(callback);
// });

test("the data is peanut butter", (done) => {
  function callback(data) {
    expect(data).toBe("peanut butter");
    done();
  }

  tetchData(callback);
});

//quando usamos uma promessa (usa o then para quando resolver o teste)

//podemos fazer com return
test("the data is peanut butter", () => {
  return fetchDataPromise().then((data) => {
    expect(data).toBe("peanut butter");
  });
});
//ou podemos fazer com done
test("the data is peanut butter", (done) => {
  fetchDataPromise().then((data) => {
    expect(data).toBe("peanut butter");
    done();
  });
});

//aula #5 - 07:08s
test.skip("the fetch fails with an error", (done) => {
  expect.assertions(1);
  return fetchDataPromiseWithError().catch((e) => expect(e).toMatch("error"));
});

test("the data is peanut butter", async () => {
  await expect(fetchDataPromise()).resolves.toBe("peanut butter");
});

//aula #5 - 08:34s
test.skip("the fetch fails with an error", async () => {
  await expect(fetchDataPromiseWithError()).rejects.toMatch("error");
});

test("the data is peanut butter", async () => {
  const data = await fetchDataPromise();
  expect(data).toBe("peanut butter");
});

// aula #5 9:27s
test.skip("the fetch fails with an error", async () => {
  expect.assertions(1);
  try {
    await fetchDataPromiseWithError();
  } catch (e) {
    expect(e).toMatch("error");
  }
});

test("the data is peanut butter", async () => {
  await expect(fetchDataPromise()).resolves.toBe("peanut butter");
});

// aula #5 9:27s
test.skip("the fetch fails with an error", async () => {
  await expect(fetchDataPromiseWithError()).rejects.toMatch("error");
});
