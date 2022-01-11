export const categoryBestOfInnerHTML = (categoryName, movies) => `
  <h2 class="category-bestof__title">${categoryName}</h2>
  <div class="category-bestof slider">
    <button class="slider__controls prev-control"></button>
    <div class="slides">
      ${movies
        .map(
          (movie) => `
        <img
          class="slide"
          src="${movie.image_url}"
          alt="${movie.title} film poster"
        />`
        )
        .join("")}
    </div>
    <button class="slider__controls next-control"></button>
  </div>`;
