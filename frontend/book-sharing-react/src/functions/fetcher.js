const SEARCH_URL = "https://www.googleapis.com/books/v1/volumes?q=";
const API_KEY = "AIzaSyBgScZpQ4f1tJRT9UZOe9s5n_5J_6IPYpw";

async function fetchBooks() {
    const SEARCH_URL = "https://www.googleapis.com/books/v1/volumes?q=game+of+thrones&key=AIzaSyBgScZpQ4f1tJRT9UZOe9s5n_5J_6IPYpw";
    try {
        const response = await fetch(SEARCH_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error("Could not fetch books", error);
        return [];
    }
}

export default fetchBooks;