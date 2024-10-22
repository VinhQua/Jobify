import React from "react";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../features/allJobs/allJobsSlice";
const PageBtnContainer = () => {
  const { page, numOfPages } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();
  let pages = Array.from({ length: numOfPages }, (_, index) => index + 1);
  const handleNext = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    dispatch(changePage(newPage));
  };
  const handlePrev = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    dispatch(changePage(newPage));
  };
  const numOfPagesToShow = 2;
  return (
    <Wrapper>
      <button type="button" className="prev-btn" onClick={handlePrev}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        <button
          type="button"
          key={1}
          className={1 === page ? "pageBtn active" : "pageBtn"}
          onClick={() => dispatch(changePage(1))}
        >
          {1}
        </button>
        {page > numOfPagesToShow && (
          <button type="button" className="pageBtn">
            ...
          </button>
        )}
        {pages.map((pageNumber) => {
          if (
            pageNumber === page &&
            pageNumber > 1 &&
            pageNumber < pages.length
          ) {
            return (
              <button
                type="button"
                key={pageNumber}
                className={pageNumber === page ? "pageBtn active" : "pageBtn"}
                onClick={() => dispatch(changePage(pageNumber))}
              >
                {pageNumber}
              </button>
            );
          } else if (
            (pageNumber >= page - numOfPagesToShow &&
              pageNumber < page &&
              pageNumber > 1) ||
            (pageNumber <= page + numOfPagesToShow &&
              pageNumber > page &&
              pageNumber < pages.length)
          ) {
            return (
              <button
                type="button"
                key={pageNumber}
                className={pageNumber === page ? "pageBtn active" : "pageBtn"}
                onClick={() => dispatch(changePage(pageNumber))}
              >
                {pageNumber}
              </button>
            );
          }
        })}
        {page < pages.length - numOfPagesToShow && (
          <button type="button" className="pageBtn">
            ...
          </button>
        )}
        {pages.length > 2 && (
          <button
            type="button"
            key={pages.length}
            className={pages.length === page ? "pageBtn active" : "pageBtn"}
            onClick={() => dispatch(changePage(pages.length))}
          >
            {pages.length}
          </button>
        )}
      </div>

      <button type="button" className="next-btn" onClick={handleNext}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
