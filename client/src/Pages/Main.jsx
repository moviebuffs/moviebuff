import React from 'react';
import axios from 'axios';
// import '../../App.css';
import Login from '../Components/Login.jsx';
import Search from '../Components/Search.jsx';
import MovieList from '../Components/MovieList.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };

    this.getNowPlayingMovies = this.getNowPlayingMovies.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getNowPlayingMovies() {
    return axios.get('/now-playing')
      .then((movies) => {
        return movies;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount(e) {
    this.getNowPlayingMovies()
      .then((response) => {
        this.setState({movies: response.data.data});
      })
      .catch((error) => {
        console.error(error);
      })
  };

  handleSubmit(event) {
    console.log('click', this.state.value);
    event.preventDefault();
  }

  handleClick(event) {
    console.log('click');
  }

  // Homepage
  render() {
    return (
      <div>
        <Login />
        <Search handleSubmit={this.handleSubmit} />
        <MovieList movies={this.state.movies}/>
        {/* <Carousel movies={this.state.movies} /> */}
      </div>
    );
  }
}

export default Main;