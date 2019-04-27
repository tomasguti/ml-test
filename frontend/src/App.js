import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import './App.scss';
import SearchBar from './SearchBar/SearchBar';
import ItemDetails from './ItemDetails/ItemDetails';
import SearchResults from './SearchResults/SearchResults';
import NotFound from './NotFound/NotFound';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <SearchBar></SearchBar>
          <Route exact path="/items" component={SearchResults} />
          <Route exact path="/items/:id" component={ItemDetails} />
          <Route exact path="/error" component={NotFound} />
        </Router>
      </div>
    );
  }
}

export default App;
