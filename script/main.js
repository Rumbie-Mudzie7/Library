let rumbieLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = (read.toLowerCase() === 'yes') ? 'read' : 'not read yet';
}

Book.prototype.info = function() {
  return (`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`);
}

function addBookToLibrary(book) {
  rumbieLibrary.push(book);
}

// const book1 = new Book("Roy's book", "Ntaate", 1, "YES");
// const book2 = new Book('Rumbie\'s book', 'Rumbidzayi', 500, "No");
// const book3 = new Book("JavaScript is fun now", "Holy Spirit help", 10, "yes");
// addBookToLibrary(book1);
// addBookToLibrary(book2);
// addBookToLibrary(book3);

// rumbieLibrary.forEach((book) => {
//   console.log(book.info());
// }); 