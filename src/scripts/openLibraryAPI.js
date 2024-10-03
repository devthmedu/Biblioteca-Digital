const axios = require('axios');

const OPEN_LIBRARY_BASE_URL = 'https://openlibrary.org/search.json';

const validateQuery = (query) => {
    if (typeof query !== 'string' || query.trim() === '') {
        throw new Error('A consulta deve ser uma string não vazia.');
    }
};

const validatePage = (page) => {
    if (typeof page !== 'number' || page < 1) {
        throw new Error('O número da página deve ser um número positivo.');
    }
};

const searchBooks = async (query, options = {}) => {
    validateQuery(query);
    try {
        const response = await axios.get(OPEN_LIBRARY_BASE_URL, { params: { q: query, ...options } });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados na Open Library API:', error.message);
        throw error;
    }
};

const getBooksByPage = async (query, page) => {
    validatePage(page);
    return await searchBooks(query, { page });
};

const formatBookData = (book) => {
    const { title, author_name = [], cover_i } = book;
    return {
        title,
        authors: author_name.join(', '),
        coverImage: cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg` : null,
        firstPublishYear: book.first_publish_year || 'N/A',
    };
};

const getFormattedBooks = async (query, options = {}) => {
    const data = await searchBooks(query, options);
    return data.docs.map(formatBookData);
};

// Exposed functions
module.exports = {
    searchBooks,
    getFormattedBooks,
    getBooksByPage,
};

const booksCollection = [];

document.getElementById('searchButton').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value;
    try {
        const books = await getFormattedBooks(query);

        const searchTableBody = document.getElementById('searchTableBody');
        searchTableBody.innerHTML = '';

        books.forEach(book => {
            const row = createBookRow(book);
            searchTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar livros:', error.message);
    }
});

const createBookRow = (book) => {
    const row = document.createElement('tr');
    const coverImage = book.coverImage || 'https://via.placeholder.com/50';
    row.innerHTML = `
        <td><img src="${coverImage}" alt="Capa do Livro"></td>
        <td>${book.title}</td>
        <td>${book.authors || 'Desconhecido'}</td>
        <td>${book.firstPublishYear}</td>
        <td><button class="btn btn-success btn-sm add-button">Adicionar</button></td>
    `;

    row.querySelector('.add-button').addEventListener('click', () => {
        const bookData = {
            title: book.title,
            authors: book.authors,
            cover: coverImage,
            withdrawalDate: new Date().toISOString().split('T')[0],
            returnDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
            description: `Publicado em ${book.firstPublishYear}`,
        };
        booksCollection.push(bookData);
        addBookToTable(bookData);
    });

    return row;
};

function addBookToTable(book) {
    const tableBody = document.getElementById('tableBody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="${book.cover}" alt="Capa do Livro"></td>
        <td>${book.title}</td>
        <td>${book.authors}</td>
        <td>N/A</td>
        <td>${book.withdrawalDate}</td>
        <td>${book.returnDate}</td>
        <td>${book.description}</td>
        <td>${book.publicationDate || 'N/A'}</td>
    `;
    tableBody.appendChild(row);
}
