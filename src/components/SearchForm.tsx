import { ChangeEvent, FormEvent, useState } from "react";

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
      />
      <button type="submit">Search</button>
      <button
        type="button"
        data-testid="throw-error-button"
        onClick={handleThrowError}
      >
        Throw Error
      </button>
    </form>
  );
};

export default SearchForm;
