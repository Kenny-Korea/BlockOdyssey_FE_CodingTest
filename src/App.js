import { useEffect, useState } from "react";
import Header from "./components/Header";
import ProductFilter from "./components/ProductFilter";
import Table from "./components/Table";
import "./styles.scss";

const App = () => {
  const [rawData, setRawData] = useState([]);
  const [urlParam, setUrlParam] = useState(""); // url이 바뀔 때마다 Table 컴포넌트 useEffect를 trigger
  const [filteredData, setFilteredData] = useState([]);

  // fetching rawData
  useEffect(() => {
    let url = "https://dummyjson.com/products?limit=100";
    fetch(url, { method: "get" })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRawData(data.products);
      })
      .catch((err) => {
        console.log("failed" + err);
      });
  }, []);

  return (
    <>
      <Header setUrlParam={setUrlParam} />
      <div className="App">
        <ProductFilter setUrlParam={setUrlParam} />
        검색된 데이터 : {filteredData.length}건
        <Table
          rawData={rawData}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
          urlParam={urlParam}
          setUrlParam={setUrlParam}
        />
      </div>
    </>
  );
};

export default App;
