import { Component, ChangeEvent, FormEvent } from "react";
import { State } from "../interfaces/StateInterface";
import SearchForm from "../components/SearchForm";
import Pagination from "../components/Pagination";
import CharacterData from "../components/CharacterData";
import { fetchData } from "../utils";

class StarWarsComponent extends Component<object, State> {
  state: State = {
    data: [],
    searchQuery: localStorage.getItem("searchQuery") || "",
    currentPage: 1,
    totalPages: 1,
  };

  componentDidMount() {
    fetchData(
      this.state.searchQuery,
      this.state.currentPage,
      this.setState.bind(this),
    );
  }

  handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchData(this.state.searchQuery, 1, this.setState.bind(this));
  };

  handlePageChange = (newPage: number) => {
    fetchData(this.state.searchQuery, newPage, this.setState.bind(this));
  };

  throwError = () => {
    throw new Error("Test error");
  };

  render() {
    const { data, searchQuery, currentPage, totalPages } = this.state;

    return (
      <div className="container">
        <div className="top-section">
          <SearchForm
            searchQuery={searchQuery}
            onSearchChange={this.handleSearchChange}
            onSearchSubmit={this.handleSearchSubmit}
            throwError={this.throwError}
          />
        </div>
        <div className="bottom-section">
          <CharacterData data={data} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default StarWarsComponent;
