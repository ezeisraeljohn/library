const library = [];

const container = document.querySelector("#container");
const newBook = document.querySelector(".new-book");
const formDiv = document.querySelector(".form-div");
const submit = document.querySelector(".submit");
const form = document.querySelector(".form");

function Book(author, title, pages, isRead) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isRead = isRead;
}

function addToLibrary(author, title, pages, isRead) {
  console.log(author);
  const book = new Book(author, title, pages, isRead);
  const index = library.push(book);
  return [book, index - 1];
}

addToLibrary("Wisdom", "The Burning Candle", 223, true);
addToLibrary("Israel", "Thunder Strikes Again", 111, false);

function addBooks(books, index) {
  const book = document.createElement("div");
  const title = document.createElement("h2");
  const authPage = document.createElement("div");
  const pages = document.createElement("p");
  const author = document.createElement("h3");
  const isRead = document.createElement("div");
  const radio = document.createElement("input");
  const toggle = document.createElement("p");
  const remove = document.createElement("button");

  book.classList.add("book", `book-${index}`);
  title.classList.add("title", `title-${index}`);
  authPage.classList.add("auth-pages", `auth-pages-${index}`);
  pages.classList.add("pages", `pages-${index}`);
  author.classList.add("author", `author-${index}`);
  isRead.classList.add("isRead", `isRead-${index}`);
  radio.classList.add(`radio-${index}`);
  radio.type = "radio";
  toggle.classList.add("toggle", `toggle-${index}`);
  remove.classList.add("remove", `remove-${index}`);

  title.textContent = books.title;
  author.textContent = books.author;
  pages.textContent = `${books.pages} Pages`;
  toggle.textContent = `${books.isRead ? "Read" : "Not Read"}`;
  remove.textContent = "Remove Book";

  authPage.appendChild(author);
  authPage.appendChild(pages);
  isRead.appendChild(radio);
  isRead.appendChild(toggle);
  isRead.appendChild(remove);

  book.appendChild(title);
  book.appendChild(authPage);
  book.appendChild(isRead);

  container.appendChild(book);
}

function loopAddBooks(library) {
  library.forEach((books, index) => addBooks(books, index));
  console.log(library);
}

newBook.addEventListener("click", (event) => {
  formDiv.toggleAttribute("hidden");
});

submit.addEventListener("click", (event) => {
  const newForm = new FormData(form);
  const title = newForm.get("title");
  const author = newForm.get("author");
  const pages = newForm.get("pages");

  const book = addToLibrary(author, title, pages, false);
  addBooks(book[0], book[1]);
  event.preventDefault();
});

loopAddBooks(library);

container.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove")) {
    const classes = Array.from(event.target.classList);
    const index = classes[1].split("-")[1];
    console.log(index);
    const book = container.querySelector(`.book-${index}`);
    container.removeChild(book);
  }
});
