import { Theme } from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { StyleRules, withStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import classNames from 'classnames';
import * as React from 'react';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = (theme) => ({
  margin: {
    margin: theme.spacing.unit,
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

class Toast extends React.Component {

  render () {
    const { classes, open, message, type, onClose } = this.props;
    const Icon = variantIcon[type];
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={ open }
        autoHideDuration={2000}
        onClose={ onClose }
      >
        <SnackbarContent
          className={ classNames(classes[type], classes.margin) }
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={ classes.message }>
          <Icon className={ classNames(classes.icon, classes.iconVariant) } />
              { message }
        </span>
          }
        />
      </Snackbar>
    );
  }

}


export default withStyles(styles, { withTheme: true })(Toast);
