import React from 'react';
import { Carousel, Button, Card, Row, Col } from 'react-materialize';
// import '../App.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handle state change when something is typed in input field
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  // handler for passing input value up to main component when search button is clicked
  handleSubmit(event) {
    this.props.handleSearch(this.state.value);
    event.preventDefault();
  }

  // search input field and button
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Search" />
      </form>
    );
  }
}

export default Search;