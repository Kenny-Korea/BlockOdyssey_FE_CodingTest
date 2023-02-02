import { useRef, useState, useEffect } from "react";

// action="https://dummyjson.com/products?limit=100"

const Pagination = ({ setUrlParam, filteredData }) => {
  const [currentRowCount, setCurrentRowCount] = useState(10);
  const [currentPageValue, setCurrentPageValue] = useState(1);
  const [pages, setPages] = useState([1]);
  const selectRef = useRef();

  const urlSearchParams = new URLSearchParams(window.location.search);
  const page = urlSearchParams.get("page")
    ? parseInt(urlSearchParams.get("page"))
    : 1;

  useEffect(() => {
    const rowCount = urlSearchParams.get("rows")
      ? urlSearchParams.get("rows")
      : currentRowCount;
    const pageValue = urlSearchParams.get("page")
      ? urlSearchParams.get("page")
      : currentPageValue;
    if (rowCount) setCurrentRowCount(parseInt(rowCount));
    if (pageValue) setCurrentPageValue(parseInt(pageValue));

    const numberOfPage = Math.ceil(filteredData.length / rowCount);
    let array = [];
    for (let i = 0; i < numberOfPage; i++) {
      array.push(i + 1);
    }
    if (array.length === 0) {
      setPages([1]);
    } else {
      setPages(array);
    }
  }, [filteredData]); // data filtering이 완료되면 useEffect 실행

  const changePageParam = () => {
    const newParam = "?" + urlSearchParams.toString();
    window.history.pushState({}, null, newParam);
    setUrlParam(window.location.href);
  };

  const onChangeRowCount = (e) => {
    setCurrentRowCount(selectRef.current.value);
    const count = e.target.value;
    urlSearchParams.set("rows", count);
    urlSearchParams.set("page", 1); // 조건이 변경되었을 때, 첫 번째 페이지로 이동하도록 함
    changePageParam();
  };

  const onClickPageValue = (e) => {
    const value = e.target.innerHTML;
    setCurrentPageValue(value);
    urlSearchParams.set("page", value);
    changePageParam();
  };

  const onClickPrevPage = () => {
    if (filteredData.length === 0 || page === 1) return;
    const prevPage = page - 1;
    urlSearchParams.set("page", prevPage);
    changePageParam();
  };

  const onClickNextPage = () => {
    if (filteredData.length === 0 || page === pages.length) return;
    const nextPage = page + 1;
    urlSearchParams.set("page", nextPage);
    changePageParam();
  };

  const onClickFirstPage = () => {
    if (filteredData.length === 0 || page === 1) return;
    urlSearchParams.set("page", 1);
    changePageParam();
  };

  const onClickLastPage = () => {
    if (filteredData.length === 0 || page === pages.length) return;
    urlSearchParams.set("page", pages.length);
    changePageParam();
  };

  return (
    <>
      <div className="Pagination">
        페이지 당 행
        <select
          name="rows"
          value={currentRowCount}
          ref={selectRef}
          onChange={onChangeRowCount}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <div onClick={onClickFirstPage}>|&lt;</div>
        <div onClick={onClickPrevPage}>&lt;</div>
        {pages?.map((item) => {
          return (
            <div
              onClick={onClickPageValue}
              key={item}
              className={currentPageValue === item ? "selected" : null}
            >
              {item}
            </div>
          );
        })}
        <div onClick={onClickNextPage}>&gt;</div>
        <div onClick={onClickLastPage}>&gt;|</div>
      </div>
    </>
  );
};

export default Pagination;
