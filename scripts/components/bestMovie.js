export const bestMovieHTML = (title, posterUrl, description) => `
  <article class="best-movie">
    <img
      class="best-movie__poster"
      src="${posterUrl}"
      alt="${title} film poster"
    />
    <h2 class="best-movie__title">${title}</h2>
    <button class="btn best-movie__btn">More details</button>
    <p class="best-movie__description">
      ${description}
    </p>
  </article>
`;
