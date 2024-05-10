const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const path = require('path');
const fs = require('fs');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage });


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (!row) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'User logged in successfully', userId: row.id });
    });
});


const dbbooks = new sqlite3.Database('books.db');
dbbooks.serialize(() => {
    dbbooks.run("CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, sale_or_exchange TEXT, price INTEGER, contact_phone TEXT, image_path TEXT, user_name TEXT)");

});

app.post('/new_book', upload.single('bookImage'), (req, res) => {
    const { bookTitle, saleOrExchange, price, contactPhone, userName } = req.body;
    if (!bookTitle || !saleOrExchange || !price || !contactPhone || !userName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const bookImage = req.file;
    if (!bookImage || !bookImage.path) {
        return res.status(400).json({ message: 'Invalid file' });
    }

    const imageFileName = path.basename(bookImage.path);
    const sql = "INSERT INTO books (title, sale_or_exchange, price, contact_phone, image_path, user_name) VALUES (?, ?, ?, ?, ?, ?)";
    dbbooks.run(sql, [bookTitle, saleOrExchange, price, contactPhone, `./uploads/${imageFileName}`, userName], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to add book' });
        }

        res.status(200).json({ message: 'Book added successfully', bookId: this.lastID });
    });
});

app.get('/get_books', (req, res) => {
    dbbooks.all("SELECT * FROM books", (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to fetch books' });
        }

        const booksWithImages = rows.map((row) => {
            const { id, title, sale_or_exchange, price, contact_phone, image_path, user_name } = row;
            return {
                id,
                title,
                sale_or_exchange,
                price,
                contact_phone,
                image: `http://localhost:8000/${image_path}`, 
                user_name
            };
        });

        res.status(200).json(booksWithImages);
    });
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
