const Book = require('./models/Book');

const resolvers = {
  Query: {
    getBooks: async () => {
      return await Book.find();
    },
    getBook: async (_, { id }) => {
      return await Book.findById(id);
    },
  },
  Mutation: {
    addBook: async (_, { title, author, genre, year }) => {
      const newBook = new Book({ title, author, genre, year });
      return await newBook.save();
    },
    updateBook: async (_, { id, title, author, genre, year }) => {
      return await Book.findByIdAndUpdate(id, { title, author, genre, year }, { new: true });
    },
    deleteBook: async (_, { id }) => {
      return await Book.findByIdAndRemove(id);
    },
  },
};

module.exports = resolvers;
