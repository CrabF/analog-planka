import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Board, Task } from "./types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/v1/" }),
  endpoints: (build) => ({
    getAllTasks: build.query<{ data: Task[] }, void>({
      query: () => ({ url: "tasks" }),
    }),
    getAllboards: build.query<{ data: Board[] }, void>({
      query: () => ({ url: "boards" }),
    }),
  }),
});

export const { useGetAllTasksQuery, useGetAllboardsQuery } = api;
