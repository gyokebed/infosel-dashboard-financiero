import { apiUrl } from "../config.json";
import axios from "axios";

const token = "br7cj5nrh5r9l4n3osvg";

const apiEndpoint = `${apiUrl}/stock/symbol?exchange=US&token=${token}`;

export const getListOfInstruments = () => {
  return axios.get(apiEndpoint);
};
