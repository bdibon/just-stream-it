export function Slider(slider, numberOfVisibleSlides = 4) {
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
