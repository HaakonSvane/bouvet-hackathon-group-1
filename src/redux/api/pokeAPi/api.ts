import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Pokemon } from "./types";

export const pokeApi = createApi({
    reducerPath: "API_pokeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://pokeapi.co/api/v2/`
  }),

  endpoints: (builder) => ({
    getPokemon: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonQuery } = pokeApi;
