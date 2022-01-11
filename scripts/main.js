import { getBestRatedMovies, getMovieDetails } from "./OCMoviesAPI.js";
import { bestMovieHTML } from "./components/bestMovie.js";
import { movieDetailsInnerHTML } from "./components/movieDetails.js";
import { categoryBestOfInnerHTML } from "./components/categoryBestOf.js";
import { Slider } from "./components/Slider.js";
import GENRES from "./genres.js";

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

(async function main() {
  const movies = await getBestRatedMovies({ page_size: 8 });
  const [bestMovie, ...veryGoodMovies] = movies;
  const bestMovieDetails = await getMovieDetails(bestMovie);

  /* Best movie section */
  insertBestMovieElement(bestMovieDetails);

  const bestMovieButton = document.querySelector(".best-movie__btn");
  bestMovieButton.addEventListener("click", () => {
    updateMovieDetailsElement(bestMovieDetails);
    modalOuter.classList.toggle("open");
  });

  /* Top rated movies section */
  await createCategoryBestOf("Top rated movies", veryGoodMovies);

  /* Top rated movies for some specific genres */

  for (let genre of Object.values(GENRES)) {
    const movies = await getBestRatedMovies({ genre });
    await createCategoryBestOf(genre, movies);
  }
})();

function insertBestMovieElement({ title, image_url, description }) {
  const html = bestMovieHTML(title, image_url, description);
  wrapper.innerHTML += html;
}

function updateMovieDetailsElement(movieDetails) {
  const html = movieDetailsInnerHTML(movieDetails);
  const isEmpty =
    !modalInner.lastElementChild.classList.contains("movie-details");

  if (!isEmpty) modalInner.lastElementChild.remove();

  const newMovieDetails = document.createElement("article");
  newMovieDetails.classList.add("movie-details");
  newMovieDetails.innerHTML = html;
  modalInner.appendChild(newMovieDetails);
}

async function createCategoryBestOf(categoryName, movies) {
  const categoryBestOfElement = document.createElement("section");
  const categoryClass = `category-bestof--${categoryName
    .toLowerCase()
    .replaceAll(" ", "_")}`;
  categoryBestOfElement.classList.add("category-bestof", categoryClass);
  categoryBestOfElement.innerHTML = categoryBestOfInnerHTML(
    categoryName,
    movies
  );
  const topRatedSlides = categoryBestOfElement.querySelectorAll(".slide");

  // Order of insertion is preserved.
  const moviesDetails = await Promise.all(
    movies.map((movie) => getMovieDetails(movie))
  );
  for (let i = 0; i < movies.length; i++) {
    topRatedSlides.item(i).addEventListener("click", () => {
      const movieDetails = moviesDetails[i];
      updateMovieDetailsElement(movieDetails);
      modalOuter.classList.toggle("open");
    });
  }
  wrapper.appendChild(categoryBestOfElement);
  Slider(document.querySelector(`.${categoryClass} .slider`));
}
