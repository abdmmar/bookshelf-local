import * as Bookshelf from "./bookshelf.js";

class Book {
  constructor(id, title, author, year, isComplete) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = parseInt(year);
    this.isComplete = isComplete;
  }

  createComponent() {
    const bookContainer = document.createElement("li");
    const bookItem = document.createElement("article");
    const bookTitle = document.createElement("h4");
    const bookAuthor = document.createElement("p");
    const bookYear = document.createElement("p");
    const bookAction = document.createElement("div");

    bookContainer.id = this.id;
    bookItem.classList.add("book");
    bookTitle.classList.add("book-title");
    bookAuthor.classList.add("book-author");
    bookYear.classList.add("book-year");
    bookAction.classList.add("book-action");

    bookTitle.innerText = this.title;
    bookAuthor.innerText = this.author;
    bookYear.innerText = this.year;

    bookItem.appendChild(bookTitle);
    bookItem.appendChild(bookAuthor);
    bookItem.appendChild(bookYear);

    if (this.isComplete) {
      bookAction.appendChild(this.createUnreadButton(this.id));
      bookAction.appendChild(this.createRemoveButton(this.id));
      bookAction.appendChild(this.createEditButton(this.id));
    } else {
      bookAction.appendChild(this.createReadButton(this.id));
      bookAction.appendChild(this.createRemoveButton(this.id));
      bookAction.appendChild(this.createEditButton(this.id));
    }

    bookItem.appendChild(bookAction);

    bookContainer.appendChild(bookItem);

    return bookContainer;
  }

  createUnreadButton(id) {
    const button = this.createButtonIcon();

    button.id = id;
    button.classList.add("book-mark-unread-btn");
    button.setAttribute("aria-label", "Mark as unread");
    button.children[0].textContent = "Mark as unread";

    const svg = this.createSVG("book-open");
    button.appendChild(svg);

    button.addEventListener("click", (e) => {
      e.preventDefault();

      Bookshelf.markUnfinished(id);
    });

    return button;
  }

  createReadButton(id) {
    const button = this.createButtonIcon();

    button.id = id;
    button.classList.add("book-mark-read-btn");
    button.setAttribute("aria-label", "Mark as read");
    button.children[0].textContent = "Mark as read";

    const svg = this.createSVG("check");
    button.appendChild(svg);

    button.addEventListener("click", (e) => {
      e.preventDefault();

      Bookshelf.markFinished(id);
    });

    return button;
  }

  createEditButton(id){
    const button = this.createButtonIcon()

    button.id = id
    button.classList.add("book-edit-btn");
    button.setAttribute("aria-label", "Edit book");
    button.children[0].textContent = "Edit book";

    const svg = this.createSVG("pencil")
    button.appendChild(svg)

    button.addEventListener("click", (e) => {
      e.preventDefault()
      const inputBookForm = document.querySelector(".input-book-form");
      const title = document.querySelector("#input-book-title");
      const author = document.querySelector("#input-book-author");
      const year = document.querySelector("#input-book-year");
      const isComplete = document.querySelector("#input-book-is-complete");
      const btnSubmit = document.querySelector(".book-submit");

      inputBookForm.classList.replace('input-book-form', 'input-book-form-edit')
      inputBookForm.id = id

      const book = Bookshelf.find(id)

      title.value = book.title
      author.value = book.author
      year.value = book.year
      isComplete.checked = book.isComplete
      btnSubmit.textContent = "Edit Book"

      const resetButton = document.createElement('button')
      resetButton.classList.add('book-submit-reset')
      resetButton.setAttribute('type', 'reset')
      resetButton.textContent = "Cancel"

      resetButton.addEventListener("click", function (e) {
        e.preventDefault()
        e.target.parentElement.reset()
        e.target.parentElement.removeAttribute('id')
        e.target.parentElement.classList.replace('input-book-form-edit', 'input-book-form')
        
        btnSubmit.textContent = "Add Book to Bookshelf"
        this.remove()
      })
      
      inputBookForm.appendChild(resetButton)

      title.focus()
    })

    return button
  }

  createRemoveButton(id) {
    const button = this.createButtonIcon();

    button.id = id;
    button.classList.add("book-remove-btn");
    button.setAttribute("aria-label", "Remove book");
    button.children[0].textContent = "Remove book";

    const svg = this.createSVG("trash");
    button.appendChild(svg);

    button.addEventListener("click", (e) => {
      e.preventDefault();

      const isDelete = confirm(
        "Are you sure want to delete this book from list?"
      );

      if (isDelete) {
        Bookshelf.deleteItem(id);
        Bookshelf.update();
      }
    });

    return button;
  }

  createButtonIcon() {
    const button = document.createElement("button");
    const tooltip = document.createElement("span");

    button.classList.add("btn-icon");
    tooltip.classList.add("tooltip");

    button.appendChild(tooltip);

    return button;
  }

  createSVG(icon) {
    const svg = document.createElement("img");
    svg.setAttribute(
      "src",
      `https://s2.svgbox.net/hero-outline.svg?ic=${icon}&color=0f61db`
    );
    svg.setAttribute("focusable", "false");
    svg.setAttribute("width", "18");
    svg.setAttribute("height", "18");

    return svg;
  }
}

export default Book;
