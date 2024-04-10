import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/components/PropsRoute";
import Candidates from "./candidates/Candidates";
import AssessmentPage from "./assessment/AssessmentPage";
import HR from "./HR/HR";
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
    </Switch>
  );
}


Routing.propTypes = {
  blogposts: PropTypes.arrayOf(PropTypes.object),
  selectHome: PropTypes.func.isRequired,
  selectBlog: PropTypes.func.isRequired,
};

export default memo(Routing);
