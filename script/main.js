let rumbieLibrary = []
let removeButtons; 
let changeButtons;

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

function updateRemoveButtons() {
  removeButtons = document.querySelectorAll('.remove-btn');
  changeButtons = document.querySelectorAll('.changeRead-btn');
}

function clickRemoveButtons() {
  for(let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener('click', function() {
      rumbieLibrary.splice(i, 1);
      displayBooks(rumbieLibrary);
    });
  }
}

function changeReadStatus() {
  for(let i = 0; i < changeButtons.length; i ++)
  {
    changeButtons[i].addEventListener('click', function() {
      let currentRead = rumbieLibrary[i].read
      if (currentRead === 'read'){
          rumbieLibrary[i].read = 'not read yet';
      }
      else
      {
        rumbieLibrary[i].read = 'read';
      }
      displayBooks(rumbieLibrary);
    });
  }
}

function displayBooks(library) {

  let rows = document.getElementsByClassName('table-book');
  while (rows.length > 0){
    rows[0].remove();
  }

  library.forEach((book) => {
    let row = document.createElement("tr");

    row.setAttribute('class', 'table-book');
    row.classList.add('Rumbie-happy');
    let tableData1 = document.createElement('td');
    let tableData2 = document.createElement('td');
    let tableData3 = document.createElement('td');
    let tableData4 = document.createElement('td');
    let tableData5 = document.createElement('td');
    let tableData6 = document.createElement('td');


    let button1 = document.createElement('button');
    button1.setAttribute('class', 'remove-btn');

    let button2 = document.createElement('button');
    button2.setAttribute('class', 'changeRead-btn');

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
  });

    updateRemoveButtons();
    clickRemoveButtons();
    changeReadStatus();
}

displayBooks(rumbieLibrary);

let newBook = document.getElementById('newBook');
let myForm = document.querySelector('form')
let closeFormButton = document.querySelector('.close');


function closeForm() {
  myForm.style.top = '-100%';
}

newBook.addEventListener('click', function() {
  myForm.style.top = '0';
}); 

closeFormButton.addEventListener('click', function(){
  closeForm();
});

function createNewBook() {  

  let mytitle = '';
  let myauthor = '';
  let mypages = '';
  let myread = '';

  for(let i = 0; i < myForm.length; i ++)
  {
    switch(myForm.elements[i].name) {
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
    }
  }

  let newBook = new Book(mytitle, myauthor, mypages, myread);

  let confirm = true;
  for(let i = 0; i < rumbieLibrary.length; i ++){
    if ((rumbieLibrary[i].title == newBook.title) && (rumbieLibrary[i].author == newBook.author)) {
      confirm = false;
      break;
    }
  }

  if(confirm){
    addBookToLibrary(newBook);
  }
  myForm.reset();
}

let submitButton = myForm.elements[myForm.length - 1];

submitButton.addEventListener('click', function(e){
  createNewBook();
  displayBooks(rumbieLibrary);
  closeForm();
  e.preventDefault();
});


