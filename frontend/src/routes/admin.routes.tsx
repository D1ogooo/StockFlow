import Admin from "@/pages/(admin)/Admin";
import Dashboard from "@/pages/(admin)/Dashboard";
import NotFound from "@/pages/NotFound";
import { Route, Routes } from "react-router-dom";

export function AdminRoutes() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      {/* <Route path="/admin" element={<Admin />} /> */}
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes >
  )
}