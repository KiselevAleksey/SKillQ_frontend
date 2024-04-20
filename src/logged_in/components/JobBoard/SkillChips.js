import React from 'react';
import { Box, Chip, Tooltip, Typography, Link as MuiLink } from '@mui/material';

const SkillChips = ({ jobSkills, userSkills }) => {
  const renderTooltipContent = (skill, userSkillLevel, requiredLevel) => {
    if (userSkillLevel === undefined) {
      return (
        <>
          Skill not tested, please{" "}
          <MuiLink
            href="/assessment"
            sx={{
              color: 'white',
              textDecoration: 'underline',
              '&:hover': { textDecoration: 'underline', cursor: 'pointer' },
              '&:visited': { color: 'white' },
            }}
          >
            test it
          </MuiLink>
          .
        </>
      );
    } else if (userSkillLevel < requiredLevel) {
      return (
        <>
          Your skill level is {userSkillLevel}%, you may improve it by passing{" "}
          <MuiLink
            href="/c/courses"
            sx={{
              color: 'white',
              textDecoration: 'underline',
              '&:hover': { textDecoration: 'underline', cursor: 'pointer' },
              '&:visited': { color: 'white' },
            }}
          >
            courses
          </MuiLink>
          .
        </>
      );
    } else {
      return `Your skill level is ${userSkillLevel}%.`;
    }
  };

  return (
    <Box sx={{ marginBottom: '16px' }}>
      <Typography variant="subtitle1" gutterBottom>
        Skills Required:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {Object.entries(jobSkills).map(([skill, requiredLevel], index) => {
          const userSkillLevel = userSkills[skill];
          let backgroundColor;

          if (userSkillLevel === undefined) {
            backgroundColor = 'rgba(211, 211, 211, 0.6)';
          } else if (userSkillLevel >= requiredLevel) {
            backgroundColor = 'rgba(102, 187, 106, 0.6)';
          } else {
            backgroundColor = 'rgba(255, 105, 97, 0.6)';
          }

          return (
            <Tooltip
              title={renderTooltipContent(skill, userSkillLevel, requiredLevel)}
              key={index}
              arrow
              enterTouchDelay={0}
              leaveTouchDelay={5000}
            >
              <Chip
                label={`${skill} ${requiredLevel}%`}
                size="small"
                sx={{ 
                  backgroundColor, 
                  color: 'black', 
                  textDecoration: 'none',
                  '&:hover': { 
                    backgroundColor: backgroundColor, // keeps the original color
                    cursor: 'pointer' // changes the cursor to a hand icon
                  } 
                }}
              />
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
};

export default SkillChips;

