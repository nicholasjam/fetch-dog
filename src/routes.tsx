import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import Login from "./pages/Login";
import DogsList from "./pages/DogsList";
import NotFound from "./pages/NotFound";

export default function AppRoutes() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/search" /> : <Login />} />
      <Route path="/search" element={isAuthenticated ? <DogsList /> : <Navigate to="/" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
