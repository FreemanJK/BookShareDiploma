import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import {useNavigate} from "react-router";

function HeroBlock() {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                width: "100%",
                height: "480px",
                borderRadius: "16px",
                position: "relative",
                overflow: "hidden",
                marginBottom: "16px",
                "&::before": {
                    content: '""',
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://miro.medium.com/v2/resize:fit:1400/0*MrcXpORWMJNNOjki")`,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: -1,
                },
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    color: "white",
                    zIndex: 1,
                }}
            >
                <Typography variant="h2" sx={{fontWeight: "600", fontSize: "42px", lineHeight: "38px"}} >Подарите книгам новую жизнь</Typography>
                <Typography variant="body1" sx={{fontWeight: "600", fontSize: "24px", mt: 10 }}>
                    Находить книги, делиться книгами, знакомиться с книголюбами. Легко!
                </Typography>
                <Box mt={10}>
                    <Button variant="contained" sx={{ textTransform: "none",  bgcolor: "#2196f3", color: "white" }} onClick={()=> navigate("/register")}>Стать участником</Button>
                    <Button variant="contained" sx={{  textTransform: "none",bgcolor: "#4caf50", color: "white", ml: 2 }}>Найти книгу</Button>
                </Box>
            </Box>
        </Box>
    );
}

export default HeroBlock;
