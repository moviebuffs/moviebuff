import React from 'react';
import '../App.css';
import Login from './Login';
import Search from './Search';
import MovieList from './MovieList';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };

  }

  // Homepage
  render() {
    return (
      <div>
        <Login />
        <Search />
        <MovieList />
      </div>
    );
  }
}

export default Main;