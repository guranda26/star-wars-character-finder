import axios from "axios";
import { SWAPIResponse } from "../interfaces/ResponseInterface";
import { Character } from "../interfaces/CharacterInterface";

const fetchData = async (
  searchQuery = "",
  page = 1,
  setState: (state: {
    data: Character[];
    searchQuery: string;
    currentPage: number;
    totalPages: number;
  }) => void,
) => {
  try {
    const trimmedSearchQuery = searchQuery.trim();
    const response = await axios.get<SWAPIResponse<Character>>(
      "https://swapi.dev/api/people/",
      {
        params: {
          search: trimmedSearchQuery,
          page: page,
        },
      },
    );

    setState({
      data: response.data.results,
      searchQuery: trimmedSearchQuery,
      currentPage: page,
      totalPages: Math.ceil(response.data.count / 10),
    });

    localStorage.setItem("searchQuery", trimmedSearchQuery);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default fetchData;
