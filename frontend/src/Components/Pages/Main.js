import React from 'react';
import axios from 'axios';
import '../../App.css';
import Login from '../Login';
import Search from '../Search';
import MovieList from '../MovieList';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };

    this.getNowPlayingMovies = this.getNowPlayingMovies.bind(this);
  }

  getNowPlayingMovies() {
    console.log('getNowPlayingMovies');
    return axios.get('/now-playing')
      .then((movies) => {
        console.log('getNowPlayingMovies', movies);
        return movies;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount() {
    console.log('mounting');
    this.getNowPlayingMovies();
  };


  // Homepage
  render() {
    return (
      <div>
        <Login />
        <Search />
        <MovieList movies={this.state.movies} />
      </div>
    );
  }
}

export default Main;