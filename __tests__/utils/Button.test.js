import { cleanup, render, screen } from "@testing-library/react";

import Button from "@components/utils/Button.tsx";

import { svgIconMock } from "../../__mocks__/svgIconMock";

afterEach(cleanup);

describe("Button test", () => {
  it("Should render button", () => {
    render(<Button/>);

    const button = document.querySelector(".btn");

    expect(button).toBeInTheDocument();
  });

  it("Should render button with text", () => {
    render(<Button text="test"/>);

    const buttonWithText = screen.getByText(/test/i);
    
    expect(buttonWithText).toBeInTheDocument();
  });

  it("Should render button with startIcon", () => {
    render(<Button startIcon={svgIconMock}/>);

    const buttonWithStartIcon = document.querySelector(".start_icon");
    const buttonWithEndIcon = document.querySelector(".end_icon");

    expect(buttonWithStartIcon).toBeInTheDocument();
    expect(buttonWithEndIcon).not.toBeInTheDocument();
  });

  it("Should render button with endIcon", () => {
    render(<Button endIcon={svgIconMock}/>);

    const buttonWithStartIcon = document.querySelector(".start_icon");
    const buttonWithEndIcon = document.querySelector(".end_icon");

    expect(buttonWithStartIcon).not.toBeInTheDocument();
    expect(buttonWithEndIcon).toBeInTheDocument();
  });
})
