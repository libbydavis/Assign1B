import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BrowseArticles from "./Components/BrowseArticles";
import SubmitArticle from "./Components/SubmitArticle";
import Login from "./Components/Login";
import NavBar from "./Components/NavBar";
import AppProvider from "./Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AppProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="browseArticles" element={<BrowseArticles />} />
        <Route path="submitArticle" element={<SubmitArticle />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </AppProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
