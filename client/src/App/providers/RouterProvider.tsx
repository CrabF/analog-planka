import { Layout } from "components/Layout/Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { BoardPage, BoardsPage, IssuesPage } from "pages/index";

export const RouterProvider = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/issues" element={<IssuesPage />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/board/:id" element={<BoardPage />} />
        <Route path="*" element={<Navigate to={"/issues"} />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
