import React from 'react';
import ReactDOM from 'react-dom';

// react router imports
// import { Route, Switch } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom';

// import '../App.css';

import Main from './Pages/Main.jsx';
import MovieDescript from './Pages/MovieDescript.jsx';
import UserAccount from './Pages/UserAccount.jsx';
import SearchResults from './Pages/SearchResults.jsx';

//firebase imports
import firebase, { auth, provider } from '../../firebaseConfig.js';




class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      users: [],
    };
    // this.login = this.login.bind(this);
    // this.logout = this.logout.bind(this);

  }
  
  // login() {
  //   auth.signInWithPopup(provider).then((result) => {
  //     this.setState({
  //       user: result.user
  //     })
  //   })
  // }
  
  // logout() {
  //   auth.signOut().then((result) => {
  //     this.setState({
  //       user: null
  //     })
  //   })
  // }

  // componentDidMount() {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       this.setState({user})
  //     }
  //   })
  // }


  render() {
    let authButton = this.state.user ?
      <button onClick={this.logout}>Log Out</button> :
      <button onClick={this.login}>Log In</button>
    

    let userInfo = this.state.user ?
    <h5>Signed in using {this.state.user.email}</h5> : 
    null

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
    return (
      // <div>
      //   {userInfo}
      //   {authButton}
      // </div>
      <Main />
    );
    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       {/* conditionally render part of application user is interacting with */}
    //       <Main />
    //     </header>
    //   </div>
    // );
  }
}



ReactDOM.render(<App />, document.getElementById('app'));