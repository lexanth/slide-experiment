import React from 'react'
import styled from 'styled-components'
import { Motion, spring } from 'react-motion'

const springSettings = { stiffness: 170, damping: 26 }

const ItemsWrapper = styled.div`
  display: flex;
  overflow: hidden;
  width: ${props => props.width}px;
  height: 100px;
  position: relative;
`
const PagerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`

const Button = styled.button`
  outline: none;
  border: none;
  border-radius: 3px;
  background-color: royalblue;
  color: #fff;
  flex: 0 1 50%;
  margin: 5px;
  padding: 10px;
`

const Item = styled.div`
  position: absolute;
`

const ItemWrapper = ({ active, children, style }) => (
  <Item style={style}>{active ? children : null}</Item>
)

class PagerItems extends React.Component {
  render() {
    const { children, activeIndex, width } = this.props
    let prevLeft = -width * activeIndex
    const configs = React.Children.toArray(children).map((child, index) => {
      const item = {
        left: spring(prevLeft, springSettings)
      }
      prevLeft = prevLeft + width
      return item
    })
    return (
      <ItemsWrapper width={width}>
        {configs.map((style, index) => (
          <Motion style={configs[index]} key={index}>
            {style => (
              <ItemWrapper
                active={style.left > -width && style.left < width}
                style={style}
              >
                {React.cloneElement(React.Children.toArray(children)[index], {
                  width
                })}
              </ItemWrapper>
            )}
          </Motion>
        ))}
      </ItemsWrapper>
    )
  }
}

class Pager extends React.Component {
  state = {
    activeIndex: 0
  }

  onLeft = () => {
    this.setState(prevState => ({
      activeIndex: prevState.activeIndex === 0 ? 0 : prevState.activeIndex - 1
    }))
  }

  onRight = () => {
    this.setState(prevState => ({
      activeIndex:
        prevState.activeIndex >= React.Children.count(this.props.children) - 1
          ? prevState.activeIndex
          : prevState.activeIndex + 1
    }))
  }

  onFirst = () => {
    this.setState({ activeIndex: 0 })
  }

  onLast = () => {
    this.setState({
      activeIndex: React.Children.count(this.props.children) - 1
    })
  }

  render() {
    const { children, width } = this.props
    return (
      <PagerWrapper>
        <PagerItems width={width} activeIndex={this.state.activeIndex}>
          {children}
        </PagerItems>
        <ButtonRow>
          <Button onClick={this.onFirst}>First</Button>
          <Button onClick={this.onLeft}>Left</Button>
          <Button onClick={this.onRight}>Right</Button>
          <Button onClick={this.onLast}>Last</Button>
        </ButtonRow>
      </PagerWrapper>
    )
  }
}

export default Pager
