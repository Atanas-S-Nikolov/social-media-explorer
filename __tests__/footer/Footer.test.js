import { cleanup, render, screen } from "@testing-library/react";

import Footer from "@components/footer/Footer.tsx";

afterEach(cleanup);

describe("Footer test", () => {
  it("Should render copyright text", () => {
    const CURRENT_YEAR = new Date().getFullYear();
    render(<Footer/>);

    const copyrightText = screen.getByText(`© ${CURRENT_YEAR} social media explorer. all rights reserved.`,{ exact: false });

    expect(copyrightText).toBeInTheDocument();
  });

  it("Should render developer contacts links", () => {
    render(<Footer/>);

    const contactsSectionText = document.querySelector(".contacts_section_text").textContent;
    const facebookLink = document.querySelector(".facebook_link");
    const instagramLink = document.querySelector(".instagram_link");
    const linkedinLink = document.querySelector(".linkedin_link");
    const githubLink = document.querySelector(".github_link");
    const emailLink = document.querySelector(".email_link");

    expect(contactsSectionText).toMatch(/developer contacts:/i);
    expect(facebookLink).toBeInTheDocument();
    expect(instagramLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
    expect(githubLink).toBeInTheDocument();
    expect(emailLink).toBeInTheDocument();
  })
});
