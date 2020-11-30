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


const book1 = new Book("Roy's book", "Ntaate", 1, "YES");
const book2 = new Book('Rumbie\'s book', 'Rumbidzayi', 500, "No");
const book3 = new Book("JavaScript is fun now", "Holy Spirit help", 10, "yes");
const book4 = new Book("Ruby Book", "Hansson", 456, "NO");

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);

let table = document.querySelector('table');

function displayBooks(library) {

  library.forEach((book) => {
    let row = document.createElement("tr");

    let tableData1 = document.createElement('td');
    let tableData2 = document.createElement('td');
    let tableData3 = document.createElement('td');
    let tableData4 = document.createElement('td');

    tableData1.textContent = book.title;
    tableData2.textContent = book.author;
    tableData3.textContent = book.pages;
    tableData4.textContent = book.read;

    row.appendChild(tableData1);
    row.appendChild(tableData2);
    row.appendChild(tableData3);
    row.appendChild(tableData4);

    table.appendChild(row);
  });

}

displayBooks(rumbieLibrary);