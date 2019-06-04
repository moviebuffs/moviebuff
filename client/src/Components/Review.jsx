import React from 'react';

// import '../App.css';

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    const { review } = this.props;
    return (
      <div>
        <h3>{review.author}</h3>
        <p>{review.content}</p>
        <a href={review.url}><p>read full review</p></a>
      </div>
    );
  }
}

export default Review;