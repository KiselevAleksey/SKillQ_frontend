import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Grid, Box, Typography, Card, CardContent } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    background: '#fff',
  },
  featureCard: {
    textAlign: 'center',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // This will space out the card content between top and bottom
    height: '100%', // Make the card fill out the parent container
    '&:hover': {
      boxShadow: theme.shadows[10],
    },
  },
  gridContainer: {
    display: 'flex',
    alignItems: 'stretch',
  },
  featureIcon: {
    margin: 'auto',
    display: 'block',
    width: '80px', // Adjust the icon width here
    height: '80px', // Adjust the icon height here
    marginBottom: theme.spacing(2),
  },
  featureTitle: {
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
  },
  featureText: {
    color: theme.palette.text.secondary,
  },
}));

// You can define your feature items here with the title, description, and icon path
const features = [
  {
    title: 'Objective evaluation of your skills',
    description: 'Show recruiters your best self in a stress-free environment, right in front of your laptop',
    icon: '/icons/unemployed.png', // Replace with your actual image path
  },
  {
    title: 'Customized job board',
    description: 'Forget about hours spent to find job postings that fit your knowledge and career trajectory - we are here to do it for you',
    icon: 'icons/requirements.png', // Replace with your actual image path
  },
  {
    title: 'Customized learning experience',
    description: 'SkillQ is the best platform available to track your skill level over time and give you a next step learning recommendation',
    icon: '/icons/knowledge.png', // Replace with your actual image path
  },
];

const Feature = ({ title, description, icon }) => {
  const classes = useStyles();

  return (
    <Card className={classes.featureCard}>
      <CardContent>
        <img src={icon} alt={title} className={classes.featureIcon} />
        <Typography variant="h6" className={classes.featureTitle}>
          {title}
        </Typography>
        <Typography className={classes.featureText}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const FeaturesSection = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h4" marginBottom={5} gutterBottom style={{ fontWeight: 'bold' }}>
        SkillIQ at a glance
      </Typography>
      <Grid container spacing={4} className={classes.gridContainer}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
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
