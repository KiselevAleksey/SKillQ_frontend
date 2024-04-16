import React from "react";
import PropTypes from "prop-types";
import { Drawer, IconButton, Toolbar, Divider, Typography, Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import { Link as RouterLink } from 'react-router-dom';

const drawerWidth = 240;

const styles = (theme) => ({
  toolbar: {
    minWidth: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  linkItem: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
});

function SideDrawer(props) {
  const { classes, onClose, open } = props;
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      classes={{
        paper: classes.drawerPaper,
      }}
      variant="temporary"
    >
      <Toolbar disableGutters className={classes.toolbar}>
        <Box
          pl={3}
          pr={3}
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          <Typography variant="h6">Menu</Typography>
          <IconButton onClick={onClose} color="primary" aria-label="Close Sidedrawer" size="large">
            <CloseIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Divider />
      <List>
        <RouterLink to="/c/user-profile" className={classes.linkItem}>
          <ListItem button onClick={onClose}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </RouterLink>
        <RouterLink to="/c/settings" className={classes.linkItem}>
          <ListItem button onClick={onClose}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </RouterLink>
        {/* Add more list items as needed */}
      </List>
    </Drawer>
  );
}

SideDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(SideDrawer);
