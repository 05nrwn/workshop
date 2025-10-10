import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataFetcher from "./component/datafetcher/DataFetcher";
import Navbar from "./component/navbar/navbar";
import Header from "./component/header/header";
import CardGrid from "./component/card/cardGrid";
import ShoppingApp from './component/card/ShoppingApp';
import ProductList from "./component/productlist/ProductList";
import "./App.css";

// Pages
import AboutPage from "./component/pages/AboutPage";
import ServicesPage from "./component/pages/ServicesPage";
import ContactPage from "./component/pages/ContactPage";
import Experience from "./component/sections/exp";
import CVPortfolio from "./component/sections/index"; // Import CV Portfolio

// Authentication Components
import Login from "./component/auth/login";
import Register from "./component/auth/register";
import EnhancedRegistrationForm from "./component/auth/EnhancedRegistrationForm";

function App() {
    return (
        <Router>
            {/* <Navbar /> */}
            <Routes>
                {/* Home Page - show Header + CardGrid */}
                <Route
                    path="/"
                    element={
                        <>
                            <ProductList />
                            {/* <Header />
                            <CardGrid />
                            <DataFetcher /> */}
                        </>
                    }
                />

                {/* About Page */}
                <Route
                    path="/about"
                    element={<AboutPage />}
                />

                {/* Services Page */}
                <Route
                    path="/services"
                    element={<ServicesPage />}
                />

                {/* Contact Page */}
                <Route
                    path="/contact"
                    element={<ContactPage />}
                />

                {/* Portfolio Page */}
                <Route
                    path="/portfolio"
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
