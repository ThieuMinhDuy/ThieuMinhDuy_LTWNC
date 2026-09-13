import {useState} from "react";

function usePagination<T>(items: T[], itemsPerPage: number) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

    const gotoPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const nextPage = () => {
        gotoPage(currentPage + 1);
    };

    const prevPage = () => {
        gotoPage(currentPage - 1);
    };

    return {
    currentPage,
    totalPages,
    paginatedItems,
    gotoPage,
    nextPage,
    prevPage
};
}

export default usePagination;