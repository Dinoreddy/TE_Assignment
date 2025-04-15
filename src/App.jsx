import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateProductPage from "./pages/CreateProductPage";
import UpdateProjectPage from "./pages/UpdateProjectPage";
import { Toaster } from "react-hot-toast";
import Login from "./components/login";
import Signup from "./components/signup";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreateProductPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <PrivateRoute>
              <UpdateProjectPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
