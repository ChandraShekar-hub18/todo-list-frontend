import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Home } from "./pages/Home";
import { Login } from "./features/login/Login.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import { DashBoard } from "./pages/DashBoard.tsx";
import { Todo } from "./features/todo/Todo.tsx";

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" />
          <Route path="/contact" />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Todo />} />}
          >
            <Route path="/todo" element={<DashBoard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
