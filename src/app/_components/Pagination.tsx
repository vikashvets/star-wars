import {
    Flex,
    IconButton,
    NumberInputField,
    NumberInput,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Text
} from '@chakra-ui/react'
import {ArrowForwardIcon, ArrowLeftIcon, ArrowRightIcon} from '@chakra-ui/icons';
import React, {useState} from "react";
import {PaginationData} from "@/app/_interfaces/PaginationData";

interface Props  {
    pagination: PaginationData,
    onPaginationClick: (url?: string | null) => void
}
export default function Pagination({pagination, onPaginationClick}: Props) {
    const pagesCount:number = Math.ceil(pagination.totalItems / 10);

    const [inputPage, setInputPage] = useState<number|null>(1);

    return (
        <Flex alignItems={'center'} justifyContent={'flex-end'}>
            <IconButton
                colorScheme='white'
                aria-label='Previous page'
                icon={<ArrowLeftIcon />}
                isDisabled={!pagination.previousPageUrl}
                onClick={() => {onPaginationClick(pagination.previousPageUrl)}}
            />
            <Text textAlign='center'>{`Page ${pagination.currentPage} of ${pagesCount}`}</Text>
            <IconButton
                colorScheme='white'
                aria-label='Next page'
                icon={<ArrowRightIcon />}
                isDisabled={!pagination.nextPageUrl}
                onClick={() => { onPaginationClick(pagination.nextPageUrl) }}
            />
            <NumberInput
                defaultValue={1}
                max={pagesCount}
                min={1}
                onChange={(value) => setInputPage(+value)}
                maxWidth={100}
                colorScheme='white'
            >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper color='white' />
                    <NumberDecrementStepper color='white'/>
                </NumberInputStepper>
            </NumberInput>
            <IconButton
                marginLeft={2}
                colorScheme='white'
                aria-label='Go to page'
                icon={<ArrowForwardIcon/>}
                onClick={() => onPaginationClick(`/people/?page=${inputPage}`)}
                disabled={!inputPage}
                variant={'outline'}
            />
        </Flex>);
}
