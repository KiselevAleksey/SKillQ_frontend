import React from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const useStyles = makeStyles((theme) => ({
  legendButton: {
    float: 'right',
  },
}));

const MobileLegend = () => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen} className={classes.legendButton}>
        <InfoIcon />
      </IconButton>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>{"Legend"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This legend helps you understand the color coding and symbols used in the skill cards.
          </DialogContentText>
          <Typography color="primary" display="block">
            Blue - Indicates proficiency level above 75%
          </Typography>
          <Typography color="secondary" display="block">
            Red - Indicates proficiency level below 25%
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MobileLegend;
