import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';

// Updated to use a function for dynamic styling based on props
const useStyles = makeStyles({
    bubble: (props) => ({
      fill: props.isLowest ? 'rgba(205, 92, 92, 0.6)' : 'rgba(60, 179, 113, 0.6)', // Updated colors for a more metallic look
      stroke: '#708090', // Slate grey stroke
      strokeWidth: 2,
      cursor: 'pointer',
      '&:hover': {
        stroke: '#2F4F4F', // Darker slate grey on hover
        strokeWidth: 3,
      },
    }),
    bubbleText: {
      fill: '#000',
      textAnchor: 'middle',
      dominantBaseline: 'middle',
      fontSize: '18px',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      pointerEvents: 'none',
    },
  });

  const useDropdownStyles = makeStyles({
    menuItem: {
      '&:hover': {
        backgroundColor: '#f5f5f5', // Light grey on hover for the menu item
      },
    },
    link: {
      textDecoration: 'none',
      color: 'inherit', // Ensures the link color is the same as the text
    },
    header: {
      padding: '10px 16px',
      fontWeight: 'bold',
      fontSize: '14px',
      backgroundColor: '#e0e0e0', // Light grey background for the header
      color: '#505050', // Dark grey text
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
    },
  });

  const Dropdown = ({ anchorEl, open, onClose, courseLinks, skillName }) => {
    const styles = useDropdownStyles();
    return (
      <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
        <div className={styles.header}>Personal Recommendations for {skillName} Improvement</div>
        {courseLinks.map((link, index) => (
          <MenuItem key={index} onClick={onClose} className={styles.menuItem}>
            <Link href={link.url} target="_blank" rel="noopener" className={styles.link}>
              {link.title}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    );
  };  


const Bubble = ({ name, number, position, isLowest, courseLinks }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const styles = useStyles({ isLowest });
    const bubbleRadius = 55; // Adjust radius as needed
    const lineHeight = 18;
    const nameParts = name.split(/\s+/);
    const totalTextHeight = lineHeight * nameParts.length + lineHeight;
    const fitsInsideBubble = totalTextHeight <= bubbleRadius * 2;
    const fontSize = fitsInsideBubble ? '18px' : `${(bubbleRadius * 2) / (nameParts.length + 1)}px`;
    const startY = -(lineHeight * (nameParts.length - 1)) / 2;
    const newPosition = { x: position.x, y: position.y };
  
    const handleMouseEnter = (event) => {
      if (isLowest) {
        setAnchorEl(event.currentTarget);
      }
    };
  
    const handleMouseLeave = () => {
      setAnchorEl(null);
    };
  
    return (
      <g 
        transform={`translate(${newPosition.x}, ${newPosition.y})`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <circle cx={0} cy={0} r={bubbleRadius} className={styles.bubble} />
        <text className={styles.bubbleText} style={{ fontSize }}>
          {nameParts.map((part, index) => (
            <tspan key={index} x={0} dy={index === 0 ? startY : lineHeight}>{part}</tspan>
          ))}
          <tspan x={0} dy={lineHeight}>{`${number}%`}</tspan>
        </text>
        {isLowest && (
            <Dropdown
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMouseLeave}
                bubbleText={name}
                courseLinks={courseLinks}
                skillName={name}
            />
            )}
      </g>
    );
  };
  
  export default Bubble;