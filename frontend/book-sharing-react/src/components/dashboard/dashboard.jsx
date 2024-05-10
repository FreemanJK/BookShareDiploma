import React, { useEffect, useState } from 'react';
import fetchBooks from "../../functions/fetcher";
import BookCard from "../book/BookCard";

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getBooks = async () => {
            const booksFromApi = await fetchBooks();
            setBooks(booksFromApi);
        };

        getBooks();
    }, []);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {books.map(book => (
                <BookCard
                    key={book.id}
                    title={book.volumeInfo.title}
                    author={book.volumeInfo.authors}
                    cover={book.volumeInfo.imageLinks?.thumbnail}
                    description={book.volumeInfo.description}
                    onDetails={() => window.open(book.volumeInfo.previewLink, "_blank")}
                />
            ))}
        </div>
    );
};

export default BookList;
