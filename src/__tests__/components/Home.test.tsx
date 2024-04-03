import {render, screen, waitFor} from "@testing-library/react";
import {getCharacterList} from "@/api/starWarsApi";
import {ReactFlowProvider} from "reactflow";
import {mockReactFlow} from "../../../reactFlowTest.setup";
import Home from "@/app/_components/Home";
import {charactersMock, filmsMock, shipsMock} from "../../../testMocks";
jest.mock("../../api/starWarsApi", () => {
    return {
        __esModule: true,
        getCharacterList: jest.fn(() => Promise.resolve({data: {results: charactersMock}})),
        getFilmsByCharacter: jest.fn(() => Promise.resolve({data: {results: filmsMock}})),
        getShipsByFilmsAndPilot: jest.fn(() => Promise.resolve({data: {results: shipsMock}})),
    };
});
describe("Home", () => {
    beforeEach(() => {
        mockReactFlow();
    });
    const renderHome = () => render(<ReactFlowProvider>
        <Home/>
    </ReactFlowProvider>);

    it("should call getCharacterList api", async () => {
        renderHome();
        await waitFor(() => {
            expect(getCharacterList).toHaveBeenCalled();
        });
    });

    it("should open details about character after click on it", async () => {
       renderHome();
        await waitFor(() => {
            screen.getAllByRole("row")[1].click();
        });
        expect(screen.getByText("Characters, filmography and starshipsgraphy")).toBeTruthy();
        expect(screen.getByText("Obi-Wan Kenobi")).toBeTruthy();
    });

    it("should close details about character after click on close", async () => {
        renderHome();
        await waitFor(() => {
            screen.getAllByRole("row")[1].click();
        });
        await waitFor(() => {
            screen.getByRole("button", {name: "Close"}).click();
        });
        await waitFor(() => {
            expect(screen.queryByText("Characters, filmography and starshipsgraphy")).toBeNull();
        });
    });
});