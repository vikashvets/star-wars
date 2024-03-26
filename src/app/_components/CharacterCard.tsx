import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Text,
    GridItem, Grid
} from '@chakra-ui/react';
import {Character} from "@/app/_interfaces/Character";
import {CharacterProperty} from "@/app/_types/CharacterProperty";

interface Props  {
    characterInfo: Character
}
export default function CharacterCard({characterInfo}: Props) {
    const propsToDisplay: Array<CharacterProperty> = ["height", "mass", "hair_color","skin_color", "eye_color", "birth_year", "gender"];
    return (
        <Card color={'white'} backgroundColor={'black'}>
            <CardHeader>
                <Heading size='md'>{characterInfo.name}</Heading>
            </CardHeader>
            <CardBody>
                    <Grid
                        templateColumns='repeat(2, 1fr)'
                        gap={2}
                    >
                        {propsToDisplay.map((item: CharacterProperty) => (
                            <GridItem colSpan={1}  key={item}>
                                <Text textTransform={'capitalize'} key={item} pt='2' fontSize='sm'>
                                    {`${item.replace('_', ' ')}: ${characterInfo[item]}`}
                                </Text>
                            </GridItem>
                        ))}
                    </Grid>
            </CardBody>
        </Card>
    );
}
