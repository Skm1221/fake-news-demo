import { Theme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import GlobalAppBar from 'components/app-bar';
import * as React from 'react';
import { Fragment } from 'react';
import { fromPromise, map } from 'rxjs';

const styles = (theme)  => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 2,
  },
  section: {
    width: '100%',
    borderWidth: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.12)',
    borderRadius: '3px',
    backgroundColor: theme.palette.background.paper,
  },
});

class App extends React.Component {
  render() {
    const { classes, children } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <div className={ classes.root }>
          <GlobalAppBar />
          <main className={ classes.content }>
            <div className={ classes.toolbar }/>
            <section className={classes.section}>
              { children }
            </section>
          </main>
        </div>
      </Fragment>
    )
  }

}

export default withStyles(styles, { withTheme: true })(App);
