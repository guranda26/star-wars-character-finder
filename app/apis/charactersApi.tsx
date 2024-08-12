import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Character } from "../../interfaces/CharacterInterface";
import { SWAPIResponse } from "../../interfaces/ResponseInterface";

export const charactersApi = createApi({
  reducerPath: "charactersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
  endpoints: (builder) => ({
    getCharacters: builder.query<
      SWAPIResponse<Character>,
      { searchQuery: string; page: number }
    >({
      query: ({ searchQuery, page }) => ({
        url: "people/",
        params: {
          search: searchQuery,
          page: page,
        },
      }),
    }),
  }),
});

export const { useGetCharactersQuery } = charactersApi;
