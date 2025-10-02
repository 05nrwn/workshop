import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar/navbar";
import Header from "./component/header/header";
import CardGrid from "./component/card/cardGrid";
import ShoppingApp from './component/card/ShoppingApp';
import "./App.css";

// // Pages
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Services from "./pages/Services";
import Experience from "./component/sections/exp";
// import Contact from "./pages/Contact";
// import ShoppingCart from "./component/card/shopping";
import CVPortfolio from "./component/sections/index"; // Import CV Portfolio

function App() {
    return (
        <Router>
            <Navbar />

            <Routes>
                {/* Home Page - show Header + CardGrid */}
                <Route
                    path="/"
                    element={
                        <>
                            <Header />
                            {/* <CardGrid /> */}
                            <ShoppingApp />
                        </>
                    }
                />
                <Route
                    path="/"
                    element={
                        <>
                            <Header />
                            <Experience />
                        </>
                    }
                />
                <Route
                    path="/fortofolio"
                    element={
                        <>
                            <CVPortfolio />
                        </>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
