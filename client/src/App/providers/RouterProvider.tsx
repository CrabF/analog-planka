import { Layout } from "components/Layout/Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { BoardsPage, IssuesPage } from "pages/index";

export const RouterProvider = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/issues" element={<IssuesPage />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/board/:id" element={<div>страница доски проекта</div>} />
        <Route path="*" element={<Navigate to={"/boards"} />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
