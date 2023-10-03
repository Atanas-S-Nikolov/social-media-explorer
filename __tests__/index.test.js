import { screen } from "@testing-library/react";

import { render } from "../__mocks__/testUtils.js";

import Home from "../src/app/page.tsx";

describe('Home page test', () => {
  it('Should render headings and container', () => {
    render(<Home/>);

    const primaryHeading = screen.getByText(/social media explorer/i);
    const secondaryHeading = screen.getByText(/explore and analyze social media accounts/i);
    const container = document.querySelector('.container');

    expect(primaryHeading).toBeInTheDocument();
    expect(secondaryHeading).toBeInTheDocument();
    expect(container).toBeInTheDocument();
  })
})
