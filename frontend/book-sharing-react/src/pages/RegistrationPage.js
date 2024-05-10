import React, { useState } from 'react';
import { useAuth } from "../App";
import { useNavigate } from "react-router";
import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import BookImage from "../assets/images/books.png";

function RegisterPage() {
    const navigate = useNavigate();
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const { setIsLogin, setCurrentUser } = useAuth();

    const handleRegister = async () => {
        console.log(username,
                email,
                address,
                phone,
                password,)
        const response = await fetch('http://localhost:8000/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                address,
                phone,
                password,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data); 
            setIsLogin(true);
            setCurrentUser({ login: username });
            navigate("/");
        } else {
            console.error('Registration failed');
        }
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
            <div style={{ zIndex: 9, position: "absolute", left: "10%", top: "60%", width: "500px", transform: "translateY(-50%) rotate(-45deg)" }}>
                <img src={BookImage} style={{ width: "100%", height: "auto" }} />
            </div>

            <h1 style={{ marginBottom: '20px', zIndex: 10, color: "#f5f5f5" }}>BookSharing</h1>
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
                <h2 style={{ marginBottom: '20px', fontSize: "20px" }}>Регистрация</h2>
                <TextField
                    type="text"
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Имя"
                    style={{ padding: '10px', marginBottom: '4px', width: '100%' }}
                />
                <TextField
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Почта"
                    style={{ padding: '10px', marginBottom: '4px', width: '100%' }}
                />
                <TextField
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Адрес"
                    style={{ padding: '10px', marginBottom: '4px', width: '100%' }}
                />
                <TextField
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Телефон"
                    style={{ padding: '10px', marginBottom: '4px', width: '100%' }}
                />
                <TextField
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Пароль"
                    style={{ padding: '10px', marginBottom: '4px', width: '100%' }}
                />
                <Box sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", }}>
                    <Button onClick={handleRegister} sx={{
                        padding: '10px 20px', cursor: 'pointer',
                        textTransform: "none", color: "blue"
                    }}>
                        Отмена
                    </Button>
                    <Button onClick={handleRegister} sx={{
                        padding: '10px 20px', cursor: 'pointer',
                        textTransform: "none", backgroundColor: "#757ce8", color: "white"
                    }}>
                        Регистрация
                    </Button>
                </Box>

            </div>
        </div>
    );
}

export default RegisterPage;
