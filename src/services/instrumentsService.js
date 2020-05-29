import { apiUrl } from "../config.json";
import axios from "axios";

const token = "br7cj5nrh5r9l4n3osvg";

export const getListOfInstruments = () => {
  const apiEndpoint = `${apiUrl}/stock/symbol?exchange=US&token=${token}`;
  return axios.get(apiEndpoint);
};

export const getDataFromAnInstrument = (instrument) => {
  const apiEndpoint = `https://finnhub.io/api/v1/quote?symbol=${instrument}&token=${token}`;
  return axios.get(apiEndpoint);
};
