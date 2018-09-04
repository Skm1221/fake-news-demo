import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {compose} from 'recompose';

const styles = theme => ({
    toolbarTitle: {
        flex: 1,
    },
    root: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

@compose(
    withStyles(styles, { withTheme: true }),
)
export class SearchAppBar extends React.Component {
    state = {
        searchInput: ''
    };

    render() {
        const { classes, onSearch } = props;
        const { searchInput } = this.state;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="headline"
                            color="inherit"
                            align="center"
                            noWrap
                            className={classes.toolbarTitle}
                        >
                            News
                        </Typography>
                        <TextField
                            id="search"
                            type="search"
                            placeholder="Search ..."
                            className={classes.textField}
                            margin="normal"
                            onChange={ (e) => this.onChange(e.currentTarget.value) }
                        />
                        <IconButton
                            className={classes.button}
                            onClick={ () => onSearch(parseInt(searchInput)) }
                        >
                            <SearchIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

    onChange(searchInput) {
        this.setState({ searchInput })
    }

}

SearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    onSearch: PropTypes.func.isRequired,
};
