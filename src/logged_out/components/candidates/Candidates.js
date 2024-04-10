import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import HeadSection from "./HeadSection";
import FeaturesSection from "./FeaturesSection";
import TemplateWithPicture from "./TemplateWithPicture";

function Candidates(props) {
  const { selectHome } = props;
  useEffect(() => {
    selectHome();
  }, [selectHome]);
  return (
    <Fragment>
      <HeadSection />
      <FeaturesSection />
      <TemplateWithPicture />
    </Fragment>
  );
}

Candidates.propTypes = {
  selectHome: PropTypes.func.isRequired
};

export default Candidates;
