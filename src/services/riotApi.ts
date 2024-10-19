"use client"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as Models from '@/types/models'

export const riotApi = createApi({
  reducerPath: 'riotApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      headers.set('X-Riot-Token', process.env.NEXT_PUBLIC_RIOT_API_KEY as string);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPuuid: builder.query<Models.AccountDTO,{tagline: string, gameName:string}>({
        query: ({tagline,gameName}) => `/account/puuid?gameName=${gameName}&tagline=${tagline}`
    })

  }),
});

export const { useGetPuuidQuery } = riotApi;
