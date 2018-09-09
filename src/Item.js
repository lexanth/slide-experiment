import React from 'react'
import styled from 'styled-components'

const ItemWrapper = styled.div`
  background-color: ${props => props.colour};
  color: #fff;
  font-size: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${props => props.width}px;
  height: 100px;
  flex-shrink: 0;
`

const Item = ({ children, colour, width }) => (
  <ItemWrapper colour={colour} width={width}>
    <span>{children}</span>
  </ItemWrapper>
)

export default Item
