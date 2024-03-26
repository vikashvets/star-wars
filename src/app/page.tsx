"use client"
import CharacterCard from "@/app/_components/CharacterCard";
import {ChakraProvider, Container, Grid, GridItem} from '@chakra-ui/react'
import {useEffect, useState} from "react";
import {getCharacterList} from "@/api/starWarsApi";
import InfoBannerCard from "@/app/_components/InfoBannerCard";
import {Character} from "@/app/_interfaces/Character";

export default function Home() {
  const [characterList, setCharacterList] = useState<Character[]>([]);

  useEffect(() => {
    getCharacterList().then((res) => {
      setCharacterList(res.data.results);
    })
  }, []);

  return (
      <ChakraProvider>
          <Container maxW="1440px" >
        <Grid
            h='100vh'
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
      </ChakraProvider>
  );
}
