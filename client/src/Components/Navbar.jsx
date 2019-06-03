import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import React, { Component } from 'react'

export default class Navbar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      
    }
  }
  
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" color="inherit">
              Welcome, {this.props.user.displayName}
            </Typography>
          </Toolbar>
        </AppBar>
        <button onClick={this.props.logoutClick}>Log Out</button>
        <button onClick={this.props.goHome}>Home</button>
        <button onClick={this.props.viewWatchlist}>View Watchlist</button>
      </div>
    )
  }
}

