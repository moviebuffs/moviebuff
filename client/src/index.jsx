import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// react router imports
// import { Route, Switch } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom';
import { Row, Col, Card, Button, Icon } from 'react-materialize';
// import '../App.css';
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

    let loginCard = !this.state.user ? 
    <div>
      <center>
        <Row>
          <Col >
            <Card
              title="Click here to sign in"
              reveal={
                <div>
                  <br /><br />
                  <Button
                    node="a"
                    waves="light"
                    large
                    onClick={this.login}
                  >
                    Log In With Google
                          <Icon left>
                      cloud
                          </Icon>
                  </Button>
                </div>
              }>
              <img
                  src="https://content.screencast.com/users/khari9987274/folders/Default/media/cd034270-ed95-4387-836a-c0daada0c4be/logo.jpg"
              />
            </Card>
          </Col>
        </Row>
      </center>
    </div> : null;


    // let logoutButton = this.state.user ? <button onClick={logoutClick}>Log Out</button> 
    //                   : null   // when a user is logged in, show logout button and homepage
      

    let homePage = this.state.user ? <Main user={this.state.user} logoutClick={this.logout}/> : null

    return (
      <div style={appStyle}>
        <div>
          <div>
            {loginCard}
          </div>
          <div>
            {homePage}
            {/* {navBar} */}
            {/* {logoutButton} */}
          </div>
        </div>
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