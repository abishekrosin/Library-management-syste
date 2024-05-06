let form = document.querySelector("#form-detail");

function clear() {
  for (let element of form) {
    element.value = "";
  }
}

function searchClear() {
  let search = document.querySelector("#search");
  search.value = "";
}

let books = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let book = {
    id: Math.floor(Math.random() * 1000),
    title: $(".book-title").val().toLowerCase(),
    author: $(".book-author").val().toLowerCase(),
    genre: $(".book-genre").val().toLowerCase(),
    year: $(".book-year").val().toLowerCase(),
    quantity: $(".book-quantity").val().toLowerCase(),
  };

  let storedBooks = JSON.parse(localStorage.getItem("storedBooks")) || [];
  storedBooks.push(book);
  localStorage.setItem("storedBooks", JSON.stringify(storedBooks));

  let tbody = $("table tbody");
  tbody.append(`
    <tr class="${book.id}">
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.genre}</td> 
      <td>${book.year}</td>
      <td>${book.quantity}</td>
    </tr>
  `);

  alert("Successfully submitted");
  clear();
});

let storedBooks = JSON.parse(localStorage.getItem("storedBooks")) || [];
let tbody = $("table tbody");

if (storedBooks.length > 0) {
  let result = storedBooks.map((value) => {
    return `
      <tr class="${value.id}">
        <td>${value.title}</td>
        <td>${value.author}</td>
        <td>${value.genre}</td> 
        <td>${value.year}</td>
        <td>${value.quantity}</td>
      </tr>
    `;
  });
  tbody.append(result);
}

$("#searchBtn").click(function (e) {
  e.preventDefault();
  let key = $("#search").val().toLowerCase();
  let storedBooks = JSON.parse(localStorage.getItem("storedBooks")) || [];
  let filter = storedBooks.filter((book) => book.title === key);

  if (filter.length > 0) {
    let result = filter.map((value) => {
      return `
        <tr class="${value.id}">
          <td>${value.title}</td>
          <td>${value.author}</td>
          <td>${value.genre}</td>
          <td>${value.year}</td>
          <td>${value.quantity}</td>
        </tr>
      `;
    });
    tbody.html(result.join(""));
  } else {
    alert("BOOK NOT FOUND");
  }

  searchClear();
});
