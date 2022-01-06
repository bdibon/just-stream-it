import axios from "axios";


const API_BASE_URL = 'http://localhost:8000/api/v1/';

const OCMoviesAPI = axios.create({
    baseURL: API_BASE_URL,
    params: {
        format: 'json'
    }
});


export async function getBestRatedMovies({page_size = 8, genre} = {}) {
    const params = {
        sort_by: '-imdb_score,-votes',
        page_size
    };
    if (genre) params['genre'] = genre;

    const response = await OCMoviesAPI.get('titles', {
        params
    })

    const data = response.data;
    const bestRatedMovies = response.data.results;

    return bestRatedMovies;
}

export async function getMovieDetails(id) {
    if (id === undefined) throw new Error('Must specify an id in order to get details.')
    const response = await OCMoviesAPI.get(`titles/${id}`);

    const movieDetails = response.data;
    return movieDetails;
}

getMovieDetails(8571428).then(movie => console.log(movie))
