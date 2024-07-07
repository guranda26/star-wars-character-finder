import { ChangeEvent, Component, FormEvent } from "react";

interface Props {
  searchQuery: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
  throwError: () => void;
}

class SearchForm extends Component<Props> {
  render() {
    const { searchQuery, onSearchChange, onSearchSubmit, throwError } =
      this.props;
    return (
      <form onSubmit={onSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search characters"
        />
        <button type="submit">Search</button>
        <button type="button" onClick={throwError}>
          Throw Error
        </button>
      </form>
    );
  }
}

export default SearchForm;
