const DOLLAR = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const DATE = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

export const movieDetailsInnerHTML = ({
  title,
  image_url,
  genres,
  date_published,
  rated,
  imdb_score,
  directors,
  actors,
  duration,
  countries,
  usa_gross_income,
  worldwide_gross_income,
  long_description,
}) => {
  const html = `
    <div class="movie-details__grid">
      <h2 class="movie-details__title">${title}</h2>
      <img
        class="movie-details__poster"
        src="${image_url}"
        alt="${title} film poster"
      />
      <div class="movie-details__text">
        <p>
          Genres:
          ${genres.reduce((list, genre) => {
            if (list.length === 0) return genre;
            list += ", " + genre;
            return list;
          }, "")}
        </p>
        <p>Release date: ${DATE.format(new Date(date_published))}</p>
        <p>Rated: ${rated}</p>
        <p>IMDb score: ${imdb_score}</p>
        <p>
          Directors:
          ${directors.reduce((list, director) => {
            if (list.length === 0) return director;
            list += ", " + director;
            return list;
          }, "")}
        </p>
        <p>
          Actors:
          ${actors.reduce((list, actor) => {
            if (list.length === 0) return actor;
            list += ", " + actor;
            return list;
          }, "")}
        </p>
        <p>Duration: ${duration} minutes</p>
        <p>
          Countries:
          ${countries.reduce((list, country) => {
            if (list.length === 0) return country;
            list += ", " + country;
            return list;
          }, "")}
        </p>
        <div class="movie-details__box-office">
          Box office:
          <ul>
            <li>Gross US: ${
              usa_gross_income === null
                ? "not available"
                : DOLLAR.format(usa_gross_income)
            }</li>
            <li>Gross worldwide: ${
              worldwide_gross_income === null
                ? "not available"
                : DOLLAR.format(worldwide_gross_income)
            }</li>
          </ul>
        </div>
      </div>
    </div>
    <p class="movie-details__description">
      ${long_description}
    </p>`;

  return html;
};
