import {render, screen} from "@testing-library/react";
import CharacterList from "@/app/_components/CharacterList";
import {useMediaQuery} from "@chakra-ui/react";
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

    beforeAll(() => {
        // Mocking method not implemented in jest jsdom
        // details: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation((query) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(), // Deprecated
                removeListener: jest.fn(), // Deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
    });

    const characters = [
        {
            "name": "Obi-Wan Kenobi",
            "height": "182",
            "mass": "77",
            "hair_color": "auburn, white",
            "skin_color": "fair",
            "eye_color": "blue-gray",
            "birth_year": "57BBY",
            "gender": "male",
            "homeworld": 20,
            "films": [
                1,
                2,
                3,
                4,
                5,
                6
            ],
            "species": [
                1
            ],
            "vehicles": [
                38
            ],
            "starships": [
                48,
                59,
                64,
                65,
                74
            ],
            "created": "2014-12-10T16:16:29.192000Z",
            "edited": "2014-12-20T21:17:50.325000Z",
            "url": "https://sw-api.starnavi.io/people/10/"
        },
        {
            "name": "Wilhuff Tarkin",
            "height": "180",
            "mass": "unknown",
            "hair_color": "auburn, grey",
            "skin_color": "fair",
            "eye_color": "blue",
            "birth_year": "64BBY",
            "gender": "male",
            "homeworld": 21,
            "films": [
                1,
                6
            ],
            "species": [
                1
            ],
            "vehicles": [],
            "starships": [],
            "created": "2014-12-10T16:26:56.138000Z",
            "edited": "2014-12-20T21:17:50.330000Z",
            "url": "https://sw-api.starnavi.io/people/12/"
        },
        {
            "name": "Chewbacca",
            "height": "228",
            "mass": "112",
            "hair_color": "brown",
            "skin_color": "unknown",
            "eye_color": "blue",
            "birth_year": "200BBY",
            "gender": "male",
            "homeworld": 14,
            "films": [
                1,
                2,
                3,
                6
            ],
            "species": [
                3
            ],
            "vehicles": [
                19
            ],
            "starships": [
                10,
                22
            ],
            "created": "2014-12-10T16:42:45.066000Z",
            "edited": "2014-12-20T21:17:50.332000Z",
            "url": "https://sw-api.starnavi.io/people/13/"
        },
    ];
    const onCharacterClick = jest.fn();

    it("should render table with 3 rows and 8 columns for desktop view", () => {
        useMediaQueryMock.mockImplementation(() => [false]);
        render(<CharacterList onCharacterClick={onCharacterClick} charactersInfo={characters}/>);
        const table = screen.getByRole("table");
        expect(table).toBeTruthy();
        expect(screen.getAllByRole("row").length).toBe(4); // 3 rows + header
        expect(screen.getAllByRole("columnheader").length).toBe(8);
    });

    it("should render table with 3 cards for mobile view", () => {
        useMediaQueryMock.mockImplementation(() => [true]);
        render(<CharacterList onCharacterClick={onCharacterClick} charactersInfo={characters}/>);
        expect(screen.getAllByTestId('character-card').length).toBe(3);
    });

    it("should call onCharacterClick on table row click", () => {
        useMediaQueryMock.mockImplementation(() => [true]);
        render(<CharacterList onCharacterClick={onCharacterClick} charactersInfo={characters}/>);
        screen.getAllByTestId('character-card')[0].click();
        expect(onCharacterClick).toHaveBeenCalledWith(characters[0]);
    });

    it("should call onCharacterClick card click", () => {
        useMediaQueryMock.mockImplementation(() => [false]);
        render(<CharacterList onCharacterClick={onCharacterClick} charactersInfo={characters}/>);
        screen.getAllByRole("row")[1].click(); // skip header row
        expect(onCharacterClick).toHaveBeenCalledWith(characters[0]);
    });

});