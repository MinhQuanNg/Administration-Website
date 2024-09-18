import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const settingsApi = createApi({
  reducerPath: 'settingsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5001',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken

      if (token) {
       // include token in req header
        headers.set('authorization', `Bearer ${token}`)  
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (passwordData) => {
        const { id, ...payload } = passwordData;
        return {
            url: `api/users/${id}/password`,
            method: 'PATCH',
            body: payload,
            headers: {
                'Content-Type': 'application/json',
            },
        };
    }
    }),
  }),
});

export const { useChangePasswordMutation } = settingsApi;
