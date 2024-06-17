import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./MovieItemDetails.css"



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
    <div className="flex">
    <Card raised="true" sx={{ maxWidth: 400 }} key={movieId} data-testid="movieDetails">
       <CardMedia
        component="img"
        alt={movieDetails.title}
        
        image={movieDetails.poster}
      />
      <CardContent>
      <Typography gutterBottom variant="h5" component="div">
          {movieDetails.title}
        </Typography>
        <Typography>

            Genres: {movieDetails.genres.map((genre) => 
            <span key={genre.id}>{genre.name}</span>
        )}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movieDetails.description}
        </Typography>
        
      </CardContent>
        
       <div><Button data-testid="toList" onClick={backToList}>Back</Button></div>
     </Card>
     </div>
  );
};

export default MovieItemDetails;