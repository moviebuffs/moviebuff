import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

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
    let loginCard = !this.state.user ? <center>
      <Row>
        <Col m={14} >
          <Card
            title="Click here to get started"
            reveal={
              <div>
                <br />
                <Button
                  node="a"
                  waves="light"
                  large
                  style={{ marginRight: '5px' }}
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
              src="http://www.premierecinemas.net/images/GenericMovieTheater.jpg"
            />
          </Card>
        </Col>
      </Row>
    </center> : null;


    let logoutButton = this.state.user ?
      <button onClick={this.logout}>Log Out</button> :   // when a user is logged in, show logout button and homepage
      null

    let userInfo = this.state.user ? <h5>Welcome, {this.state.user.displayName}</h5> : null

    let homePage = this.state.user ? 
    <Main user={this.state.user} /> :
    null

    return (
      <div>
        <div>
          {userInfo}
          {loginCard}
          {logoutButton}
        </div>
        <div>
          {homePage}
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