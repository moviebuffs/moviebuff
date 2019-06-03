import React from 'react';

import Review from './Review.jsx'

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    const { reviews } = this.props;

    return (
      <div>
        {reviews.map((review) => {
          return <Review review={review} />
        })}
      </div>
    );
  }
}

export default ReviewList;