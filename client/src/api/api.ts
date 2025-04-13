import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Board,
  BoardInfo,
  NewTask,
  Task,
  TaskInfo,
  UpdatedTask,
  User,
} from "./types";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["tasks", "boards"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/v1/" }),
  endpoints: (build) => ({
    getAllTasks: build.query<{ data: Task[] }, void>({
      query: () => ({ url: "tasks" }),
      providesTags: ["tasks"],
    }),
    getAllboards: build.query<{ data: Board[] }, void>({
      query: () => ({ url: "boards" }),
      providesTags: ["boards"],
    }),
    getBoardInfo: build.query<{ data: BoardInfo[] }, string>({
      query: (id) => ({ url: `boards/${id}` }),
      providesTags: ["boards"],
    }),
    getTaskInfo: build.query<{ data: TaskInfo }, string>({
      query: (id) => ({ url: `tasks/${id}` }),
      keepUnusedDataFor: 0,
      providesTags: ["tasks"],
    }),
    createNewTask: build.mutation<{ id: number }, NewTask>({
      invalidatesTags: ["tasks", "boards"],
      query: (queryArg) => ({
        url: "tasks/create",
        method: "POST",
        body: queryArg,
      }),
    }),
    getAllUsersInfo: build.query<{ data: User[] }, void>({
      query: () => ({ url: "users" }),
    }),
    updateTaskInfo: build.mutation<
      { message: string },
      { updatedTask: UpdatedTask; taskId: number }
    >({
      invalidatesTags: ["tasks", "boards"],
      query: (queryArg) => ({
        url: `tasks/update/${queryArg.taskId}`,
        method: "PUT",
        body: queryArg.updatedTask,
      }),
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useGetAllboardsQuery,
  useGetBoardInfoQuery,
  useGetTaskInfoQuery,
  useLazyGetTaskInfoQuery,
  useCreateNewTaskMutation,
  useGetAllUsersInfoQuery,
  useUpdateTaskInfoMutation,
} = api;
