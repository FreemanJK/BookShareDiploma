import React, { useState } from 'react';
import Layout from "../components/Layout/Layout";
import { Tab, Tabs, Box, TextField, Radio, RadioGroup, FormControlLabel, Button, Typography, Card, CardContent, CardMedia,  Dialog, DialogTitle, DialogContent, DialogActions, } from '@mui/material';
import { styled } from '@mui/system';
import { useAuth } from '../App';

function BooksPage() {
    const [value, setValue] = useState(0); // State for the active tab index

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [books, setBooks] = useState(initialBooks);

    // Function to add a new book
    const addBook = (newBook) => {
        setBooks([...books, newBook]);
    };

    return (
        <Layout>
            <Box sx={{ width: '100%', marginTop: 2 }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Список книг" />
                    <Tab label="Добавить книгу" />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <BookList books={books} setBooks={setBooks} addBook={addBook} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <AddBookForm addBook={addBook} />
                </TabPanel>
            </Box>
        </Layout>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function AddBookForm({addBook}) {
    const [bookTitle, setBookTitle] = useState('');
    const [saleOrExchange, setSaleOrExchange] = useState('exchange');
    const [price, setPrice] = useState(5000);
    const [contactPhone, setContactPhone] = useState('');
    const [bookImage, setBookImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const { currentUser } = useAuth();
        const handleNewBook = async () => {
            const formData = new FormData();
            formData.append('bookTitle', bookTitle);
            formData.append('saleOrExchange', saleOrExchange);
            formData.append('price', 5000);
            formData.append('contactPhone', contactPhone);
            formData.append('bookImage', bookImage);
            formData.append('userName', currentUser.login);
            console.log(formData)
            const response = await fetch('http://localhost:8000/new_book', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Book added successfully');
            } else {
                console.error('Failed to add book');
            }
        };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        addBook({
            id: 6,
            title: bookTitle,
            image: bookImage,
            contactPhone
        })
        handleNewBook();
        console.log(bookTitle, saleOrExchange, price, contactPhone, bookImage);
    };
    

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBookImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "row", gap: "16px" }} >
            <form style={{ width: "40%" }} onSubmit={handleSubmit}>
                <TextField
                    label="Название книги"
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    fullWidth
                    required
                    sx={{ marginBottom: 2 }}
                />
                <RadioGroup
                    aria-label="saleOrExchange"
                    name="saleOrExchange"
                    value={saleOrExchange}
                    onChange={(e) => setSaleOrExchange(e.target.value)}
                    row
                    sx={{ marginBottom: 2 }}
                >
                    <FormControlLabel value="exchange" control={<Radio />} label="На обмен" />
                    <FormControlLabel value="sale" control={<Radio />} label="На продажу" />
                </RadioGroup>
                {saleOrExchange === 'sale' && (
                    <TextField
                        label="Цена"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        fullWidth
                        required
                        sx={{ marginBottom: 2 }}
                    />
                )}
                <TextField
                    label="Телефон для связи"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    fullWidth
                    required
                    sx={{ marginBottom: 2 }}
                />
                <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="book-image-input"
                />
                <label htmlFor="book-image-input">
                    <Button variant="outlined" component="span">
                        Загрузить фото книги
                    </Button>
                </label>
                
                <Button type="submit" variant="contained" color="primary" sx={{marginLeft: "4px"}}>
                    Добавить книгу
                </Button>
            </form>
            {imagePreview && (
                <PreviewBox>
                    <img src={imagePreview} alt="Book preview" />
                </PreviewBox>
                )}
        </Box>
    );
}

const PreviewBox = styled(Box)({
    borderRadius: 16,
    border: '2px solid blue',
    width: 480,
    overflow: 'hidden',
    '& img': {
        width: '100%',
        height: 'auto',
        display: 'block',
    },
});

const initialBooks = [
    {
        id: 1,
        title: "Путешествие души",
        image: "https://api.bookcrossing.ru/storage/covers/f07f6c9d-227d-4b80-93bf-6efa3d3c40d2.webp",
        contactPhone: "87714975555"
    },
    {
        id: 2,
        title: "Миссия невыполнима Маргулан Сейсембеков",
        image: "https://frankfurt.apollo.olxcdn.com/v1/files/1ix1anvqu0gy1-KZ/image;s=1000x700",
        contactPhone: "87714975555"
    },
    {
        id: 3,
        title: "Три Товарища",
        image: "https://frankfurt.apollo.olxcdn.com/v1/files/p7wxkt4dyob3-KZ/image;s=1000x700",
        contactPhone: "87714975555"
    },
    {
        id: 4,
        title: "1984",
        image: "https://frankfurt.apollo.olxcdn.com/v1/files/o40gxqkmp2kx-KZ/image;s=1000x700",
        contactPhone: "87714975555"
    },
    {
        id: 5,
        title: "Благословение Небожителей",
        image: "https://frankfurt.apollo.olxcdn.com/v1/files/h8rzghsrj3bj1-KZ/image;s=1000x700",
        contactPhone: "87714975555"
    }
];

function BookList({ books, setBooks, addBook }) {
    const [open, setOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [contactMethod, setContactMethod] = useState('exchange');
    const [exchangeBook, setExchangeBook] = useState('');
    const [buyPrice, setBuyPrice] = useState('');
    const [name, setName] = useState('');
    const [comments, setComments] = useState('');
    const [phone, setPhone] = useState('');

    const handleClickOpen = (book) => {
        setSelectedBook(book);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleContact = () => {
        console.log(contactMethod, exchangeBook, buyPrice, name, comments, phone);
        setContactMethod('exchange');
        setExchangeBook('');
        setBuyPrice('');
        setName('');
        setComments('');
        setPhone('');
        setOpen(false);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: 'wrap' }}>
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
                        <Button onClick={() => handleClickOpen(book)}>Связаться</Button>
                    </CardContent>
                </Card>
            ))}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Связаться по книге {selectedBook?.title}</DialogTitle>
                <DialogContent>
                    <RadioGroup
                        aria-label="contactMethod"
                        name="contactMethod"
                        value={contactMethod}
                        onChange={(e) => setContactMethod(e.target.value)}
                        row
                        sx={{ marginBottom: 2 }}
                    >
                        <FormControlLabel value="exchange" control={<Radio />} label="Обмен" />
                        <FormControlLabel value="buy" control={<Radio />} label="Купить" />
                    </RadioGroup>
                    {contactMethod === 'exchange' ? (
                        <TextField
                            label="Название книги на обмен"
                            value={exchangeBook}
                            onChange={(e) => setExchangeBook(e.target.value)}
                            fullWidth
                            required
                            sx={{ marginBottom: 2 }}
                        />
                    ) : (
                        <TextField
                            label="Цена"
                            type="number"
                            value={buyPrice}
                            onChange={(e) => setBuyPrice(e.target.value)}
                            fullWidth
                            required
                            sx={{ marginBottom: 2 }}
                        />
                    )}
                    <TextField
                        label="Ваше имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        required
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Комментарии"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Телефон"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        fullWidth
                        required
                        sx={{ marginBottom: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button onClick={handleContact} variant="contained" color="primary">Отправить</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}


export default BooksPage;
