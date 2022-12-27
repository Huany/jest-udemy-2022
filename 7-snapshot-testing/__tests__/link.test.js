// Copyright 2004-present Facebook. All Rights Reserved.

"use strict";

import renderer from "react-test-renderer";
import Link from "../Link";

it("renders correctly", () => {
  const tree = renderer
    .create(<Link page="http://www.facebook.com">Facebook</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
