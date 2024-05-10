import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton, Typography  } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import Image from "../../assets/images/header-icon.png"
import {useAuth} from "../../App";
import {useNavigate} from "react-router";

function Header() {
    const { isLogin, currentUser } = useAuth();
    const navigate = useNavigate();
    return (
        <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{
                width: "100%",
                maxWidth: "1200px",
                margin: "auto 0 ",
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Typography variant="h4" component="span" style={{ display: 'flex', alignItems: 'center', cursor: "pointer" }} onClick={()=> navigate("/")}>
                    <img style={{width: "48px"}} src={Image} />
                    <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>BookSharing</span>
                </Typography>
                <nav>
                    <Button sx={{ textTransform: "none" }} component={Link} to="/aboutus">О нас</Button>
                    <Button sx={{ textTransform: "none" }} component={Link} to="/books">Книги</Button>
                    <Button sx={{ textTransform: "none" }} component={Link} to="/search">Поиск</Button>
                </nav>
                <div>
                    {isLogin ? (
                        <>
                            <IconButton component={Link} to="/profile" aria-label="Мой Профиль">
                                <AccountCircle />
                            <Typography sx={{marginLeft: "4px"}}>
                                {currentUser.login}
                            </Typography>
                            </IconButton>
                            
                        </>
                    ) : (
                        <>
                            <Button sx={{ textTransform: "none" }} component={Link} to="/register">Регистрация</Button>
                            <Button sx={{ textTransform: "none" }} component={Link} to="/login">Войти</Button>
                        </>
                    )}          
                </div>
                
            </div>
        </header>
    );
}

export default Header;
