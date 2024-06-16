import { useDispatch } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const MovieItem = ({movie}) => {
const dispatch = useDispatch()

const selectSingleMovie = () => {
dispatch({type: 'FETCH_DETAILS', payload: movie.id})

}

    return (
       
        <div data-testid='movieItem' key={movie.id}>
          <h3>{movie.title}</h3>
          <Link to={`/movies/${movie.id}`} onClick={selectSingleMovie}>
          <img data-testid="toDetails" onClick={() => selectSingleMovie()} src={movie.poster} alt={movie.title}/>
          </Link>
        </div>
        
      );

}

export default MovieItem