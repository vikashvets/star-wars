import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Text,
    Grid,
    Flex, useMediaQuery, TableContainer, Table, Thead, Tr, Th, Tbody, Td
} from '@chakra-ui/react';
import {Character} from "@/app/_interfaces/Character";
import {CharacterProperty} from "@/app/_types/CharacterProperty";
import React from "react";

interface Props  {
    charactersInfo: Character[],
    onCharacterClick: (character: Character) => void
}
export default function CharacterList({charactersInfo, onCharacterClick}: Props) {
    const [mobileView] = useMediaQuery('(max-width: 1100px)');

    const propsToDisplay: Array<CharacterProperty> = ["name", "height", "mass", "hair_color","skin_color", "eye_color", "birth_year", "gender"];
    const hoverStyle = { backgroundColor: '#efefef', transition: '.4s', cursor: 'pointer'}

    const characterTile = <Grid
        templateColumns={'repeat(auto-fill, minmax(250px, 1fr))'}
        gap={5}
        padding={4}
    >
        {charactersInfo.map((characterInfo: Character) => (<Card
            key={characterInfo.name}
            borderRadius={'10px'}
            border={'1px solid black'}
            _hover={hoverStyle}
            onClick={() => onCharacterClick(characterInfo)}
            data-testid={'character-card'}
        >
            <CardHeader>
                <Heading size='md'>{characterInfo.name}</Heading>
            </CardHeader>
            <CardBody paddingTop={0} >
                <Grid
                    templateColumns={'repeat(auto-fill, minmax(100px, 1fr))'}
                    gap={2}
                    padding={2}
                >
                    {propsToDisplay.filter(prop => prop !== "name").map((item: CharacterProperty) => (
                        <Flex key={item} alignItems={'center'}>
                            <Text fontWeight={'600'} textTransform={'capitalize'} key={item} pt='2' fontSize='xs'>
                                {`${item.replace('_', ' ')}:`}
                            </Text>
                            <Text paddingLeft={1} pt='2' fontSize='xs' fontWeight={'200'}>
                                { characterInfo[item]}
                            </Text>
                        </Flex>
                    ))}
                </Grid>
            </CardBody>
        </Card>))}
    </Grid>

    const characterTable = <TableContainer marginBottom={100} paddingLeft={8} paddingRight={8} >
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
                    <Tr key={character.name}  _hover={hoverStyle} onClick={() => onCharacterClick(character)}>
                        {propsToDisplay.map((item: CharacterProperty) => (
                            <Td key={item}>{character[item]}</Td>
                        ))}
                    </Tr>
                ))}
            </Tbody>
        </Table>
    </TableContainer>;


    return (mobileView ? characterTile : characterTable);
}
