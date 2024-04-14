import React from 'react';
import { Avatar, Typography, Button, Card, CardContent, Box, Chip, Grid, Divider, Stack, Paper } from '@mui/material';

const UserProfile = () => {
  const userData = {
    name: 'Yuliya Fomina',
    connectionDegree: '1st degree connection',
    position: 'Senior Business Analyst at McKinsey & Company | ex-Google, Procter&Gamble',
    company: 'McKinsey & Company',
    university: 'Università Bocconi',
    location: 'Federal Territory of Kuala Lumpur, Malaysia',
    contactInfo: 'Contact info',
    connectionsCount: '500+',
    experiences: [
      {
        id: 1,
        role: 'Senior Business Analyst',
        company: 'McKinsey & Company',
        duration: 'Jan 2024 - Present',
        location: 'Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia',
        description:
          'Developed strategies for new products\' market entry, establishment of new businesses, and business models refinement for clients based in Russia, Indonesia, Malaysia, Thailand, and Singapore',
      },
      // ...other experiences
    ],
    education: [
      {
        id: 1,
        degree: "MSc in International Management",
        institution: 'Università Bocconi',
        accolades: ['#6 Master\'s in Management program worldwide according to Financial Times ranking 2018', 'Bocconi International Merit Award holder'],
      },
      // ...other education
    ],
    skills: [
      'Strategy',
      'Market Entry',
      'Business Analysis',
      'Data Analysis',
      // ...other skills
    ],
  };

 
  return (
    <Paper elevation={3} sx={{ maxWidth: 800, mx: 'auto', my: 4, p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
        <Avatar alt={userData.name} src={`${process.env.PUBLIC_URL}/images/logged_in/Yuliya_Fomina.jpg`} sx={{ width: 90, height: 90, mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          {userData.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {userData.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {userData.location} • {userData.connections} connections
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 1 }}>
          Connect
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
            <Typography variant="body2" color="textSecondary">{exp.company} • {exp.duration}</Typography>
            <Typography variant="body2" color="textSecondary">{exp.location}</Typography>
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
            <Typography variant="body2" color="textSecondary">{edu.institution} • {edu.duration}</Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Skills
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {userData.skills.map((skill, index) => (
            <Chip
              key={skill} // Use the skill string as the unique key
              label={skill} // Use the skill string as the label
              variant="outlined"
              sx={{
                height: 'auto',
                border: '1px solid', // Keep border size
                borderColor: 'primary.main', // Use the primary color from the theme for border
                borderRadius: '16px', // This gives the Chip an oval shape
                padding: '6px 12px',
                color: 'text.primary', // Use the text primary color from the theme
                '& .MuiChip-label': {
                  color: 'inherit', // Ensure label color is inherited so it's black
                },
              }}
            />
          ))}
        </Stack>
      </Box>

    </Paper>
  );
};

export default UserProfile;