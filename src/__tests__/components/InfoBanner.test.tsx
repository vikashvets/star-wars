import { render, screen } from "@testing-library/react";
import InfoBanner from "@/app/_components/InfoBanner";

describe("InfoBanner", () => {
    it("renders a title, subtitle and logo with alt", () => {
        render(<InfoBanner />);
        const subtitle = screen.getByText("On this page, you can learn more about heroes of beloved by many peoples saga. Explore and have fun!");
        const title = screen.getByText("\"May the Force be with you\"");
        const logo = screen.getByAltText('Star Wars logo');
        expect(title).toBeTruthy();
        expect(subtitle).toBeTruthy()
        expect(logo).toBeTruthy();
    });
});