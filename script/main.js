import Book from "./Book.js";
import * as Bookshelf from "./bookshelf.js";

document.addEventListener("DOMContentLoaded", () => {
  const inputBookForm = document.querySelector(".input-book-form");
  const searchBook = document.querySelector(".search-book");

  if (Bookshelf.isStorageExist()) {
    Bookshelf.load();
  }

  searchBook.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchBookTitle = document.querySelector(".search-book-title");
    Bookshelf.search(searchBookTitle.value);
  });

  inputBookForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.querySelector("#input-book-title");
    const author = document.querySelector("#input-book-author");
    const year = document.querySelector("#input-book-year");
    const isComplete = document.querySelector("#input-book-is-complete");

    if (this.className === 'input-book-form-edit' && typeof parseInt(this.id) === 'number') {
      const item = Bookshelf.find(parseInt(this.id))

      item.title = title.value
      item.author = author.value
      item.year = year.value
      item.isComplete = isComplete.checked

      Bookshelf.edit(item)

      this.reset()
      this.removeAttribute('id')
      this.classList.replace('input-book-form-edit', 'input-book-form')

      const btnSubmit = document.querySelector('.book-submit')
      const btnReset = document.querySelector('.book-submit-reset')
      btnSubmit.textContent = "Add Book to Bookshelf"
      btnReset.remove()
      return
    }

    const book = new Book(
      +new Date(),
      title.value,
      author.value,
      year.value,
      isComplete.checked
    );
    Bookshelf.add(book);
    Bookshelf.save();

    // Clear input field
    title.value = "";
    author.value = "";
    year.value = "";
    isComplete.checked = false;
  });
});

document.addEventListener("ondatasaved", () => {
  console.info("Book addedd successfully to Bookshelf!");
});

document.addEventListener("ondataloaded", () => {
  console.info("Book loaded successfully from localStorage!");
});
