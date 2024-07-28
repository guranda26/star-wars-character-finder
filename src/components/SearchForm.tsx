import { ChangeEvent, FormEvent, useState } from "react";
import { useTheme } from "../context/useTheme";

interface Props {
  searchQuery: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
  throwError: () => void;
}

const SearchForm: React.FC<Props> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}) => {
  const [hasError, setHasError] = useState(false);
  const { isDarkMode } = useTheme();
  const handleThrowError = () => {
    setHasError(true);
  };

  const resetError = () => {
    setHasError(false);
  };

  if (hasError) {
    return (
      <div>
        <h1>Something went wrong.</h1>
        <button onClick={resetError}>Reload Page</button>
      </div>
    );
  }

  return (
    <form data-testid="search-form" onSubmit={onSearchSubmit}>
      <input
        type="text"
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search characters"
        className={`${isDarkMode ? "dark-input" : "light-input"}`}
      />
      <button
        type="submit"
        className={`${isDarkMode ? "dark-btn" : "light-btn"}`}
      >
        Search
      </button>
      <button
        type="button"
        data-testid="throw-error-button"
        onClick={handleThrowError}
        className={`${isDarkMode ? "dark-btn" : "light-btn"}`}
      >
        Throw Error
      </button>
    </form>
  );
};

export default SearchForm;
