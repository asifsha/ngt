import React from "react";
import { JsonConverter } from "./JsonConverter";
import { ToastProvider } from "react-toast-notifications";

import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

it("renders correctly", () => {
  const jCon = shallow(
    <ToastProvider>
      <JsonConverter />
    </ToastProvider>
  );
  expect(jCon).toMatchSnapshot();
});
