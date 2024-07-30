import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import Pagination from "../components/Pagination";
import CharacterData from "../components/CharacterData";
import { Character } from "../interfaces/CharacterInterface";
import useSearchQuery from "../hooks/useSearchQuery";
import {
  setItems,
  selectItem,
  unselectItem,
} from "../slices/selectedItemsSlice";
import { RootState } from "../store";
import "./StarWars.css";
import ThemeToggleButton from "../components/ThemeToggle";
import { useTheme } from "../context/useTheme";
import Flyout from "../components/Flyout";
import { useGetCharactersQuery } from "../services/apis/charactersApi";

const StarWarsComponent: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { page } = useParams<{ page: string }>();
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useSearchQuery();
  const [currentPage, setCurrentPage] = useState<number>(
    page ? parseInt(page) : 1,
  );
  const navigate = useNavigate();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items,
  );
  const { data: charactersData, isLoading } = useGetCharactersQuery({
    searchQuery,
    page: currentPage,
  });

  console.log(charactersData);

  useEffect(() => {
    if (page) {
      setCurrentPage(parseInt(page));
    }
  }, [page]);

  useEffect(() => {
    navigate(`/${currentPage}`);
  }, [currentPage, navigate]);

  useEffect(() => {
    console.log("Selected Items:", selectedItems);
    dispatch(setItems(selectedItems));
  }, [dispatch, selectedItems]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const throwError = () => {
    localStorage.removeItem("searchQuery");
    throw new Error("Test error");
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    navigate(`/${newPage}`);
  };

  const handleCharacterClick = (character: Character) => {
    if (selectedItems[character.name]) {
      dispatch(unselectItem(character.name));
    } else {
      dispatch(selectItem(character));
    }
    navigate(`/${currentPage}?details=1`);
  };

  return (
    <div className={`${isDarkMode ? "dark" : "light"}`}>
      <ThemeToggleButton />
      <div className={`container`}>
        <div className="top-section">
          <SearchForm
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
            throwError={throwError}
          />
        </div>
        <div className="bottom-section">
          <CharacterData
            data={charactersData?.results || []}
            loading={isLoading}
            onCharacterClick={handleCharacterClick}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil((charactersData?.count || 0) / 10) || 1}
            onPageChange={handlePageChange}
          />
        </div>
        {Object.keys(selectedItems).length > 0 && <Flyout />}{" "}
      </div>
    </div>
  );
};

export default StarWarsComponent;
