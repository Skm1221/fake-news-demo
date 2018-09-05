import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  body: {
    margin: theme.spacing.unit,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroGrids: {
    marginTop: theme.spacing.unit * 4,
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

class ContentArea extends React.Component {

  render() {
    const { classes, newsInspection, withNews } = this.props;
    console.log(withNews);
    return (
      <div className={classes.heroUnit}>
        {
          withNews ?
            <div className={classes.heroContent}>
              <Typography variant="display1" align="center" color="textPrimary" gutterBottom>
                { newsInspection.news.headline }
              </Typography>
              <Typography variant="title" align="center" color="textSecondary" paragraph>
                { newsInspection.news.body }
              </Typography>
            </div> : undefined
        }
        <div className={classes.heroGrids}>
          <Grid container spacing={32} justify="center">
            { this.renderGrid(newsInspection) }
          </Grid>
        </div>
      </div>
    );
  }

  capitalizeFirstLetter = (string) => string[0].toUpperCase() + string.slice(1);

  renderGrid = (newsInspection) =>
    ['unrelated', 'agree', 'disagree', 'discuss']
      .map(type => {
        const key = `${type}Ratio`;
        const color = type === newsInspection.inspection ? "primary" : "textPrimary";
        return (
          <Grid item>
            <Typography variant="headline" align="center" color={ color } gutterBottom>
              { `${this.capitalizeFirstLetter(type)} Ratio` }
            </Typography>
            <Typography variant="subheading" align="center" color={ color } paragraph>
              { newsInspection[key].toString() }
            </Typography>
          </Grid>
        )
      });



}

export default withStyles(styles, { withTheme: true })(ContentArea);