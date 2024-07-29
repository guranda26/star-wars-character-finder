import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import Pagination from "../components/Pagination";
import CharacterData from "../components/CharacterData";
import { fetchData } from "../utils";
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

interface FetchDataResponse {
  data: Character[];
  totalPages: number;
}

const StarWarsComponent: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { page } = useParams<{ page: string }>();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Character[]>([]);
  const [searchQuery, setSearchQuery] = useSearchQuery();
  const [currentPage, setCurrentPage] = useState<number>(
    page ? parseInt(page) : 1,
  );
  const [totalPages, setTotalPages] = useState<number>(1);
  const navigate = useNavigate();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items,
  );

  useEffect(() => {
    if (page) {
      setCurrentPage(parseInt(page));
    }
  }, [page]);

  useEffect(() => {
    setLoading(true);
    fetchData(searchQuery, currentPage, (newData: FetchDataResponse) => {
      setData(newData.data);
      setTotalPages(newData.totalPages);
      setLoading(false);
    });
    navigate(`/${currentPage}`);
  }, [searchQuery, currentPage, navigate]);

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
    fetchData(searchQuery, 1, (newData: FetchDataResponse) => {
      setData(newData.data);
      setTotalPages(newData.totalPages);
    });
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
            data={data}
            loading={loading}
            onCharacterClick={handleCharacterClick}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        {/* <div className="selected-items-section details-section">
          <h2>Selected Items</h2>
          {Object.keys(selectedItems).length === 0 && <p>No items selected.</p>}
          {Object.entries(selectedItems).map(([name, character]) => (
            <div key={name}>
              <h3>{character.name}</h3>
              <p>Height: {character.height}</p>
              <p>Mass: {character.mass}</p>
              <button onClick={() => dispatch(unselectItem(name))}>
                Remove
              </button>
            </div>
          ))}
        </div> */}
        {Object.keys(selectedItems).length > 0 && <Flyout />}{" "}
        {/* Conditionally render Flyout */}
      </div>
    </div>
  );
};

export default StarWarsComponent;
