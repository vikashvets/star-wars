import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Text,
    Grid,
    Flex
} from '@chakra-ui/react';
import {Character} from "@/app/_interfaces/Character";
import {CharacterProperty} from "@/app/_types/CharacterProperty";
import React from "react";

interface Props  {
    characterInfo: Character,
    onCharacterClick: (character: Character) => void
}
export default function CharacterCard({characterInfo, onCharacterClick}: Props) {
    const propsToDisplay: Array<CharacterProperty> = ["height", "mass", "hair_color","skin_color", "eye_color", "birth_year", "gender"];
    return (
        <Card
            borderRadius={'10px'}
            border={'1px solid black'}
            _hover={{ backgroundColor: '#efefef', transition: '.4s', cursor: 'pointer', padding: '8px'}}
            onClick={() => onCharacterClick(characterInfo)}
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
                {propsToDisplay.map((item: CharacterProperty) => (
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
        </Card>
    );
}
