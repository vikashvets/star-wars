import {
    Flex,
    IconButton,
    NumberInputField,
    NumberInput,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Text,
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

    const formInvalid = !inputPage || inputPage < 0 || inputPage > pagesCount

    return (
        <Flex alignItems={'flex-end'} justifyContent={'flex-start'} flexFlow={'column'} minHeight={'62px'}>
            <Flex alignItems={'center'}>
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
            <form style={{display: 'flex'}} onSubmit={(event) => {
                onPaginationClick(`/people/?page=${inputPage}`);
                event.preventDefault();
            }}>
            <NumberInput
                defaultValue={1}
                max={pagesCount}
                min={1}
                onChange={(value) => setInputPage(+value)}
                maxWidth={100}
                colorScheme='white'
                aria-label={'pageInput'}
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
                isDisabled={formInvalid}
                variant={'outline'}
                type={'submit'}
            />
            </form>
        </Flex>
            {formInvalid && <Text color={'red'} fontSize={'xs'} marginTop={1}>
                {`Type a number from 1 to ${pagesCount}`}
            </Text>}
        </Flex>);
}
