import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Link from '@mui/material/Link';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  link: {
    marginTop: theme.spacing(1),
  },
}));

const SkillDetails = ({ details }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedCourseLinks, setSelectedCourseLinks] = useState([]);

  const handleListItemClick = (courseLinks) => {
    setSelectedCourseLinks(courseLinks);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <List component="nav" className={classes.root} aria-label="skill details">
        {details.map((detail, index) => (
          <React.Fragment key={index}>
            <ListItem button onClick={() => handleListItemClick(detail.courseLinks)}>
              <ListItemText primary={`${detail.name}: ${detail.number}%`} />
            </ListItem>
            {index !== details.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Recommended Courses</DialogTitle>
        <DialogContent>
          {selectedCourseLinks.map((link, index) => (
            <div key={index}>
              <Link href={link.url} target="_blank" rel="noopener" className={classes.link}>
                {link.title}
              </Link>
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SkillDetails;
