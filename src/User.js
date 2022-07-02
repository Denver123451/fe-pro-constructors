import { Book } from './Book.js';

/**
 * @param {string} name
 * @param {Date} date
 * @constructor
 * @property {string} name
 * @property {Date} date
 * @property {Book[]} myBooks
 * @property {User[]} friends
 * @property {Book[]} likes
 */
export function User(name, date) {
  this.name = name;
  this.date = date;
  this.myBooks = [];
  this.friends = [];
  this.likes = [];

  this.addToFriends = function (user) {
    if (this.friends.includes(user)) {
      this.friends = this.friends.filter((item) => item !== user);
      user.friends = user.friends.filter((item) => item !== this);
    } else {
      this.friends.push(user);
      user.friends.push(this);
    }
  };

  this.removeFriend = this.addToFriends;

  this.likeBook = function (book) {
    if (this.likes.includes(book)) {
      this.likes = this.likes.filter((item) => item !== book);
      book.likedUsers = book.likedUsers.filter((item) => item !== this);
    } else {
      this.likes.push(book);
      book.likedUsers.push(this);
    }
  };

  this.unlikeBook = this.likeBook;

  Object.defineProperty(this, 'friendsNames', {
    get() {
      let names = [];
      this.friends.forEach((user) => {
        names.push(user.name);
      });
      return names.join(', ');
    },
  });

  Object.defineProperty(this, 'likedBooks', {
    get() {
      let books = [];
      this.likes.forEach((book) => {
        books.push(book.title);
      });
      return books.join(', ');
    },
  });

  Object.defineProperty(this, 'publishedBooks', {
    get() {
      let books = [];
      this.myBooks.forEach((book) => {
        books.push(book.title);
      });
      return books.join(', ');
    },
  });
}
