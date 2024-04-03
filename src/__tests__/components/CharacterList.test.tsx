import {render, screen} from "@testing-library/react";
import CharacterList from "@/app/_components/CharacterList";
import {useMediaQuery} from "@chakra-ui/react";
import {charactersMock} from "../testMocks";
jest.mock("@chakra-ui/react", () => {
    const originalModule = jest.requireActual("@chakra-ui/react");
    return {
        __esModule: true,
        ...originalModule,
        useMediaQuery: jest.fn()
    };
});
describe("CharacterList", () => {
    const useMediaQueryMock = useMediaQuery as jest.Mock;

    const onCharacterClick = jest.fn();

    it("should render character list header", () => {
        useMediaQueryMock.mockImplementation(() => [false]);
        render(<CharacterList onCharacterClick={onCharacterClick} charactersInfo={charactersMock}/>);
        const header = screen.getByText("Heroes of Star Wars saga and their characteristics")
        expect(header).toBeTruthy();
    });

    it("should render table with 3 rows and 8 columns for desktop view", () => {
        useMediaQueryMock.mockImplementation(() => [false]);
        render(<CharacterList onCharacterClick={onCharacterClick} charactersInfo={charactersMock}/>);
        const table = screen.getByRole("table");
        expect(table).toBeTruthy();
        expect(screen.getAllByRole("row").length).toBe(4); // 3 rows + header
        expect(screen.getAllByRole("columnheader").length).toBe(8);
    });

    it("should render table with 3 cards for mobile view", () => {
        useMediaQueryMock.mockImplementation(() => [true]);
        render(<CharacterList onCharacterClick={onCharacterClick} charactersInfo={charactersMock}/>);
        expect(screen.getAllByTestId('character-card').length).toBe(3);
    });

    it("should call onCharacterClick on table row click", () => {
        useMediaQueryMock.mockImplementation(() => [true]);
        render(<CharacterList onCharacterClick={onCharacterClick} charactersInfo={charactersMock}/>);
        screen.getAllByTestId('character-card')[0].click();
        expect(onCharacterClick).toHaveBeenCalledWith(charactersMock[0]);
    });

    it("should call onCharacterClick card click", () => {
        useMediaQueryMock.mockImplementation(() => [false]);
        render(<CharacterList onCharacterClick={onCharacterClick} charactersInfo={charactersMock}/>);
        screen.getAllByRole("row")[1].click(); // skip header row
        expect(onCharacterClick).toHaveBeenCalledWith(charactersMock[0]);
    });

});