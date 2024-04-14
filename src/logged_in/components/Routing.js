import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import withStyles from '@mui/styles/withStyles';
import UserProfile from "./UserProfile/UserProfile";
import PetalDiagram from "./petals/PetalDiagram";
import TabsComponent from "./TabbedInterface/components/TabsComponent";
import JobBoard from "./JobBoard/JobBoard";
import PropsRoute from "../../shared/components/PropsRoute";
import useLocationBlocker from "../../shared/functions/useLocationBlocker";

  const styles = (theme) => ({
    wrapper: {
      width: '100%', // Set the width to be 100% of the viewport
      margin: 0, // Remove all margins
      [theme.breakpoints.up("xs")]: {
        marginTop: theme.spacing(0), // Set the top margin to 0
        marginBottom: theme.spacing(0), // Set the bottom margin to 0
      },
      [theme.breakpoints.up("sm")]: {
        marginTop: theme.spacing(0), // Keep top margin at 0
        marginBottom: theme.spacing(0), // Keep bottom margin at 0
      },
      [theme.breakpoints.up("md")]: {
        marginTop: theme.spacing(0), // Keep top margin at 0
        marginBottom: theme.spacing(0), // Keep bottom margin at 0
      },
      [theme.breakpoints.up("lg")]: {
        marginTop: theme.spacing(0), // Keep top margin at 0
        marginBottom: theme.spacing(0), // Keep bottom margin at 0
      },
    },
  });

function Routing(props) {
  const {
    classes,
    EmojiTextArea,
    ImageCropper,
    Dropzone,
    DateTimePicker,
    pushMessageToSnackbar,
    posts,
    statistics,
    isAccountActivated,
    setPosts,
  } = props;
  useLocationBlocker();
  return (
    <div className={classes.wrapper}>
      <Switch>
        <PropsRoute
          exact
          path="/c/user-profile"
          component={UserProfile}
          pushMessageToSnackbar={pushMessageToSnackbar}
          isAccountActivated={isAccountActivated}
        />
        <PropsRoute
          path="/c/diagram"
          component={PetalDiagram}
          userData={{ photoUrl: `${process.env.PUBLIC_URL}/images/logged_in/Yuliya_Fomina.jpg` }}
        />
        <PropsRoute
          path="/c/tabs"
          component={TabsComponent}
          pushMessageToSnackbar={pushMessageToSnackbar}
          statistics={statistics}
        />
        <PropsRoute
          path="/c/job-board"
          component={JobBoard}
          pushMessageToSnackbar={pushMessageToSnackbar}
        />
      </Switch>
    </div>
  );
}

Routing.propTypes = {
  classes: PropTypes.object.isRequired,
  EmojiTextArea: PropTypes.elementType,
  ImageCropper: PropTypes.elementType,
  Dropzone: PropTypes.elementType,
  DateTimePicker: PropTypes.elementType,
  pushMessageToSnackbar: PropTypes.func,
  setPosts: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  statistics: PropTypes.object.isRequired,
  isAccountActivated: PropTypes.bool.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Routing));
