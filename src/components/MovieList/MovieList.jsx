import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieItem from '../MovieItem/MovieItem';
import './MovieList.css';

function MovieList() {

  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
    // dispatch({ type: 'FETCH_GENRES' })
  }, []);

  return (
    <main>
      <h1>MovieList</h1>
      <div className='movie-list'>
      <section className="movies">
        {movies.map(movie => 
          <MovieItem key={movie.id} movie={movie} />
        )}
      </section>
      </div>
    </main>
  );
}

export default MovieList;
