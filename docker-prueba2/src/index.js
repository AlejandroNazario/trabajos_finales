const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const Book = require('./models/Book'); // Importa el modelo Book

const startServer = async () => {
    const app = express();

    // Middleware para Express
    app.use(express.json());

    // Conexión a la base de datos
    require('./database');

    // Configuración de Apollo Server
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    // Ruta para el endpoint raíz
    app.get('/', (req, res) => {
        // Sirve el archivo HTML
        res.sendFile(__dirname + '/index.html');
    });

    // Ruta para agregar un libro
    app.post('/add-book', async (req, res) => {
        const { title, author, genre, year } = req.body;
        try {
            // Crea un nuevo libro
            const newBook = new Book({ title, author, genre, year });
            // Guarda el libro en la base de datos
            await newBook.save();
            res.redirect('/books');
        } catch (error) {
            res.status(500).send('Error al agregar el libro.');
        }
    });

    // Ruta para mostrar todos los libros agregados
    app.get('/books', async (req, res) => {
        try {
            // Obtiene todos los libros de la base de datos
            const books = await Book.find();
            res.json(books);
        } catch (error) {
            res.status(500).send('Error al obtener los libros.');
        }
    });

    // Puerto de escucha
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor en el puerto ${PORT}`);
    });
};

startServer();
