import { Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import ContentArea from 'components/content-area';
import { NewsInspectionMapper } from 'mappers/news-inspection';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiProvider } from '../../index.jsx';

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
  explainSubscription = null;

  componentDidMount() {
    this.fetch();
  }

  componentWillUnmount() {
    if (this.subscription !== null){
      this.subscription.unsubscribe();
    }
    if (this.explainSubscription !== null){
      this.explainSubscription.unsubscribe();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={ classes.wrap }>
        { this.renderContent() }
        <div className={ classes.buttons }>
          <Button onClick={ this.onExplain } > Explain </Button>
        </div>
        { this.renderExplain() }
      </div>
    );
  }

  renderContent() {
    const { classes } = this.props;
    const { fetchState, newsInspection } = this.state;
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

  renderExplain() {
    const { classes } = this.props;
    const { explainFetchState, explanationUrl } = this.state;
    if (explainFetchState === 'loading') {
      return <CircularProgress
        size={ circleSize }
        className={ classes.progress }
        color='secondary'
      />
    }
    else if (explainFetchState === 'fetched') {
      if (explanationUrl !== null) {
        return <img src={explanationUrl} />
      }
    }
  }
  onExplain = () => {
    const { newsId } = this.props;
    this.setState({explainFetchState: 'loading'});
    this.explainSubscription =
      from(ApiProvider.get(`/api/news/${newsId}/inspection/explanation`))
        .pipe(
          map(response => response.data.data.url),
        )
        .subscribe(
          explanationUrl => this.setState({
            explanationUrl: explanationUrl,
            explainFetchState: 'fetched'
          }),
          error => this.setState({
            explainFetchState: 'fail'
          })
        );
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
