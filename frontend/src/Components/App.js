import React from 'react';
import '../App.css';
import Main from './Main';
import MovieDescript from './MovieDescript';
import UserAccount from './UserAccount';
import SearchResults from './SearchResults';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      users: [],
    };

  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* conditionally render part of application user is interacting with */}
          <Main />
        </header>
      </div>
    );
  }
}

export default App;
