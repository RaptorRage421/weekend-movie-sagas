import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const MovieItemDetails = () => {
  const dispatch = useDispatch();
  const movieDetails = useSelector((store) => store.movieDetails);
  const { movieId } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIE_DETAILS', payload: movieId });
  }, [dispatch, movieId]);

 const history = useHistory()

 const backToList = () => {
    history.push('/')
 }
 

  return (
    <div data-testid="movieDetails">
        {console.log("movieDetails", movieDetails)}
       <div><button data-testid="toList" onClick={backToList}>Back</button></div>
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