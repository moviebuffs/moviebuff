import React from 'react';
import axios from 'axios';
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
      // movieSelected: true,
    };

    this.getNowPlayingMovies = this.getNowPlayingMovies.bind(this);
    this.getSearchedMovies = this.getSearchedMovies.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getNowPlayingMovies() {
    return axios.get('/now-playing')
      .then((movies) => {
        return movies.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getSearchedMovies(movie) {
    return axios.get(`/movie/${movie}`)
      .then((movies) => {
        console.log(movies);
        return movies.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount(e) {
    this.getNowPlayingMovies()
      .then((response) => {
        this.setState({ movies: response });
      })
      .catch((error) => {
        console.error(error);
      })
  };

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

  handleClick(clickedMovieId) {
    this.state.movies.forEach((movie) => {
      if (movie.movieId === clickedMovieId) {
        this.setState({movie: movie});
      }
    });
    console.log('CLICK', this.state);
  }

  // Homepage
  render() {
    if (this.state.movie) {
      return (
        <div>
          {/* <Login /> */}
          <Search handleSearch={this.handleSearch} />
          <MovieDescript movie={this.state.movie} />
        </div>
      );
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