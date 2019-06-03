import React from 'react';
import axios from 'axios';
// import 'materialize-css';
// import 'materialize-css/dist/css/materialize.min.css';

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.getTrailer = this.getTrailer.bind(this);
  }

  getTrailer() {
    console.log(this.props.movie.title);
    return axios.get(`/trailer/${this.props.movie.title}`, {
      params: { title: this.props.movie.title },
    })
      .then((res) => {
        console.log(res);
        return res.data[0];
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount(e) {
    this.getTrailer()
      .then((trailer) => {
        console.log(trailer);
        this.setState({ trailer: trailer });

      })
      .catch((err) => {
        console.error(err);
      });
  }

  // search input field and button
  render() {
    if (this.state.trailer) {
      return (
        <div>
          <iframe width="853" height="480" src={`https://www.youtube.com/embed/${this.state.trailer.id.videoId}`} frameBorder="0" allowFullScreen></iframe>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Video;

// // youtube video embed
// const Video = (props) => (
//   // <div></div>
//   <div>
//     {/* <iframe width="853" height="480" src={`https://www.youtube.com/embed/${props.trailer.id.videoId}`} frameborder="0" allowfullscreen></iframe> */}
//   </div>
//   // <div className="video-player">
//   //   <div className="embed-responsive embed-responsive-16by9">
//   //     <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/${props.video.id.videoId}`} allowFullScreen></iframe>
//   //   </div>
//   //   <div className="video-player-details">
//   //     <h3>{props.video.snippet.title}</h3>
//   //     <div>{props.video.snippet.description}</div>
//   //   </div>
//   // </div>
// );

// export default Video;