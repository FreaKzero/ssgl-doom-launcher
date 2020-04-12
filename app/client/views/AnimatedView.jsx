import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';

import { order } from '../routes';
import { useHashLocation } from '../utils';

const AnimatedView = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const [loc, nav, refer] = useHashLocation();

  const AnimationSettings = {
    transition: { type: 'tween', ease: 'easeOut' },
    initial: {
      x: order.indexOf(loc) >= order.indexOf(refer) ? 600 : -600
    },
    animate: { x: 0 },
    exit: { x: 0, opacity: 0 }
  };

  return (
    <AnimatePresence>
      <motion.div key="1" {...AnimationSettings}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

AnimatedView.propTypes = {
  children: PropTypes.any
};

export default AnimatedView;
