import React, { SetStateAction, useCallback, useMemo } from "react";
import theme from "theme";

import styled from "styled-components";

import Button from "./Button";
import Typography from "./Typography";

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItemsCount: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItemsCount,
  itemsPerPage,
  setCurrentPage,
}) => {
  console.log(totalItemsCount);
  const totalPages = useMemo(
    () => Math.ceil(totalItemsCount / itemsPerPage) - 1,
    [totalItemsCount, itemsPerPage]
  );

  const handleNextPage = useCallback(() => {
    if (currentPage === totalPages) {
      return;
    }

    setCurrentPage(currentPage + 1);
  }, [totalPages, currentPage]);
  const handlePrevPage = useCallback(() => {
    if (currentPage === 0) {
      return;
    }

    setCurrentPage(currentPage - 1);
  }, [currentPage]);

  return (
    <SPagination>
      <SPaginationContainer>
        <Button
          onClick={handlePrevPage}
          hoverBackground={theme.colors.transparent}
        >
          <Typography hoverColor={theme.colors.blue}>
            Предыдущая страница
          </Typography>
        </Button>
        <Button
          onClick={handleNextPage}
          hoverBackground={theme.colors.transparent}
        >
          <Typography hoverColor={theme.colors.blue}>
            Следующая страница
          </Typography>
        </Button>
      </SPaginationContainer>
    </SPagination>
  );
};

const SPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const SPaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Pagination;
