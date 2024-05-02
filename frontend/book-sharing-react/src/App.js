import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import React, { useState, createContext, useContext } from 'react';
import LoginPage from "./pages/LoginPage";
import HomePage from './pages/HomePage';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

function App() {
    const [isLogin, setIsLogin] = useState(false);
    const location = useLocation();

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin }}>
            <div className="App" style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                {location.pathname !== '/login' && <Header />}

                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/" element={isLogin ? <HomePage/> : <Navigate replace to="/login"/>}/>
                    <Route path="*" element={<Navigate replace to={isLogin ? "/" : "/login"}/>}/>
                </Routes>
                {location.pathname !== '/login' && <Footer />}
            </div>
        </AuthContext.Provider>
    );
}

export default App;
