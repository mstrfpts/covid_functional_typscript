import React, { useState, useEffect } from "react";
import "./MainPage.css";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../store/reducer";
import { useDebounce } from "../utils/customHooks";
import { filterData, updateSearchTerm } from "../store/actions";

const Search = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: IState) => state.data);
  const storeSearchTerm = useSelector((state: IState) => state.searchTerm);

  const [searchTerm, setSearchTerm] = useState(storeSearchTerm);

  //Part of debounce, actually better suited if you're making an api call
  //In this case, we're just filtering an existing array
  /*const debouncedSearchTerm = useDebounce(searchTerm, 200);

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(filterData(data, searchTerm));
    }
  }, [debouncedSearchTerm]);
*/
  const changeHandler = (value: string) => {
    setSearchTerm(value);
    dispatch(updateSearchTerm(value));
  };

  return (
    <span>
      <input
        type="text"
        value={storeSearchTerm}
        placeholder="Country"
        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
          changeHandler(ev.target.value)
        }
      />
      {searchTerm ? (
        <span className={"FilterClear"} onClick={(): void => changeHandler("")}>
          &times;
        </span>
      ) : null}
    </span>
  );
};

export default Search;
