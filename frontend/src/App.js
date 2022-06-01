import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pendingArticles, setPendingArticles] = useState([]);
  const [userType, setUserType] = useState();

  function getArticles() {
    axios
      .get("http://localhost:8082/viewSubmissions", {})
      .then((res) => {
        setPendingArticles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getArticles();
  }, []);

  useEffect(() => {
    if (pendingArticles && userType === "moderator") {
      if (pendingArticles.length > 0) {
        alert(
          "Moderator Notificaiton: You have pending articles avaliable to moderate"
        );
      }
    } else if (pendingArticles && userType === "analyst") {
      if (pendingArticles.length > 0) {
        alert(
          "Analyst Notificaiton: You have pending articles avaliable to analyse"
        );
      }
    }
  }, [pendingArticles]);

  useEffect(() => {
    setUserType(sessionStorage.getItem("userType"));
  }, [sessionStorage.getItem("userType")]);

  return (
    <div className="App">
      <p>
        Welcome to SPEED. Search for articles based on software engineering
        topics or submit an article of your own.
      </p>
    </div>
  );
}

export default App;
