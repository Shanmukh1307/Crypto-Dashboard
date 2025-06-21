import axios from "axios";

export const fetchExchanges = async () => {
  const response = await axios.get("https://api.coingecko.com/api/v3/exchanges");
  return response.data; // returns array of exchanges
};
