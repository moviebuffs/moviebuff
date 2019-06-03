import React from 'react';
// import '../App.css';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

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
      <Box m={2} display="flex" flexDirection="row">
        <Box m={1}>
          <Button onClick={this.handleSubmit} variant="contained" color="primary" type="submit" value="Search">Search</Button>
        </Box>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
      </Box>
    );
  }
}

export default Search;