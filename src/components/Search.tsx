import React, { useState, useEffect } from "react";
import "./MainPage.css";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../store/reducer";
import { useDebounce } from "../utils/customHooks";
import { filterData } from "../store/actions";

const Search = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: IState) => state.data);

  const [searchTerm, setSearchTerm] = useState("");

  //Part of debounce, actually better suited if you're making an api call
  //In this case, we're just filtering an existing array
  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(filterData(data, searchTerm, dispatch));
    }
  }, [debouncedSearchTerm]);

  return (
    <span>
      <input
        type="text"
        value={searchTerm}
        placeholder="Country"
        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
          setSearchTerm(ev.target.value)
        }
      />
      {searchTerm ? (
        <span className={"FilterClear"} onClick={(): void => setSearchTerm("")}>
          &times;
        </span>
      ) : null}
    </span>
  );
};

export default Search;
