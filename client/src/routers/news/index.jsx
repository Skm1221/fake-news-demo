import { Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import ContentArea from 'components/content-area';
import { NewsMapper } from 'mappers/news';
import { NewsInspectionMapper } from 'mappers/news-inspection';
import { generateNews } from 'models/news';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiProvider } from '../../index.jsx'
import Toast from 'components/toast';

const axios = require('axios');
const circleSize = 40;


const styles = (theme) => ({
  progress: {
    marginLeft: `calc(50% - ${circleSize/2}px)`,
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
    margin: 'auto',
  },
  buttons: {
    zIndex: 2,
    display: 'block',
    textAlign: 'right',
    width: 'calc(100% + 32px)',
    padding: '16px',
    margin: '32px auto -16px -16px'
  },
  toolbar: theme.mixins.toolbar,
});


class NewsRoute extends React.Component {
  state = {
    news: generateNews(),
    newsInspection: null,
    fetchState: 'fetched',
    open: false,
    explanationUrl: '',
    explainFetchState: 'fetched'
  };

  subscription = null;
  explainSubscription = null;

  componentWillUnmount() {
    if (this.subscription !== null){
      this.subscription.unsubscribe();
    }
    if (this.explainSubscription !== null){
      this.explainSubscription.unsubscribe();
    }
  }

  render() {
    const { news, open } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <form className={ classes.container } noValidate autoComplete="off">
          <TextField
            id="headline"
            label="Headline"
            className={ classes.textField }
            value={ news.headline }
            onChange={ (e) => this.onChange('headline', e.currentTarget.value) }
            margin="normal"
            required
            fullWidth
            noWrap
            placeholder="headline"
          />
          <TextField
            id="body"
            label="Body"
            className={ classes.textField }
            value={ news.body }
            onChange={ (e) => this.onChange('body', e.currentTarget.value) }
            margin="normal"
            multiline
            required
            fullWidth
            noWrap
            placeholder="body"
          />
          <div className={ classes.buttons }>
            <Button onClick={ this.onExplain } > Explain </Button>
            <Button onClick={ this.onClick } > Inspect </Button>
          </div>
        </form>
        <Toast
          onClose={ this.onClose }
          open={ open }
          message="Please Check input"
          type="error"
        />
        <div className={ classes.toolbar }/>
        { this.renderContent() }
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
          withNews={ false }
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

  onClose = () => {
    this.setState({ open: false });
  };

  onChange = (key, value) => {
    const { news } = this.state;
    news[key] = value;
    this.setState({ news });
  };

  onExplain = () => {
    const { news } = this.state;
    if (!this.validate(news)) {
      this.setState({ open: true });
      return ;
    }
    this.setState({explainFetchState: 'loading'});
    this.explainSubscription =
      from(ApiProvider.post('/api/news/inspection/explanation', new NewsMapper().toJson(news)))
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

  onClick = () => {
    const { news } = this.state;
    if (!this.validate(news)) {
      this.setState({ open: true });
      return ;
    }
    this.setState({fetchState: 'loading'});
    this.subscription =
      from(ApiProvider.post('/api/news/inspection', new NewsMapper().toJson(news)))
        .pipe(
          map(response => new NewsInspectionMapper().fromJson(response.data.data)),
        )
        .subscribe(
          inspection => this.setState({
            newsInspection: inspection,
            fetchState: 'fetched'
          }),
          error => this.setState({
            fetchState: 'fail'
          })
        );
  };

  validate = (news) => news.headline.length > 0 && news.body.length > 0
}

export default withStyles(styles, { withTheme: true })(NewsRoute)
