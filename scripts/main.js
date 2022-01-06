import { getBestRatedMovies, getMovieDetails } from "./OCMoviesAPI.js";

const hamburgerIcon = document.querySelector(".hamburger-icon");
const nav = document.querySelector(".nav");

hamburgerIcon.addEventListener("click", () => {
  nav.classList.toggle("nav--mobile-hidden");
});

getBestRatedMovies({ page_size: 1 })
  .then((movies) => {
    const bestRatedMovie = movies[0];
    return bestRatedMovie.id;
  })
  .then((movieId) => getMovieDetails(movieId))
  .then((movieDetails) => {
    console.log(movieDetails);
  });
