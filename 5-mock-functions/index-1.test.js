function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

test("mockCallback", () => {
  const mockCallback = jest.fn((x) => 42 + x);
  forEach([0, 1], mockCallback);

  // The mock function is called twice
  expect(mockCallback.mock.calls.length).toBe(2);

  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});

test("this", () => {
  const myMock1 = jest.fn();
  const a = new myMock1();

  console.log("test 1", myMock1.mock.instances);
  // > [ <a> ]

  const myMock2 = jest.fn();
  const b = {};
  const bound = myMock2.bind(b);

  bound();
  console.log("test 2", myMock2.mock.contexts);
  // > [ <b> ]
});

test("", () => {
  const someMockFunction = jest.fn(() => "return value");
  someMockFunction("first arg", "second arg");

  // The function was called exactly once
  expect(someMockFunction.mock.calls.length).toBe(1);

  // The first arg of the first call to the function was 'first arg'
  expect(someMockFunction.mock.calls[0][0]).toBe("first arg");

  // The second arg of the first call to the function was 'second arg'
  expect(someMockFunction.mock.calls[0][1]).toBe("second arg");

  // The return value of the first call to the function was 'return value'
  expect(someMockFunction.mock.results[0].value).toBe("return value");

  // The function was called with a certain `this` context: the `element` object.
  // expect(someMockFunction.mock.contexts[0]).toBe(element); <--- skip

  const someMockConstructor = jest.fn();

  const a = new someMockConstructor();
  a.name = "test";
  const b = new someMockConstructor();

  // This function was instantiated exactly twice
  expect(someMockConstructor.mock.instances.length).toBe(2);

  // The object returned by the first instantiation of this function
  // had a `name` property whose value was set to 'test'
  // expect(someMockConstructor.mock.instances[0].name).toEqual("test");  <--- skip

  // The first argument of the last call to the function was 'test'
  // expect(someMockConstructor.mock.lastCall[0]).toBe("test");  <--- skip
});

test("returnValues", () => {
  const myMock = jest.fn();
  console.log(myMock());
  // > undefined

  myMock.mockReturnValueOnce(10).mockReturnValueOnce("x").mockReturnValue(true);

  console.log(myMock(), myMock(), myMock(), myMock());
  // > 10, 'x', true, true
});

test("filter", () => {
  const filterTestFn = jest.fn();

  // Make the mock return `true` for the first call,
  // and `false` for the second call
  filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

  const result = [11, 12].filter((num) => filterTestFn(num));

  console.log(result);
  // > [11]

  console.log(filterTestFn.mock.calls[0][0]); // 11
  console.log(filterTestFn.mock.calls[1][0]); // 12
});

test("Mock implementation", () => {
  const myMockFn = jest.fn((cb) => cb(null, true));

  myMockFn((err, val) => console.log(val));
  // > true
});

test("mockImplementationOnce", () => {
  const myMockFn = jest
    .fn()
    .mockImplementationOnce((cb) => cb(null, true))
    .mockImplementationOnce((cb) => cb(null, false));

  myMockFn((err, val) => console.log(val));
  // > true

  myMockFn((err, val) => console.log(val));
  // > false
});

test("mockImplementationOnce v2", () => {
  const myMockFn = jest
    .fn(() => "default")
    .mockImplementationOnce(() => "first call")
    .mockImplementationOnce(() => "second call");

  console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
  // > 'first call', 'second call', 'default', 'default'
});

test("mockImplementationOnce v2", () => {
  const myMockFn = jest
    .fn(() => "default")
    .mockImplementationOnce(() => "first call")
    .mockImplementationOnce(() => "second call");

  console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
  // > 'first call', 'second call', 'default', 'default'
});

test("return this", () => {
  const myObj = {
    myMethod: jest.fn().mockReturnThis(),
  };

  // is the same as

  const otherObj = {
    myMethod: jest.fn(function () {
      return this;
    }),
  };

  console.log(myObj.myMethod());
  console.log(otherObj.myMethod());
});

test("setName", () => {
  const myMockFn = jest
    .fn()
    .mockReturnValue("default")
    .mockImplementation((scalar) => 42 + scalar)
    .mockName("add42");

  // expect(myMockFn).toHaveBeenCalled();
});

test("custom metchers", () => {
  const mockFunc = jest.fn();

  const arg1 = "arg1";
  const arg2 = "arg2";

  mockFunc();
  mockFunc(arg1, arg2);
  mockFunc(arg1, arg2);

  // The mock function was called at least once
  expect(mockFunc).toHaveBeenCalled();

  // The mock function was called at least once with the specified args
  expect(mockFunc).toHaveBeenCalledWith(arg1, arg2);

  // The last call to the mock function was called with the specified args
  expect(mockFunc).toHaveBeenLastCalledWith(arg1, arg2);

  // All calls and the name of the mock is written as a snapshot
  expect(mockFunc).toMatchSnapshot();
});

test("common matchers", () => {
  const mockFunc = jest.fn().mockName("a mock name");

  const arg1 = 42;
  const arg2 = "arg2";

  mockFunc(arg1, arg2);
  mockFunc(arg1, arg2);
  mockFunc(arg1, arg2);

  // The mock function was called at least once
  expect(mockFunc.mock.calls.length).toBeGreaterThan(0);

  // The mock function was called at least once with the specified args
  expect(mockFunc.mock.calls).toContainEqual([arg1, arg2]);

  // The last call to the mock function was called with the specified args
  expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual([
    arg1,
    arg2,
  ]);

  // The first arg of the last call to the mock function was `42`
  // (note that there is no sugar helper for this specific of an assertion)
  expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe(42);

  // A snapshot will check that a mock was invoked the same number of times,
  // in the same order, with the same arguments. It will also assert on the name.
  expect(mockFunc.mock.calls).toEqual([
    [arg1, arg2],
    [arg1, arg2],
    [arg1, arg2],
  ]);

  expect(mockFunc.getMockName()).toBe("a mock name");
});

test("", () => {});
