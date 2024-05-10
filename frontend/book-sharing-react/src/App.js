import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import React, { useState, createContext, useContext } from 'react';
import LoginPage from "./pages/LoginPage";
import HomePage from './pages/HomePage';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AboutUsPage from "./pages/AboutUsPage";
import BooksPage from "./pages/BooksPage";
import SearchPage from "./pages/SearchPage";
import RegisterPage from './pages/RegistrationPage';
import ProfilePage from './pages/ProfilePage';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

function App() {
    const [isLogin, setIsLogin] = useState(false);
    const [currentUser, setCurrentUser] = useState( {
        login: null
    })
    const location = useLocation();

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin, currentUser, setCurrentUser }}>
            <div className="App" style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                {location.pathname !== '/login' && location.pathname !== '/register' && <Header />}

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    {/* <Route path="/" element={isLogin ? <HomePage /> : <Navigate replace to="/login" />} /> */}
                    <Route path="/aboutus" element={<AboutUsPage />} />
                    <Route path="/books" element={<BooksPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    {/* <Route path="*" element={<Navigate replace to={isLogin ? "/" : "/login"} />} /> */}
                </Routes>

                {location.pathname !== '/login' && location.pathname !== '/register' && <Footer />}
            </div>
        </AuthContext.Provider>
    );
}

export default App;
