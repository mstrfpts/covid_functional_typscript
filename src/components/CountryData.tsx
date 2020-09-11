import { useDispatch, useSelector } from "react-redux";
import { IState } from "../store/reducer";

export const updateCountryData = (countryClicked: string) => {
  const data = useSelector((state: IState) => state.data);
  const dispatch = useDispatch();
  let countriesDataArray = data;
  let selectedCountryData = countriesDataArray.find((element: any) => {
    if (element.country) {
      return element.country === countryClicked;
    }
  });

  /*this.setState({
    countrySelected: {
      country: countryClicked,
      countryData: selectedCountryData,
    },
  });*/
};
