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

function Slider(slider) {
  if (!(slider instanceof Element)) throw new Error("No slider passed in.");

  let current;
  let prev;
  let next;

  const slides = slider.querySelector(".slides");
  const prevButton = slider.querySelector(".go-to-prev");
  const nextButton = slider.querySelector(".go-to-next");

  function startSlider() {
    current = slides.querySelector(".current") || slides.firstElementChild;
    prev = current.previousElementSibling || slides.lastElementChild;
    next = current.nextElementSibling || slides.firstElementChild;
    console.log("current slide:", current);
    console.log("prev slide:", prev);
    console.log("next slide:", next);
  }

  function applyClasses() {
    current.classList.add("current");
    prev.classList.add("prev");
    next.classList.add("next");
  }

  function move(direction) {
    const classesToRemove = ["prev", "current", "next"];
    prev.classList.remove(...classesToRemove);
    current.classList.remove(...classesToRemove);
    next.classList.remove(...classesToRemove);

    if (direction === "back") {
      [prev, current, next] = [
        prev.previousElementSibling || slides.lastElementChild,
        prev,
        current,
      ];
    } else {
      [prev, current, next] = [
        current,
        next,
        next.nextElementSibling || slides.firstElementChild,
      ];
    }

    applyClasses();
  }

  startSlider();
  applyClasses();

  prevButton.addEventListener("click", () => move("back"));
  nextButton.addEventListener("click", move);
}

const bestMoviesSlider = Slider(document.querySelector(".slider"));

// (async function main() {
//   const movies = await getBestRatedMovies({ page_size: 8 });
//   const [bestMovie, ...veryGoodMovies] = movies;
//   const bestMovieDetails = await getMovieDetails(bestMovie.id);

//   insertBestMovieElement(bestMovieDetails);

//   const bestMovieButton = document.querySelector(".best-movie__btn");
//   bestMovieButton.addEventListener("click", () => {
//     updateMovieDetailsElement(bestMovieDetails);
//     modalOuter.classList.toggle("open");
//   });

//   // Things to do:
//   // 1. Dynamically populate the modal (i.e the movie-details, append/remove)
//   // 2. Create the "caroussel" component (html + css)
//   // 3. Populate it dynamically
//   // 4. Bind each item to an appropriate modal
//   // 5. Repeat X times for the categories
//   // 6. Refacto
//   // 7. README
//   // 8. DONE / test production build?! Don't forget postcss autofixer
//   // add transitions ?
// })();
