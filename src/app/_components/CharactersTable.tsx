import {TableContainer, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import {Character} from "@/app/_interfaces/Character";
import {CharacterProperty} from "@/app/_types/CharacterProperty";
import React from "react";

interface Props  {
    charactersInfo: Character[],
    onCharacterClick: (character: Character) => void
}
export default function CharactersTable({charactersInfo, onCharacterClick}: Props) {
    const propsToDisplay: Array<CharacterProperty> = ["name", "height", "mass", "hair_color","skin_color", "eye_color", "birth_year", "gender"];
    return (
        <TableContainer marginBottom={100} paddingLeft={8} paddingRight={8} >
            <Table variant='simple' colorScheme={'blackAlpha'}>
                <Thead>
                    <Tr>
                        {propsToDisplay.map((item: CharacterProperty) => (
                            <Th key={item}>{item.replace('_', ' ')}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {charactersInfo.map((character: Character) => (
                        <Tr key={character.name}  _hover={{ backgroundColor: '#efefef', transition: '.4s', cursor: 'pointer' }} onClick={() => onCharacterClick(character)}>
                            {propsToDisplay.map((item: CharacterProperty) => (
                                <Td key={item}>{character[item]}</Td>
                            ))}
                        </Tr>
                    ))}
                    <Tr>
                    </Tr>
            </Tbody>
            </Table>
        </TableContainer>
    );
}
