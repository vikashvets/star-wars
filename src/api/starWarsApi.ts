import axios from 'axios';
import {ApiResponse} from "@/app/_interfaces/ApiResponse";
import {Character} from "@/app/_interfaces/Character";
import {Film} from "@/app/_interfaces/Film";
import {Starship} from "@/app/_interfaces/Starship";

const baseURL: string | undefined = process.env.NEXT_PUBLIC_API;

const axiosInstance = axios.create({
  baseURL,
});

export const getCharacterList = (url?: string | null) => axiosInstance.get<ApiResponse<Character>>(url || '/people');
export const getFilmsByCharacter = (id: number) => axiosInstance.get<ApiResponse<Film>>(`films?characters=${id}`);
export const getShipsByFilmsAndPilot = (films: number[], pilotId: number) => axiosInstance.get<ApiResponse<Starship>>(`starships?films__in==${films.join()}&pilots=${pilotId}`);
