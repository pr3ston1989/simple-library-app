let myLibrary = [];

function Book(title, author, year, pages, publisher, series, volume, cover, read) {
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

Book.prototype.bookSummary = function() {
    console.log(`Book "${this.title}" was written by ${this.author} and released by ${this.publisher}.`)
    if (this.series != undefined) {
        console.log(`It's volume #${this.volume} of series "${this.series}".`);
    }
}

const cards = document.getElementById("grid");


function addBookToLibrary(book) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.id = book.id;
    const bookCardFront = document.createElement("div");
    bookCardFront.classList.add("content");
    bookCardFront.classList.add("book-card-front");
    const bookCardBack = document.createElement("div");
    bookCardBack.classList.add("content");
    bookCardBack.classList.add("book-card-back");
    let img = document.createElement("img");
    img.src = book.cover;
    bookCardFront.appendChild(img);
    const readStatus = document.createElement("h2");
    if (book.read === false) {
        readStatus.textContent = "NOT READ";
    } else {
        readStatus.textContent = "READ";
    };
    bookCardFront.appendChild(readStatus);
    const title = document.createElement("p");
    title.textContent = `Tytuł: ${book.title}`;
    bookCardBack.appendChild(title);
    const author = document.createElement("p");
    author.textContent = `Autor: ${book.author}`;
    bookCardBack.appendChild(author);
    const year = document.createElement("p");
    year.textContent = `Rok wydania: ${book.year}`;
    bookCardBack.appendChild(year);
    const pages = document.createElement("p");
    pages.textContent = `Ilość stron: ${book.pages}`;
    bookCardBack.appendChild(pages);
    const publisher = document.createElement("p");
    publisher.textContent = `Wydawnictwo: ${book.publisher}`;
    bookCardBack.appendChild(publisher);
    if (book.series !== undefined && book.volume !== undefined) {
        const series = document.createElement("p");
        series.textContent = `Cykl: ${book.series} (tom ${book.volume})`;
        bookCardBack.appendChild(series);
    }
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons-container")
    const remove = document.createElement("button");
    remove.id = book.id;
    remove.textContent = "DELETE BOOK";
    remove.addEventListener('click', function(event) {
        event.preventDefault();
        removeFromLibrary(String(book.id));
    });
    const toggleRead = document.createElement("button");
    toggleRead.classList.add(book.id);
    if (book.read === false) {
        toggleRead.textContent = "READ";
    } else {
        toggleRead.textContent = "NOT READ";
    };
    toggleRead.addEventListener('click', function(event) {
        event.preventDefault();
        toggleRead.textContent = (toggleRead.textContent == 'READ') ? "NOT READ" : "READ";
        changeReadStatus(book, readStatus);
    });
    buttonsDiv.appendChild(remove);
    buttonsDiv.appendChild(toggleRead);
    bookCardBack.appendChild(buttonsDiv);
    bookCard.appendChild(bookCardFront);
    bookCard.appendChild(bookCardBack);
    cards.appendChild(bookCard);
}

function changeReadStatus(book, h2) {
    book.read = (book.read === false) ? true : false;
    h2.textContent = (book.read === false) ? "NOT READ" : "READ";
}

function createInitialLibrary() {
    const halny = new Book("Halny", "Remigiusz Mróz", 2020, 480, "Filia", "Komisarz Forst", 6, "./img/halny.webp", true);
    const emigracja = new Book("Emigracja", "Malcolm XD", 2019, 240, "W.A.B.", undefined, undefined, "./img/emigracja.webp", false);
    const malowanyCzlowiek = new Book("Malowany człowiek", "Peter V. Brett", 2008, 800, "Fabryka Słów", "Cykl Demoniczny", 1, "./img/malowany.webp", false);
    const glebiaSkokowiec = new Book("Głębia. Skokowiec", "Marcin Podlewski", 2015, 720, "Fabryka Słów", "Głębia", 1, "./img/glebia.jpg", true);
    const behawiorysta = new Book("Behawiorysta", "Remigiusz Mróz", 2016, 496, "Filia", "Gerard Edling", 1, "./img/behawiorysta.webp", false);
    const iluzjonista = new Book("Iluzjonista", "Remigiusz Mróz", 2019, 528, "Filia", "Gerard Edling", 2, "./img/iluzjonista.webp", false);

    myLibrary.push(halny, emigracja, malowanyCzlowiek, glebiaSkokowiec, behawiorysta, iluzjonista);

    for (book of myLibrary) {
        addBookToLibrary(book);
    };
}

createInitialLibrary();

function removeFromLibrary(bookId) {
    myLibrary = myLibrary.filter(book => book.id != bookId);
    console.dir(myLibrary);
    const divGrid = document.getElementById("grid");
    const divCard = document.getElementById(bookId);
    divGrid.removeChild(divCard);
};



const addBookBtn = document.getElementById("add");
const addBookForm = document.getElementById("add-book");
addBookBtn.addEventListener('click', () => {
    addBookForm.style.display = 'block';
})

const submitBtn = document.getElementById("submit");
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const form = document.getElementById("form");
    const inputs = document.getElementsByTagName("input");
    console.log(inputs);
    const inputsData = [];
    for (let i = 0; i < 8; i++) {
        inputsData.push(inputs[i].value); 
    }
    const readStatusRadio = (document.querySelector("input[type='radio']:checked").value === 'yes') ? true : false;
    console.log(readStatusRadio); 
    const newBook = new Book(inputsData[0], inputsData[1], inputsData[2], inputsData[3], inputsData[4], inputsData[5], inputsData[6], inputsData[7], readStatusRadio);
    addBookToLibrary(newBook);
    form.reset();
    addBookForm.style.display = 'none';
})