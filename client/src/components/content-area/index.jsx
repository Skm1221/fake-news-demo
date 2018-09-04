import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {compose} from 'recompose';

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

@compose(
    withStyles(styles, { withTheme: true }),
)
export class ContentArea extends React.Component {

    render() {
        const { classes, newsInspection } = props;
        return (
            <div className={classes.heroUnit}>
                <div className={classes.heroContent}>
                    <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
                        { newsInspection.headline }
                    </Typography>
                    <Typography variant="title" align="center" color="textSecondary" paragraph>
                        { newsInspection.body }
                    </Typography>
                </div>
                <div className={classes.heroGrids}>
                    <Grid container spacing={16} justify="center">
                        <Grid item>
                            <Typography variant="headline" align="center" color="textPrimary" gutterBottom>
                                Unrelated Ratio
                            </Typography>
                            <Typography variant="subheading" align="center" color="textPrimary" paragraph>
                                { newsInspection.unrelatedRatio.toString() }
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="headline" align="center" color="textPrimary" gutterBottom>
                                Agree Ratio
                            </Typography>
                            <Typography variant="subheading" align="center" color="textPrimary" paragraph>
                                { newsInspection.agreeRatio.toString() }
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="headline" align="center" color="textPrimary" gutterBottom>
                                Disagree Ratio
                            </Typography>
                            <Typography variant="subheading" align="center" color="textPrimary" paragraph>
                                { newsInspection.disagreeRatio.toString() }
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="headline" align="center" color="textPrimary" gutterBottom>
                                Discuss Ratio
                            </Typography>
                            <Typography variant="subheading" align="center" color="textPrimary" paragraph>
                                { newsInspection.discussRatio.toString() }
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }

}

ContentArea.propTypes = {
    classes: PropTypes.object.isRequired,
    newsInspection: PropTypes.object.isRequired,
};
