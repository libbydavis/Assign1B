import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pendingArticles, setPendingArticles] = useState([]);
  const [moderatedArticles, setModeratedArticles] = useState([]);
  const [userType, setUserType] = useState();

  function getArticles() {
    axios
      .get("https://cise-assign1b-deploy.herokuapp.com/viewSubmissions", {})
      .then((res) => {
        setPendingArticles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://cise-assign1b-deploy.herokuapp.com/viewModerated", {})
      .then((res) => {
        setModeratedArticles(res.data);
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
    }
  }, [pendingArticles]);

  useEffect(() => {
    if (moderatedArticles && userType === "analyst") {
      if (moderatedArticles.length > 0) {
        alert(
          "Analyst Notificaiton: You have pending articles avaliable to analyse"
        );
      }
    }
  }, [moderatedArticles]);

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
