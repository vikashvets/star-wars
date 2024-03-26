import {Character} from "@/app/_interfaces/Character";

export interface CharactersResponse {
    count: number,
    next?: string,
    previous?: string,
    results: Character[]
}