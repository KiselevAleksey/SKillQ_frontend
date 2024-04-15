import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Summary from './Summary';  // Import Summary component
import SkillDetails from './SkillDetails'; // Import the adapted Bubbles as SkillDetails
import MobileLegend from './MobileLegend'; // Import the MobileLegend
import petalData from './petalData'; // Import petal data

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginBottom: theme.spacing(1),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));


const SkillCard = ({ petal }) => {
    const classes = useStyles();
    const [expandedDetails, setExpandedDetails] = useState(false);
    const [expandedSummary, setExpandedSummary] = useState(false);
  
    const handleExpandDetails = () => {
      setExpandedDetails(!expandedDetails);
    };
  
    const handleExpandSummary = () => {
      setExpandedSummary(!expandedSummary);
    };
  
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {petal.label}
          </Typography>
          <div>
            <Typography variant="body2" color="textSecondary">Details</Typography>
            <IconButton
              className={`${classes.expand} ${expandedDetails ? classes.expandOpen : ''}`}
              onClick={handleExpandDetails}
              aria-expanded={expandedDetails}
              aria-label="show more details"
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
          <div>
            <Typography variant="body2" color="textSecondary">Summary</Typography>
            <IconButton
              className={`${classes.expand} ${expandedSummary ? classes.expandOpen : ''}`}
              onClick={handleExpandSummary}
              aria-expanded={expandedSummary}
              aria-label="show summary"
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </CardContent>
        <Collapse in={expandedDetails} timeout="auto" unmountOnExit>
          <CardContent>
            <SkillDetails details={petal.bubbles} />
          </CardContent>
        </Collapse>
        <Collapse in={expandedSummary} timeout="auto" unmountOnExit>
          <CardContent>
            <Summary petal={petal} />
          </CardContent>
        </Collapse>
      </Card>
    );
  };
  
export default function MobilePetalDiagram({ skills }) {
  const classes = useStyles();

  return (
    <div>
      <MobileLegend />
      {petalData.map((petal, index) => (
        <SkillCard key={index} petal={petal} />
      ))}
    </div>
  );
}
