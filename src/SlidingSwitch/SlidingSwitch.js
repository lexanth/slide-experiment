import React from 'react'
import styled from 'styled-components'
import { Motion, spring } from 'react-motion'
import { Route } from 'react-router-dom'
import { SizeMe } from 'react-sizeme'

import getActiveIndex from './getActiveIndex'

const defaultSpringSettings = { stiffness: 170, damping: 26 }

const SwitchContainer = styled.div`
  width: 100%;
`
const ItemsWrapper = styled.div`
  display: flex;
  overflow: hidden;
  width: ${props => props.width}px;
  height: 100px;
  position: relative;
`

const SlidingSwitchInner = ({
  width = 0,
  children,
  activeIndex,
  settings = defaultSpringSettings
}) => {
  const configs = React.Children.toArray(children).map((child, index) => ({
    left: spring(width * (index - activeIndex), settings)
  }))
  return (
    <ItemsWrapper width={width}>
      {configs.map((style, index) => (
        <Motion style={configs[index]} key={index}>
          {style =>
            React.cloneElement(React.Children.toArray(children)[index], {
              width,
              active: style.left > -width && style.left < width,
              style
            })}
        </Motion>
      ))}
    </ItemsWrapper>
  )
}

const SlidingSwitch = ({ children, settings }) => (
  <SizeMe>
    {({ size }) => (
      <SwitchContainer>
        <Route>
          {({ location }) => (
            <SlidingSwitchInner
              width={size.width}
              activeIndex={getActiveIndex(children, location)}
              settings={settings}
            >
              {children}
            </SlidingSwitchInner>
          )}
        </Route>
      </SwitchContainer>
    )}
  </SizeMe>
)

export default SlidingSwitch
