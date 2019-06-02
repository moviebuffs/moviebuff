import React from 'react';
import axios from 'axios';

// import { Typography, Paper, Avatar, CircularProgress, Button } from '@material-ui/core'
// import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
// import withStyles from '@material-ui/core/styles/withStyles'

// import '../../App.css';
import Login from '../Components/Login.jsx';
import Search from '../Components/Search.jsx';
import MovieList from '../Components/MovieList.jsx';
import MovieDescript from './MovieDescript.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      search: '',
      movie: null,
    };

    this.getNowPlayingMovies = this.getNowPlayingMovies.bind(this);
    this.getSearchedMovies = this.getSearchedMovies.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // handle request for movies playing in theatres now
  getNowPlayingMovies() {
    return axios.get('/now-playing')
      .then((movies) => {
        return movies.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // handle request for searching for a movie
  getSearchedMovies(movie) {
    return axios.get(`/movie/${movie}`)
      .then((movies) => {
        return movies.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // when user visits page, show now playing movies and set them to state
  componentDidMount(e) {
    this.getNowPlayingMovies()
      .then((response) => {
        this.setState({ movies: response });
      })
      .catch((error) => {
        console.error(error);
      })
  };

  // when user searches for a movie, get movies matching search and set them to state
  handleSearch(input) {
    this.setState({ search: input })
    this.getSearchedMovies(input)
      .then((movies) => {
        this.setState({movies: movies})
      })
      .catch((error) => {
        console.error(error);
      });
    event.preventDefault();
  }

  // when a movie is clicked, set the state for movie to the object of the clicked movie
  handleClick(clickedMovieId) {
    this.state.movies.forEach((movie) => {
      if (movie.movieId === clickedMovieId) {
        this.setState({movie: movie});
      }
    });
  }

  render() {
    // show a movie's details when it is clicked
    if (this.state.movie) {
      return (
        <div>
          {/* <Login /> */}
          <Search handleSearch={this.handleSearch} />
          <MovieDescript movie={this.state.movie} user={this.props.user} />
        </div>
      );
    // show a movielist when page is visited and a movie is searched
    } else {
      return (
        <div>
          {/* <Login /> */}
          <Search handleSearch={this.handleSearch} />
          <MovieList movies={this.state.movies} handleClick={this.handleClick} />
          {/* <MovieDescript movie={this.state.movie} /> */}
          {/* <Carousel movies={this.state.movies} /> */}
      </div>
      );
    }
  }
}

export default Main;