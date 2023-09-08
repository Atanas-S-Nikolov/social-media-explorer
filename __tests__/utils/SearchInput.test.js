import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import SearchInput from "@components/utils/SearchInput.tsx";

import { resizeScreen } from "../../__mocks__/testUtils";

afterEach(cleanup);

describe('SearchInput test', () => {
  it("Should render searchInput correctly", () => {
    render(<SearchInput/>);

    const selectBtn = document.querySelector('.select_btn');
    const input = screen.getByPlaceholderText(/enter youtube username/i);
    const searchBtn = document.querySelector('.search_btn');

    expect(selectBtn).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  })

  it("Should open collapse when select button is clicked", () => {
    render(<SearchInput/>);

    const selectBtn = document.querySelector('.select_btn');
    fireEvent.click(selectBtn);
    const selectCollapse = document.querySelector('.search_collapse');

    expect(selectCollapse).toBeInTheDocument();
  })

  it("Should close collapse when select button is clicked twice", () => {
    render(<SearchInput/>);

    const selectBtn = document.querySelector('.select_btn');
    fireEvent.click(selectBtn);
    fireEvent.click(selectBtn);
    const selectCollapse = document.querySelector('.search_collapse');

    expect(selectCollapse).not.toBeInTheDocument();
  })

  it("Should change platform to Youtube when youtube button is clicked", () => {
    render(<SearchInput/>);

    const selectBtn = document.querySelector('.select_btn');
    fireEvent.click(selectBtn);
    const collapsePlatformButton = screen.getByText(/youtube/i, { selector: '.search_collapse button' });
    fireEvent.click(collapsePlatformButton);
    const input = screen.getByPlaceholderText(/enter youtube username/i);
    const searchBtn = document.querySelector('.search_btn');

    expect(input).toBeInTheDocument();
    expect(searchBtn).toHaveClass('youtube_bg');
  })

  it("Should change platform to Facebook when facebook button is clicked", () => {
    render(<SearchInput/>);

    const selectBtn = document.querySelector('.select_btn');
    fireEvent.click(selectBtn);
    const collapsePlatformButton = screen.getByText(/facebook/i, { selector: '.search_collapse button' });
    fireEvent.click(collapsePlatformButton);
    const input = screen.getByPlaceholderText(/enter facebook username/i);
    const searchBtn = document.querySelector('.search_btn');

    expect(input).toBeInTheDocument();
    expect(searchBtn).toHaveClass('facebook_bg');
  })

  it("Should change platform to Instagram when instagram button is clicked", () => {
    resizeScreen(800);
    render(<SearchInput/>);

    const selectBtn = document.querySelector('.select_btn');
    fireEvent.click(selectBtn);
    const collapsePlatformButton = screen.getByText(/instagram/i, { selector: '.search_collapse button' });
    fireEvent.click(collapsePlatformButton);
    const input = screen.getByPlaceholderText(/enter instagram id/i);
    const searchBtn = document.querySelector('.search_btn');

    expect(input).toBeInTheDocument();
    expect(searchBtn).toHaveClass('instagram_bg');
  })

  it("Should change searchButton backgronud-color to mobile when instagram button is clicked", () => {
    resizeScreen(400);
    render(<SearchInput/>);

    const selectBtn = document.querySelector('.select_btn');
    fireEvent.click(selectBtn);
    const collapsePlatformButton = screen.getByText(/instagram/i, { selector: '.search_collapse button' });
    fireEvent.click(collapsePlatformButton);
    const searchBtn = document.querySelector('.search_btn');

    expect(searchBtn).toHaveClass('instagram_mob_bg');
  })
})
