import { Route, HashRouter as Router } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import MovieItemDetails from '../MovieItemDetails/MovieItemDetails';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        
        {/* Details page */}
<Route path='/details/:id'>
  <MovieItemDetails />
</Route>
        {/* Add Movie page */}
        
      </Router>
    </div>
  );
}

export default App;
