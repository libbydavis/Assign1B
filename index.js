import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BrowseArticles from "./Components/BrowseArticles";
import SubmitArticle from "./Components/SumitArticle";
import Login from "./Components/Login";
import NavBar from "./Components/NavBar";

import Container from "./Container";

import "./styles.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <NavBar/>
      <Routes>
          <Route path="/" element={<App />} />
          <Route path="browseArticles" element={<BrowseArticles />} />
          <Route path="submitArticle" element={<SubmitArticle />} />
          <Route path="login" element={<Login />} />
      </Routes>
  </BrowserRouter>
);

function App() {
  return (
    <div className="App">
      <h1>Search</h1>
      <Container />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
