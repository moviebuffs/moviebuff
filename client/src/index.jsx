import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// react router imports
// import { Route, Switch } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom';
// import '../App.css';
import LoginCard from './Components/LoginCard.jsx'
import Main from './Pages/Main.jsx';
// import MovieDescript from './Pages/MovieDescript.jsx';
// import UserAccount from './Pages/UserAccount.jsx';
// import SearchResults from './Pages/SearchResults.jsx';

//firebase imports
import firebase, { auth, provider } from '../../firebaseConfig.js';
import { Divider } from '@material-ui/core';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      users: [],
      isLoggedIn: false,
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

  }
  
  login() {
    auth.signInWithPopup(provider).then((result) => {
      this.setState({
        user: result.user
      })
    })
    .then(() => {
      axios.post('/users', {
      user: this.state.user,
    })
    })
  }
  
  logout() {
    auth.signOut().then((result) => {
      this.setState({
        user: null
      })
    })
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({user})
      }
    })
  }

  render() {
    const appStyle = { 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
    }

    return (
      <div style={appStyle}>
          {
            !this.state.user ? <LoginCard loginClick={this.login} /> 
              : <Main 
                  user={this.state.user} 
                  logoutClick={this.logout} 
                />
          }
      </div>
    );
  }
}

// const App = () => (
//   <div>
//     <Switch>
//       <Route exact path='/' component={Main} />
//       <Route path='/movie' component={MovieDescript} />
//       <Route path='/account' component={UserAccount} />
//       <Route path='/results' component={SearchResults} />
//     </Switch>
//   </div>
// )

ReactDOM.render(<App />, document.getElementById('app'));