import { withStyles } from '@material-ui/core/styles';
import React from 'react';

const styles = (theme) => ({
    wrap: {
        textAlign: 'center',
        display: 'block',
    },
});

class FetchFailed extends React.Component {

    render() {
        const { classes, children } = this.props;
        return <div className={ classes.wrap }>
            { children }
        </div>
    }

}

export default withStyles(styles, { withTheme: true })(FetchFailed);