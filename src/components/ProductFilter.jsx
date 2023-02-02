import { useRef, useState, useEffect } from "react";

const ProductFilter = ({ setUrlParam }) => {
  // 6번 페이지
  const [filterKey, setFilterKey] = useState("all");
  const [filterValue, setFilterValue] = useState("");
  const selectRef = useRef();
  const inputRef = useRef();

  const urlSearchParams = new URLSearchParams(window.location.search);
  let filter = urlSearchParams.get("filter")
    ? urlSearchParams.get("filter")
    : "";
  let value = urlSearchParams.get("value") ? urlSearchParams.get("value") : "";

  useEffect(() => {
    if (filter) setFilterKey(filter);
    if (value) setFilterValue(value);
  }, [filter, value]);

  const handleSelectValue = () => {
    setFilterKey(selectRef.current.value);
  };

  const handleInputValue = () => {
    setFilterValue(inputRef.current.value);
  };

  const onClickRefresh = () => {
    window.location.href = "http://localhost:3000/"; // API_BASE_URL
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    urlSearchParams.set("filter", filterKey);
    urlSearchParams.set("value", filterValue);
    urlSearchParams.set("page", 1); // 조건이 변경되었을 때, 첫 번째 페이지로 이동하도록 함
    let newParam = "?" + urlSearchParams.toString();
    window.history.pushState({}, null, newParam);
    setUrlParam(window.location.href);
  };

  return (
    <>
      <div className="ProductFilter">
        <div>상품검색</div>
        <div className="filterContainer">
          검색
          <form method="GET" onSubmit={handleSubmit}>
            <select
              name="filter"
              value={filterKey}
              ref={selectRef}
              onChange={handleSelectValue}
            >
              <option value="all">전체</option>
              <option value="title">상품명</option>
              <option value="brand">브랜드</option>
              <option value="description">상품내용</option>
            </select>
            <input
              type="text"
              name="value"
              value={filterValue}
              ref={inputRef}
              onChange={handleInputValue}
            />
            <button>검색</button>
          </form>
          <button onClick={onClickRefresh}>강력 새로고침</button>
        </div>
      </div>
    </>
  );
};

export default ProductFilter;
