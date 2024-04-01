import 'reactflow/dist/style.css';
import { Box } from '@chakra-ui/react';
import {Character} from "@/app/_interfaces/Character";
import React, {useEffect, useState} from "react";
import {Film} from "@/app/_interfaces/Film";
import {getFilmsByCharacter, getShipsByFilmsAndPilot} from "@/api/starWarsApi";
import ReactFlow, {Controls, Background, Edge, Node} from 'reactflow';
import {Starship} from "@/app/_interfaces/Starship";
import {FlowConfig} from "@/app/_interfaces/FlowConfig";

interface Props  {
    selectedCharacterInfo: Character | null
}
export default function CharacterDetails({selectedCharacterInfo}: Props) {
    const [films, setFilms] = useState<Film[]>([]);
    const [ships, setShips] = useState<Starship[]>([]);

    const [flowConfig, setFlowConfig] = useState<FlowConfig>({nodes: [], edges: []});

    const getEntityId = (url: string) => {
        const parts =  url.split('/');
        return parseInt(parts[parts.length - 2]);
    }

    useEffect(() => {
        if(selectedCharacterInfo) {
            const characterId = getEntityId(selectedCharacterInfo.url);
            getFilmsByCharacter(characterId).then((filmResult) => {
                setFilms(filmResult.data.results);
            });
            getShipsByFilmsAndPilot(selectedCharacterInfo.films, characterId).then((shipResult) => {
                setShips(shipResult.data.results);
            });
        }
    }, [selectedCharacterInfo]);

    useEffect(() => {
        if(selectedCharacterInfo) {
            const filmNodes: Node[] = films.map((film, index) => ({
                id: film.title,
                data: { label: film.title },
                position: { x: index * 200, y: 200 },
            }));

            const filmEdges: Edge[] = filmNodes.map((node, index) => ({
                id: `${selectedCharacterInfo?.name} - ${node.id}`,
                source: selectedCharacterInfo?.name,
                target: node.id
            }));

            const characterNode: Node = {
                id: selectedCharacterInfo?.name,
                data: { label: selectedCharacterInfo?.name },
                position: { x: 0, y: 0 },
                type: 'input',
            };

            const shipNodes: Node[] = ships.map((ship, index) => ({
                id: ship.name,
                data: { label: ship.name },
                position: { x: index * 200, y: 500 },
            }));

            const shipEdges: Edge[] =[];

            films.forEach((film) => {
                ships.forEach((ship, index) => {
                    if(film.starships.includes(getEntityId(ship.url))) {
                        shipEdges.push({
                            id: `${film.title} - ${ship.name}`,
                            source: film.title,
                            target: ship.name
                        });
                    }
                });
            });

            setFlowConfig({nodes: [characterNode, ...filmNodes, ...shipNodes], edges: [...filmEdges, ...shipEdges]});
        }
    }, [films, selectedCharacterInfo, ships]);


    return (
        <Box height={'100vh'} width={'100%'}>
            {flowConfig && <ReactFlow nodes={flowConfig.nodes} edges={flowConfig.edges}>
                <Background/>
                <Controls/>
            </ReactFlow>}
        </Box>
    );
}