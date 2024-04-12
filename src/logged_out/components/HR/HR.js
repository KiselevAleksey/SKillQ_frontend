import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import HeadSection from './HeadSection';
import FeaturesSection from './FeaturesSection';
import VideoSection from './VideoSection';

function HR(props) {
  const { selectBlog } = props;

  useEffect(() => {
    selectBlog();
  }, [selectBlog]);

  return (
    <Fragment>
      <HeadSection />
      <FeaturesSection />
      <VideoSection />
    </Fragment>
  );
}

HR.propTypes = {
  selectBlog: PropTypes.func.isRequired
};

export default HR;
