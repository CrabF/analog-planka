import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "./types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/v1/" }),
  endpoints: (build) => ({
    getAllTasks: build.query<{ data: Task[] }, void>({
      query: () => ({ url: "tasks" }),
    }),
  }),
});

export const { useGetAllTasksQuery } = api;
