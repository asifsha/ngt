// import React from 'react';
// //import { render } from '@testing-library/react';
// import App from './App';
// import renderer from 'react-test-renderer';

// // test('renders learn react link', () => {
// //   const { getByText } = render(<App />);
// //   const linkElement = getByText(/learn react/i);
// //   expect(linkElement).toBeInTheDocument();
// // });

// it('renders correctly', () => {
//   const app = renderer
//     .create(<App/>)
//     .toJSON();
//   expect(app).toMatchSnapshot();
// });

import React from "react";
import App from "./App";

import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

it("renders correctly", () => {
  const app = shallow(<App />);
  expect(app).toMatchSnapshot();
});

