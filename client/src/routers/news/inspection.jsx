import { Theme } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';
import ContentArea from 'components/content-area';
import { NewsInspectionMapper } from 'mappers/news-inspection';
import { ApiProvider } from '../../index.jsx'

const axios = require('axios');

const circleSize = 40;

const styles = (theme) => ({
  progress: {
    marginLeft: `calc(50% - ${circleSize/2}px)`,
  },
  wrap: {
    position: 'relative',
    width: '100%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  container: {
    zIndex: 3,
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  },
  buttons: {
    zIndex: 2,
    display: 'block',
    textAlign: 'right',
    width: 'calc(100% + 32px)',
    padding: '16px',
    margin: '32px auto -16px -16px'
  },
});


class NewsInspectionRoute extends React.Component {
  state = {
    newsInspection: null,
    fetchState: 'fetched',
  };

  subscription = null;

  componentDidMount() {
    this.fetch();
  }

  componentWillUnmount() {
    if (this.subscription !== null){
      this.subscription.unsubscribe();
    }
  }

  render() {
    const { classes } = this.props;
    const { fetchState, newsInspection } = this.state;
    console.log(fetchState, newsInspection);
    return (
      <div className={ classes.wrap }>
        { this.renderContent() }
      </div>
    );
  }

  renderContent() {
    const { classes } = this.props;
    const { fetchState, newsInspection } = this.state;
    console.log(fetchState, newsInspection);
    if (fetchState === 'loading') {
      return <CircularProgress
        size={ circleSize }
        className={ classes.progress }
        color='secondary'
      />
    }
    else if (fetchState === 'fetched') {
      if (newsInspection !== null) {
        return <ContentArea
          newsInspection={ newsInspection }
          withNews={ true }
        />
      }
    }
  };

  fetch() {
    const { newsId } = this.props;
    this.setState({fetchState: 'loading'});
    this.subscription = from(ApiProvider.get(`/api/news/${newsId}/inspection`))
      .pipe(
        map(response => new NewsInspectionMapper().fromJson(response.data.data)),
      )
      .subscribe(
        inspection => this.setState({
          newsInspection: inspection,
          fetchState: 'fetched'
        }),
        error => {
          this.setState({
            fetchState: 'fail'
          })
        }
      );
  }

}

export default withStyles(styles, { withTheme: true })(NewsInspectionRoute)
