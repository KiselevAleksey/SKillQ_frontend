import React from 'react';
import { makeStyles } from '@mui/styles';
import { Paper, Typography, Grid, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ShareIcon from '@mui/icons-material/Share';

// Reuse the style from AssessmentRules for consistency
const useStyles = makeStyles((theme) => ({
  assessmentBox: {
    padding: theme.spacing(4),
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    margin: theme.spacing(2),
    minWidth: '100%',
    overflow: 'hidden',
    border: `1px solid ${theme.palette.divider}`, // added based on your description
    borderRadius: theme.shape.borderRadius, // for rounded corners
    boxShadow: theme.shadows[2], // apply some shadow
  },
  gridContainer: {
    margin: 0,
    width: '100%',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  // Include colors for icons
  redIcon: {
    color: '#d50000',
  },
  blueIcon: {
    color: '#0091EA',
  },
  greenIcon: {
    color: '#00C853',
  },
  purpleIcon: {
    color: '#6200EA',
  },
}));

const BenefitCard = ({ title, description, Icon, iconColor }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6}>
      <Icon className={`${classes.icon} ${classes[iconColor]}`} />
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography>
        {description}
      </Typography>
    </Grid>
  );
};

const BenefitsOfAssessment = () => {
  const classes = useStyles();

  const benefits = [
    {
      title: 'Visible Expertise',
      description: 'Showcase your verified abilities to hiring managers.',
      Icon: VisibilityIcon,
      iconColor: 'purpleIcon', // This is a custom style class for the icon color
    },
    {
      title: 'Assess Technical Expertise',
      description: 'Evaluate and validate your technical skills with in-depth assessments.',
      Icon: EngineeringIcon,
      iconColor: 'greenIcon', // This is a custom style class for the icon color
    },
    {
      title: 'Structured Thought Process',
      description: 'Demonstrate your problem-solving approach through structured assessments.',
      Icon: ModeCommentIcon,
      iconColor: 'blueIcon', // This is a custom style class for the icon color
    },
    {
      title: 'Shareable Results',
      description: 'Easily share your assessment results with potential employers or your network.',
      Icon: ShareIcon,
      iconColor: 'redIcon', // This is a custom style class for the icon color
    },  
  ];

  return (
    <Paper className={classes.assessmentBox}>
      <Typography variant="h5" component="h3">
        Benefits of Assessment
      </Typography>
      <Box className={classes.gridContainer}>
        <Grid container justifyContent="center">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              title={benefit.title}
              description={benefit.description}
              Icon={benefit.Icon}
              iconColor={benefit.iconColor}
            />
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default BenefitsOfAssessment;
