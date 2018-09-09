import React from 'react'
import styled from 'styled-components'

const Item = styled.div`
  position: absolute;
`

const SlidingSwitchRoute = ({ width, active, style, path, children }) => (
  <Item style={style}>{active ? children({ width }) : null}</Item>
)

export default SlidingSwitchRoute
