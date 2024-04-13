import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/components/PropsRoute";
import Candidates from "./candidates/Candidates";
import AssessmentPage from "./assessment/AssessmentPage";
import HR from "./HR/HR";
import FreelancerSignup from "./signup/FreelancerSignup/FreelancerSignup";
import Signup from "./signup/Signup";
import Login from "./login/Login";
import PetalDiagram from "./petals/PetalDiagram";
import TabsComponent from "./TabbedInterface/components/TabsComponent";
import JobBoard from "./JobBoard/JobBoard";
import UserProfile from "./UserProfile/UserProfile";
import TestUpload from "./test/TestUpload";


import useLocationBlocker from "../../shared/functions/useLocationBlocker";

function Routing(props) {
  const { blogPosts, selectBlog, selectHome } = props;
  useLocationBlocker();
  return (
    <Switch>
      <PropsRoute
        exact
        path="/"
        component={Candidates}
        selectHome={selectHome}
      />
      <PropsRoute
        exact
        path="/HR"
        component={HR}
        selectBlog={selectBlog}
      />
      <PropsRoute
        exact
        path="/assessment"
        component={AssessmentPage}
      />
      <PropsRoute
        exact
        path="/register"
        component={FreelancerSignup}
      />
      <PropsRoute
        exact
        path="/login"
        component={Login}
      />
      <PropsRoute
        exact
        path="/signup"
        component={Signup}
      />
      <PropsRoute
        exact
        path="/diagram"
        component={PetalDiagram}
        userData={{ }}
      />
      <PropsRoute
        exact
        path="/tabs"
        component={TabsComponent}
        userData={{ }}
      />
      <PropsRoute
        exact
        path="/jobBoard"
        component={JobBoard}
        userData={{ }}
      /> 
      <PropsRoute
        exact
        path="/userProfile"
        component={UserProfile}
        userData={{ }}
      /> 
      <PropsRoute
        exact
        path="/TestUpload"
        component={TestUpload}
        userData={{ }}
      /> 
    </Switch>
  );
}


Routing.propTypes = {
  blogposts: PropTypes.arrayOf(PropTypes.object),
  selectHome: PropTypes.func.isRequired,
  selectBlog: PropTypes.func.isRequired,
};

export default memo(Routing);
