import React, { Fragment, useState } from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, Typography, Card, Button, Checkbox, Box } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import WaveBorder from "../../../shared/components/WaveBorder";
import useMediaQuery from "@mui/material/useMediaQuery";
import VideoModal from './VideoModal';
import ReactPlayer from 'react-player'; 


const styles = (theme) => ({
  extraLargeButtonLabel: {
    fontSize: theme.typography.body1.fontSize,
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.h6.fontSize,
    },
  },
  extraLargeButton: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
  card: {
    boxShadow: theme.shadows[4],
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(5.5),
      paddingBottom: theme.spacing(5.5),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down("xl")]: {
      width: "auto",
    },
  },
  wrapper: {
    position: "relative",
    backgroundColor: theme.palette.secondary.main,
    paddingBottom: theme.spacing(2),
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
  },
  containerFix: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "none !important",
    },
  },
  waveBorder: {
    paddingTop: theme.spacing(4),
  },
  playIcon: {
    height: '72px',
    width: '72px',
    [theme.breakpoints.up("sm")]: {
      height: '96px',
      width: '96px',
    },
    color: theme.palette.common.white,
    '&:hover': {
      opacity: 0.8,
    },
  },  
  dialogPaper: {
    minWidth: '60vw',
    minWidth: '80vw', // Adjust the minimum width of the dialog
  },
  bulletPoints: {
    paddingLeft: theme.spacing(2),
    '& li': {
      marginBottom: theme.spacing(1),
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: theme.spacing(4), // Adjust the padding as needed
  },
  agreement: {
    marginTop: theme.spacing(2),
  },
  dialogWrapper: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  buttonCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  checkboxLabel: {
    marginTop: theme.spacing(1),
  },
});

function HeadSection(props) {
  const { classes, theme } = props;
  const isWidthUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };  

  const handleDataProcessingAgreement = (event) => {
    event.preventDefault();
    // Placeholder for data processing agreement logic
    console.log("Data Processing Agreement clicked");
  };

  const handleRecordingAgreement = (event) => {
    event.preventDefault();
    // Placeholder for recording agreement logic
    console.log("Recording Agreement clicked");
  };

  const startAssessment = () => {
    // Placeholder for starting the assessment
    console.log("Assessment started");
    // Close the dialog or navigate to the assessment
    handleCloseDialog(); // Assuming you have a function to close the dialog
  };

  return (
    <Fragment>
      <div className={classNames("lg-p-top", classes.wrapper)}>
        <div className={classNames("container-fluid", classes.container)}>
          <Grid container spacing={4}>
            <Grid item xs={12} lg={5}>
              <Card
                className={classes.card}
                data-aos-delay="200"
                data-aos="zoom-in"
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  height="100%"
                >
                  <Box mb={4}>
                    <Typography variant={isWidthUpLg ? "h3" : "h4"}>
                      <strong>Stand Out in Job Search</strong>
                    </Typography>
                  </Box>
                  <div>
                    <Box mb={2}>
                      <Typography
                        variant={isWidthUpLg ? "h6" : "body1"}
                        color="textSecondary"
                      >
                        <ul className={classes.bulletPoints}>
                          <li>Precise AI skill evaluation</li>
                          <li>Verified expertise visibility</li>
                          <li>Unique employee offers</li>
                        </ul>
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      className={classes.extraLargeButton}
                      classes={{ label: classes.extraLargeButtonLabel }}
                      onClick={handleOpenDialog}
                    >
                      Explore Top Job Opportunities
                    </Button>
                  </div>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} lg={7}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                maxWidth="100%"
              >
                <ReactPlayer
                  url={`${process.env.PUBLIC_URL}/Welcome to the Team.mp4`}
                  playing={playVideo}
                  controls={true}
                  width="100%"
                  height="100%"
                  style={{ maxWidth: "100%" }}
                  onClick={() => setPlayVideo(!playVideo)}
                />
              </Box>
            </Grid>
          </Grid>
        </div>
      </div>
      <WaveBorder
        upperColor={theme.palette.secondary.main}
        lowerColor="#FFFFFF"
        className={classes.waveBorder}
        animationNegativeDelay={2}
      />
    </Fragment>
  );
};



HeadSection.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(HeadSection);
