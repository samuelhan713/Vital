import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import MainPage from "./components/mainpage/MainPage";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Landing from "./components/landing/Landing";
import Navbar from "./components/navbar/Navbar";
import Form from "./components/form/Form";
import './App.css';
import Recommendation from "./components/recommendation/Recommendation";

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  console.log(isAuthenticated);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <MainPage /> : <Landing />}
          />
          <Route
            path="/mainpage"
            element={isAuthenticated ? <MainPage /> : <Landing />}
          />
          {/* <Route path="/mainpage" element={<MainPage />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/form/:userId" element={<Form />} />
          <Route path="/recommendation/:age/:description" element={<Recommendation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
