import React from "react";
import "./MainPage.css";

interface IProps {
  selectorValues: string[];
  defaultSortBy: string;
  changeHandler: any;
}

const SortBySelector = (props: IProps) => {
  const { selectorValues, defaultSortBy, changeHandler } = props;

  return (
    <span className={"SortList"}>
      <label>Sort by :</label>
      <select
        className={"graphDropdown"}
        id="sortList"
        onChange={(event: React.ChangeEvent<HTMLSelectElement>): void =>
          changeHandler(event.target.value)
        }
        defaultValue={defaultSortBy}
      >
        {selectorValues.map((value: string, index: number) => {
          return (
            <option key={index} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </span>
  );
};

export default SortBySelector;
