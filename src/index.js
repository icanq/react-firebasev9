import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FileUpload from "./pages/FileUpload";
import FileUploadMultiple from "./pages/FileUploadMultiple";
import Navbar from "./components/Navbar";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<FileUpload />} />
        <Route path="/multiple" element={<FileUploadMultiple />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
