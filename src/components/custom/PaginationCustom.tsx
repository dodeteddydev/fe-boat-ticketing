import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

type PaginationCustomProps = {
  page?: number;
  totalPage?: number;
  onChangePage: (page: number) => void;
};

export const PaginationCustom = ({
  page,
  totalPage,
  onChangePage,
}: PaginationCustomProps) => {
  const [startPage, setStartPage] = useState(1);
  const visibleRange = 3;

  const handleEllipsisClick = () => {
    const nextStartPage = startPage + visibleRange;
    onChangePage(nextStartPage);
    if (nextStartPage <= totalPage!) {
      setStartPage(nextStartPage);
    }
  };

  const handlePreviousEllipsisClick = () => {
    const prevStartPage = startPage - visibleRange;
    onChangePage(prevStartPage);
    if (prevStartPage >= 1) {
      setStartPage(prevStartPage);
    }
  };

  return (
    <Pagination className="mt-5">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem
          className={page! > 1 ? "cursor-pointer" : "cursor-not-allowed"}
        >
          <PaginationPrevious
            onClick={() => {
              if (page! > 1) {
                onChangePage(page! - 1);
              }
              if (page! > 1 && page! === startPage) {
                handlePreviousEllipsisClick();
              }
            }}
          />
        </PaginationItem>

        {/* Visible Pages */}
        {Array.from(
          { length: Math.min(visibleRange, totalPage! - startPage + 1) },
          (_, index) => startPage + index
        ).map((item) => (
          <PaginationItem key={item} className="cursor-pointer">
            <PaginationLink
              onClick={() => onChangePage(item)}
              isActive={item === page!}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next Ellipsis */}
        {startPage + visibleRange <= totalPage! && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next Button */}
        <PaginationItem
          className={
            page! < totalPage! ? "cursor-pointer" : "cursor-not-allowed"
          }
        >
          <PaginationNext
            onClick={() => {
              if (page! < totalPage!) {
                onChangePage(page! + 1);
              }
              if (page! < totalPage! && page! === startPage + 2) {
                setStartPage(startPage + 1);
                handleEllipsisClick();
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
