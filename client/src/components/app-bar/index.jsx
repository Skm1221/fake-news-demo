import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const styles = theme => ({
  appBar: {
    position: 'absolute'
  },
  toolBarTitle: {
    marginLeft: '16px',
  },
});

class GlobalAppBar extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography
            variant="headline"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            Fake News Demo
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }

}

export default withStyles(styles, { withTheme: true })(GlobalAppBar);
