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

// Authentication Components
import Login from "./component/auth/login";
import Register from "./component/auth/register";
import EnhancedRegistrationForm from "./component/auth/EnhancedRegistrationForm";

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

                {/* Portfolio Page */}
                <Route
                    path="/fortofolio"
                    element={
                        <>
                            <CVPortfolio />
                        </>
                    }
                />

                {/* Authentication Pages */}
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route
                    path="/enhanced-register"
                    element={<EnhancedRegistrationForm />}
                />

                {/* Experience Page (if needed as separate route) */}
                <Route
                    path="/experience"
                    element={
                        <>
                            <Header />
                            <Experience />
                        </>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
