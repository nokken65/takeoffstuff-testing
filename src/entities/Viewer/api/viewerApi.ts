import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { baseQuery } from '@/app/api';

import { GetViewerInputs, GetViewerResponse } from '../model/models';

export const viewerApi = createApi({
  baseQuery,
  reducerPath: 'viewerApi',
  endpoints: (builder) => ({
    getViewer: builder.query<GetViewerResponse, GetViewerInputs>({
      query: (params) => ({
        url: '/users/' + params.id,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetViewerQuery } = viewerApi;
