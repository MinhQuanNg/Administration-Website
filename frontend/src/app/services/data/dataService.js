// app/services/auth/authService.js
// React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const dataApi = createApi({
  reducerPath: 'dataApi',
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
    getProducts: builder.query({
      query: () => ({
        url: 'api/products',
        method: 'GET',
      }),
    }),

    getDossiers: builder.query({
      query: ({id}) => {
        const params = {};
        if (id) params.id = id;

        return {
          url: 'api/dossiers',
          params,
          method: 'GET',
        }
      },
    }),

    createDossier: builder.mutation({
      query: (data) => ({
        url: 'api/dossiers',
        method: 'POST',
        body: data,
      }),
    }),

    deleteDossier: builder.mutation({
      query: (id) => ({
        url: `api/dossiers/${id}`,
        method: 'DELETE',
      }),
    }),

    getTasks: builder.query({
      query: ({ dossierId, user, taskId }) => {
        console.log('fetching', dossierId, taskId);
        const params = {};
        if (dossierId) params.dossierId = dossierId;
        if (user) params.user = user;
        if (taskId) params.id = taskId;
    
        return {
          url: 'api/tasks',
          params,
          method: 'GET',
        };
      },
      providesTags: (taskId) => taskId ? [{ type: 'Task', id: taskId }] : [],
    }),

    getUsers: builder.query({
      query: (id) => ({
        url: 'api/users',
        params: { id },
        method: 'GET',
      }),
    }),

    deleteTaskAssignee: builder.mutation({
      query: (data) => ({
          url: `api/tasks/assignees`,
          method: 'DELETE',
          body: data,
      }),
    }),

    deleteDossierAssignee: builder.mutation({
      query: (data) => ({
          url: `api/dossiers/assignees`,
          method: 'DELETE',
          body: data,
      }),
    }),

    updateDossier: builder.mutation({
      query: (data) => ({
        url: `api/dossiers/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
    }),

    updateTask: builder.mutation({
      query: (data) => ({
        url: `api/tasks/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
    }),

    getRequiredSampleCount: builder.query({
      query: (data) => ({
        url: `api/products/${data}/sampleCount`,
        method: 'GET',
      }),
    }),

    checkUnstartedTasks: builder.query({
      query: (user) => ({
        url: `api/tasks/unstarted`,
        method: 'GET',
        params: {user: user},
      }),
    }),
  }),
})

// Define the async thunk
export const updateTaskInCache = createAsyncThunk(
  'tasks/updateTaskInCache',
  async ({ taskId, updatedTaskData, param }, { dispatch }) => {

  dispatch(dataApi.util.updateQueryData('getTasks', param, (draft) => {
    const task = draft.find((t) => t.id === taskId);
    if (task) {
      Object.assign(task, updatedTaskData);
    }
  }));
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery, 
  useGetDossiersQuery, 
  useCreateDossierMutation, 
  useDeleteDossierMutation, 
  useGetTasksQuery, 
  useGetUsersQuery, 
  useDeleteTaskAssigneeMutation, 
  useDeleteDossierAssigneeMutation,
  useUpdateDossierMutation,
  useUpdateTaskMutation,
  useGetRequiredSampleCountQuery,
  useCheckUnstartedTasksQuery } = dataApi;