import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
// import one from "../public/1.jpg";
// import two from "../public/2.jpg";
// import three from "../public/3.jpg";
// import four from "../public/4.jpg";
// import five from "../public/5.jpg";

class Carousel extends Component {
  componentDidMount() {
    const options = {
      duration: 300,
      onCycleTo: () => {
        console.log("New Slide");
      }
    };
    M.Carousel.init(this.Carousel, options);

    //Instance Plugin
    // let instance = M.Carousel.getInstance(this.Carousel);
    // instance.next(2);
  }

  render() {
    const { movies } = this.props;
    return (
      <div
        ref={Carousel => {
          this.Carousel = Carousel;
        }}
        className="carousel"
      >
        {movies.map((movie) => {
          return <a className="carousel-item">
            <img alt="1" src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`} />
          </a>
        })}
      </div>
    );
  }
}

export default Carousel;