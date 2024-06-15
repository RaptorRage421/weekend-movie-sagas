import { useDispatch } from "react-redux";

const MovieItem = ({movie}) => {
const dispatch = useDispatch()

const selectSingleMovie = (id) => {
dispatch({type: 'FETCH_DETAILS', payload: id})

}

    return (
        <div data-testid='movieItem' key={movie.id}>
          <h3>{movie.title}</h3>
          <img onClick={() => selectSingleMovie(movie.id)} src={movie.poster} alt={movie.title}/>
        </div>
      );

}

export default MovieItem