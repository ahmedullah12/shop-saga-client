import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const sidePages = 2;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let startPage = Math.max(2, currentPage - sidePages);
      let endPage = Math.min(totalPages - 1, currentPage + sidePages);

      if (currentPage <= sidePages + 1) {
        endPage = maxVisiblePages - 1;
      }

      if (currentPage >= totalPages - sidePages) {
        startPage = totalPages - (maxVisiblePages - 1);
      }

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 text-sm rounded-md border transition-colors duration-200 
          ${
            currentPage === 1
              ? "text-gray-400 border-gray-200"
              : "text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
      >
        Previous
      </button>

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="px-4 py-2 text-sm text-gray-700"
          >
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => handlePageChange(page as number)}
            className={`px-4 py-2 text-sm rounded-md border transition-colors duration-200
              ${
                currentPage === page
                  ? "bg-primary text-white border-primary"
                  : "text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 text-sm rounded-md border transition-colors duration-200 
          ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-200"
              : "text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
