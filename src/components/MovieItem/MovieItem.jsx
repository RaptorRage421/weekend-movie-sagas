import { useDispatch } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Divider from '@mui/material/Divider'


const MovieItem = ({movie}) => {
const dispatch = useDispatch()

const selectSingleMovie = () => {
dispatch({type: 'FETCH_DETAILS', payload: movie.id})

}

    return (
       
        <div className="movie-item" data-testid='movieItem'>
          <h4>{movie.title}</h4>
          <Divider variant="middle"/>
          <div className="movie-item-center">
          <Link to={`/details/${movie.id}`} onClick={selectSingleMovie}>
          <img className="movie-poster" data-testid="toDetails" onClick={() => selectSingleMovie()} src={movie.poster} alt={movie.title}/>
          </Link>
          </div>
          
        </div>
        
      );

}

export default MovieItem