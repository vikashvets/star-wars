"use client"
import CharacterCard from "@/app/_components/CharacterCard";
import {Box, ChakraProvider, Container, Grid, GridItem} from '@chakra-ui/react'
import {useEffect, useState} from "react";
import {getCharacterList} from "@/api/starWarsApi";
import InfoBannerCard from "@/app/_components/InfoBannerCard";
import {Character} from "@/app/_interfaces/Character";
import {PaginationData} from "@/app/_interfaces/PaginationData";
import Pagination from "@/app/_components/Pagination";

export default function Home() {
  const [characterList, setCharacterList] = useState<Character[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
      totalItems: 0,
      nextPageUrl: null,
      previousPageUrl: null,
      currentPage: 1
  });


    useEffect(() => {
        onPaginationClick();
  }, []);

    const onPaginationClick = (url?: string | null) => {
        getCharacterList(url).then((res) => {
            setCharacterList(res.data.results);
            const currentPage = url ? parseInt(url.split('=')[1]) : 1;
            setPagination({
                totalItems: res.data.count,
                nextPageUrl: res.data.next,
                previousPageUrl: res.data.previous,
                currentPage: currentPage
            });
        })
    }

  return (
      <ChakraProvider>
          <Container maxW="1440px" height={'100vh'}>
            <Grid
                templateRows='repeat(4, 1fr)'
                templateColumns='repeat(3, 1fr)'
                gap={5}
                padding={4}
            >
              <InfoBannerCard/>
              {characterList.map((item: Character) => (<GridItem colSpan={1} key={item.name}>
                <CharacterCard characterInfo={item}/>
              </GridItem>
              ))}
            </Grid>
          </Container>
          <Box bg='#292e2b' w='100%' p={4} color='white' position={"fixed"} bottom={0}>
              <Pagination pagination={pagination} onPaginationClick={onPaginationClick}></Pagination>
          </Box>
      </ChakraProvider>
  );
}
