const lodash = jest.requireActual("lodash");

lodash.repeat = () => {
  return "BBB";
};

module.exports = lodash;
