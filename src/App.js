import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import api from "./api";
import LoginPage from "./components/LoginPage";
import Calender from "./components/Calender/Calender";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  const logoutHandler = () => {
    localStorage.removeItem("userData");
    setIsLogin(false);
    window.location.reload(true);
  };

  useEffect(() => {
    let getUserData = JSON.parse(localStorage.getItem("userData"));
    if (getUserData == null) {
      setIsLogin(false);
      setLoading(false);
    } else {
      const userData = async () => {
        try {
          let userData = await api.get("/user/", {
            headers: { authorization: `Bearer ${getUserData.token}` },
          });
          userData = { ...userData.data.data, token: userData.data.token };
          localStorage.setItem("userData", JSON.stringify(userData));
          setLoading(false);
          setIsLogin(true);
        } catch (e) {
          console.log(e);
          localStorage.removeItem("userData");
          setIsLogin(false);
          setLoading(false);
        }
      };
      userData();
    }
  }, []);
  return (
    <>
      <div className="navBar">
        <h1>Calender</h1>{" "}
        {isLogin && <button onClick={logoutHandler}>Logout</button>}
      </div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              loading ? (
                <div>Loading</div>
              ) : isLogin ? (
                <div>
                  <Calender />
                </div>
              ) : (
                <LoginPage setIsLogin={setIsLogin}></LoginPage>
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
