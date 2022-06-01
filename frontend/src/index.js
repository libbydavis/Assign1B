import React, { useState } from "react";
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
import Submissions from "./Components/Submissions";
import Moderation from "./Components/Moderation";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AppProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="browseArticles" element={<BrowseArticles />} />
        <Route path="submitArticle" element={<SubmitArticle />} />
        <Route path="viewSubmissions" element={<Submissions />} />
        <Route path="moderation" element={<Moderation />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </AppProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
