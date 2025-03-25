import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import TodoPage from "./TodoPage";
import Home from "./Home";
import Admin from "./Admin";
import AdminPanel from "./AdminPanel";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/:userId" element={<TodoPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/adminpanel" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;
