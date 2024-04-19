import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, Typography, Card, Button, Checkbox, Box } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import useMediaQuery from "@mui/material/useMediaQuery";


const styles = (theme) => ({
  wrapper: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    paddingBottom: theme.spacing(2),
  },
  headlineText: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(6),
  },
  secondaryText: {
    marginBottom: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(4),
    fontSize: theme.typography.body1.fontSize,
  },
  buttonCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // Center vertically
    width: '100%', // Full width
    marginTop: theme.spacing(4),
  },
  extraLargeButton: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    width: '100%', // for full width
    minWidth: 250,

    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      width: 'auto', // or you can use a specific value like 300px

    },

  },
  image: {
    maxWidth: "100%",
    verticalAlign: "middle",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
  },
  container: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(12),
    [theme.breakpoints.down("lg")]: {
      marginBottom: theme.spacing(9),
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(6),
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(3),
    },
  }

});



function HeadSection(props) {
  const { classes } = props;
  const isWidthUpLg = useMediaQuery(props.theme.breakpoints.up("lg"));

  return (
    <Fragment>
      <div className={classNames("lg-p-top", classes.wrapper)}>
        <div className={classNames("container-fluid", classes.container)}>
          <Grid container spacing={4}>
            <Grid item xs={12} lg={5}>
              <Typography
                variant={isWidthUpLg ? "h2" : "h3"}
                className={classes.headlineText}
                style={{ fontWeight: 'bold' }}
              >
                Stand out in the Job Market
              </Typography>
              <Typography
                variant={isWidthUpLg ? "h4": "h5"}
                color="textSecondary"
                className={classes.secondaryText}
              >
                Evaluate your skills in minutes, receive tailored learning and job offers
              </Typography>
              <div className={classes.buttonCenter}>
              <Button
                  variant="contained"
                  color="primary"
                  className={classNames(classes.button, classes.extraLargeButton)}
                  fullWidth
                  component={Link}
                  to="/Register"
                >
                  Start now
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} lg={7}>
            <img src={`${process.env.PUBLIC_URL}/images/logged_out/front_screen_1.webp`} alt="Job Market" className={classes.image} />
            </Grid>
          </Grid>
        </div>
      </div>
    </Fragment>
  );
}


HeadSection.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(HeadSection);