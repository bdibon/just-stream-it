import { getBestRatedMovies, getMovieDetails } from "./OCMoviesAPI.js";
import { bestMovieHTML } from "./components/bestMovie.js";

const hamburgerIcon = document.querySelector(".hamburger-icon");
const nav = document.querySelector(".nav");
const wrapper = document.querySelector(".wrapper");
const modalOuter = document.querySelector(".modal-outer");
const modalInner = document.querySelector(".modal-inner");
const closeButton = modalInner.firstElementChild;

hamburgerIcon.addEventListener("click", () => {
  nav.classList.toggle("nav--mobile-hidden");
  wrapper.classList.toggle("wrapper--mobile-menu-open");
});

closeButton.addEventListener("click", () => {
  modalOuter.classList.toggle("open");
});

function insertBestMovieElement({ title, image_url, description }) {
  const html = bestMovieHTML(title, image_url, description);
  wrapper.innerHTML += html;
}

(async function main() {
  const movies = await getBestRatedMovies({ page_size: 8 });
  const [bestMovie, ...veryGoodMovies] = movies;
  const bestMovieDetails = await getMovieDetails(bestMovie.id);

  console.log({ bestMovieDetails });
  insertBestMovieElement(bestMovieDetails);
  const bestMovieButton = document.querySelector(".best-movie__btn");
  bestMovieButton.addEventListener("click", () => {
    modalOuter.classList.toggle("open");
    console.dir(modalInner);
  });
})();
