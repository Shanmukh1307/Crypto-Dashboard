import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_TOKEN = '0f00e5f9558d02e16b3e97a243f63a6d'; 

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://gnews.io/api/v4' }), 
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory = 'Cryptocurrency', count = 10 }) =>
        `/search?q=${newsCategory}&token=0f00e5f9558d02e16b3e97a243f63a6d&lang=en&max=${count}`,
    }),
  }),
});


export const { useGetCryptoNewsQuery} = cryptoNewsApi;

