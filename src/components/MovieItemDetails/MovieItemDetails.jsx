import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./MovieItemDetails.css"

const MovieItemDetails = () => {
  const dispatch = useDispatch();
  const movieDetails = useSelector((store) => store.movieDetails);
  const movieId = useParams();
  console.log(movieId.id);

  useEffect(() => {
    dispatch({ type: 'FETCH_DETAILS', payload: movieId.id });
  }, [dispatch, movieId]);

  const history = useHistory();

  const backToList = () => {
    history.push('/');
  }

  if (!movieDetails || Object.keys(movieDetails).length === 0) {
    return <div>Loading...</div>; 
  }

  
  const formatGenres = () => {
    if (movieDetails.genres.length === 1) {
      return movieDetails.genres[0].name;
    } else {
      return movieDetails.genres.map((genre, index) => (
        <span key={genre.id}>
          {genre.name}
          {index !== movieDetails.genres.length - 1 ? ', ' : ''}
        </span>
      ));
    }
  }

  return (
    <div className="flex">
      <Card raised sx={{ maxWidth: 400 , display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }} key={movieId} data-testid="movieDetails">
        <CardMedia
          component="img"
          alt={movieDetails.title}
          image={movieDetails.poster}
          sx={{ width: '50%', height: 'auto' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {movieDetails.title}
          </Typography>
          <Typography>
            Genres: {formatGenres()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movieDetails.description}
          </Typography>
        </CardContent>
        <CardActions>
        <Button data-testid="toList" variant="outlined" color="success"onClick={backToList}>Back</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default MovieItemDetails;
