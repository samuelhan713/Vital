import MainPage from "./components/mainpage/MainPage";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Landing from "./components/landing/Landing";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mainpage" element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
