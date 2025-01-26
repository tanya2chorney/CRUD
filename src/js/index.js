const API_URL = "http://localhost:3000/movies";

const refs = {
  moviesTable: document.getElementById("moviesTable"),
  getMoviesButton: document.getElementById("getMovies"),
  addMovieForm: document.getElementById("addMovieForm"),
  titleInput: document.getElementById("title"),
  genreInput: document.getElementById("genre"),
  directorInput: document.getElementById("director"),
  yearInput: document.getElementById("year"),
};

// Get all movies
refs.getMoviesButton.addEventListener("click", async () => {
  const response = await fetch(API_URL);
  const movies = await response.json();
  renderMovies(movies);
});

// Add a new movie
refs.addMovieForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newMovie = {
    title: refs.titleInput.value,
    genre: refs.genreInput.value,
    director: refs.directorInput.value,
    year: Number(refs.yearInput.value),
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newMovie),
  });

  refs.addMovieForm.reset();
  refs.getMoviesButton.click();
});

function renderMovies(movies) {
  refs.moviesTable.innerHTML = movies
    .map(
      (movie) => `
      <tr>
        <td>${movie.id}</td>
        <td>${movie.title}</td>
        <td>${movie.genre}</td>
        <td>${movie.director}</td>
        <td>${movie.year}</td>
        <td>
          <button onclick="deleteMovie(${movie.id})">Delete</button>
        </td>
      </tr>
    `
    )
    .join("");
}

window.deleteMovie = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  refs.getMoviesButton.click();
};
