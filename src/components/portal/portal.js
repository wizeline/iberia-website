import React from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
  const portalRoot = typeof document !== 'undefined' ? document.getElementById('profile-form') : null;
  return portalRoot ? ReactDOM.createPortal(children, portalRoot) : null;
};
export default Portal;