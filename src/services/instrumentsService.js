import { apiUrl } from "../config.json";
import axios from "axios";

const token = "br7cj5nrh5r9l4n3osvg";
const apiKey = "A1TYJ6O8KY63WSSK";

export const getListOfInstruments = () => {
  const apiEndpoint = `${apiUrl}/stock/symbol?exchange=US&token=${token}`;
  return axios.get(apiEndpoint);
};

export const getDataFromAnInstrument = (instrument) => {
  const apiEndpoint = `https://finnhub.io/api/v1/quote?symbol=${instrument}&token=${token}`;
  return axios.get(apiEndpoint);
};

export const getMonthlyData = (instrument) => {
  const apiEndpoint = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${instrument}&apikey=${apiKey}`;
  return axios.get(apiEndpoint);
};

export const updateMonthlyData = (result) => {
  let monthtlyArrayData = [];
  let monthtlyTimeSeries = Object.keys(result.data)[1];
  for (let key in result.data[monthtlyTimeSeries])
    monthtlyArrayData.push({
      Date: key,
      Open: result.data[monthtlyTimeSeries][key]["1. open"],
      High: result.data[monthtlyTimeSeries][key]["2. high"],
      Low: result.data[monthtlyTimeSeries][key]["3. low"],
      Close: result.data[monthtlyTimeSeries][key]["4. close"],
      Volume: result.data[monthtlyTimeSeries][key]["5. volume"],
    });
  return monthtlyArrayData;
};
