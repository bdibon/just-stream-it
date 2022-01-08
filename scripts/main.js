import { getBestRatedMovies, getMovieDetails } from "./OCMoviesAPI.js";

const hamburgerIcon = document.querySelector(".hamburger-icon");
const nav = document.querySelector(".nav");
const wrapper = document.querySelector(".wrapper");

hamburgerIcon.addEventListener("click", () => {
  nav.classList.toggle("nav--mobile-hidden");
  wrapper.classList.toggle("wrapper--mobile-menu-open");
});

(async function main() {
  const movies = await getBestRatedMovies({ page_size: 8 });
  const [bestMovie, ...veryGoodMovies] = movies;

  const bestMovieDetails = await getMovieDetails(bestMovie.id);
  console.log(bestMovieDetails);
})();
