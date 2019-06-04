import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import LoginCard from './Components/LoginCard.jsx'
import Main from './Pages/Main.jsx';

//firebase imports
import firebase, { auth, provider } from '../../firebaseConfig.js';

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
    auth.signOut().then(() => {
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

ReactDOM.render(<App />, document.getElementById('app'));