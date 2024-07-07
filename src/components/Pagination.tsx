import { Component } from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

class Pagination extends Component<Props> {
  render() {
    const { currentPage, totalPages, onPageChange } = this.props;
    return (
      <div className="pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Pagination;
