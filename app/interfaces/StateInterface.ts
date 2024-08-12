import { Character } from "./CharacterInterface";

export interface State {
  data: Character[];
  searchQuery: string;
  currentPage: number;
  totalPages: number;
}
