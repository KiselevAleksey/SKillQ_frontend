import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Hidden, IconButton } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import BookIcon from "@mui/icons-material/Book";
import NavigationDrawer from "../../../shared/components/NavigationDrawer";

const styles = theme => ({
  appBar: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.white
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  menuButtonText: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
    marginRight: theme.spacing(7),
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400
  },
  noDecoration: {
    textDecoration: "none !important"
  },
  underline: {
    textDecoration: 'underline',
  },
});

function NavBar(props) {
  const {
    classes,
    handleMobileDrawerOpen,
    handleMobileDrawerClose,
    mobileDrawerOpen,
    selectedTab
  } = props;
  const menuItems = [
    {
      link: "/",
      name: "For Talents",
      icon: <HomeIcon className="text-white" />
    },
    {
      link: "/HR",
      name: "For HR and Hiring Managers",
      icon: <BookIcon className="text-white" />
    },
    {
      link: "/Login",
      name: "Login",
      icon: <LockOpenIcon className="text-white" />
    }
  ];
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
        <div>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography
              variant="h4"
              className={classes.brandText}
              display="inline"
              color="primary"
            >
              Skill
            </Typography>
            <Typography
              variant="h4"
              className={classes.brandText}
              display="inline"
              color="secondary"
            >
              Q
            </Typography>
          </Link>
        </div>
          <div>
            <Hidden mdUp>
              <IconButton
                className={classes.menuButton}
                onClick={handleMobileDrawerOpen}
                aria-label="Open Navigation"
                size="large">
                <MenuIcon color="primary" />
              </IconButton>
            </Hidden>
            <Hidden mdDown>
              {menuItems.map(element => {
                const isSelected = selectedTab === element.name;
                return (
                  <Link
                    key={element.name}
                    to={element.link}
                    className={classes.noDecoration}
                    onClick={() => {
                      handleMobileDrawerClose();
                      props.setSelectedTab(element.name); // Call the function from props
                    }}
                  >
                    <Button
                      color="secondary"
                      size="large"
                      classes={{ text: isSelected ? `${classes.menuButtonText} ${classes.underline}` : classes.menuButtonText }}
                    >
                      {element.name}
                    </Button>
                  </Link>
                );
              })}
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
      <NavigationDrawer
        menuItems={menuItems}
        anchor="right"
        open={mobileDrawerOpen}
        selectedItem={selectedTab}
        onClose={handleMobileDrawerClose}
      />
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleMobileDrawerOpen: PropTypes.func,
  handleMobileDrawerClose: PropTypes.func,
  mobileDrawerOpen: PropTypes.bool,
  selectedTab: PropTypes.string,
  openRegisterDialog: PropTypes.func.isRequired,
  openLoginDialog: PropTypes.func.isRequired,
  setSelectedTab: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(memo(NavBar));
