import React from 'react';
// import '../App.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      loggedIn: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.setState({
      loggedIn: true,
    })
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Login" />
      </form>
    );
  }
}

export default Login;