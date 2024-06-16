import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";




const MovieItemDetails = () => {
  const dispatch = useDispatch();
  const movieDetails = useSelector((store) => store.movieDetails);
  const movieId = useParams();
console.log(movieId.id)
  useEffect(() => {
    dispatch({ type: 'FETCH_DETAILS', payload: movieId.id });
  }, [dispatch, movieId]);

 const history = useHistory()

 const backToList = () => {
    history.push('/')
 }
 if (!movieDetails || Object.keys(movieDetails).length === 0) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div key={movieId} data-testid="movieDetails">
        {console.log("movieDetails", movieDetails)}
       <div><button data-testid="toList" onClick={backToList}>Back</button></div>
        <div>{movieDetails.title}</div>
        <div><img src={movieDetails.poster}/></div>
        
        {movieDetails.genres.map((genre) => 
            <span key={genre.id}>{genre.name}</span>
        )}
        
        <div>{movieDetails.description}</div>
     </div>
  );
};

export default MovieItemDetails;