import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import MovieItem from '../MovieItem/MovieItem';
import './MovieList.css';

function MovieList() {

  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
    dispatch({ type: 'FETCH_GENRES' })
  }, [dispatch]);
  
  if (!movies) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <h1>MovieList</h1>
      
        <Box className='movie-list' sx={{ flexGrow: 1 }}>
      
      <Grid className="movies" container spacing={0}>
    
        {movies.map(movie => 
        <Grid key={movie.id} xs='auto' md={3} lg="auto" >
         
          <MovieItem data-testid='movieItem' movie={movie} />
          
          </Grid>
        )}
      
        </Grid>
       
      </Box>
      
    </main>
  );
}

export default MovieList;
