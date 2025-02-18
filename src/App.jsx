import { Routes, Route, } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateProductPage from "./pages/CreateProductPage";
import UpdateProjectPage from "./pages/UpdateProjectPage";
import {Toaster} from "react-hot-toast";

function App() {
  

  return (
    <>
      <Toaster/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/create" element={<CreateProductPage/>} />
        <Route path="/update/:id" element={<UpdateProjectPage/>} />
      </Routes>
    </>
  );
}

export default App;
