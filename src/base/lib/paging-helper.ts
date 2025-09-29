function getSkipNumber(page: number, rows: number): number {
  if (page == 1) return 0;
  return page * rows - rows;
}

function getNumberOfPagesLeft(
  currentPage: number,
  rowsPerPage: number,
  totalItems: number,
): number {
  const numbers = Math.ceil(totalItems / rowsPerPage - currentPage);
  return numbers <= 0 ? 0 : numbers;
}

function getNumberOfTotalPages(
  rowsPerPage: number,
  totalItems: number,
): number {
  return Math.ceil(totalItems / rowsPerPage);
}

function getPreviousPage(page: number): number {
  return page - 1;
}

function getNextPage(page: number, totalPages: number) {
  if (page !== totalPages) return page + 1;
  return 0;
}

function getPagingObject(
  data: any[],
  count: number,
  page: number,
  rows: number,
) {
  const previousPage = getPreviousPage(page);
  const totalPages = getNumberOfTotalPages(rows, count);
  const pagesLeft = getNumberOfPagesLeft(page, rows, count);
  const nextPage = getNextPage(
    Number(page),
    getNumberOfTotalPages(rows, count),
  );

  return {
    data,
    count,
    previousPage,
    nextPage,
    pagesLeft,
    totalPages,
  };
}

export { getSkipNumber, getPagingObject };
