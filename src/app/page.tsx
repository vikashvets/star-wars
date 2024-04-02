"use client"
import {Box, ChakraProvider, Container, Text} from '@chakra-ui/react'
import React, {useEffect, useState} from "react";
import {ReactFlowProvider} from "reactflow";
import {getCharacterList} from "@/api/starWarsApi";
import InfoBanner from "@/app/_components/InfoBanner";
import {Character} from "@/app/_interfaces/Character";
import {PaginationData} from "@/app/_interfaces/PaginationData";
import Pagination from "@/app/_components/Pagination";
import CharacterDetails from "@/app/_components/CharacterDetails";
import CharacterList from "@/app/_components/CharacterList";

export default function Home() {
  const [characterList, setCharacterList] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character|null>(null);

  const onCharacterClick = (value: Character) => {
      setSelectedCharacter(value)
  };

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
          <ReactFlowProvider>
              <InfoBanner/>
              <Container maxW="1440px">
                  <Text align={'center'} marginBottom={50} marginTop={50} fontWeight={'600'} size={'5xl'} >
                      Heroes of Star Wars saga and their characteristics
                  </Text>
                  <CharacterList onCharacterClick={onCharacterClick} charactersInfo={characterList} />
              </Container>
              <CharacterDetails
                  selectedCharacterInfo={selectedCharacter}
                  onClose={() => setSelectedCharacter(null)}
              />
              <Box bg='#292e2b' w='100%' p={4} paddingBottom={0} color='white'>
                  <Pagination
                      pagination={pagination}
                      onPaginationClick={onPaginationClick
                  }/>
              </Box>
          </ReactFlowProvider>
      </ChakraProvider>
  );
}
