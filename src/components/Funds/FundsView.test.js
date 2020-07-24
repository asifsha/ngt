import React from "react";
import { FundsView }  from "./FundsView";


import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

it("renders correctly", () => {
  const fundsView = shallow(<FundsView />);
  expect(fundsView).toMatchSnapshot();
});
