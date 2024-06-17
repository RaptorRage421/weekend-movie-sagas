import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_GENRES', fetchAllGenres)
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeEvery('FETCH_DETAILS', fetchMovieDetails)
  yield takeEvery('ADD_MOVIE', addMovie); 
}
function* addMovie(action) {
  try {
    const { title, poster, description, genre_id } = action.payload;

    
    yield axios.post ('/api/movies', {
      title,
      poster,
      description,
      genre_id,
    });

    yield put({ type: 'FETCH_MOVIES' });
  } catch (error) {
    console.error('Error adding movie:', error);
    // Handle error action if needed
  }
}

function* fetchMovieDetails(action) {
  try {
    const movieId = action.payload;
    const response = yield axios.get(`/api/movies/${movieId}`);
    yield put({ type: 'SET_MOVIE_DETAILS', payload: response.data[0] });
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
}

function* fetchAllMovies() {
  try {
    // Get the movies:
    const moviesResponse = yield axios.get('/api/movies');
    // Set the value of the movies reducer:
    yield put({
      type: 'SET_MOVIES',
      payload: moviesResponse.data
    });
  } catch (error) {
    console.log('fetchAllMovies error:', error);
  }
}
function* fetchAllGenres() {
  try {
    const genreResponse = yield axios.get('/api/genres');
    yield put({ type: 'SET_GENRES', payload: genreResponse.data });
  } catch (error) {
    console.error('Error fetching genres:', error);
  }
}
// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload; 
    default:
      return state;
  }
};
const movieDetails = (state = {}, action) => {
  switch (action.type) {
    case 'SET_MOVIE_DETAILS':
      return action.payload;
    default:
      return state;
  }
};
// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
}

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    movieDetails,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
