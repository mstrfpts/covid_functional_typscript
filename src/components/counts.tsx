export const getPropCount = (covidData: any[], type: string) => {
  const reducer = (accumulator: number, value: any) => {
    return accumulator + value[type];
  };
  return covidData.reduce(reducer, 0);
};
