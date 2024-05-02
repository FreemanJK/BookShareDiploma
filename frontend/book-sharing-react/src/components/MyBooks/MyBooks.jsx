import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import BookCard from '../book/BookCard';
import {Box} from "@mui/material";

const MyBooks = () => {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]); // Изменено на массив книг

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSearch = async () => {
        const formattedSearchTerm = searchTerm.split(' ').join('+');
        const SEARCH_URL = `https://www.googleapis.com/books/v1/volumes?q=${formattedSearchTerm}&key=AIzaSyBgScZpQ4f1tJRT9UZOe9s5n_5J_6IPYpw`;
        try {
            const response = await fetch(SEARCH_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                const firstBook = data.items[0].volumeInfo;
                const newBook = {
                    title: firstBook.title,
                    author: firstBook.authors ? firstBook.authors.join(', ') : "Н/Д",
                    cover: firstBook.imageLinks ? firstBook.imageLinks.thumbnail : "https://via.placeholder.com/128",
                    description: firstBook.description || "Описание отсутствует",
                };
                setBooks(currentBooks => [...currentBooks, newBook]); // Добавляем новую книгу в массив
            }
            setOpen(false);
        } catch (error) {
            console.error("Could not fetch books", error);
        }
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} style={{ textTransform: 'none', borderRadius: '20px' }}>
                Добавить книгу
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Добавить книгу</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Название книги"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button onClick={handleSearch}>Поиск</Button>
                </DialogActions>
            </Dialog>
            <Box sx = {{display: "flex", flexDirection: "row", gap: "16px"}}>

                {books.map((book, index) => (
                    <BookCard
                        key={index}
                        title={book.title}
                        author={book.author}
                        cover={book.cover}
                        description={book.description}
                    />
                ))}
            </Box>

        </div>

    );
};

export default MyBooks;
