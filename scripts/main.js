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

function Slider(slider, numberOfVisibleSlides = 4) {
  if (!(slider instanceof Element)) throw new Error("No slider passed in.");

  let currents;
  let prev;
  let next;

  const slides = slider.querySelector(".slides");
  const prevButton = slider.querySelector(".prev-control");
  const nextButton = slider.querySelector(".next-control");

  function startSlider() {
    currents = slides.querySelectorAll(".current");

    if (currents.length === 0)
      currents = Array.from(slides.children).slice(0, 4);

    prev = currents[0].previousElementSibling || slides.lastElementChild;
    next =
      currents[numberOfVisibleSlides - 1].nextElementSibling ||
      slides.firstElementChild;

    console.log("current slide:", currents);
    console.log("prev slide:", prev);
    console.log("next slide:", next);
  }

  function applyClasses() {
    for (let i = 0; i < currents.length; i++) {
      currents[i].classList.add("current", `position-${i}`);
    }
    prev.classList.add("prev");
    next.classList.add("next");
  }

  function move(direction) {
    const positionClasses = [...Array(numberOfVisibleSlides).keys()].map(
      (index) => `position-${index}`
    );
    const classesToRemove = ["prev", "current", "next", ...positionClasses];

    prev.classList.remove(...classesToRemove);
    currents.forEach((current) => current.classList.remove(...classesToRemove));
    next.classList.remove(...classesToRemove);

    if (direction === "back") {
      let curr = prev;

      prev = prev.previousElementSibling || slides.lastElementChild;
      next = currents[numberOfVisibleSlides - 1];

      currents = [curr];
      for (let i = 0; i < numberOfVisibleSlides - 1; i++) {
        curr = curr.nextElementSibling || slides.firstElementChild;
        currents.push(curr);
      }
    } else {
      let curr = currents[1];

      prev = currents[0];
      next = next.nextElementSibling || slides.firstElementChild;

      currents = [curr];
      for (let i = 0; i < numberOfVisibleSlides - 1; i++) {
        curr = curr.nextElementSibling || slides.firstElementChild;
        currents.push(curr);
      }
    }

    applyClasses();
  }

  startSlider();
  applyClasses();

  prevButton.addEventListener("click", () => move("back"));
  nextButton.addEventListener("click", move);
}

(async function main() {
  const movies = await getBestRatedMovies({ page_size: 8 });
  const [bestMovie, ...veryGoodMovies] = movies;
  const bestMovieDetails = await getMovieDetails(bestMovie.id);

  insertBestMovieElement(bestMovieDetails);

  const bestMovieButton = document.querySelector(".best-movie__btn");
  bestMovieButton.addEventListener("click", () => {
    updateMovieDetailsElement(bestMovieDetails);
    modalOuter.classList.toggle("open");
  });

  const bestMoviesSlider = Slider(document.querySelector(".slider"));
  // Things to do:
  // 1. Dynamically populate the modal (i.e the movie-details, append/remove)
  // 2. Create the "caroussel" component (html + css)
  // 3. Populate it dynamically
  // 4. Bind each item to an appropriate modal
  // 5. Repeat X times for the categories
  // 6. Refacto
  // 7. README
  // 8. DONE / test production build?! Don't forget postcss autofixer
  // add transitions ?
})();
