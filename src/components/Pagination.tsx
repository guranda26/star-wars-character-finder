import { useTheme } from "../context/useTheme";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { isDarkMode } = useTheme();
  return (
    <div className="pagination" data-testid="pagination">
      <button
        data-testid="prev-button"
        className={`${isDarkMode ? "dark-btn" : "light-btn"}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        data-testid="next-button"
        className={`${isDarkMode ? "dark-btn" : "light-btn"}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
