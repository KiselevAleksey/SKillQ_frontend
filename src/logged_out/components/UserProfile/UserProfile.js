import React from 'react';
import { Avatar, Typography, Button, Card, CardContent, Box, Chip, Grid, Divider, Stack, Paper } from '@mui/material';
import { blue } from '@mui/material/colors';

const UserProfile = () => {
  // Mock user data
  const userData = {
    name: 'Aleksey Kiselev',
    title: 'Consultant, Data Science Specialist at McKinsey & Company',
    location: 'Singapore, Singapore',
    connections: '500+',
    experiences: [
      {
        id: 1,
        role: 'Specialist Data Scientist',
        company: 'McKinsey & Company',
        duration: 'Jul 2022 - Present',
        location: 'Singapore',
      },
      // ...other experiences
    ],
    education: [
      {
        id: 1,
        degree: "Master's degree, International Economics",
        institution: 'Plekhanov Russian University of Economics',
        duration: 'Sep 2018 - Jun 2020',
      },
      // ...other education
    ],
    skills: [
      {
        id: 1,
        name: 'Data Analytics',
        endorsements: 2,
      },
      // ...other skills
    ],
  };

 
  return (
    <Paper elevation={3} sx={{ maxWidth: 800, mx: 'auto', my: 4, p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
        <Avatar alt={userData.name} src="/path-to-image.jpg" sx={{ width: 90, height: 90, mb: 2 }} />
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
          Assessment Results
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
          {userData.skills.map((skill) => (
            <Chip key={skill.id} label={skill.name} variant="outlined" color="primary" />
          ))}
        </Stack>
      </Box>
    </Paper>
  );
};

export default UserProfile;