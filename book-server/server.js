const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(express.json());

const port = 8000;

const db = new sqlite3.Database('users.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, address TEXT, phone TEXT, password TEXT)");
});

app.post('/register', (req, res) => {
    const { username, email, address, phone, password } = req.body;

    if (!username || !email || !address || !phone || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.run("INSERT INTO users (username, email, address, phone, password) VALUES (?, ?, ?, ?, ?)", [username, email, address, phone, password], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Failed to register user' });
        }
        res.status(200).json({ message: 'User registered successfully', userId: this.lastID });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    res.status(200).json({ message: 'User logged in successfully' });
});

app.post('/new_book', (req, res) => {
    const { bookTitle, saleOrExchange, price, contactPhone, userName } = req.body;
    console.log('Request body:', bookTitle, saleOrExchange, price, contactPhone, userName);
    console.log('Request files:', req.files);
    if (!bookTitle || !saleOrExchange || !price || !contactPhone || !userName) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    const bookImage = req.files.bookImage;  
    const imageFileName = `${Date.now()}-${bookImage.name}`;
    bookImage.mv(`./uploads/${imageFileName}`, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to save image' });
        }

        const sql = "INSERT INTO books (title, sale_or_exchange, price, contact_phone, image_path, user_name) VALUES (?, ?, ?, ?, ?, ?)";
        db.run(sql, [bookTitle, saleOrExchange, price, contactPhone, `./uploads/${imageFileName}`, userName], function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Failed to add book' });
            }

            res.status(200).json({ message: 'Book added successfully', bookId: this.lastID });
        });
    });
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
