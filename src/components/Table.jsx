import { useEffect, useRef } from "react";
import Pagination from "./Pagination";

const Table = ({
  rawData,
  filteredData,
  setFilteredData,
  urlParam,
  setUrlParam,
}) => {
  const tbodyRef = useRef();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const rows = urlSearchParams.get("rows") ? urlSearchParams.get("rows") : 10;
  const page = urlSearchParams.get("page") ? urlSearchParams.get("page") : 1;
  const filter = urlSearchParams.get("filter")?.toLowerCase();
  const value = urlSearchParams.get("value")?.toLowerCase();

  // 조건에 부합하는 데이터만 filteredData 배열 state에 담는 useEffect
  useEffect(() => {
    if (rawData.length === 0) return;
    let temp = [];
    rawData.forEach((data) => {
      if (!filter || value === "") {
        temp.push(data);
        return;
      }
      if (
        (filter === "all" && data.title.toLowerCase().includes(value)) ||
        (filter === "all" && data.brand.toLowerCase().includes(value)) ||
        (filter === "all" && data.description.toLowerCase().includes(value))
      ) {
        temp.push(data);
        return;
      }
      if (filter !== "all" && data[filter].toLowerCase().includes(value)) {
        temp.push(data);
        return;
      } else return;
    });
    setFilteredData([...temp]);
  }, [urlParam, rawData]);

  const dataFrame = (element) => {
    return (
      <tr key={element.id}>
        <td>{element.id}</td>
        <td>{element.title}</td>
        <td>{element.brand}</td>
        <td>{restrictTextLength(element.description, 40)}</td>
        <td>{element.price}</td>
        <td>{element.rating}</td>
        <td>{element.stock}</td>
      </tr>
    );
  };

  // text 길이가 maxValue를 넘어가면 이를 제한(ellipsis)하는 함수 선언
  const restrictTextLength = (text, maxValue) => {
    if (text.length < maxValue) return text;
    return text.substring(0, maxValue) + "...";
  };

  // 필터링 조건에 맞는 데이터만 반환하는 함수 선언
  // toLowerCase 메소드 사용하여, 대소문자 구분 없는 검색 가능
  const returnResultByPage = () => {
    if (filteredData.length === 0) return;
    const numberOfPage = Math.ceil(filteredData.length / rows);
    const array = [];
    for (let i = 0; i < numberOfPage; i++) {
      array.push(filteredData.slice(rows * (i + 1) - rows, rows * (i + 1)));
    }
    const result = array[page - 1].map((data) => {
      return dataFrame(data);
    });
    return result;
  };
  return (
    <>
      <div className="Table">
        <table>
          <thead>
            <tr>
              <td>상품번호</td>
              <td>상품명</td>
              <td>브랜드</td>
              <td>상품내용</td>
              <td>가격</td>
              <td>평점</td>
              <td>재고</td>
            </tr>
          </thead>
          <tbody ref={tbodyRef}>
            {filteredData.length !== 0 && returnResultByPage()}
          </tbody>
        </table>
        {filteredData.length === 0 && "조건에 맞는 상품이 없습니다."}
        <Pagination setUrlParam={setUrlParam} filteredData={filteredData} />
      </div>
    </>
  );
};

export default Table;
