import Login from "@/pages/(user)/auth/Login";
import NotFound from "@/pages/NotFound";
import { Route, Routes } from "react-router-dom";

export function AuthRoutes() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}