import { Theme } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Fragment } from 'react';
import { compose } from 'recompose';
import { fromPromise, map } from 'rxjs';
import { SearchAppBar } from './components/app-bar/index';
import { ContentArea } from './components/content-area/index';
import { FetchFailed } from './components/fetch-failed/index';
import { Config } from './config';
import { NewsInspectionMapper } from './mappers/news-inspection/index';
import CssBaseline from '@material-ui/core/es/CssBaseline/CssBaseline';

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
    }
});

@compose(
    withStyles(styles, { withTheme: true }),
)
export class App extends React.Component {
    state = {
        fetched: true,
        newsInspection: null,
    };

    render() {
        const { classes } = this.props;
        const { newsInspection, fetched } = this.state;
        return (
            <Fragment>
                <CssBaseline />
                <div className={ classes.root }>
                    <SearchAppBar onSearch={ this.onSearch }/>
                    <main className={ classes.content }>
                        {
                            fetched ?
                                newsInspection ?
                                    <ContentArea newsInspection={ newsInspection }/>
                                    : null
                                : <FetchFailed>
                                    Fail to get response
                                </FetchFailed>
                        }
                    </main>
                </div>
            </Fragment>
        )
    }

    onSearch(value) {
        fromPromise(axios({
            method: 'get',
            url: `${Config.api}/api/news-inspection/${value}`
        })).pipe(
            map(response => new NewsInspectionMapper().fromJson(response.data)),
        ).subscribe(
            inspection => this.setState({
                newsInspection: inspection,
                fetched: true
            }),
            error => this.setState({
                fetched: false
            })
        )
    }

}


App.propTypes = {
    classes: PropTypes.object.isRequired,
};

