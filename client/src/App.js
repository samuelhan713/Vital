import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import MainPage from "./components/mainpage/MainPage";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Landing from "./components/landing/Landing";
import Navbar from "./components/navbar/Navbar";


function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  console.log(isAuthenticated);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <MainPage /> : <Landing />}
          />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
