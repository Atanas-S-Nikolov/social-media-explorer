import { cleanup, fireEvent, render } from "@testing-library/react";

import Nav from "@components/nav/Nav.tsx";

import { resizeScreen } from "../../__mocks__/testUtils.js";

afterEach(cleanup);

describe("Nav test", () => {
  it("Should render nav layout", () => {
    resizeScreen(800);
    render(<Nav/>);

    const logoImg = document.querySelector(".logo");
    const navMenu = document.querySelector(".nav_menu");
    const platformsNavBtnText = document.querySelector(".nav_btn").textContent;
    const toggleMenuBtn = document.querySelector(".toggle_menu");
  
    expect(logoImg).toBeInTheDocument();
    expect(logoImg.getAttribute("src")).toMatch(/\/logo-gray.png/);
    expect(navMenu).not.toHaveClass("hidden_el");
    expect(platformsNavBtnText).toMatch(/platforms/i);
    expect(toggleMenuBtn).not.toBeInTheDocument();
  })

  it("Should render nav mobile layout", () => {
    resizeScreen(400);
    render(<Nav/>);

    const logoImg = document.querySelector(".logo");
    const navMenu = document.querySelector(".nav_menu");
    const toggleMenuBtn = document.querySelector(".toggle_menu");
  
    expect(logoImg).toBeInTheDocument();
    expect(logoImg.getAttribute("src")).toMatch(/\/mobile-logo-gray.png/);
    expect(navMenu).toHaveClass("hidden_el");
    expect(toggleMenuBtn).toBeInTheDocument();
  })

  it("Should not render platform collapse", () => {
    render(<Nav/>);

    const platformCollapse = document.querySelector(".platforms_collapse");
  
    expect(platformCollapse).not.toBeInTheDocument();
  })

  it("Should render platform collapse when platforms button is clicked", () => {
    render(<Nav/>);

    const platformsNavBtn = document.querySelector(".nav_btn")
    fireEvent.click(platformsNavBtn);
    const platformCollapse = document.querySelector(".platforms_collapse");
  
    expect(platformCollapse).toBeInTheDocument();
  })

  it("Should close platform collapse when platforms button is clicked twice", () => {
    render(<Nav/>);

    const platformsNavBtn = document.querySelector(".nav_btn")
    fireEvent.click(platformsNavBtn);
    fireEvent.click(platformsNavBtn);
    const platformCollapse = document.querySelector(".platforms_collapse");
  
    expect(platformCollapse).not.toBeInTheDocument();
  })

  it("Should open nav menu list when toggle menu button is clicked", () => {
    render(<Nav/>);

    const toggleMenuBtn = document.querySelector(".toggle_menu");
    fireEvent.click(toggleMenuBtn);
    const navMenu = document.querySelector(".nav_menu");

    expect(navMenu).not.toHaveClass("hidden_el");    
  })

  it("Should close nav menu list when toggle menu button is clicked twice", () => {
    render(<Nav/>);

    const toggleMenuBtn = document.querySelector(".toggle_menu");
    fireEvent.click(toggleMenuBtn);
    fireEvent.click(toggleMenuBtn);
    const navMenu = document.querySelector(".nav_menu");

    expect(navMenu).toHaveClass("hidden_el");    
  })
})
