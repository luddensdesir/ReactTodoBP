import React from "react";
import Component, {decVal, incVal} from "./List";
import {expect} from "chai";

it(`${Component.name} renders without crashing`, () => {
  shallow(<Component />);
});