const rumbieLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = (read.toLowerCase() === 'yes') ? 'read' : 'not read yet';
}

Book.prototype = {
  info() {
    return (`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`);
  },
};

function addBookToLibrary(book) {
  rumbieLibrary.push(book);
}

function saveLibraryInStorage () {
  localStorage.setItem("mylibrary", JSON.stringify(rumbieLibrary));
}

const table = document.querySelector('table');

function displayAddedBook(book) {
  const row = document.createElement('tr');

  row.setAttribute('class', 'table-book');
  row.classList.add('Rumbie-happy');
  const tableData1 = document.createElement('td');
  const tableData2 = document.createElement('td');
  const tableData3 = document.createElement('td');
  const tableData4 = document.createElement('td');
  const tableData5 = document.createElement('td');
  const tableData6 = document.createElement('td');


  const button1 = document.createElement('button');
  button1.setAttribute('class', 'remove-btn');
  button1.addEventListener('click', function deleteBook() {
    const td = this.parentElement;
    const row = td.parentElement;
    row.remove();
    const index = rumbieLibrary.indexOf(book);
    rumbieLibrary.splice(index, 1);
    saveLibraryInStorage();
  });

  const button2 = document.createElement('button');
  button2.setAttribute('class', 'changeRead-btn');
  button2.addEventListener('click', function changeReadStatus() {
    const td = this.parentElement;
    const row = td.parentElement;
    const currentRead = row.childNodes[3].textContent;
    const index = rumbieLibrary.indexOf(book);
    if (currentRead === 'read') {
      row.childNodes[3].textContent = 'not read yet';
      rumbieLibrary[index].read = 'not read yet';
    } else {
      row.childNodes[3].textContent = 'read';
      rumbieLibrary[index].read = 'read';
    }
    saveLibraryInStorage();
  });

  tableData5.appendChild(button1);
  tableData6.appendChild(button2);

  tableData1.textContent = book.title;
  tableData2.textContent = book.author;
  tableData3.textContent = book.pages;
  tableData4.textContent = book.read;
  button1.textContent = 'Delete';
  button2.textContent = 'Change Status';

  row.appendChild(tableData1);
  row.appendChild(tableData2);
  row.appendChild(tableData3);
  row.appendChild(tableData4);
  row.appendChild(tableData5);
  row.appendChild(tableData6);

  table.appendChild(row);
}

const newBook = document.getElementById('newBook');
const myForm = document.querySelector('form');
const closeFormButton = document.querySelector('.close');


function closeForm() {
  myForm.style.top = '-100%';
}

newBook.addEventListener('click', () => {
  myForm.style.top = '0';
});

closeFormButton.addEventListener('click', () => {
  closeForm();
});

function createNewBook() {
  let mytitle = '';
  let myauthor = '';
  let mypages = '';
  let myread = '';

  for (let i = 0; i < myForm.length; i += 1) {
    switch (myForm.elements[i].name) {
      case 'title':
        mytitle = myForm.elements[i].value;
        break;
      case 'author':
        myauthor = myForm.elements[i].value;
        break;
      case 'pages':
        mypages = myForm.elements[i].value;
        break;
      case 'read':
        myread = myForm.elements[i].value;
        break;
      default:
    }
  }

  const newBook = new Book(mytitle, myauthor, mypages, myread);

  let confirm = true;
  for (let i = 0; i < rumbieLibrary.length; i += 1) {
    if ((rumbieLibrary[i].title === newBook.title)
        && (rumbieLibrary[i].author === newBook.author)) {
      confirm = false;
      break;
    }
  }

  if (confirm) {
    addBookToLibrary(newBook);
    displayAddedBook(newBook);
    saveLibraryInStorage();
  }
  myForm.reset();
}

if (localStorage.getItem("mylibrary")) {
  let library = JSON.parse(localStorage.getItem("mylibrary"));
  for (let i = 0; i < library.length; i += 1) {
    rumbieLibrary.push(library[i]);
    displayAddedBook(library[i]);
  }
}

const submitButton = myForm.elements[myForm.length - 1];

submitButton.addEventListener('click', (e) => {
  createNewBook();
  closeForm();
  e.preventDefault();
});
