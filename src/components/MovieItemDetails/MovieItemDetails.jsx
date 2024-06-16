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
        {console.log("movieDetails", movieDetails)}
        <div>{movieDetails.title}</div>
        <div><img src={movieDetails.poster}/></div>
        <div>
        {movieDetails.genres.map((genre) => 
            <span>{genre.name}</span>
        )}
        </div>
        <div>{movieDetails.description}</div>
     </div>
  );
};

export default MovieItemDetails;