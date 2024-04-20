import React from 'react';
import { makeStyles } from '@mui/styles';
import { LinearProgress, Box, Typography, Paper, Avatar, Button, Stack, Chip, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

// Define the styles for the progress bar
const useStyles = makeStyles((theme) => ({
  skillProgress: {
    height: 10,
    borderRadius: 5,
    width: '100%',
  },
  skillLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  },
}));

const UserProfile = () => {
    const classes = useStyles();

    const userData = {
      name: 'Yuliya Fomina',
      connectionDegree: '1st degree connection',
      position: 'Senior Business Analyst at McKinsey & Company | ex-Google, Procter&Gamble',
      company: 'McKinsey & Company',
      university: 'Università Bocconi',
      location: 'Federal Territory of Kuala Lumpur, Malaysia',
      contactInfo: 'Contact info',
      experiences: [
        {
          id: 1,
          role: 'Senior Business Analyst',
          company: 'McKinsey & Company',
          duration: 'Jan 2024 - Present',
          location: 'Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia',
          description: 'Developed strategies for new products\' market entry, establishment of new businesses, and business models refinement for clients based in Russia, Indonesia, Malaysia, Thailand, and Singapore',
        },
        {
          id: 2,
          role: 'Business Analyst',
          company: 'McKinsey & Company',
          duration: 'Oct 2021 - Dec 2023',
          location: 'Federal Territory of Kuala Lumpur, Malaysia',
          description: 'Contributed to various strategic projects involving market entry and business model refinement across Southeast Asia.',
        },
        {
          id: 3,
          role: 'Business Analyst Intern',
          company: 'McKinsey & Company',
          duration: 'Mar 2021 - Sep 2021',
          location: 'Moscow, Russia',
          description: 'Assisted with analytical tasks and supported strategy development initiatives in the Moscow office.',
        },
        {
          id: 4,
          role: 'Product Manager and Analyst',
          company: 'Enty',
          duration: 'Sep 2020 - Mar 2021',
          location: 'Tallinn, Harjumaa, Estonia',
          description: 'Facilitated back-office operations for companies, striving for efficiency and cost-effectiveness.',
        },
        {
          id: 5,
          role: 'Business Intern',
          company: 'Google',
          duration: 'Jun 2019 - Sep 2019',
          location: 'County Dublin, Ireland',
          description: 'Identified growth opportunities among clients and agencies, prognosticated top performers, and organized a significant social event.',
        },
        {
          id: 6,
          role: 'Brand Management Intern',
          company: 'Procter & Gamble',
          duration: 'Aug 2017 - Nov 2017',
          location: 'Moscow, Russia',
          description: 'Led social media campaigns and collaborated on marketing initiatives with significant retail partners.',
        },
        {
          id: 7,
          role: 'Customer Development Department Intern',
          company: 'Unilever',
          duration: 'Feb 2016 - Sep 2016',
          location: 'Moscow, Russia',
          description: 'Managed beauty consultant projects and organized promotional activities, achieving a 30% cost reduction.',
        },
      ],
      education: [
        {
          id: 1,
          degree: "MSc in International Management",
          institution: 'Università Bocconi',
          duration: 'Years attended',
          accolades: ['#6 Master\'s in Management program worldwide according to Financial Times ranking 2018', 'Bocconi International Merit Award holder'],
        },
        {
          id: 2,
          degree: 'Bachelor of Science - BS, Economics',
          institution: 'Lomonosov Moscow State University (MSU)',
          duration: 'Years attended',
          accolades: ['Student Group Representative', 'Sports Events Organizer', 'Rhythmic Gymnastics Faculty\'s Team Captain'],
          // ... Add more accolades if needed
        },
        // ... Add other education entries here
      ],
      skills: [
        { name: 'Content Marketing', level: 80 },
        { name: 'Marketing Strategy', level: 75 },
        { name: 'Social Media Marketing', level: 90 },
        { name: 'Problem Solving', level: 85 },
        { name: 'Presentation', level: 80 },
      ],
    };

 

    return (
      <Paper elevation={3} sx={{ maxWidth: 800, mx: 'auto', my: 4, p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
          <Avatar alt={userData.name} src={`${process.env.PUBLIC_URL}/images/logged_in/Yuliya_Fomina.webp`} sx={{ width: 90, height: 90, mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            {userData.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {userData.position}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {userData.location}
          </Typography>
        </Box>
  
        <Divider sx={{ my: 2 }} />
  
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Skills
          </Typography>
          {userData.skills.map((skill, index) => (
            <Box key={index} sx={{ width: '100%', mb: 2 }}>
              <Box className={classes.skillLabel}>
                <Typography variant="body1">{skill.name}</Typography>
                <Typography variant="body1">{`${skill.level}%`}</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={skill.level}
                className={classes.skillProgress}
              />
            </Box>
          ))}
          <Button
            component={Link} // Specify that Button should act as a RouterLink
            to="/c/diagram" // Set the target path
            variant="outlined" 
            sx={{
              mt: 1,
              bgcolor: 'white',
              color: 'text.primary',
              borderColor: 'secondary.main',
              '&:hover': {
                bgcolor: 'white',
                borderColor: 'secondary.dark',
              },
            }}
          >
            More details
          </Button>
        </Box>

  
        <Divider sx={{ my: 2 }} />
  
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Experience
          </Typography>
          {userData.experiences.map((exp) => (
            <Box key={exp.id} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">{exp.role}</Typography>
              <Typography variant="body2" color="textSecondary">
                {exp.company} • {exp.duration}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {exp.location}
              </Typography>
              <Typography variant="body2">{exp.description}</Typography>
            </Box>
          ))}
        </Box>
  
        <Divider sx={{ my: 2 }} />
  
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Education
          </Typography>
          {userData.education.map((edu) => (
            <Box key={edu.id} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">{edu.degree}</Typography>
              <Typography variant="body2" color="textSecondary">
                {edu.institution} • {edu.duration}
              </Typography>
              {edu.accolades.map((accolade, index) => (
                <Typography key={index} variant="body2" color="textSecondary">
                  {accolade}
                </Typography>
              ))}
            </Box>
          ))}
        </Box>
      </Paper>
    );
  };
  
  export default UserProfile;