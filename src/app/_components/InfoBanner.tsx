import {
    Text,
    Center,
    Flex
} from '@chakra-ui/react'
import Image from 'next/image';

export default function InfoBanner() {

    return (
        <Flex>
            <Center
                width={'100%'}
                minHeight={'540px'}
                backgroundColor={'#292e2b'}
                padding={4}
                backgroundImage={"url('/millennium-falcon.png')"}
                height={'100%'}
                color={'white'}
                backgroundRepeat={'no-repeat'}
                backgroundPosition={'center'}
            >
                    <Flex flexDirection={'column'}>
                        <Center>
                            <Image
                                src="star-wars-logo.svg"
                                width={200}
                                height={100}
                                alt="Star Wars logo"
                            />
                        </Center>
                        <Center>
                            <Text fontSize={'lg'} fontStyle={'italic'}>&quot;May the Force be with you&quot;</Text>
                        </Center>
                        <Center>
                            <Text textAlign='center' fontSize={'md'} paddingTop={6}>
                                On this page, you can learn more about heroes of beloved by many peoples saga. Explore and have fun!
                            </Text>
                        </Center>
                    </Flex>
                </Center>
        </Flex>
    );
}
