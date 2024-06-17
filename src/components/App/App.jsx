import { Route, HashRouter as Router } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import MovieItemDetails from '../MovieItemDetails/MovieItemDetails';
import Header from '../Header/Header';
import AddMovie from '../AddMovie/AddMovie';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <Router>        
        <Route path="/" exact>
          <Header />
          <MovieList />
        </Route>
        
        {/* Details page */}
<Route path='/details/:id'>
<Header />
  <MovieItemDetails />
</Route>
        {/* Add Movie page */}
        <Route path="/add-movie">
        <Header />
        <AddMovie />
        </Route>

      </Router>
    </div>
  );
}

export default App;
