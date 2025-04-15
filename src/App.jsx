import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateProductPage from "./pages/CreateProductPage";
import UpdateProjectPage from "./pages/UpdateProjectPage";
import { Toaster } from "react-hot-toast";
import Login from "./components/LoginPage"
import Signup from "./components/SignupPage";
import PrivateRouter from "./components/PrivateRouter";

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
            <PrivateRouter>
              <HomePage />
            </PrivateRouter>
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRouter>
              <CreateProductPage />
            </PrivateRouter>
          }
        />
        <Route
          path="/update/:id"
          element={
            <PrivateRouter>
              <UpdateProjectPage />
            </PrivateRouter>
          }
        />
      </Routes>
    </>
  );
}

export default App;
