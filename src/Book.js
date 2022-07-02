import { Author } from './Author.js';
import { User } from './User.js';

/**
 * @param {string} title
 * @param {Date} year
 * @param {User} publicationBy
 * @param {Author[]} authors
 * @constructor
 * @property {string} title
 * @property {Date} year
 * @property {Author[]} authors
 * @property {User[]} likedUsers
 * @property {User} publicationBy
 */
export function Book(title, year, publicationBy, authors) {
  this.title = title;
  this.authors = authors;
  this.year = year;
  this.likedUsers = [];
  this.publicationBy = publicationBy;

  publicationBy.myBooks.push(this);

  this.authors.forEach((autor) => autor.books.push(this));

  Object.defineProperty(this, 'suggestedBooks', {
    get() {
      const booksAuthor = [];
      this.authors.map((author) =>
        author.books.map((book) =>
          book.title !== this.title && booksAuthor.indexOf(book.title) === -1
            ? booksAuthor.push(book.title)
            : null
        )
      );

      return booksAuthor.join(', ');
    },
  });

  Object.defineProperty(this, 'suggestedPublicators', {
    get() {
      const currentAutors = [];
      this.authors.map((autor) => currentAutors.push(autor.name));

      const authors = [];
      this.authors.map((author) => {
        author.books.map((book) => {
          currentAutors.indexOf(book.publicationBy.name) === -1 &&
          authors.indexOf(book.publicationBy.name) === -1 &&
          book.publicationBy.name !== this.publicationBy.name
            ? authors.push(book.publicationBy.name)
            : null;
        });
      });

      return authors.join(', ');
    },
  });
}
