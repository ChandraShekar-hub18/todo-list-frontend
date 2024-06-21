import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Home } from "./pages/Home";
import { Login } from "./features/login/Login.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import { TodoList } from "./features/todo/TodoList.tsx";
import { PageNotFound } from "./pages/PageNotFound.tsx";
import { Register } from "./features/login/Register.tsx";
import { AuthPage } from "./features/login/AuthPage.tsx";

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" />
          <Route path="/contact" />
          <Route path="/auth" element={<AuthPage />}>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
          </Route>

          <Route
            path="/dashboard"
            element={<PrivateRoute element={<TodoList />} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
