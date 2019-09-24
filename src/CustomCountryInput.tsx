import React, { useState } from "react";
import { AutoComplete } from "antd";

// const dataSource = ["Burns Bay Road", "Downing Street", "Wall Street"];

const CustomCountryInput = () => {
  const [dataSource, setDataSource] = useState([]);
  const getCountries = () => {
    let obj: any;
    fetch("https://restcountries.eu/rest/v2/all")
      .then(data => {
        return data.json();
      })
      .then(data => {
        obj = data.map((item: any) => item.name);
      })
      .then(() => {
        setDataSource(obj);
        return obj;
      });
  };
  getCountries();

  return (
    <div
      style={{
        width: 420,
        display: "flex",
        padding: 5,

        justifyContent: "flex-end"
      }}
    >
      <div
        style={{
          whiteSpace: "nowrap",
          marginRight: 10,
          paddingLeft: 10
        }}
      >
        {"Country   "}
      </div>

      <AutoComplete
        style={{
          borderRadius: 39,
          width: 200,
          justifyContent: "flex-end",
          fontSize: "calc(0px + 2vmin)"
        }}
        dataSource={dataSource}
        placeholder="Select Country"
        filterOption={(inputValue, option: any) =>
          option.props.children
            .toUpperCase()
            .indexOf(inputValue.toUpperCase()) !== -1
        }
      />
    </div>
  );
};
export default CustomCountryInput;
