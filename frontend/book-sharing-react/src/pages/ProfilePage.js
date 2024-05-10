import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, IconButton ,Badge,  Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const user = {
    name: 'Admin',
    phone: '87714975555',
};

const books = [
    {
        id: 1,
        title: "Миссия невыполнима Маргулан Сейсембеков",
        image: "https://frankfurt.apollo.olxcdn.com/v1/files/1ix1anvqu0gy1-KZ/image;s=1000x700",
        contactPhone: "87714975555"
    },
];
const incomingMessages = [
    {
        id: 1,
        bookTitle: "Гарри Поттер",
        message: "Хочу обменять книгу на Гарри Поттера",
        phone: "87714975555"
    },
];

function ProfilePage() {
    const [message, setMessage] = React.useState('');

    const handleResponse = (bookId) => {
        console.log(`Отправлено сообщение на книгу с id ${bookId}: ${message}`);
        setMessage('');
    };
     const handleContact = (phone) => {
        console.log(`Связаться с пользователем по телефону: ${phone}`);
    };

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
            <Typography variant="h5" gutterBottom>
                Мой профиль
            </Typography>
            <Typography variant="body1" gutterBottom>
                Имя: {user.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Номер: {user.phone}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Ваши книги
            </Typography>
            {books.map((book) => (
                <Card key={book.id} sx={{ display: 'flex', marginBottom: 2, width: "480px" }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 150, objectFit: 'cover' }}
                        image={book.image}
                        alt={book.title}
                    />
                    <CardContent>
                        <Typography variant="h6" component="div">{book.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{book.contactPhone}</Typography>
                        
                    </CardContent>
                     
                </Card>
            ))}

            <IconButton color="inherit" aria-label="incoming-messages">
                <Badge badgeContent={incomingMessages.length} color="error">
                    <EmailIcon />
                </Badge>
            </IconButton>
            {incomingMessages.map((message) => (
                <Accordion key={message.id} sx={{ marginBottom: 2 }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography variant="h6">Сообщение по книге</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: "column", gap: "8px" }}>
                            <Typography variant="body2" color="text.secondary">От Yerkenaz</Typography>
                            <Typography variant="body2" color="text.secondary">{message.message}</Typography>
                            <Button onClick={() => handleContact(message.phone)} variant="contained" color="primary">
                                Обменять книгу
                            </Button>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))}
           
            
        </Box>
    );
}

export default ProfilePage;
