import Book from "./Book.js";

const STORAGE_KEY = "BOOKSHELF";
let bookshelf =
  localStorage.getItem(STORAGE_KEY) == undefined
    ? []
    : JSON.parse(localStorage.getItem(STORAGE_KEY));

export function add(book) {
  append(book);

  bookshelf.push({
    id: book.id,
    title: book.title,
    author: book.author,
    year: book.year,
    isComplete: book.isComplete,
  });
}

export function save() {
  const parsedBooks = JSON.stringify(bookshelf);
  localStorage.setItem(STORAGE_KEY, parsedBooks);
  document.dispatchEvent(new Event("ondatasaved"));
}

export function append(book) {
  let bookshelfContainer;

  if (book.isComplete) {
    bookshelfContainer = document.querySelector("#finished-books");
  } else {
    bookshelfContainer = document.querySelector("#reading-list");
  }

  const bookComponent = book.createComponent();
  bookshelfContainer.appendChild(bookComponent);
}

export function load() {
  clearBookshelf()

  bookshelf.forEach((item) => {
    const book = new Book(
      item.id,
      item.title,
      item.author,
      item.year,
      item.isComplete
    );

    append(book);
  });

  document.dispatchEvent(new Event("ondataloaded"));
}

export function update() {
  if (isStorageExist()) {
    save();
  }
}

export function deleteItem(id) {
  const indexRemovedItem = findIndex(id);
  bookshelf.splice(indexRemovedItem, 1);
  remove(id);
}

export function remove(id) {
  const removedBook = document.getElementById(`${id}`);
  removedBook.remove();
}

export function edit(book){
  const editItemIndex = findIndex(book.id)

  let item = bookshelf.splice(editItemIndex, 1)

  item = book;
  
  const rightBookshelf = bookshelf.slice(editItemIndex, bookshelf.length)
  const leftBookshelf = bookshelf.slice(0, editItemIndex)

  rightBookshelf.unshift(item)

  const newBookshelf = leftBookshelf.concat(rightBookshelf)
  bookshelf = newBookshelf

  update()
  load()
}

export function markFinished(id) {
  const item = find(id);
  item.isComplete = true;

  const book = new Book(
    item.id,
    item.title,
    item.author,
    item.year,
    item.isComplete
  );
  append(book);

  remove(id);
  update();
}

export function markUnfinished(id) {
  const item = find(id);
  item.isComplete = false;

  const book = new Book(
    item.id,
    item.title,
    item.author,
    item.year,
    item.isComplete
  );
  deleteItem(id);
  add(book);

  update();
}

export function search(title) {
  const result = bookshelf.filter((book) => {
    if (book.title.includes(title)) {
      return book;
    }
  });

  clearBookshelf()

  for (const item of result) {
    const book = new Book(
      item.id,
      item.title,
      item.author,
      item.year,
      item.isComplete
    );
    append(book);
  }
}

export function clearBookshelf(){
  document.querySelector("#reading-list").innerHTML = "";
  document.querySelector("#finished-books").innerHTML = "";
}

export function find(id) {
  let book = undefined;

  for (const item of bookshelf) {
    if (item.id === parseInt(id)) {
      book = item;
    }
  }

  return book;
}

export function findIndex(id) {
  let index = 0;

  for (const item of bookshelf) {
    if (item.id === id) {
      return index;
    }
    index++;
  }

  return -1;
}

export function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Your browser doesn't support localStorage or Web Storage API");
    return false;
  }
  return true;
}
