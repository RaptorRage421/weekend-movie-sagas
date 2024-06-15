import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const MovieItemDetails = () => {
  const dispatch = useDispatch();
  const movieDetails = useSelector((store) => store.movieDetails);
  const { movieId } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIE_DETAILS', payload: movieId });
  }, [dispatch, movieId]);

  return (
    <div data-testid="movieDetails">
      <h2>{movieDetails.title}</h2>
      <p>{movieDetails.description}</p>
      <img src={movieDetails.poster} alt={movieDetails.title} />
      <p>Genres: {movieDetails.genres?.map(genre => genre.name).join(', ')}</p>
    </div>
  );
};

export default MovieItemDetails;