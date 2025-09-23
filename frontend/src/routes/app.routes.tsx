import Login from "@/pages/(user)/auth/Login";
import Register from "@/pages/(user)/auth/Register";
import NotFound from "@/pages/NotFound";
import { Route, Routes } from "react-router-dom";

export function AuthRoutes() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}