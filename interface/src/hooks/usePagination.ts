import { useState } from "react";

export function usePagination(data: any[], itemsPerPage: number) {

  const [page, setPage] = useState(1);

  const maxPage = Math.ceil(data.length / itemsPerPage);

  const currentData = () => {
      const start = (page - 1) * itemsPerPage;
      return data.slice(start, start + itemsPerPage);
  };

  return { page, setPage, maxPage, currentData };
}