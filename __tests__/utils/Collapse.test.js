import { cleanup, render, screen } from "@testing-library/react";

import Collapse from '@components/utils/Collapse.tsx';

import { childMock } from "../../__mocks__/childMock";

afterEach(cleanup);

describe('Collapse test', () => {
  it('Should render collapse', () => {
    render(<Collapse open/>);

    const collapse = document.querySelector('.collapse');

    expect(collapse).toBeInTheDocument();
  })

  it('Should not render collapse', () => {
    render(<Collapse/>);

    const collapse = document.querySelector('.collapse');

    expect(collapse).not.toBeInTheDocument();
  })

  it('Should render collapse children', () => {
    render(<Collapse open>{childMock}</Collapse>);

    const children = screen.getByRole('child-mock');

    expect(children).toBeInTheDocument();
  })
})
