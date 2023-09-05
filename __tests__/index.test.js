import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../src/app/page.tsx";

describe('Home headings', () => {
  it('renders headings', () => {
    render(<Home/>);

    const primaryHeading = screen.getByText('Social Media Explorer');
    const secondaryHeading = screen.getByText('Explore and analyze Social Media Accounts');

    expect(primaryHeading).toBeInTheDocument();
    expect(secondaryHeading).toBeInTheDocument();
  })
})
