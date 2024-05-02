import React, { useState } from 'react';
import {useAuth} from "../App";
import {useNavigate} from "react-router";
import {Box, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import BookImage from "../assets/images/books.png";

function LoginPage() {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const { setIsLogin } = useAuth();

    const handleLogin = () => {
        console.log(login, password);
        setIsLogin(true);
        navigate("/")
    };

    return (
        <div style={{
            backgroundImage: "linear-gradient(135deg, white,darkblue, lightgreen )",
            display: 'flex',
            justifyContent: 'center',
            flexDirection: "column",
            gap: "48px",
            alignItems: 'center',
            height: '100vh',
            backgroundSize: 'cover',
            position: "relative"
            // backgroundImage: 'url()',
        }}>
            <div style={{zIndex: 9, position: "absolute",left:"10%", top: "60%", width: "500px", transform: "translateY(-50%) rotate(-45deg)"}}>
                <img src={BookImage} style={{width: "100%", height: "auto"}}/>
            </div>

            <h1 style={{marginBottom: '20px',zIndex: 10, color:"#f5f5f5"}}>BookSharing</h1>
            <div style={{
                zIndex: 10,
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '400px',
            }}>
                <h2 style={{marginBottom: '20px', fontSize: "20px"}}>Авторизируйтесь</h2>
                <TextField
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder="Login"
                    style={{padding: '10px', marginBottom: '10px', width: '100%'}}
                />
                <TextField
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    style={{padding: '10px', marginBottom: '20px', width: '100%'}}
                />
                <Box sx={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", }}>
                    <Button onClick={handleLogin} sx={{padding: '10px 20px', cursor: 'pointer',
                        textTransform: "none", color: "blue"
                    }}>
                        Регистрация
                    </Button>
                    <Button onClick={handleLogin} sx={{padding: '10px 20px', cursor: 'pointer',
                        textTransform: "none", backgroundColor: "#757ce8", color: "white"
                    }}>
                        Login
                    </Button>
                </Box>

            </div>
        </div>
    );
}

export default LoginPage;
