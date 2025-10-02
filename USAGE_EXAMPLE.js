// Contoh cara menggunakan CV Portfolio di App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar/navbar";
import Header from "./component/header/header";
import ShoppingApp from './component/card/ShoppingApp';
import CVPortfolio from "./component/sections/index"; // Import CV Portfolio
import "./App.css";

function App() {
    return (
        <Router>
            <Routes>
                {/* CV Portfolio Route - Fullscreen CV */}
                <Route path="/cv" element={<CVPortfolio />} />

                {/* Original Home Page */}
                <Route
                    path="/"
                    element={
                        <>
                            <Navbar />
                            <Header />
                            <ShoppingApp />
                        </>
                    }
                />

                {/* Atau jika ingin CV sebagai halaman utama, ganti menjadi: */}
                {/*
        <Route path="/" element={<CVPortfolio />} />
        <Route
          path="/shop"
          element={
            <>
              <Navbar />
              <Header />
              <ShoppingApp />
            </>
          }
        />
        */}
            </Routes>
        </Router>
    );
}

export default App;
