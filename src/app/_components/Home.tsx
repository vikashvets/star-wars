"use client"
import React, {useEffect, useState} from "react";
import {getCharacterList} from "@/api/starWarsApi";
import InfoBanner from "@/app/_components/InfoBanner";
import {Character} from "@/app/_interfaces/Character";
import {PaginationData} from "@/app/_interfaces/PaginationData";
import Pagination from "@/app/_components/Pagination";
import CharacterDetails from "@/app/_components/CharacterDetails";
import CharacterList from "@/app/_components/CharacterList";
import getCurrentPageFromUrl from "@/utils/getCurrentPageFromUrl";

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
            const currentPage = getCurrentPageFromUrl(url);
            setPagination({
                totalItems: res.data.count,
                nextPageUrl: res.data.next,
                previousPageUrl: res.data.previous,
                currentPage: currentPage
            });
        })
    }

    return (
        <>
            <InfoBanner/>
            <CharacterList onCharacterClick={onCharacterClick} charactersInfo={characterList}/>
            <CharacterDetails
                selectedCharacterInfo={selectedCharacter}
                onClose={() => setSelectedCharacter(null)}
            />
                <Pagination
                    pagination={pagination}
                    onPaginationClick={onPaginationClick}
                />
        </>);
}
