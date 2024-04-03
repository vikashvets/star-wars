import {render, screen, waitFor} from "@testing-library/react";
import CharacterDetails from "@/app/_components/CharacterDetails";
import {getShipsByFilmsAndPilot, getFilmsByCharacter} from "@/api/starWarsApi";
import {ReactFlowProvider} from "reactflow";
import {mockReactFlow} from "../../../reactFlowTest.setup";
import {charactersMock, filmsMock, shipsMock} from "../../../testMocks";

jest.mock("../../api/starWarsApi", () => {
    return {
        __esModule: true,
        getFilmsByCharacter: jest.fn(() => Promise.resolve({data: {results: filmsMock}})),
        getShipsByFilmsAndPilot: jest.fn(() => Promise.resolve({data: {results: shipsMock}})),
    };
});
describe("CharacterDetails", () => {

    beforeEach(() => {
        mockReactFlow()
    });

    const selectedCharacter = charactersMock[0];

    const renderCharacterDetails = () => render(<ReactFlowProvider>
        <CharacterDetails selectedCharacterInfo={selectedCharacter} onClose={jest.fn}/>
    </ReactFlowProvider>);

    it("should render character details, react flow nodes and edges", async () => {
        renderCharacterDetails();

        await waitFor(() => {
            const characterName = screen.getByText("Obi-Wan Kenobi");
            expect(characterName).toBeTruthy();

            filmsMock.forEach(film => {
                expect(screen.getByText(film.title)).toBeTruthy();
            });

            shipsMock.forEach(ship => {
                expect(screen.getByText(ship.name)).toBeTruthy();
            });

            const edges = [
                'rf__edge-Obi-Wan Kenobi - A New Hope',
                'rf__edge-Obi-Wan Kenobi - The Empire Strikes Back',
                'rf__edge-Obi-Wan Kenobi - Return of the Jedi',
                'rf__edge-Obi-Wan Kenobi - The Phantom Menace',
                'rf__edge-Obi-Wan Kenobi - Attack of the Clones',
                'rf__edge-Obi-Wan Kenobi - Revenge of the Sith',

                'rf__edge-Revenge of the Sith - Jedi starfighter',
                'rf__edge-Revenge of the Sith - Trade Federation cruiser',
                'rf__edge-Revenge of the Sith - Naboo star skiff',
                'rf__edge-Revenge of the Sith - Jedi Interceptor',
                'rf__edge-Revenge of the Sith - Belbullab-22 starfighter',

                'rf__edge-Attack of the Clones - Jedi starfighter',
            ];

            edges.forEach(edge => {
                expect(screen.getByTestId(edge)).toBeTruthy();
            });
        });
    });

    it("should call getFilmsByCharacter and getShipsByFilmsAndPilot api", async () => {
        renderCharacterDetails();
        await waitFor(() =>{
            expect(getFilmsByCharacter).toHaveBeenCalledWith(10);
            expect(getShipsByFilmsAndPilot).toHaveBeenCalledWith([1, 2, 3, 4, 5, 6], 10);
        });
    });
});