import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Grid, Box, Typography, Card, CardContent, Modal, Backdrop, Fade } from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ExploreIcon from '@mui/icons-material/Explore';
import FindInPageIcon from '@mui/icons-material/FindInPage';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    background: '#fff',
  },
  featureCard: {
    textAlign: 'center',
    padding: theme.spacing(2),
    '&:hover': {
      boxShadow: theme.shadows[10],
    },
  },
  featureIcon: {
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    '& svg': {
      fontSize: '4rem',
    },
  },
  featureTitle: {
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
  },
  featureText: {
    color: theme.palette.text.secondary,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const features = [
  {
    color: "#00C853",
    title: 'Skill Boost',
    description: 'Quickly assess and identify skills to refine.',
    icon: <SpeedIcon />,
  },
  {
    color: "#6200EA",
    title: 'Visible Expertise',
    description: 'Showcase your verified abilities to hiring managers.',
    icon: <VisibilityIcon />,
  },
  {
    color: "#0091EA",
    title: 'Career Navigator',
    description: 'Find your optimal career trajectory in your industry.',
    icon: <ExploreIcon />,
  },
  {
    color: "#d50000",
    title: 'Matched Opportunities',
    description: 'Discover jobs matched to your skills and career goals.',
    icon: <FindInPageIcon />,
  },
];

const Feature = ({ title, description, icon, color }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card className={classes.featureCard} onClick={handleOpen}>
        <CardContent>
          <Box className={classes.featureIcon} style={{ color }}>
            {icon}
          </Box>
          <Typography variant="h6" className={classes.featureTitle}>
            {title}
          </Typography>
          <Typography className={classes.featureText}>
            {description}
          </Typography>
        </CardContent>
      </Card>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography variant="h5" id="transition-modal-title">{title}</Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Detailed information about {title}.
            </Typography>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

const FeaturesSection = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root} style={{ marginTop: '50px', marginBottom: '100px' }}>
    <Typography variant="h4" align="center" gutterBottom style={{ marginBottom: '40px' }}>
      Meet the feature of our product
    </Typography>
    <Grid container spacing={4} justifyContent="center">
      {features.map((feature, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Feature
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            color={feature.color}
          />
        </Grid>
      ))}
    </Grid>
  </Container>
  );
};

export default FeaturesSection;
