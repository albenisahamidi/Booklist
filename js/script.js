document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("book-form");
    var titleInput = document.getElementById("book-title");
    var authorInput = document.getElementById("book-author");
    var bookList = document.getElementById("book-list");

    var savedBooks = JSON.parse(localStorage.getItem("books")) || [];
    savedBooks.forEach(book => addBookToList(book.title, book.author));

    form.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();

    let isValid = true;

    if (title === "") {
      titleInput.nextElementSibling.style.display = "block";
      isValid = false;
    } else {
      titleInput.nextElementSibling.style.display = "none";
    }

    if (author === "") {
      authorInput.nextElementSibling.style.display = "block";
      isValid = false;
    } else {
      authorInput.nextElementSibling.style.display = "none";
    }

    if (!isValid) return;

    addBookToList(title, author);
    saveBook(title, author);
    alert("Book added succesfully!");

    titleInput.value = "";
    authorInput.value = "";
  });
  function addBookToList(title, author) {
    var li = document.createElement("li");
    var details = document.createElement("span");
    details.textContent = `${title} by ${author}`;

    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", function() {
        li.remove();
        removeBook(title, author);
    });
    li.append(details, deleteBtn);
    bookList.appendChild(li);
  }
  function saveBook(title, author) {
    var books = JSON.parse(localStorage.getItem("books")) || [];
    books.push({title, author});
    localStorage.setItem("books", JSON.stringify(books));
  }

  function removeBook(title, author) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books = books.filter(book => !(book.title === title && book.author === author));
    localStorage.setItem("books", JSON.stringify(books));
  }
});