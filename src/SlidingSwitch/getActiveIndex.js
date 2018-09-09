import React from 'react'
import matchPath from 'react-router-dom/matchPath'

// May need to polyfill findIndex
const getActiveIndex = (children, location) =>
  React.Children.toArray(children).findIndex(child =>
    matchPath(location.pathname, {
      exact: child.props.exact,
      path: child.props.path
    })
  )

export default getActiveIndex
