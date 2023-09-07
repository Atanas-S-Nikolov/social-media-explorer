import { cleanup, render, screen } from "@testing-library/react";

import IconButton from "@components/utils/IconButton.tsx";

import { svgIconMock } from "../../__mocks__/svgIconMock";

afterEach(cleanup);

describe('IconButton test', () => {
  it('Should render IconButton with icon', () => {
    render(<IconButton icon={svgIconMock}/>);

    const icon = screen.getByRole('icon-mock');

    expect(icon).toBeInTheDocument();
  })

  it('Should render IconButton with default variant square', () => {
    render(<IconButton/>);

    const iconButton = document.querySelector('.icon_btn');

    expect(iconButton).toHaveStyle('border-radius: 0');
  })

  it('Should render IconButton with variant circle', () => {
    render(<IconButton variant='circle'/>);

    const iconButton = document.querySelector('.icon_btn');

    expect(iconButton).toHaveStyle('border-radius: 100%');
  })
})
