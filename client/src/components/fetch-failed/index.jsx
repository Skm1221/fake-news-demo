import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {compose} from 'recompose';

const styles = (theme) => ({
    wrap: {
        textAlign: 'center',
        display: 'block',
    },
});

@compose(
    withStyles(styles, { withTheme: true }),
)
export class FetchFailed extends React.Component {

    render() {
        const { classes, children } = this.props;
        return <div className={ classes.wrap }>
            { children }
        </div>
    }

}
