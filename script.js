class Library {
    constructor() {
        this.bookList = [];
    }

    addBook(book) {
        this.bookList.push(book);
        return book;
    }

    removeBook(book) {
        this.bookList = this.bookList.filter(bookInLibrary => bookInLibrary.id != book.id);
        return book;
    }

    getLibrary() {
        return this.bookList;
    }
}

class Book {
    constructor(title, author, year, pages, publisher, series, volume, cover, read) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.pages = pages;
        this.publisher = publisher;
        this.series = series;
        this.volume = volume;
        this.cover = cover;
        this.read = read;
        this.id = (author+title).split(" ").join("").toLowerCase();
    }

    bookSummary() {
        console.log(`Book "${this.title}" was written by ${this.author} and released by ${this.publisher}.`)
        if (this.series != undefined) {
            console.log(`It's volume #${this.volume} of series "${this.series}".`);
        }
    }

    changeReadStatus() {
        this.read = (this.read === false) ? true : false;
    }
}

class Display {
    

    constructor(book, library) {
        this.cards = document.getElementById("grid");
        this.bookCard = document.createElement("div");
        this.bookCard.classList.add("book-card");
        this.bookCard.id = book.id;
        this.bookCardFront = document.createElement("div");
        this.bookCardFront.classList.add("content");
        this.bookCardFront.classList.add("book-card-front");
        this.bookCardBack = document.createElement("div");
        this.bookCardBack.classList.add("content");
        this.bookCardBack.classList.add("book-card-back");
        this.img = document.createElement("img");
        this.img.src = book.cover;
        this.bookCardFront.appendChild(this.img);
        this.readStatus = document.createElement("h2");
        if (book.read === false) {
            this.readStatus.textContent = "NOT READ";
        } else {
            this.readStatus.textContent = "READ";
        };
        this.bookCardFront.appendChild(this.readStatus);
        this.title = document.createElement("p");
        this.title.textContent = `Title: ${book.title}`;
        this.bookCardBack.appendChild(this.title);
        this.author = document.createElement("p");
        this.author.textContent = `Author: ${book.author}`;
        this.bookCardBack.appendChild(this.author);
        this.year = document.createElement("p");
        this.year.textContent = `Release year: ${book.year}`;
        this.bookCardBack.appendChild(this.year);
        this.pages = document.createElement("p");
        this.pages.textContent = `Number of pages: ${book.pages}`;
        this.bookCardBack.appendChild(this.pages);
        this.publisher = document.createElement("p");
        this.publisher.textContent = `Published by: ${book.publisher}`;
        this.bookCardBack.appendChild(this.publisher);
        if (book.series !== undefined && book.volume !== undefined) {
            this.series = document.createElement("p");
            this.series.textContent = `Series: ${book.series} (Volume ${book.volume})`;
            this.bookCardBack.appendChild(this.series);
        }
        this.buttonsDiv = document.createElement("div");
        this.buttonsDiv.classList.add("buttons-container")
        this.remove = document.createElement("button");
        this.remove.id = book.id;
        this.remove.textContent = "DELETE BOOK";
        this.remove.addEventListener('click', (event) => {
            event.preventDefault();
            this.removeCard();
            library.removeBook(book);
        });
        this.toggleRead = document.createElement("button");
        this.toggleRead.classList.add(book.id);
        if (book.read === false) {
            this.toggleRead.textContent = "READ";
        } else {
            this.toggleRead.textContent = "NOT READ";
        };
        this.toggleRead.addEventListener('click', (event) => {
            event.preventDefault();
            book.changeReadStatus();
            this.toggleRead.textContent = (this.toggleRead.textContent == 'READ') ? "NOT READ" : "READ";
            this.readStatus.textContent = (book.read === true) ? "READ" : "NOT READ";
        });
        this.buttonsDiv.appendChild(this.remove);
        this.buttonsDiv.appendChild(this.toggleRead);
        this.bookCardBack.appendChild(this.buttonsDiv);
        this.bookCard.appendChild(this.bookCardFront);
        this.bookCard.appendChild(this.bookCardBack);
        this.cards.appendChild(this.bookCard);
    }

    removeCard() {
        const divGrid = document.getElementById("grid");
        divGrid.removeChild(this.bookCard);
    }
}




(() => {
    const myLibrary = new Library();
    myLibrary.addBook(new Book("Halny", "Remigiusz Mróz", 2020, 480, "Filia", "Komisarz Forst", 6, "./img/halny.webp", true));
    myLibrary.addBook(new Book("Emigracja", "Malcolm XD", 2019, 240, "W.A.B.", undefined, undefined, "./img/emigracja.webp", false));
    myLibrary.addBook(new Book("Malowany człowiek", "Peter V. Brett", 2008, 800, "Fabryka Słów", "Cykl Demoniczny", 1, "./img/malowany.webp", false));
    myLibrary.addBook(new Book("Głębia. Skokowiec", "Marcin Podlewski", 2015, 720, "Fabryka Słów", "Głębia", 1, "./img/glebia.jpg", true));
    myLibrary.addBook(new Book("Behawiorysta", "Remigiusz Mróz", 2016, 496, "Filia", "Gerard Edling", 1, "./img/behawiorysta.webp", false));
    myLibrary.addBook(new Book("Iluzjonista", "Remigiusz Mróz", 2019, 528, "Filia", "Gerard Edling", 2, "./img/iluzjonista.webp", false));

    for (book of myLibrary.getLibrary()) {
        new Display(book, myLibrary);
    };

    const addBookBtn = document.getElementById("add");
    const addBookForm = document.getElementById("add-book");
    const submitBtn = document.getElementById("submit");
    addBookBtn.addEventListener('click', () => {
        addBookForm.style.display = 'block';
    })
    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const form = document.getElementById("form");
        const inputs = document.getElementsByTagName("input");
        const inputsData = [];
        for (let i = 0; i < 8; i++) {
            inputsData.push(inputs[i].value); 
        }
        const readStatusRadio = (document.querySelector("input[type='radio']:checked").value === 'yes') ? true : false;
        const newBook = myLibrary.addBook(new Book(
            inputsData[0], inputsData[1], inputsData[2], inputsData[3],
            inputsData[4], inputsData[5], inputsData[6], inputsData[7],
            readStatusRadio));
        new Display(newBook);
        form.reset();
        addBookForm.style.display = 'none';
    })
})();