import axios from 'axios';
import {CharactersResponse} from "@/app/_interfaces/CharactersResponse";

const baseURL: string | undefined = process.env.NEXT_PUBLIC_API;

const axiosInstance = axios.create({
  ...(baseURL ? { baseURL } : {}),
});

export const getCharacterList = (url?:string | null) => axiosInstance.get<CharactersResponse>(url || '/people');
