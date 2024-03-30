"use client"
import CharacterCard from "@/app/_components/CharacterCard";
import {Box, ChakraProvider, Container, Grid, Text, useMediaQuery} from '@chakra-ui/react'
import React, {useEffect, useState} from "react";
import {getCharacterList} from "@/api/starWarsApi";
import InfoBanner from "@/app/_components/InfoBanner";
import {Character} from "@/app/_interfaces/Character";
import {PaginationData} from "@/app/_interfaces/PaginationData";
import Pagination from "@/app/_components/Pagination";
import CharactersTable from "@/app/_components/CharactersTable";

export default function Home() {
  const [characterList, setCharacterList] = useState<Character[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
      totalItems: 0,
      nextPageUrl: null,
      previousPageUrl: null,
      currentPage: 1
  });

    const [mobileView] = useMediaQuery('(max-width: 1100px)');


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

    const getCharacterTile = () => characterList.map((item: Character) => (<CharacterCard key={item.name} characterInfo={item}/>))

  return (
      <ChakraProvider>
          <InfoBanner/>
          <Container maxW="1440px">
              <Text align={'center'} marginBottom={50} marginTop={50} fontWeight={'600'} size={'5xl'} >Heroes of Star Wars saga and their characteristics</Text>
              {mobileView ? <Grid
                  templateColumns={'repeat(auto-fill, minmax(250px, 1fr))'}
                  gap={5}
                  padding={4}
              >
                  {getCharacterTile()}
              </Grid> : <CharactersTable charactersInfo={characterList}/>}
          </Container>
          <Box bg='#292e2b' w='100%' p={4} color='white'>
              <Pagination pagination={pagination} onPaginationClick={onPaginationClick}></Pagination>
          </Box>
      </ChakraProvider>
  );
}
