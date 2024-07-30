import { Character } from "../interfaces/CharacterInterface";

export const mockCharacter: Character = {
  name: "Luke Skywalker",
  height: "172",
  mass: "77",
  hair_color: "blond",
  skin_color: "fair",
  eye_color: "blue",
  birth_year: "19BBY",
  gender: "male",
  homeworld: "Tatooine",
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  created: "",
  edited: "",
  url: "",
};

export const mockCharacterResponse = {
  data: { results: [mockCharacter], count: 1 },
  isLoading: false,
};
