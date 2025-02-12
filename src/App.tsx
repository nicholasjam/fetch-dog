import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}
