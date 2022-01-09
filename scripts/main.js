import { getBestRatedMovies, getMovieDetails } from "./OCMoviesAPI.js";
import { bestMovieHTML } from "./components/bestMovie.js";
import { movieDetailsInnerHTML } from "./components/movieDetails.js";

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

(async function main() {
  const movies = await getBestRatedMovies({ page_size: 8 });
  const [bestMovie, ...veryGoodMovies] = movies;
  const bestMovieDetails = await getMovieDetails(bestMovie.id);

  console.log({ bestMovieDetails });
  insertBestMovieElement(bestMovieDetails);

  const bestMovieButton = document.querySelector(".best-movie__btn");
  bestMovieButton.addEventListener("click", () => {
    updateMovieDetailsElement(bestMovieDetails);
    modalOuter.classList.toggle("open");

    console.dir(modalInner);
    console.dir(closeButton);
  });

  // Things to do:
  // 1. Dynamically populate the modal (i.e the movie-details, append/remove)
  // 2. Create the "caroussel" component (html + css)
  // 3. Populate it dynamically
  // 4. Bind each item to an appropriate modal
  // 5. Repeat X times for the categories
  // 6. Refacto
  // 7. README
  // 8. DONE / test production build?! Don't forget postcss autofixer
})();
