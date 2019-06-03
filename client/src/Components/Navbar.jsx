import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { AppBar, Button, Drawer } from '@material-ui/core/'
import { MuiThemeProvider } from '@material-ui/core/styles'
import SortIcon from '@material-ui/icons/Sort'
import FormatIndentIcon from '@material-ui/icons/FormatIndentDecrease'

import React, { Component } from 'react'

export default class Navbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }

    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    
  }

  handleDrawerOpen() {
    this.setState({ open: true });
  };

  handleDrawerClose() {
    this.setState({ open: false });
  };
  
  
  render() {
    const { open } = this.state;
    return (
      <MuiThemeProvider >
        <div>
          <AppBar position="static">
            <Toolbar variant="dense">

              <div>
                <IconButton
                  aria-label="Menu"
                  onClick={this.handleDrawerOpen}
                >
                  <SortIcon />
                </IconButton>
              </div>
              
              <div>
                <Typography variant="h5" color="inherit">
                  Welcome, {this.props.user.displayName}
                </Typography>
              </div>

              <Drawer
                variant="persistent"
                anchor="left"
                open={open}
              >
                <div>
                  <IconButton onClick={this.handleDrawerClose} >
                    <FormatIndentIcon />
                  </IconButton>
                </div>

                
                <Button onClick={this.props.logoutClick}>Log Out</Button>
                
                <Button onClick={this.props.goHome}>Home</Button>
                
                <Button onClick={this.props.viewWatchlist}>View Watchlist</Button>
      
              </Drawer>
            </Toolbar>
          </AppBar>
          
        </div>
      </MuiThemeProvider>
    )
  }
}


