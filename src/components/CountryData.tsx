import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isModifier } from "typescript";
import { IState } from "../store/reducer";
import { formattedDate } from "../utils/DateUtils";

/*export const updateCountryData = (countryClicked: string) => {
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
//};

export const getDailyCount = (
  countrySelectedHistoricalData: any,
  countrySelectedData: any,
  daysOfData: number
) => {
  console.log("derd, get daily count", countrySelectedHistoricalData);
  let historicalDataDailyCount: any = { cases: {}, deaths: {}, recovered: {} };
  let historicalDataDailyCasesCalculated,
    historicalDataDailyDeathsCalculated,
    historicalDataDailyRecoveredCasesCalculated;
  let historicalDataDailyCasesKeys = Object.keys(
    countrySelectedHistoricalData.cases
  );

  let historicalDataDailyDeathsKeys = Object.keys(
    countrySelectedHistoricalData.deaths
  );

  let historicalDataDailyRecoveredCasesKeys = Object.keys(
    countrySelectedHistoricalData.recovered
  );

  let historicalDataCasesValues: number[] = Object.values(
    countrySelectedHistoricalData.cases
  );
  let historicalDataDeathsValues: number[] = Object.values(
    countrySelectedHistoricalData.deaths
  );
  let historicalDataRecoveredCasesValues: number[] = Object.values(
    countrySelectedHistoricalData.recovered
  );

  for (let i = 0; i < historicalDataCasesValues.length - 1; i++) {
    if (historicalDataCasesValues[i + 1] - historicalDataCasesValues[i] < 0) {
      historicalDataDailyCasesCalculated = historicalDataCasesValues[i - 1]
        ? historicalDataCasesValues[i] - historicalDataCasesValues[i - 1]
        : 0;
    } else {
      historicalDataDailyCasesCalculated =
        historicalDataCasesValues[i + 1] - historicalDataCasesValues[i];
    }

    historicalDataDailyCount.cases[
      historicalDataDailyCasesKeys[i + 1]
    ] = historicalDataDailyCasesCalculated;
  }

  for (let i = 0; i < historicalDataDeathsValues.length - 1; i++) {
    if (historicalDataDeathsValues[i + 1] - historicalDataDeathsValues[i] < 0) {
      historicalDataDailyDeathsCalculated = historicalDataDeathsValues[i - 1]
        ? historicalDataDeathsValues[i] - historicalDataDeathsValues[i - 1]
        : 0;
    } else {
      historicalDataDailyDeathsCalculated =
        historicalDataDeathsValues[i + 1] - historicalDataDeathsValues[i];
    }

    historicalDataDailyCount.deaths[
      historicalDataDailyDeathsKeys[i + 1]
    ] = historicalDataDailyDeathsCalculated;
  }

  for (let i = 0; i < historicalDataRecoveredCasesValues.length - 1; i++) {
    if (
      historicalDataRecoveredCasesValues[i + 1] -
        historicalDataRecoveredCasesValues[i] <
      0
    ) {
      historicalDataDailyRecoveredCasesCalculated = historicalDataRecoveredCasesValues[
        i - 1
      ]
        ? historicalDataRecoveredCasesValues[i] -
          historicalDataRecoveredCasesValues[i - 1]
        : 0;
    } else {
      historicalDataDailyRecoveredCasesCalculated =
        historicalDataRecoveredCasesValues[i + 1] -
        historicalDataRecoveredCasesValues[i];
    }

    historicalDataDailyCount.recovered[
      historicalDataDailyRecoveredCasesKeys[i + 1]
    ] = historicalDataDailyRecoveredCasesCalculated;
  }

  let del = formattedDate(daysOfData * -1);
  delete countrySelectedHistoricalData.cases[del];
  delete countrySelectedHistoricalData.deaths[del];

  countrySelectedHistoricalData.cases[formattedDate()] =
    countrySelectedData.cases;

  historicalDataDailyCount.cases[formattedDate()] =
    countrySelectedData.todayCases;

  countrySelectedHistoricalData.deaths[formattedDate()] =
    countrySelectedData.deaths;

  historicalDataDailyCount.deaths[formattedDate()] =
    countrySelectedData.todayDeaths;

  countrySelectedHistoricalData.recovered[formattedDate()] =
    countrySelectedData.recovered;

  historicalDataDailyCount.recovered[formattedDate()] =
    countrySelectedData.todayRecovered;

  /*
  this.setState({
    countrySelected: {
      ...this.state.countrySelected,
      historicalDataDailyCount: historicalDataDailyCount,
    },
  });
};*/
};
