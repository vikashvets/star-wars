import {
    Card,
    CardBody,
    Text,
    GridItem,
    Center,
    Flex
} from '@chakra-ui/react'
import Image from 'next/image';

export default function InfoBannerCard() {

    return (
        <GridItem rowSpan={2} colSpan={1}>
            <Card backgroundColor={'#292e2b'} backgroundImage={"url('/millennium-falcon.png')"} height={'100%'}>
            <CardBody>
                <Center h='100%' color='white'>
                    <Flex flexDirection={'column'}>
                        <Center>
                            <Image
                                src="star-wars-logo.svg"
                                width={100}
                                height={50}
                                alt="Star Wars logo"
                            />
                        </Center>
                        <Center>
                            <Text fontSize={'md'} fontStyle={'italic'}>&quot;May the Force be with you&quot;</Text>
                        </Center>
                        <Center>
                            <Text textAlign='center' fontSize={'xs'} paddingTop={6}>
                                On this page you can learn more about heroes of beloved of many peoples saga. Investigate and have fun!
                            </Text>
                        </Center>
                    </Flex>
                </Center>
            </CardBody>
            </Card>
        </GridItem>
    );
}
